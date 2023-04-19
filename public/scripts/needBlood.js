const submitButtonElement = document.querySelector("#section-2 submit");
const donorCardButtonElement = document.querySelector(".donor-card");

function display() {
  donorCardButtonElement.style.display = "block";
}

submitButtonElement.addEventListener("click", display);
