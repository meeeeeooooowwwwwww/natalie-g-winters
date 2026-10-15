import copy, importlib.util, unittest
spec=importlib.util.spec_from_file_location('miner','scripts/mine-war-room.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)

def row(id,title='Natalie Winters: Test'):
    return dict(id=id,title=title,url=f'https://rumble.com/{id}-test.html')

class MinerTests(unittest.TestCase):
    def test_filter_stop_and_checkpoint(self):
        state={'lastKnownVideoId':'vold','videos':[{'id':'vkept'}]}
        pages={1:[row('vnew'),row('vother','Different guest')],2:[row('vsecond','NATALIE WINTERS: More'),row('vold'),row('vancient')]}
        visited=[]
        def fetch(page):visited.append(page);return pages[page]
        out=m.mine(state,fetch,lambda r:r)
        self.assertEqual(visited,[1,2])
        self.assertEqual([r['id'] for r in out['videos']],['vnew','vsecond','vkept'])
        self.assertEqual(out['lastKnownVideoId'],'vnew')
        self.assertEqual(state['lastKnownVideoId'],'vold')
    def test_failure_cannot_advance(self):
        state={'lastKnownVideoId':'vold','videos':[]};old=copy.deepcopy(state)
        def fail(row):raise RuntimeError('metadata failed')
        with self.assertRaises(RuntimeError):m.mine(state,lambda p:[row('vnew'),row('vold')],fail)
        self.assertEqual(state,old)
        with self.assertRaises(RuntimeError):m.mine(state,lambda p:[row('vnew')],lambda r:r,2)
        self.assertEqual(state,old)
    def test_markup_and_block(self):
        rows=m.parse_listing('<a class="videostream__link" href="/v123-title.html"><h3>NATALIE WINTERS: A &amp; B</h3></a>')
        self.assertEqual(rows[0]['title'],'NATALIE WINTERS: A & B')
        for source in ['<title>Just a moment...</title>','<html>changed markup</html>']:
            with self.assertRaises(RuntimeError):m.parse_listing(source)

unittest.main()
