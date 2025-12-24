function prayerTimes(latitude, longitude) {
  fetch(
    "https://api.aladhan.com/v1/calendar/2025?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&method"
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log(response.data[1][0].timings);
    });
}

function success(position) {
  prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error() {
  alert("Lokasi tidak dapat dijangkau");
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Dibutuhkan lokasi untuk Prayer Times");
  }
}

function main() {
  let app = document.getElementById("app");
  let Title = document.createElement("h1");
  Title.innerHTML = "Prayer Times";
  app.appendChild(Title);
  getUserLocation();
}
main();
