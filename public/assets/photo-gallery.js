(() => {
  "use strict";
  const dialog = document.getElementById("photo-viewer");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const image = dialog.querySelector(".photo-viewer-image");
  const caption = dialog.querySelector(".photo-viewer-caption");
  const close = dialog.querySelector(".photo-viewer-close");
  let opener = null;

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[data-photo-zoom]");
    if (!link) return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.dataset.photoAlt || "Expanded photograph";
    caption.textContent = link.dataset.photoTitle || image.alt;
    dialog.showModal();
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    if (opener && opener.isConnected) opener.focus();
  });
})();
