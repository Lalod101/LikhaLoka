"use strict";

// Homepage and Our Story sections.

(function (app) {
  const { main } = app.ui;
  function renderHome() {
    main.innerHTML = app.ui.pageMarkup;
    main.querySelector(".grid").innerHTML =
      app.catalog
        .published()
        .slice(0, 3)
        .map(app.catalog.productCard)
        .join("") || "<p>New crafts are on their way.</p>";
  }

  function renderStory() {
    main.innerHTML = app.ui.pageMarkup;
  }
  app.pages = { renderHome, renderStory };
})(window.LikhaLoka);
