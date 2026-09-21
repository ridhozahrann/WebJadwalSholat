# Jadwal Sholat & Arah Kiblat

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A fast, modern, responsive, and offline-first Progressive Web App (PWA) providing accurate Islamic prayer schedules and Qibla direction based on real-time location.

---

## Key Features

- **Automatic & Manual Geolocation**: Detect location via browser API, select from interactive Leaflet map, or pick from popular Indonesian cities.
- **Real-Time Countdown**: Live countdown timer to next prayer, automatically transitioning to next day's Fajr (Subuh) after Isha.
- **Qibla Compass**: Real-time compass with +-10 deg accuracy cone using Device Orientation API, plus static degree fallback for desktop devices.
- **Interactive Map Location Picker**: OpenStreetMap and Leaflet.js map integration for precise location selection.
- **7-Day Schedule & Social Sharing**: View weekly prayer timings and share daily schedules via WhatsApp or Web Share API.
- **Hijri Calendar & Islamic Events**: Displays Hijri dates alongside important Islamic dates (Ramadhan, Idul Fitri, Idul Adha, Isra Miraj, etc.).
- **Multi-Location Favorites**: Save multiple locations (Home, Office, etc.) and switch between them seamlessly.
- **Offline PWA Support**: Service Worker caching for instant load times and offline accessibility.
- **Minimalist Aesthetic**: Clean SVG icons, system/dark/light theme support, and Emerald + Amber palette.

---

## Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, CSS Custom Properties
- **Routing**: React Router DOM v7
- **Mapping & Geocoding**: Leaflet.js, OpenStreetMap, Nominatim API
- **Data Source**: Aladhan API (Kemenag RI, Muslim World League, Umm al-Qura)
- **State Management**: React Context & LocalStorage API

---

## Getting Started

### Prerequisites

- Node.js `^18.0.0` or higher
- npm or yarn

### Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/ridhozahrann/WebJadwalSholat.git
   cd WebJadwalSholat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5180` in browser.

---

## Build

To build static production assets:
```bash
npm run build
```

To preview production build locally:
```bash
npm run preview
```

---

## License

This project is open-source and available under [MIT License](LICENSE).
