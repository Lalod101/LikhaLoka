// contact.js - the contact form

// put the products in the dropdown
getProducts().forEach(function (p) {
  document.getElementById("product").innerHTML +=
    "<option>" + p.name + "</option>";
});

// only allow numbers in the phone box
let phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function () {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
});

function sendMessage() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = phoneInput.value;
  let product = document.getElementById("product").value;
  let message = document.getElementById("message").value.trim();

  if (name == "" || email == "" || product == "" || message == "") {
    alert("Please fill in all fields.");
  } else if (!email.includes("@")) {
    alert("Please enter a valid email.");
  } else if (!/^09[0-9]{9}$/.test(phone)) {
    alert("Please enter a valid phone number (example: 09171234567).");
  } else {
    alert("Salamat, " + name + "! We will contact you soon.");
  }
}
