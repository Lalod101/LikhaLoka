// data.js - products and artisans used by every page.
// They are saved in the browser (localStorage) so Admin changes show on other pages.

let sampleProducts = [
  { name: "Hablon Table Runner", category: "Hablon", price: 850 },
  { name: "Piña Handkerchief", category: "Piña", price: 650 },
  { name: "Buri Woven Tote", category: "Woven", price: 720 }
];

let sampleArtisans = [
  { name: "Remedios Ganzon", craft: "Hablon weaver", place: "Miag-ao, Iloilo" },
  { name: "Teodora Ilaya", craft: "Piña weaver", place: "Kalibo, Aklan" },
  { name: "Ramon Tupas", craft: "Buri weaver", place: "Pandan, Antique" }
];

function getProducts() {
  let saved = localStorage.getItem("products");
  if (saved) {
    return JSON.parse(saved);
  }
  return sampleProducts;
}

function getArtisans() {
  let saved = localStorage.getItem("artisans");
  if (saved) {
    return JSON.parse(saved);
  }
  return sampleArtisans;
}

function saveProducts(list) {
  localStorage.setItem("products", JSON.stringify(list));
}

function saveArtisans(list) {
  localStorage.setItem("artisans", JSON.stringify(list));
}
