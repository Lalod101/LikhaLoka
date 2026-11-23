// admin.js - add, edit and delete products and artisans

let products = getProducts();
let artisans = getArtisans();

// show both tables
function showTables() {
  let productRows = "<tr><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>";
  products.forEach(function (p, i) {
    productRows += "<tr>" +
      "<td>" + p.name + "</td>" +
      "<td>" + p.category + "</td>" +
      "<td>₱" + p.price + "</td>" +
      "<td><button onclick='editProduct(" + i + ")'>Edit</button> " +
          "<button onclick='deleteProduct(" + i + ")'>Delete</button></td>" +
    "</tr>";
  });
  document.getElementById("productTable").innerHTML = productRows;

  let artisanRows = "<tr><th>Name</th><th>Craft</th><th>Place</th><th>Actions</th></tr>";
  artisans.forEach(function (a, i) {
    artisanRows += "<tr>" +
      "<td>" + a.name + "</td>" +
      "<td>" + a.craft + "</td>" +
      "<td>" + a.place + "</td>" +
      "<td><button onclick='editArtisan(" + i + ")'>Edit</button> " +
          "<button onclick='deleteArtisan(" + i + ")'>Delete</button></td>" +
    "</tr>";
  });
  document.getElementById("artisanTable").innerHTML = artisanRows;
}

// ----- PRODUCTS -----

function addProduct() {
  let name = document.getElementById("productName").value.trim();
  let category = document.getElementById("productCategory").value;
  let price = document.getElementById("productPrice").value;

  if (name == "" || price == "") {
    alert("Please enter a name and price.");
    return;
  }

  products.push({ name: name, category: category, price: price });
  saveProducts(products);
  showTables();
}

function editProduct(i) {
  let name = prompt("New product name:", products[i].name);
  let price = prompt("New price:", products[i].price);

  if (name && price) {
    products[i].name = name;
    products[i].price = price;
    saveProducts(products);
    showTables();
  }
}

function deleteProduct(i) {
  if (confirm("Delete " + products[i].name + "?")) {
    products.splice(i, 1);
    saveProducts(products);
    showTables();
  }
}

// ----- ARTISANS -----

function addArtisan() {
  let name = document.getElementById("artisanName").value.trim();
  let craft = document.getElementById("artisanCraft").value.trim();
  let place = document.getElementById("artisanPlace").value.trim();

  if (name == "" || craft == "" || place == "") {
    alert("Please fill in all artisan fields.");
    return;
  }

  artisans.push({ name: name, craft: craft, place: place });
  saveArtisans(artisans);
  showTables();
}

function editArtisan(i) {
  let name = prompt("New name:", artisans[i].name);
  let craft = prompt("New craft:", artisans[i].craft);
  let place = prompt("New place:", artisans[i].place);

  if (name && craft && place) {
    artisans[i].name = name;
    artisans[i].craft = craft;
    artisans[i].place = place;
    saveArtisans(artisans);
    showTables();
  }
}

function deleteArtisan(i) {
  if (confirm("Delete " + artisans[i].name + "?")) {
    artisans.splice(i, 1);
    saveArtisans(artisans);
    showTables();
  }
}

// put the sample data back
function resetData() {
  localStorage.clear();
  location.reload();
}

showTables();
