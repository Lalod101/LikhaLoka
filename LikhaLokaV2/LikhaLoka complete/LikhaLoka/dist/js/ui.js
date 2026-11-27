"use strict";

// Shared display helpers. This module does not own product or artisan records.
(function (app) {
  const main = document.getElementById("main");
  const pageMarkup = main.innerHTML;
  const dialog = document.getElementById("dialog");
  const content = document.getElementById("dialog-content");
  const text = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  function toast(message) {
    const notice = document.getElementById("notice");
    notice.textContent = message;
    notice.style.display = "block";
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      notice.style.display = "none";
    }, 5000);
  }

  function imageUrl(value) {
    if (/^assets\/[a-z]+\.webp$/.test(value)) return value;
    try {
      const url = new URL(value);
      if (url.protocol === "https:") return url.href;
    } catch {
      /* Use a local fallback. */
    }
    return "assets/hero.webp";
  }

  function showDialog(title, html) {
    document.getElementById("dialog-title").textContent = title;
    content.innerHTML = html;
    dialog.showModal();
  }

  function notFound() {
    main.innerHTML =
      '<section class="wrap section"><h1>That page is unavailable.</h1><p>The craft or maker may have been removed.</p><a class="button" href="products.html">Discover crafts</a></section>';
  }
  function init() {
    document.getElementById("close-dialog").onclick = () => dialog.close();
    document.querySelector(".skip").onclick = (event) => {
      event.preventDefault();
      main.focus();
      main.scrollIntoView();
    };
    document.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button && button.hasAttribute("data-close")) dialog.close();
    });
  }
  app.ui = {
    pageMarkup,
    main,
    dialog,
    text,
    toast,
    imageUrl,
    showDialog,
    notFound,
    init,
  };
})(window.LikhaLoka);
