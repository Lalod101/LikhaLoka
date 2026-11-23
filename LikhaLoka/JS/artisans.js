// artisans.js - shows the artisans

let artisans = getArtisans();
let html = "";

artisans.forEach(function (a) {
  html += "<div class='card'>" +
            "<h3>" + a.name + "</h3>" +
            "<p>Craft: " + a.craft + "</p>" +
            "<p>Location: " + a.place + "</p>" +
          "</div>";
});

document.getElementById("artisanList").innerHTML = html;
