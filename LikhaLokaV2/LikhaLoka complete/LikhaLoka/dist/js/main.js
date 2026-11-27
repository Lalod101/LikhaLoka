"use strict";

// Website entry point. Deferred scripts run in the order listed in index.html.
(function (app) {
  app.ui.init();
  app.catalog.init();
  app.inquiries.init();
  app.admin.init();
  app.navigation.init();
  app.navigation.render();

  if (!app.storage.isAvailable()) {
    app.ui.toast(
      "Saved data could not be read. The starter collection is shown.",
    );
  }
})(window.LikhaLoka);
