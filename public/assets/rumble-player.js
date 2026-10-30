// Rumble player is loaded on deliberate click. Do not redirect from the
// thumbnail or load multiple third-party video players before interaction.
(() => {
  "use strict";

  const expectedOrigin = "https://rumble.com";
  const playerPath = /^\/embed\/[a-z0-9]+\/$/;

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-rumble-embed]");
    if (!button) return;

    const raw = button.getAttribute("data-rumble-embed");
    let url;
    try {
      url = new URL(raw);
    } catch {
      return;
    }
    if (url.origin !== expectedOrigin || !playerPath.test(url.pathname) ||
        url.search || url.hash) return;

    const frame = document.createElement("iframe");
    frame.className = "recent-rumble-frame";
    frame.title = button.getAttribute("data-rumble-title") || "Natalie Winters video on Rumble";
    frame.src = url.href;
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("allow", "fullscreen; picture-in-picture; encrypted-media");
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    frame.setAttribute("loading", "eager");

    button.replaceWith(frame);
    // The iframe is loaded only following a deliberate click. Rumble retains
    // its native play controls; no unsolicited sound or autoplay.
  });
})();
