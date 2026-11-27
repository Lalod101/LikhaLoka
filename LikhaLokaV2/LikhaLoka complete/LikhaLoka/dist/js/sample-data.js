"use strict";

// Shared namespace. Each functionality below owns its own state and functions.
window.LikhaLoka = {};

(function (app) {
  const seed = {
    artisans: [
      {
        id: "a1",
        name: "Habi Studio",
        location: "Iloilo",
        specialization: "Handwoven textiles",
        biography:
          "An illustrative artisan profile celebrating patient, thoughtful weaving. Replace this story with a consenting artisan’s own words before publication.",
      },
      {
        id: "a2",
        name: "Lupa Workshop",
        location: "Western Visayas",
        specialization: "Pottery",
        biography:
          "A sample workshop profile exploring the textures and shapes of everyday pottery. Details and cultural context await a real artisan interview.",
      },
      {
        id: "a3",
        name: "Habi & Home",
        location: "Iloilo",
        specialization: "Woven goods",
        biography:
          "A fictional maker profile for this student prototype. This space will introduce the materials, process, and people behind each woven piece.",
      },
    ],
    products: [
      {
        id: "p1",
        name: "Handwoven hablon scarf",
        artisanId: "a1",
        category: "Textiles",
        location: "Iloilo",
        materials: "Textile composition to be confirmed",
        description:
          "A sample woven scarf in dusty rose, chosen to introduce the texture and detail of Filipino textile craft. Actual materials, provenance, care instructions, and cultural background should be supplied by the artisan.",
        image: "assets/scarf.webp",
        status: "Published",
      },
      {
        id: "p2",
        name: "Hand-shaped clay vase",
        artisanId: "a2",
        category: "Pottery",
        location: "Western Visayas",
        materials: "Clay — sample description",
        description:
          "Earthy tones and a softly rounded form make this illustrative piece a quiet focal point for the home. Production methods and care guidance will be confirmed with a participating maker.",
        image: "assets/vase.webp",
        status: "Published",
      },
      {
        id: "p3",
        name: "Woven market tote",
        artisanId: "a3",
        category: "Woven goods",
        location: "Iloilo",
        materials: "Woven fiber — sample description",
        description:
          "An everyday carry inspired by the warmth and texture of woven craft. This is a sample listing, with final details to be provided by the maker.",
        image: "assets/basket.webp",
        status: "Published",
      },
    ],
    inquiries: [],
  };

  app.sampleData = seed;
})(window.LikhaLoka);
