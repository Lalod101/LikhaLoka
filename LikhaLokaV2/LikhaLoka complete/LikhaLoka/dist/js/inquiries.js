"use strict";

// Contact and craft inquiry forms, local saving, and admin inquiry status.

(function (app) {
  const { main, dialog, text } = app.ui;
  function inquiryForm(productId = "") {
    return `<form class="inquiry-form" data-product="${text(productId)}"><div class="two-col"><label>Name<input name="name" autocomplete="name" required maxlength="100"></label><label>Email<input name="email" type="email" autocomplete="email" required maxlength="200"></label></div><label>Message<textarea name="message" required minlength="10" maxlength="2000" placeholder="Tell us what you would like to know about this craft."></textarea></label><p class="small">Demo only. Your inquiry is saved in this browser for review in the admin area.</p><button type="submit">Save demo inquiry</button></form>`;
  }

  function renderContact() {
    main.innerHTML = app.ui.pageMarkup;
  }
  function init() {
    document.addEventListener("submit", (event) => {
      if (!event.target.matches(".inquiry-form")) return;
      event.preventDefault();
      const form = event.target;
      const values = Object.fromEntries(new FormData(form));
      if (!values.name.trim() || values.message.trim().length < 10) {
        app.ui.toast(
          "Please enter your name and a message of at least 10 characters.",
        );
        return;
      }
      const data = app.storage.getData();
      const next = structuredClone(data);
      next.inquiries.unshift({
        id: crypto.randomUUID(),
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        productId: form.dataset.product,
        productName:
          data.products.find((p) => p.id === form.dataset.product)?.name ||
          "General message",
        createdAt: new Date().toISOString(),
        status: "New",
      });
      if (app.storage.persist(next)) {
        form.reset();
        app.ui.showDialog(
          "Your demo inquiry is saved.",
          "<p>You can review it in Admin demo → Inquiries. It is stored only in this browser and has not been sent to an artisan.</p><button data-close>Continue exploring</button>",
        );
      }
    });
  }

  function viewInquiry(id) {
    const data = app.storage.getData();
    const item = data.inquiries.find((inquiry) => inquiry.id === id);
    if (!item) return;
    app.ui.showDialog(
      "Inquiry details",
      `<p><strong>${text(item.name)}</strong><br>${text(item.email)}</p><p class="small">${text(new Date(item.createdAt).toLocaleString())} · ${text(item.productName || "General message")}</p><p style="white-space:pre-wrap;overflow-wrap:anywhere">${text(item.message)}</p><label>Status<select id="inquiry-status">${["New", "Read", "Resolved"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label><button id="save-status">Save status</button>`,
    );
    document.getElementById("save-status").onclick = () => {
      const next = structuredClone(app.storage.getData());
      next.inquiries.find((inquiry) => inquiry.id === id).status =
        document.getElementById("inquiry-status").value;
      if (app.storage.persist(next)) {
        dialog.close();
        app.admin.renderAdminRecords();
        app.ui.toast("Inquiry status updated.");
      }
    };
  }

  app.inquiries = { inquiryForm, renderContact, init, viewInquiry };
})(window.LikhaLoka);
