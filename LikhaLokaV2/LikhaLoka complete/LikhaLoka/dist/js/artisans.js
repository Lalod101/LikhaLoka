"use strict";

// Artisan cards, maker search, individual stories, and related products.

(function (app) {
  const { main, text } = app.ui;
  function artisanName(id) {
    const data = app.storage.getData();
    return (
      data.artisans.find((artisan) => artisan.id === id)?.name ||
      "Artisan unavailable"
    );
  }

  function makerCard(artisan) {
    return `<article class="maker-card"><div class="maker-avatar" aria-hidden="true">${text(artisan.name.slice(0, 1))}</div><h3>${text(artisan.name)}</h3><p class="meta">${text(artisan.location)} · Sample profile</p><p>${text(artisan.specialization)}</p><a href="artisan.html?id=${encodeURIComponent(artisan.id)}">Meet the maker</a></article>`;
  }

  function renderArtisans() {
    const data = app.storage.getData();
    main.innerHTML = app.ui.pageMarkup;
    const update = () => {
      const query = document.getElementById("maker-search").value.toLowerCase();
      const makers = data.artisans.filter((item) =>
        [item.name, item.location, item.specialization]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
      document.getElementById("maker-grid").innerHTML =
        makers.map(makerCard).join("") ||
        '<p role="status">No matching makers found.</p>';
    };
    document.getElementById("maker-search").oninput = update;
    update();
  }

  function renderArtisan(id) {
    const data = app.storage.getData();
    const artisan = data.artisans.find((item) => item.id === id);
    if (!artisan) return app.ui.notFound();
    main.innerHTML = `<section class="wrap section"><a href="artisans.html">All artisans</a><div class="profile-head"><div class="maker-avatar" aria-hidden="true">${text(artisan.name.slice(0, 1))}</div><div><span class="eyebrow">Sample artisan profile</span><h1>${text(artisan.name)}</h1><p>${text(artisan.location)} · ${text(artisan.specialization)}</p></div></div><p class="intro">${text(artisan.biography)}</p><hr class="divider"><h2>From this maker</h2><div class="grid">${
      app.catalog
        .published()
        .filter((item) => item.artisanId === id)
        .map(app.catalog.productCard)
        .join("") || "<p>No app.catalog.published crafts yet.</p>"
    }</div></section>`;
  }
  app.artisans = { artisanName, makerCard, renderArtisans, renderArtisan };
})(window.LikhaLoka);
