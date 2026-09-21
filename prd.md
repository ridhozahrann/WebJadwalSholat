\# Product Requirements Document (PRD)



\## Website Jadwal Sholat \& Arah Kiblat



\*\*Versi:\*\* 2.0

\*\*Platform:\*\* Web Browser

\*\*Target perangkat:\*\* Mobile, Tablet, Desktop, Laptop

\*\*Target pengguna:\*\* Masyarakat umum, khususnya pengguna Muslim

\*\*Bahasa utama:\*\* Bahasa Indonesia



\---



\# 1. Product Overview



\*\*Jadwal Sholat \& Arah Kiblat\*\* adalah website responsif yang menyediakan informasi waktu sholat dan arah kiblat berdasarkan lokasi pengguna.



Website dirancang agar pengguna dapat membuka browser pada HP maupun desktop dan langsung memperoleh informasi penting seperti:



\* Lokasi pengguna.

\* Waktu saat ini.

\* Jadwal sholat hari ini.

\* Sholat yang sedang berlangsung.

\* Countdown menuju sholat berikutnya.

\* Arah kiblat.

\* Derajat arah kiblat.

\* Metode perhitungan waktu sholat.

\* Tanggal Masehi dan Hijriah.



Produk mengutamakan \*\*kesederhanaan, kecepatan, keterbacaan, dan responsivitas\*\*.



\---



\# 2. Problem Statement



Pengguna sering membutuhkan dua informasi utama dalam aktivitas ibadah:



1\. Kapan waktu sholat?

2\. Ke arah mana kiblat?



Informasi tersebut biasanya tersedia di aplikasi atau layanan yang terpisah. Website ini menggabungkan kedua kebutuhan tersebut dalam satu platform yang dapat diakses langsung melalui browser tanpa instalasi aplikasi.



Masalah yang ingin diselesaikan:



\* Pengguna ingin mengetahui sholat berikutnya dengan cepat.

\* Pengguna membutuhkan countdown waktu sholat.

\* Pengguna membutuhkan arah kiblat ketika berada di tempat baru.

\* Pengguna ingin memilih lokasi secara manual.

\* Pengguna membutuhkan website yang nyaman digunakan di HP dan desktop.

\* Pengguna membutuhkan alternatif ketika sensor kompas pada perangkat tidak tersedia.



\---



\# 3. Product Goals



\## Primary Goals



Website harus:



1\. Menampilkan jadwal sholat dengan jelas.

2\. Menampilkan countdown menuju sholat berikutnya secara real-time.

3\. Menentukan sholat yang sedang berlangsung.

4\. Menampilkan arah kiblat berdasarkan lokasi pengguna.

5\. Memanfaatkan sensor perangkat ketika tersedia.

6\. Tetap dapat memberikan arah kiblat ketika sensor tidak tersedia.

7\. Responsif pada mobile dan desktop.

8\. Memungkinkan pengguna memilih metode perhitungan.

9\. Menyimpan preferensi pengguna di browser.

10\. Memiliki performa ringan dan cepat.



\---



\# 4. Non-Goals



Untuk MVP, website tidak perlu:



\* Menjadi aplikasi chat atau komunitas.

\* Menyediakan akun pengguna.

\* Menyediakan sistem pembayaran.

\* Menyediakan fitur sosial.

\* Menjadi pengganti aplikasi kalender penuh.

\* Menyediakan database profil pribadi pengguna.



\---



\# 5. Target Users



\## Primary User



Pengguna Muslim yang ingin mengetahui jadwal sholat melalui browser.



\## Secondary User



Pengguna yang:



\* Sedang bepergian.

\* Berada di tempat baru.

\* Membutuhkan arah kiblat.

\* Menggunakan laptop atau desktop.

\* Menggunakan HP tanpa aplikasi tambahan.

\* Ingin membandingkan metode perhitungan waktu sholat.



\---



\# 6. Core User Journey



\## User Journey — Jadwal Sholat



```text

Buka Website

&#x20;     ↓

Lokasi terdeteksi / pilih lokasi

&#x20;     ↓

Jadwal sholat dimuat

&#x20;     ↓

Lihat sholat berikutnya

&#x20;     ↓

Countdown berjalan real-time

&#x20;     ↓

Waktu berganti

&#x20;     ↓

Next prayer diperbarui otomatis

```



\## User Journey — Kiblat



```text

Buka menu Kiblat

&#x20;     ↓

Lokasi tersedia

&#x20;     ↓

Hitung bearing menuju Ka'bah

&#x20;     ↓

Periksa sensor orientasi perangkat

&#x20;     ↓

Sensor tersedia?

&#x20;  ↙            ↘

&#x20;Ya              Tidak

&#x20;↓                ↓

Kompas       Tampilkan arah

real-time    berdasarkan derajat

&#x20;↓                ↓

Arah kiblat ditampilkan

```



\---



\# 7. Site Structure



Struktur navigasi utama:



```text

Home

├── Jadwal Sholat

├── Kiblat

└── Pengaturan

```



Pada desktop:



```text

Logo

Beranda

Jadwal Sholat

Kiblat

Pengaturan

```



Pada mobile dapat menggunakan:



```text

Beranda | Jadwal | Kiblat | Pengaturan

```



atau hamburger menu.



\---



\# 8. Home Page



Home menjadi dashboard utama.



\## Komponen



\### Header



Menampilkan:



\* Logo.

\* Nama website.

\* Navigasi.

\* Theme switcher.



\### Location



Contoh:



```text

📍 Bandung, Jawa Barat

```



Terdapat tombol:



```text

Ubah Lokasi

```



\### Current Date



Menampilkan:



```text

Senin, 21 September 2026

21 Rabiul Akhir 1448 H

```



\### Current Time



Menampilkan jam secara real-time:



```text

07:49:21

```



\### Next Prayer



Komponen paling menonjol:



```text

SHOLAT BERIKUTNYA



Dzuhur



11:55



04:05:39

```



\### Today's Schedule



Menampilkan semua waktu sholat hari ini.



\### Qibla Preview



Home juga dapat menampilkan ringkasan:



```text

Arah Kiblat



295°

Barat Laut



\[Buka Kompas Kiblat]

```



\---



\# 9. Prayer Schedule



\## Prayer Times



Minimal:



| Prayer  | Description     |

| ------- | --------------- |

| Imsak   | Waktu imsak     |

| Subuh   | Waktu Subuh     |

| Terbit  | Matahari terbit |

| Dzuhur  | Waktu Dzuhur    |

| Ashar   | Waktu Ashar     |

| Maghrib | Waktu Maghrib   |

| Isya    | Waktu Isya      |



\---



\# 10. Next Prayer System



Sistem harus secara otomatis menentukan event waktu berikutnya.



Contoh:



```text

Sekarang 10:30



Subuh      04:45 ✓

Terbit     06:02 ✓

Dzuhur     11:55 ← NEXT

Ashar      15:10

Maghrib    17:52

Isya       19:05

```



Countdown:



```text

01 : 24 : 32

```



Format:



```text

HH : MM : SS

```



Ketika countdown mencapai:



```text

00 : 00 : 00

```



sistem:



1\. Mengubah status prayer.

2\. Menentukan prayer berikutnya.

3\. Menghitung countdown baru.

4\. Mengupdate UI secara otomatis.



Tidak membutuhkan refresh halaman.



\---



\# 11. Prayer Status



Setiap prayer memiliki status:



```text

UPCOMING

CURRENT

PASSED

```



Contoh:



```text

Subuh       04:45    PASSED

Terbit      06:02    PASSED

Dzuhur      11:55    CURRENT

Ashar       15:10    UPCOMING

```



UI harus memberikan indikator visual yang jelas.



\---



\# 12. Qibla Feature



\## Overview



Halaman \*\*Kiblat\*\* merupakan fitur utama kedua setelah jadwal sholat.



Sistem menghitung arah Ka'bah berdasarkan:



\* Latitude pengguna.

\* Longitude pengguna.

\* Koordinat Ka'bah.



Aplikasi kemudian mendapatkan:



\*\*Qibla Bearing\*\*



yang dinyatakan dalam derajat dari arah utara.



\---



\# 13. Qibla Coordinates



Koordinat Ka'bah disimpan sebagai konstanta sistem.



```text

Ka'bah

Latitude

Longitude

```



Koordinat tersebut digunakan untuk menghitung great-circle bearing dari lokasi pengguna menuju Ka'bah.



\---



\# 14. Qibla Calculation



Sistem menghitung:



```text

User Coordinates

&#x20;       ↓

Qibla Bearing Calculation

&#x20;       ↓

Qibla Angle

```



Output:



```text

Arah Kiblat

295°

Barat Laut

```



Nilai harus dinormalisasi ke rentang:



```text

0° – 360°

```



Interpretasi umum:



```text

0°   = Utara

90°  = Timur

180° = Selatan

270° = Barat

```



\---



\# 15. Qibla Compass



Pada perangkat yang mendukung sensor orientasi:



UI utama berupa kompas.



Contoh:



```text

&#x20;               N

&#x20;               ↑

&#x20;         NW         NE



&#x20;            ╲

&#x20;             ╲

&#x20;              🕋

&#x20;           295°



&#x20;         SW         SE

&#x20;               ↓

&#x20;               S

```



Pointer kiblat harus bergerak mengikuti orientasi perangkat.



\---



\# 16. Device Orientation



Sistem harus mencoba menggunakan sensor orientasi perangkat.



Alur:



```text

Browser

&#x20;  ↓

Device Orientation API

&#x20;  ↓

Sensor tersedia?

&#x20;  ↓

Ya

&#x20;  ↓

Baca heading

&#x20;  ↓

Bandingkan dengan Qibla Bearing

&#x20;  ↓

Putar indikator

```



Pada browser atau perangkat tertentu, permission sensor mungkin diperlukan.



UI permission harus menjelaskan alasan akses sensor.



Contoh:



```text

Aktifkan Kompas



Website membutuhkan akses sensor orientasi

untuk menampilkan arah kiblat secara langsung.



\[Izinkan Sensor]

```



\---



\# 17. Qibla Accuracy Indicator



Website harus menunjukkan status akurasi kompas.



Contoh:



```text

● Sensor aktif

Akurasi baik

```



atau:



```text

△ Kalibrasi diperlukan

Gerakkan perangkat membentuk angka 8.

```



atau:



```text

! Sensor tidak tersedia

Menggunakan arah kiblat berbasis derajat.

```



Status tidak boleh hanya menggunakan warna; harus memiliki teks.



\---



\# 18. Qibla Calibration



Apabila sensor mendukung heading tetapi hasil tidak stabil, pengguna dapat diarahkan melakukan kalibrasi.



Contoh instruksi:



```text

Kalibrasi Kompas



Gerakkan HP perlahan membentuk angka 8

hingga arah kompas stabil.

```



Tersedia tombol:



```text

Kalibrasi Ulang

```



\---



\# 19. Qibla Fallback



Tidak semua browser atau perangkat mendukung sensor orientasi dengan baik.



Dalam kondisi:



\* Sensor tidak tersedia.

\* Permission ditolak.

\* Desktop tidak mempunyai kompas.

\* Browser tidak mendukung API.

\* Sensor tidak memberikan heading yang valid.



Website tetap harus menampilkan:



```text

Arah Kiblat



295°



Barat Laut



Dari Utara

```



Dengan demikian fitur Kiblat tetap berguna pada desktop.



\---



\# 20. Desktop Qibla Mode



Karena sebagian desktop tidak mempunyai sensor kompas, halaman desktop menggunakan mode statis.



Contoh:



```text

┌──────────────────────────┐

│       ARAH KIBLAT        │

│                          │

│          N               │

│          ↑               │

│       ↖ 295°             │

│                          │

│      BARAT LAUT          │

│                          │

└──────────────────────────┘

```



Dapat ditambahkan visual:



```text

Lokasi Anda

&#x20;    ↓

Arah menuju Ka'bah

&#x20;    ↓

Ka'bah

```



\---



\# 21. Qibla Map Mode



Sebagai fitur tambahan, halaman Kiblat dapat memiliki mode peta.



Contoh:



```text

Lokasi Anda

&#x20;    ●

&#x20;     \\

&#x20;      \\

&#x20;       \\

&#x20;        ● Ka'bah

```



Peta menunjukkan:



\* Lokasi pengguna.

\* Ka'bah.

\* Garis arah kiblat.



Mode ini menjadi fallback visual yang baik pada desktop.



\---



\# 22. Location System



Website mendukung:



\## Automatic Location



Browser meminta permission:



```text

Izinkan website mengakses lokasi?

```



Jika diizinkan:



```text

Latitude

Longitude

```



digunakan untuk:



\* Prayer calculation.

\* Qibla calculation.

\* Menentukan nama kota.



\## Manual Location



Pengguna dapat memasukkan:



```text

Negara

Provinsi

Kota

```



atau mencari:



```text

Cari kota...



Bandung

Jakarta

Surabaya

Yogyakarta

```



\---



\# 23. Location UX



Lokasi aktif harus selalu terlihat.



Contoh:



```text

📍 Bandung, Jawa Barat

\[Ubah]

```



Saat lokasi berubah:



```text

Lokasi diperbarui

Menghitung jadwal sholat...

```



Setelah selesai:



```text

Jadwal diperbarui

```



\---



\# 24. Calculation Methods



Website menyediakan minimal:



\### Kementerian Agama RI



Sebagai metode default untuk pengguna Indonesia.



\### Muslim World League



Metode alternatif.



\### Umm al-Qura



Metode alternatif.



Pengguna dapat mengganti:



```text

Metode Perhitungan



\[ Kementerian Agama RI ▼ ]

```



\---



\# 25. Settings



Halaman pengaturan:



\## Location



```text

Lokasi

Bandung, Jawa Barat



\[Ubah Lokasi]

\[Gunakan Lokasi Saya]

```



\## Calculation Method



```text

Kementerian Agama RI

Muslim World League

Umm al-Qura

```



\## Time Format



```text

24 Jam

12 Jam

```



\## Theme



```text

Light

Dark

System

```



\## Qibla



```text

Tampilkan derajat kiblat

Gunakan kompas bila tersedia

```



\---



\# 26. Local Storage



Preferensi pengguna dapat disimpan di browser.



Contoh:



```json

{

&#x20; "location": {

&#x20;   "city": "Bandung",

&#x20;   "province": "Jawa Barat",

&#x20;   "country": "Indonesia"

&#x20; },

&#x20; "calculationMethod": "Kemenag",

&#x20; "timeFormat": "24h",

&#x20; "theme": "system"

}

```



Tidak perlu menyimpan data lokasi secara server-side untuk kebutuhan MVP.



\---



\# 27. Date Navigation



Pengguna dapat melihat:



\* Hari sebelumnya.

\* Hari ini.

\* Hari berikutnya.



Contoh:



```text

← Sebelumnya

Hari Ini

Berikutnya →

```



Prayer schedule berubah mengikuti tanggal.



Countdown hanya aktif untuk jadwal hari berjalan.



\---



\# 28. Hijri Calendar



Website menampilkan:



```text

21 September 2026

21 Rabiul Akhir 1448 H

```



Tanggal Hijriah dapat berasal dari API atau library yang digunakan.



\---



\# 29. Responsive Design



Website harus mobile-first.



\## Mobile



```text

Width: 320px+

```



\## Tablet



```text

Width: 768px+

```



\## Desktop



```text

Width: 1024px+

```



Tidak boleh ada horizontal scrolling dalam penggunaan normal.



\---



\# 30. Mobile Layout



Urutan tampilan:



```text

Header

↓

Lokasi

↓

Tanggal

↓

Next Prayer

↓

Prayer Schedule

↓

Qibla Preview

```



Halaman Kiblat:



```text

Header

↓

Lokasi

↓

Compass

↓

Qibla Degree

↓

Calibration

↓

Accuracy Status

```



\---



\# 31. Desktop Layout



Desktop Home:



```text

┌───────────────────────────────────────────────┐

│ Logo  Beranda  Jadwal  Kiblat  Pengaturan    │

├───────────────────────────────────────────────┤

│                                               │

│ Location              Current Date            │

│                                               │

├───────────────────────────────────────────────┤

│                                               │

│            NEXT PRAYER                        │

│               DZUHUR                          │

│               11:55                           │

│             01:24:33                          │

│                                               │

├───────────────────────────────────────────────┤

│ Prayer Schedule                               │

│                                               │

│ Subuh | Terbit | Dzuhur | Ashar | Maghrib... │

├───────────────────────────────────────────────┤

│ Qibla Preview                                 │

└───────────────────────────────────────────────┘

```



\---



\# 32. Accessibility



Website harus:



\* Memiliki kontras yang baik.

\* Memiliki ukuran teks yang mudah dibaca.

\* Memiliki touch target yang cukup besar.

\* Dapat dinavigasikan melalui keyboard.

\* Memiliki label pada icon.

\* Tidak mengandalkan warna saja untuk menyampaikan status.

\* Memiliki focus state yang jelas.



\---



\# 33. Performance



Target:



\* Initial load cepat.

\* Asset teroptimasi.

\* JavaScript tidak berlebihan.

\* Countdown diproses client-side.

\* Data prayer schedule di-cache jika memungkinkan.

\* Tidak melakukan request API setiap detik.

\* Sensor hanya diaktifkan ketika halaman Kiblat digunakan.



Target Lighthouse:



```text

Performance: ≥ 90

Accessibility: ≥ 90

Best Practices: ≥ 90

SEO: ≥ 90

```



\---



\# 34. API Architecture



Frontend sebaiknya tidak bergantung langsung pada struktur response provider.



Gunakan abstraction:



```text

Prayer API

&#x20;   ↓

Prayer Service

&#x20;   ↓

Normalized Prayer Object

&#x20;   ↓

Frontend

```



Contoh normalized data:



```json

{

&#x20; "date": "2026-09-21",

&#x20; "location": "Bandung",

&#x20; "times": {

&#x20;   "imsak": "04:35",

&#x20;   "fajr": "04:45",

&#x20;   "sunrise": "06:02",

&#x20;   "dhuhr": "11:55",

&#x20;   "asr": "15:10",

&#x20;   "maghrib": "17:52",

&#x20;   "isha": "19:05"

&#x20; }

}

```



\---



\# 35. Qibla Calculation Architecture



Qibla tidak harus bergantung pada API.



```text

User Latitude/Longitude

&#x20;         ↓

Great-circle Bearing Formula

&#x20;         ↓

Qibla Bearing

&#x20;         ↓

UI

```



Sehingga arah kiblat dapat dihitung secara lokal.



\---



\# 36. Error Handling



\## Location Denied



```text

Lokasi tidak dapat diakses.



Pilih lokasi secara manual untuk melanjutkan.

```



\## Sensor Denied



```text

Sensor kompas tidak dapat digunakan.



Anda tetap dapat melihat arah kiblat berdasarkan derajat.

```



\## API Error



```text

Jadwal sholat tidak dapat dimuat.



Silakan coba lagi.

```



\## Network Offline



```text

Tidak ada koneksi internet.

```



Jika data sudah pernah tersimpan, aplikasi dapat menampilkan data cache.



\## Sensor Unavailable



```text

Kompas perangkat tidak tersedia.



Gunakan arah kiblat 295° dari utara.

```



\---



\# 37. Security \& Privacy



Website harus:



\* Menggunakan HTTPS.

\* Meminta lokasi hanya ketika diperlukan.

\* Meminta sensor hanya ketika fitur kompas digunakan.

\* Tidak menyimpan lokasi secara permanen di server tanpa kebutuhan.

\* Tidak mengirim koordinat ke server jika perhitungan dapat dilakukan secara lokal.

\* Tidak menyimpan data pribadi yang tidak diperlukan.



\---



\# 38. Technology Stack



Rekomendasi:



\## Frontend



```text

Vite

React

TypeScript

Tailwind CSS

```



Alternatif:



```text

Vite

HTML

CSS

JavaScript

```



\## Backend



Opsional:



```text

Laravel

```



atau:



```text

Node.js

```



Backend terutama digunakan apabila diperlukan untuk:



\* Proxy API.

\* Caching.

\* Normalisasi data.

\* API key management.



\---



\# 39. Suggested Project Structure



```text

src/

├── components/

│   ├── Header/

│   ├── LocationCard/

│   ├── DateCard/

│   ├── PrayerCard/

│   ├── PrayerSchedule/

│   ├── NextPrayer/

│   ├── QiblaCompass/

│   ├── QiblaMap/

│   ├── QiblaInfo/

│   └── ThemeToggle/

│

├── pages/

│   ├── Home/

│   ├── Schedule/

│   ├── Qibla/

│   └── Settings/

│

├── services/

│   ├── prayerService/

│   ├── locationService/

│   └── qiblaService/

│

├── utils/

│   ├── countdown/

│   ├── date/

│   ├── qibla/

│   └── storage/

│

├── types/

│   ├── prayer/

│   ├── location/

│   └── qibla/

│

└── main/

```



\---



\# 40. MVP Features



\## P0 — Must Have



\### Prayer



\* Jadwal sholat.

\* Next prayer.

\* Countdown.

\* Current prayer highlight.

\* Current time.

\* Tanggal Masehi.

\* Tanggal Hijriah.

\* Lokasi manual.

\* Geolocation.

\* Kemenag RI.



\### Qibla



\* Qibla bearing.

\* Derajat kiblat.

\* Compass mobile.

\* Device orientation.

\* Permission handling.

\* Sensor fallback.

\* Qibla static mode untuk desktop.



\### General



\* Responsive mobile/desktop.

\* Light/dark mode.

\* Local Storage.

\* Error handling.



\---



\# 41. P1 — Important Features



\* Muslim World League.

\* Umm al-Qura.

\* Pencarian kota.

\* Jadwal beberapa hari.

\* Qibla map.

\* Calibration guidance.

\* Offline cache.

\* PWA.

\* Browser notification.



\---



\# 42. P2 — Future Features



\* Audio adzan.

\* Custom notification.

\* Ramadan mode.

\* Kalender Ramadan.

\* Widget.

\* Install sebagai aplikasi.

\* Multiple location.

\* Share jadwal.

\* Fullscreen compass.

\* Landscape compass mode.



\---



\# 43. Acceptance Criteria — Prayer



\### AC-01



Given pengguna membuka website,

When lokasi tersedia,

Then website menampilkan jadwal sholat untuk lokasi tersebut.



\### AC-02



Given pengguna berada sebelum waktu Dzuhur,

When sistem menghitung next prayer,

Then Dzuhur menjadi next prayer.



\### AC-03



Given countdown berjalan,

When satu detik berlalu,

Then angka countdown berkurang satu detik.



\### AC-04



Given waktu sholat telah tercapai,

When countdown mencapai nol,

Then sistem menentukan prayer berikutnya secara otomatis.



\---



\# 44. Acceptance Criteria — Qibla



\### AC-05



Given latitude dan longitude pengguna tersedia,

When halaman Kiblat dibuka,

Then sistem menghitung Qibla Bearing.



\### AC-06



Given perangkat mendukung orientation sensor,

When pengguna memberikan permission,

Then compass indicator mengikuti orientasi perangkat.



\### AC-07



Given sensor tidak tersedia,

When halaman Kiblat dibuka,

Then sistem tetap menampilkan Qibla Bearing dalam derajat.



\### AC-08



Given pengguna mengubah lokasi,

When lokasi baru berhasil diperoleh,

Then Qibla Bearing dihitung ulang.



\### AC-09



Given perangkat desktop tidak memiliki sensor,

When halaman Kiblat dibuka,

Then mode statis/peta digunakan sebagai fallback.



\---



\# 45. Acceptance Criteria — Responsive



\### AC-10



Given website dibuka pada HP,

When viewport kurang dari 768px,

Then UI menyesuaikan layout mobile.



\### AC-11



Given website dibuka pada desktop,

When viewport lebih besar dari 1024px,

Then website menampilkan layout desktop.



\### AC-12



Given viewport 320px,

When halaman dibuka,

Then tidak ada horizontal scrolling.



\---



\# 46. Definition of Done



Produk dianggap selesai untuk MVP apabila:



1\. Website berjalan di browser modern.

2\. Tampilan responsif pada mobile dan desktop.

3\. Jadwal sholat dapat ditampilkan berdasarkan lokasi.

4\. Countdown berjalan real-time.

5\. Next prayer diperbarui otomatis.

6\. Metode Kemenag tersedia.

7\. Arah kiblat dapat dihitung.

8\. Compass dapat digunakan pada perangkat yang mendukung sensor.

9\. Terdapat fallback untuk perangkat tanpa sensor.

10\. Permission location dan sensor ditangani dengan baik.

11\. Preferensi tersimpan di browser.

12\. Tidak terdapat horizontal overflow.

13\. Tidak terdapat error JavaScript pada penggunaan normal.

14\. Production build berhasil.

15\. Website dapat dideploy ke production.



\---



\# 47. Product Vision



Produk diarahkan menjadi website ibadah harian yang dapat dibuka dengan cepat dari perangkat apa pun.



Pengalaman utama yang diinginkan:



```text

Buka Website

&#x20;    ↓

Lokasi tersedia

&#x20;    ↓

Lihat waktu sholat berikutnya

&#x20;    ↓

Countdown berjalan

&#x20;    ↓

Butuh arah kiblat?

&#x20;    ↓

Buka Kiblat

&#x20;    ↓

Kompas menunjukkan arah Ka'bah

```



Prinsip desain:



\*\*Simple → Fast → Accurate → Responsive → Useful\*\*



