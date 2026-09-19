function toVideoEmbedUrl(value = "") {
  const raw = String(value).trim();
  if (!raw) return "";

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}?rel=0` : raw;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) {
        return raw;
      }

      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}?rel=0` : raw;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/").filter(Boolean)[1];
        return id ? `https://www.youtube.com/embed/${id}?rel=0` : raw;
      }
    }

    if (host === "rumble.com") {
      if (url.pathname.startsWith("/embed/")) {
        return raw;
      }

      const match = url.pathname.match(/^\/v([a-z0-9]+)-/i);
      if (match?.[1]) {
        return `https://rumble.com/embed/v${match[1]}/`;
      }
    }
  } catch {
    return raw;
  }

  return raw;
}

const heroVideo = "https://rumble.com/embed/v7cmvoa/?pub=4kxtac";

export const SITE = {
  name: "Natalie G. Winters",
  fullName: "Natalie G. Winters",
  domain: "https://nataliegwinters.com",
  substackHome: "https://nataliegwinters.substack.com/",
  rumbleEmbed: "https://rumble.com/embed/v7d85se/?pub=4kxtac",
  heroVideoEmbed: toVideoEmbedUrl(heroVideo),
  heroVideoSource: heroVideo,

  images: {
    portrait:
      "https://nataliegwinters.com/images/natalie-g-winters-profile.jpg",
    profile1x1:
      "https://nataliegwinters.com/images/natalie-g-winters-profile-1x1.jpg",
    profile4x3:
      "https://nataliegwinters.com/images/natalie-g-winters-profile-4x3.jpg",
    profile16x9:
      "https://nataliegwinters.com/images/natalie-g-winters-profile-16x9.jpg",
    whiteHouse:
      "https://1a-1791.com/video/fwe1/b1/s8/6/T/p/4/d/Tp4dx.qR4e.1.jpg",
    studio:
      "https://s.yimg.com/ny/api/res/1.2/SDQyVDvVqE.u9QpZ3LivSw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTczODtjZj13ZWJw/https%3A/media.zenfs.com/en/ny_post_articles_869/6a88fa45433cf4d821318110e7838cc7"
  }
};
