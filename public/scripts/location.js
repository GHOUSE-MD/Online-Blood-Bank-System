var x = document.getElementById("demo1");
var y = document.getElementById("demo2");
let latText = document.getElementById("lat");
let longText = document.getElementById("long");

window.onload = function () {
  var result = confirm(
    "Do you want to share your location for accurate results?"
  );
  if (result == true) {
    getLocation();
  }
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  x.style.display = "none";
  y.style.display = "none";
}

function showPosition(position) {
  x.innerHTML = position.coords.latitude;
  y.innerHTML = position.coords.longitude;
  latText.value = x.textContent;
  longText.value = y.textContent;
}

// fomElmnt.addEventListener('submit',savePost);
