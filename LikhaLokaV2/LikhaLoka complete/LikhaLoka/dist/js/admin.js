"use strict";

// Demo workspace plus product and artisan management with delete confirmation.

(function (app) {
  const { main, dialog, text } = app.ui;
  let demoSession = false;
  let adminTab = "Products";
  let adminSearch = "";
  function renderAdmin() {
    if (!demoSession) {
      main.innerHTML = app.ui.pageMarkup;
      document.getElementById("enter-admin").onclick = () => {
        demoSession = true;
        renderAdmin();
      };
      return;
    }
    main.innerHTML = `<section class="wrap section"><div class="section-head"><div><span class="eyebrow">LikhaLoka studio</span><h1 style="font-size:3rem">Admin workspace</h1></div><button class="secondary" id="leave-admin">Leave demo</button></div><p class="banner">Browser-local demo · Changes affect only this browser. Use fictional information.</p><div class="admin-layout"><aside class="admin-nav" aria-label="Admin sections">${["Products", "Artisans", "Inquiries"].map((tab) => `<button data-tab="${tab}" class="${adminTab === tab ? "active" : ""}" aria-pressed="${adminTab === tab}">${tab}</button>`).join("")}</aside><section class="admin-content"><div class="admin-top"><h2>${text(adminTab)}</h2>${adminTab !== "Inquiries" ? `<button id="add-record">+ Add ${adminTab === "Products" ? "product" : "artisan"}</button>` : ""}</div><label>Search ${adminTab.toLowerCase()}<input id="admin-search" type="search" value="${text(adminSearch)}"></label><div id="admin-records"></div></section></div></section>`;
    document.getElementById("leave-admin").onclick = () => {
      demoSession = false;
      renderAdmin();
    };
    document.getElementById("admin-search").oninput = (event) => {
      adminSearch = event.target.value;
      renderAdminRecords();
    };
    const add = document.getElementById("add-record");
    if (add)
      add.onclick = () =>
        openEditor(adminTab === "Products" ? "products" : "artisans");
    renderAdminRecords();
  }

  function renderAdminRecords() {
    const data = app.storage.getData();
    const query = adminSearch.trim().toLowerCase();
    const collection = adminTab.toLowerCase();
    const rows = data[collection].filter((item) =>
      [
        item.name,
        item.email,
        item.message,
        item.category,
        item.location,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
    if (!rows.length) {
      document.getElementById("admin-records").innerHTML =
        '<div class="empty"><h3>No records found</h3><p>Add a record or try another search.</p></div>';
      return;
    }
    const inquiries = collection === "inquiries";
    document.getElementById("admin-records").innerHTML =
      `<div class="table-scroll"><table><thead><tr><th>${inquiries ? "From" : "Name"}</th><th>${inquiries ? "Regarding" : collection === "products" ? "Category" : "Location"}</th><th>${inquiries || collection === "products" ? "Status" : "Specialization"}</th><th>Actions</th></tr></thead><tbody>${rows.map((item) => `<tr><td class="row-name">${text(item.name)}${inquiries ? `<br><span class="small">${text(item.email)}</span>` : ""}</td><td data-label="${inquiries ? "Regarding" : "Details"}">${text(inquiries ? data.products.find((p) => p.id === item.productId)?.name || item.productName || "General message" : item.category || item.location)}</td><td data-label="${collection === "artisans" ? "Craft" : "Status"}">${text(item.status || item.specialization)}</td><td><button class="secondary" data-view="${text(item.id)}" data-collection="${collection}">View</button>${!inquiries ? `<button class="secondary" data-edit="${text(item.id)}" data-collection="${collection}">Edit</button><button class="plain error" data-delete="${text(item.id)}" data-collection="${collection}">Delete</button>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function openEditor(collection, id) {
    const data = app.storage.getData();
    const item = data[collection].find((record) => record.id === id) || {};
    const products = collection === "products";
    if (products && !data.artisans.length) {
      app.ui.toast("Add an artisan before creating a product.");
      return;
    }
    const field = (label, name, value = "", type = "text") =>
      `<label>${label}<input name="${name}" type="${type}" value="${text(value)}" required maxlength="${name === "image" ? 1000 : 200}"></label>`;
    app.ui.showDialog(
      `${id ? "Edit" : "Add"} ${products ? "product" : "artisan"}`,
      `<form id="record-form">${field("Name", "name", item.name)}${products ? `<div class="two-col"><label>Artisan<select name="artisanId">${data.artisans.map((a) => `<option value="${text(a.id)}" ${item.artisanId === a.id ? "selected" : ""}>${text(a.name)}</option>`).join("")}</select></label><label>Category<select name="category">${["Textiles", "Pottery", "Woven goods"].map((c) => `<option ${item.category === c ? "selected" : ""}>${c}</option>`).join("")}</select></label></div>${field("Location", "location", item.location)}${field("Materials", "materials", item.materials)}<label>Description<textarea name="description" required maxlength="3000">${text(item.description)}</textarea></label><label>Image<select name="image">${["scarf", "vase", "basket", "hero", "weaving"].map((image) => `<option value="assets/${image}.webp" ${item.image === `assets/${image}.webp` ? "selected" : ""}>${image}</option>`).join("")}</select></label><label>Publication status<select name="status"><option ${item.status === "Draft" ? "selected" : ""}>Draft</option><option ${item.status === "Published" ? "selected" : ""}>Published</option></select></label>` : `${field("Location", "location", item.location)}${field("Specialization", "specialization", item.specialization)}<label>Biography<textarea name="biography" required maxlength="3000">${text(item.biography)}</textarea></label>`}<p id="form-error" class="error" role="alert"></p><div class="actions"><button type="submit">Save ${products ? "product" : "artisan"}</button><button type="button" class="secondary" data-close>Cancel</button></div></form>`,
    );
    document.getElementById("record-form").onsubmit = (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.target));
      for (const key in values) values[key] = values[key].trim();
      if (Object.values(values).some((value) => !value)) {
        document.getElementById("form-error").textContent =
          "Please complete each field with more than spaces.";
        return;
      }
      const next = structuredClone(data);
      const record = { ...values, id: id || crypto.randomUUID() };
      const index = next[collection].findIndex((record) => record.id === id);
      if (index >= 0) next[collection][index] = record;
      else next[collection].push(record);
      if (app.storage.persist(next)) {
        dialog.close();
        renderAdminRecords();
        app.ui.toast("Saved in this browser.");
      }
    };
  }

  function deleteRecord(collection, id) {
    const data = app.storage.getData();
    const record = data[collection].find((item) => item.id === id);
    if (!record) return;
    const linked =
      collection === "artisans" &&
      data.products.some((product) => product.artisanId === id);
    app.ui.showDialog(
      linked ? "This artisan has linked crafts" : `Delete ${record.name}?`,
      linked
        ? `<p>Reassign this artisan’s products to another maker before deleting this profile.</p><button data-close>Keep artisan</button>`
        : `<p>This removes the record from this browser. You cannot undo this action.</p><div class="actions"><button class="secondary" data-close>Cancel</button><button class="danger" id="confirm-delete">Delete record</button></div>`,
    );
    const confirm = document.getElementById("confirm-delete");
    if (confirm)
      confirm.onclick = () => {
        const next = structuredClone(data);
        next[collection] = next[collection].filter((item) => item.id !== id);
        if (app.storage.persist(next)) {
          dialog.close();
          renderAdminRecords();
          app.ui.toast("Record deleted.");
        }
      };
  }

  function viewRecord(collection, id) {
    const item = app.storage
      .getData()
      [collection].find((record) => record.id === id);
    if (!item) return;
    if (collection === "inquiries") {
      app.inquiries.viewInquiry(id);
      return;
    }
    app.ui.showDialog(
      item.name,
      `<p>${text(item.description || item.biography)}</p><p>${text(item.location)}</p><p>${text(item.materials || item.specialization)}</p><button data-close>Close</button>`,
    );
  }

  function init() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.tab) {
        adminTab = button.dataset.tab;
        adminSearch = "";
        renderAdmin();
      }
      if (button.dataset.edit)
        openEditor(button.dataset.collection, button.dataset.edit);
      if (button.dataset.delete)
        deleteRecord(button.dataset.collection, button.dataset.delete);
      if (button.dataset.view)
        viewRecord(button.dataset.collection, button.dataset.view);
    });
  }

  app.admin = {
    renderAdmin,
    renderAdminRecords,
    openEditor,
    deleteRecord,
    viewRecord,
    init,
  };
})(window.LikhaLoka);
