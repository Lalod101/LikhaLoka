"use strict";

// Keep this key to preserve products, artisans, and inquiries saved by the earlier version.
(function (app) {
  const STORAGE_KEY = "likhaloka-demo-v1";
  let storageAvailable = true;

  function readData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (
        saved &&
        Array.isArray(saved.products) &&
        Array.isArray(saved.artisans) &&
        Array.isArray(saved.inquiries)
      ) {
        return saved;
      }
    } catch {
      storageAvailable = false;
    }
    return structuredClone(app.sampleData);
  }

  let data = readData();

  function persist(next) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      data = next;
      return true;
    } catch {
      app.ui.toast(
        "Your browser could not save this change. Storage may be full or disabled.",
      );
      return false;
    }
  }

  function reload() {
    data = readData();
  }

  app.storage = {
    getData: () => data,
    persist,
    reload,
    key: STORAGE_KEY,
    isAvailable: () => storageAvailable,
  };
})(window.LikhaLoka);
