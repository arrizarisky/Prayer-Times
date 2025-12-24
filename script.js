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
      let date = new Date();
      let today = date.getDate - 1;
      const data = response.data[1][0].timings;

      let app = document.getElementById("app");
      let table = document.getElementById("table");
      let tbody = document.getElementById("tableBody");

      for (i in data) {
        let row = tbody.insertRow();
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i];
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
      app.appendChild(table);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("getLocation");

  if (!btn) {
    console.error("Tombol getLocation tidak ditemukan");
    return;
  }

  btn.addEventListener("click", getUserLocation);

  function getUserLocation() {
    alert("Lokasi anda terdeteksi");

    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation");
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    prayerTimes(position.coords.latitude, position.coords.longitude);

    btn.style.display = "none";
  }

  function error() {
    alert("Lokasi tidak dapat dijangkau");
  }
});

function main() {
  getUserLocation();
}
main();
