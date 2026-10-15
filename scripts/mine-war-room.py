#!/usr/bin/env python3
"""Incremental War Room title miner. No video downloads or visitor-time scraping."""
import argparse, html, json, re, subprocess, time
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

CHANNEL = 'https://rumble.com/c/BannonsWarRoom/videos'
AUTHOR = 'https://rumble.com/c/BannonsWarRoom'
STATE = Path('data/war-room-miner.json')


def video_id(url):
    p = urlparse(url)
    m = re.match(r'^/(v[a-z0-9]+)(?:-|\.html)', p.path)
    return m[1] if p.scheme == 'https' and p.netloc == 'rumble.com' and m else None


class ListingParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.current = None
        self.rows = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a':
            url = urljoin('https://rumble.com', a.get('href', ''))
            if video_id(url) and 'videostream__link' in a.get('class', '').split():
                self.current = {'id': video_id(url), 'url': url, 'title': a.get('title', ''), 'text': []}
        if self.current and tag == 'img' and not self.current['title']:
            self.current['title'] = a.get('alt', '')
    def handle_data(self, data):
        if self.current:
            self.current['text'].append(data)
    def handle_endtag(self, tag):
        if tag == 'a' and self.current:
            row = self.current
            row['title'] = re.sub(r'\s+', ' ', row['title'] or ' '.join(row['text'])).strip()
            del row['text']
            self.rows.append(row)
            self.current = None


def parse_listing(source):
    if re.search(r'Just a moment|verify you are human|Performing security verification', source, re.I):
        raise RuntimeError('Rumble human-verification response; checkpoint unchanged')
    parser = ListingParser()
    parser.feed(source)
    rows = list({r['id']: r for r in parser.rows}.values())
    if not rows or any(not r['title'] for r in rows):
        raise RuntimeError('No usable video list or missing titles; checkpoint unchanged')
    return rows


def request(url):
    # Same ordinary public oEmbed path used by the earlier archive importer.
    r = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location',
                        '--max-time', '20', '--max-filesize', '5000000', url],
                       capture_output=True, text=True, timeout=25)
    if r.returncode:
        raise RuntimeError(f'Rumble fetch failed ({r.returncode}): {r.stderr.strip()}; checkpoint unchanged')
    return r.stdout


def metadata(row):
    from urllib.parse import urlencode
    data = json.loads(request('https://rumble.com/api/Media/oembed.json?' + urlencode({'url': row['url']})))
    if data.get('author_url', '').rstrip('/') != AUTHOR or not re.search(r'\bNatalie\s+Winters\b', data.get('title', ''), re.I):
        raise RuntimeError('oEmbed publisher/title mismatch: ' + row['id'])
    match = re.search(r'<iframe\b[^>]*\bsrc=[\"\'](https://rumble\.com/embed/[^\"\']+)', data.get('html', ''), re.I)
    if not match:
        raise RuntimeError('Missing verified embed: ' + row['id'])
    thumb = data.get('thumbnail_url', '')
    p = urlparse(thumb)
    if p.scheme != 'https' or not (p.hostname or '').endswith('.cdn.rumble.cloud'):
        raise RuntimeError('Unexpected thumbnail origin: ' + row['id'])
    return {'id': row['id'], 'rumbleUrl': row['url'], 'sourceTitle': data['title'],
            'embedUrl': html.unescape(match[1]), 'thumbnail': thumb,
            'publisher': data.get('author_name'), 'duration': data.get('duration'),
            'status': 'awaiting-article', 'discoveredAt': datetime.now(timezone.utc).isoformat()}


def mine(state, fetch_page, fetch_metadata, max_pages=30):
    boundary = state.get('lastKnownVideoId')
    if not boundary:
        raise RuntimeError('Explicit initial checkpoint required')
    seen = {r['id'] for r in state.get('videos', [])}
    seen_pages = set()
    pending = []
    newest = None
    reached = False
    for page in range(1, max_pages + 1):
        rows = fetch_page(page)
        signature = tuple(r['id'] for r in rows)
        if signature in seen_pages:
            raise RuntimeError('Repeated listing page; checkpoint unchanged')
        seen_pages.add(signature)
        newest = newest or rows[0]['id']
        for row in rows:
            if row['id'] == boundary:
                reached = True
                break
            if row['id'] not in seen and re.search(r'\bNatalie\s+Winters\b', row['title'], re.I):
                pending.append(row)
                seen.add(row['id'])
        if reached:
            break
    if not reached:
        raise RuntimeError(f'Checkpoint {boundary} not reached within {max_pages} pages; checkpoint unchanged')
    # Transaction: resolve every candidate before replacing the combined archive/checkpoint file.
    additions = [fetch_metadata(row) for row in pending]
    return {**state, 'lastKnownVideoId': newest, 'lastSuccessAt': datetime.now(timezone.utc).isoformat(),
            'lastRun': {'pages': page, 'added': len(additions), 'previousCheckpoint': boundary},
            'videos': additions + state.get('videos', [])}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--max-pages', type=int, default=30)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    if not 1 <= args.max_pages <= 100:
        raise RuntimeError('Page cap must be 1–100')
    state = json.loads(STATE.read_text())
    def fetch_page(page):
        time.sleep(.3)
        return parse_listing(request(CHANNEL + f'?page={page}'))
    updated = mine(state, fetch_page, metadata, args.max_pages)
    print(json.dumps({'checkpoint': updated['lastKnownVideoId'], **updated['lastRun']}))
    if not args.check_only:
        temp = STATE.with_suffix('.tmp')
        temp.write_text(json.dumps(updated, indent=2) + '\n')
        temp.replace(STATE)

if __name__ == '__main__':
    main()
