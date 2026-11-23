// products.js - shows the products, with search and filter

let products = getProducts();

function showProducts() {
  let search = document.getElementById("search").value.toLowerCase();
  let category = document.getElementById("category").value;
  let html = "";

  products.forEach(function (p) {
    let matchSearch = p.name.toLowerCase().includes(search);
    let matchCategory = category == "All" || p.category == category;

    if (matchSearch && matchCategory) {
           html += "<div class='card'>" +
                "<h3>" + p.name + "</h3>" +
                "<p>Category: " + p.category + "</p>" +
                "<p class='price'>₱" + p.price + "</p>" +
                "<a class='btn' href='contacts.html'>Inquire</a>" +
              "</div>";
    }
  });

  if (html == "") {
    html = "<p>No products found.</p>";
  }

  document.getElementById("productList").innerHTML = html;
}

document.getElementById("search").addEventListener("input", showProducts);
document.getElementById("category").addEventListener("change", showProducts);
showProducts();
