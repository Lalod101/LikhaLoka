"use strict";

// Connects each HTML page to its functionality module and handles mobile navigation.
(function (app) {
  const { main, dialog } = app.ui;
  const pageFiles = {
    home: "index.html",
    discover: "products.html",
    craft: "product.html",
    artisans: "artisans.html",
    artisan: "artisan.html",
    story: "about.html",
    contact: "contact.html",
    admin: "admin.html",
  };

  function render() {
    if (dialog.open) dialog.close();
    const page = document.body.dataset.page || "home";
    const params = new URLSearchParams(location.search);
    if (location.hash && location.hash !== "#main") {
      const [route, query = ""] = location.hash.slice(1).split("?");
      const [legacyPage, encodedId] = route.split("/");
      if (pageFiles[legacyPage]) {
        const destination = new URL(pageFiles[legacyPage], location.href);
        destination.search = query;
        if (encodedId) {
          try {
            destination.searchParams.set("id", decodeURIComponent(encodedId));
          } catch {
            app.ui.notFound();
            return;
          }
        }
        location.replace(destination.href);
        return;
      }
    }
    const id = params.get("id") || "";
    if (page === "discover" && params.has("category"))
      app.catalog.setCategory(params.get("category"));
    const routes = {
      home: app.pages.renderHome,
      discover: app.catalog.renderDiscover,
      craft: () =>
        id
          ? app.catalog.renderDetail(id)
          : (main.innerHTML = app.ui.pageMarkup),
      artisans: app.artisans.renderArtisans,
      artisan: () =>
        id
          ? app.artisans.renderArtisan(id)
          : (main.innerHTML = app.ui.pageMarkup),
      story: app.pages.renderStory,
      contact: app.inquiries.renderContact,
      admin: app.admin.renderAdmin,
    };
    (routes[page] || app.ui.notFound)();
    const activePage =
      page === "craft" ? "discover" : page === "artisan" ? "artisans" : page;
    document.querySelectorAll("#navigation a").forEach((link) => {
      if (link.getAttribute("href") === pageFiles[activePage])
        link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.getElementById("navigation").classList.remove("open");
    document
      .querySelector(".menu-toggle")
      .setAttribute("aria-expanded", "false");
  }

  function init() {
    document.querySelector(".menu-toggle").onclick = (event) => {
      const open = document
        .getElementById("navigation")
        .classList.toggle("open");
      event.currentTarget.setAttribute("aria-expanded", String(open));
    };
    window.addEventListener("hashchange", render);
    window.addEventListener("storage", (event) => {
      if (event.key === app.storage.key || event.key === null) {
        app.storage.reload();
        render();
        app.ui.toast("Updated to match another open tab.");
      }
    });
  }
  app.navigation = { render, init };
})(window.LikhaLoka);
