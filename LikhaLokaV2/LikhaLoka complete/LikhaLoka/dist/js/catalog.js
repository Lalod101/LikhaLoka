"use strict";

// Product browsing, category filters, search, sorting, and craft detail screens.

(function (app) {
  const { main, text } = app.ui;
  let category = "All crafts";
  let searchTerm = "";
  let sortOrder = "featured";
  function published() {
    const data = app.storage.getData();
    return data.products.filter((product) => product.status === "Published");
  }

  function productCard(product) {
    return `<article class="craft-card"><a class="craft-photo" href="product.html?id=${encodeURIComponent(product.id)}"><img loading="lazy" src="${text(app.ui.imageUrl(product.image))}" alt="${text(product.name)}" width="500" height="400"></a><h3><a href="product.html?id=${encodeURIComponent(product.id)}">${text(product.name)}</a></h3><p class="meta">${text(app.artisans.artisanName(product.artisanId))} · ${text(product.location)}</p><a class="link" href="product.html?id=${encodeURIComponent(product.id)}">View craft</a></article>`;
  }

  function renderDiscover() {
    main.innerHTML = app.ui.pageMarkup;
    document.getElementById("sort").value = sortOrder;
    document
      .getElementById("craft-search")
      .addEventListener("input", (event) => {
        searchTerm = event.target.value;
        updateCrafts();
      });
    document.getElementById("sort").addEventListener("change", (event) => {
      sortOrder = event.target.value;
      updateCrafts();
    });
    updateCrafts();
  }

  function updateCrafts() {
    const query = searchTerm.trim().toLowerCase();
    const products = published().filter(
      (product) =>
        (category === "All crafts" || product.category === category) &&
        [
          product.name,
          product.category,
          product.location,
          app.artisans.artisanName(product.artisanId),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
    );
    if (sortOrder === "name")
      products.sort((a, b) => a.name.localeCompare(b.name));
    document.getElementById("count").textContent =
      `${products.length} craft${products.length === 1 ? "" : "s"} to discover`;
    document.getElementById("craft-grid").innerHTML = products.length
      ? products.map(productCard).join("")
      : '<div class="empty"><h3>No crafts found</h3><p>Try a different search or category.</p><button id="reset-filters">Reset filters</button></div>';
    document
      .querySelectorAll("[data-category]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          button.dataset.category === category,
        ),
      );
  }

  function renderDetail(id) {
    const product = published().find((item) => item.id === id);
    if (!product) return app.ui.notFound();
    main.innerHTML = `<div class="wrap"><div class="breadcrumb"><a href="products.html">Discover</a><span>/</span><span>${text(product.category)}</span></div><section class="detail"><img src="${text(app.ui.imageUrl(product.image))}" alt="${text(product.name)}"><div><span class="eyebrow">${text(product.category)} · Sample listing</span><h1>${text(product.name)}</h1><p class="meta">${text(product.location)}</p><p>${text(product.description)}</p><dl><dt>Materials</dt><dd>${text(product.materials)}</dd><dt>Maker</dt><dd><a href="artisan.html?id=${encodeURIComponent(product.artisanId)}">${text(app.artisans.artisanName(product.artisanId))}</a></dd></dl><button id="inquiry-jump">Inquire about this craft</button></div></section><section id="inquiry" class="form-box"><h2>A conversation starts here.</h2>${app.inquiries.inquiryForm(product.id)}</section><section class="section"><span class="eyebrow">Keep discovering</span><h2>More from the collection</h2><div class="grid">${published()
      .filter((item) => item.id !== id)
      .slice(0, 3)
      .map(productCard)
      .join("")}</div></section></div>`;
    document.getElementById("inquiry-jump").onclick = () => {
      document.getElementById("inquiry").scrollIntoView({ behavior: "smooth" });
      document.querySelector("#inquiry input").focus({ preventScroll: true });
    };
  }
  function setCategory(value) {
    category = ["Textiles", "Pottery", "Woven goods"].includes(value)
      ? value
      : "All crafts";
  }
  function init() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.category) {
        category = button.dataset.category;
        updateCrafts();
      }
      if (button.id === "reset-filters") {
        category = "All crafts";
        searchTerm = "";
        document.getElementById("craft-search").value = "";
        updateCrafts();
      }
    });
  }

  app.catalog = {
    published,
    productCard,
    renderDiscover,
    updateCrafts,
    renderDetail,
    setCategory,
    init,
  };
})(window.LikhaLoka);
