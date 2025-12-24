// Daftar kunci waktu sholat dari API yang ingin ditampilkan
const mainPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// Pemetaan kunci API ke nama bahasa Indonesia
const prayerNamesIndo = {
  Fajr: "Subuh",
  Dhuhr: "Dzuhur",
  Asr: "Ashar",
  Maghrib: "Maghrib",
  Isha: "Isya",
};

// Objek penyimpan jadwal sholat hari ini untuk keperluan pengecekan notifikasi
let prayerSchedule = {};

// Fungsi utama untuk mengambil data jadwal sholat dari API Aladhan
function prayerTimes(latitude, longitude) {
  const date = new Date();
  const currentYears = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  // Mengambil kalender sholat berdasarkan koordinat lokasi dan bulan/tahun saat ini
  fetch(
    `https://api.aladhan.com/v1/calendar/${currentYears}/${currentMonth}?latitude=${latitude}&longitude=${longitude}&method=4`
  )
    .then((response) => response.json())
    .then(function (response) {
      const today = date.getDate() - 1; // Index array dimulai dari 0
      const timings = response.data[today].timings;
      const tbody = document.getElementById("tableBody");

      // Mengosongkan isi tabel sebelum mengisinya dengan data baru
      tbody.innerHTML = "";

      // Logika mencari waktu sholat yang sedang berlangsung
      const now = new Date();
      // Konversi waktu saat ini ke total menit (0-1440) untuk perbandingan angka
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let activeKey = "";

      // Tentukan sholat mana yang aktif (sholat terakhir yang waktunya sudah dilewati)
      mainPrayers.forEach((key) => {
        const timeClean = timings[key].split(" ")[0]; // Mengambil format HH:mm
        const [h, m] = timeClean.split(":").map(Number);
        const prayerMinutes = h * 60 + m;

        if (currentMinutes >= prayerMinutes) {
          activeKey = key; // Kunci ini akan terus diperbarui hingga waktu sholat terbaru tercapai
        }
      });

      // Proses pembuatan baris tabel (Render) sesuai urutan mainPrayers
      mainPrayers.forEach((key) => {
        let row = tbody.insertRow();

        // Memberikan class 'active' untuk baris sholat yang sedang berlangsung agar bisa di-style di CSS
        if (key === activeKey) {
          row.classList.add("active");
        }

        let nameCell = row.insertCell(0);
        let timeCell = row.insertCell(1);

        const timeClean = timings[key].split(" ")[0];
        nameCell.innerHTML = prayerNamesIndo[key];
        timeCell.innerHTML = timeClean;
        timeCell.style.textAlign = "right";

        // Simpan ke memori sementara untuk fungsi notifikasi
        prayerSchedule[prayerNamesIndo[key]] = timeClean;
      });

      // Menyimpan lokasi terakhir secara lokal agar tidak perlu minta izin lokasi terus-menerus
      chrome.storage.local.set({ lat: latitude, lon: longitude });
    });
}

// Fungsi yang berjalan setiap menit untuk mencocokkan waktu sekarang dengan jadwal
function checkTimeForNotification() {
  const now = new Date();
  // Format waktu sekarang menjadi HH:mm agar sama dengan format jadwal
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  for (let name in prayerSchedule) {
    if (prayerSchedule[name] === currentTime) {
      showNotification(name);
    }
  }
}

// Fungsi untuk memicu pop-up notifikasi desktop dari Chrome
function showNotification(prayerName) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png", // Jangan lupa tambahkan icon di folder ekstensi
    title: "Waktunya Sholat!",
    message: `Sekarang masuk waktu ${prayerName}.`,
    priority: 2,
  });
}

// Menjalankan pengecekan notifikasi secara otomatis setiap 60 detik
setInterval(checkTimeForNotification, 60000);

// Inisialisasi awal saat pop-up ekstensi dibuka
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("getLocation");

  if (!btn) {
    console.error("Tombol getLocation tidak ditemukan");
    return;
  }

  btn.addEventListener("click", getUserLocation);

  // Fungsi untuk meminta izin akses lokasi ke user
  function getUserLocation() {
    alert("Lokasi anda terdeteksi");

    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation");
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  // Jika izin lokasi diberikan, panggil fungsi API
  function success(position) {
    prayerTimes(position.coords.latitude, position.coords.longitude);
    btn.style.display = "none"; // Sembunyikan tombol setelah lokasi didapat
  }

  function error() {
    alert("Lokasi tidak dapat dijangkau");
  }

  // Cek apakah ada lokasi yang pernah disimpan sebelumnya di storage
  chrome.storage.local.get(["lat", "lon"], (result) => {
    if (result.lat && result.lon) {
      prayerTimes(result.lat, result.lon);
    }
  });
});
