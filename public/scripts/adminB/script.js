// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

function websiteVisits(response) {
  document.querySelector("#visits").textContent = response.value;
}

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);

/* Index Js */
const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
/* Index Js */

/* Add Donor Js */
let addDonorBox = document.getElementById("main-content");
let formText = document.querySelectorAll(".formText");
let formContainer = document.querySelectorAll(".formContainer");
let submitButton = document.querySelector("#submit");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    addDonorBox.classList.add("dark");
    submitButton.classList.add("dark");
    formText.forEach((item) => {
      item.classList.add("dark");
    });
    formContainer.forEach((item) => {
      item.classList.add("dark");
    });
  } else {
    addDonorBox.classList.remove("dark");
    submitButton.classList.remove("dark");
    formText.forEach((item) => {
      item.classList.remove("dark");
    });
    formContainer.forEach((item) => {
      item.classList.remove("dark");
    });
  }
});
/* Add Donor Js */

/* Analytics Js */
let graphBox = document.querySelectorAll(".container-content");
switchMode.addEventListener("change", function () {
  if (this.checked) {
    graphBox.forEach((item) => {
      item.classList.add("dark");
    });
  } else {
    graphBox.forEach((item) => {
      item.classList.remove("dark");
    });
  }
});
/* Analytics Js */

/* donarList Js & Message Js */
let tableText = document.querySelectorAll("table");
let tr = document.querySelectorAll("tr");
let td = document.querySelectorAll("td");
let th = document.querySelectorAll("th");
switchMode.addEventListener("change", function () {
  if (this.checked) {
    tableText.forEach((item) => {
      item.classList.add("dark");
    });
    tr.forEach((item) => {
      item.classList.add("dark");
    });
    td.forEach((item) => {
      item.classList.add("dark");
    });
    th.forEach((item) => {
      item.classList.add("dark");
    });
  } else {
    tableText.forEach((item) => {
      item.classList.remove("dark");
    });
    tr.forEach((item) => {
      item.classList.remove("dark");
    });
    td.forEach((item) => {
      item.classList.remove("dark");
    });
    th.forEach((item) => {
      item.classList.remove("dark");
    });
  }
});
/* donarList Js & Message Js */

/* Analysis js declarations */
let apElement = document.getElementById("a+");
let anElement = document.getElementById("a-");
let bpElement = document.getElementById("b+");
let bnElement = document.getElementById("b-");
let abpElement = document.getElementById("ab+");
let abnElement = document.getElementById("ab-");
let opElement = document.getElementById("o+");
let onElement = document.getElementById("o-");
/* Analysis js declarations */

const profilePicture = document.querySelector(".profile");
const dropdownMenu = document.querySelector(".dropdown-menu");
const signOutBtn = document.querySelector(".sign-out-btn");

profilePicture.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show-dropdown");
});

signOutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // Use your website's authentication system to log the user out
  // Redirect the user to the login page or the homepage
});
