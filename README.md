# Jadwal Sholat & Arah Kiblat

A fast, modern, responsive, and offline-first Progressive Web App (PWA) providing accurate Islamic prayer schedules and Qibla direction based on real-time location.

---

## Key Features

- **Automatic & Manual Geolocation**: Detect location via browser API, select from an interactive Leaflet map, or pick from popular Indonesian cities.
- **Real-Time Countdown**: Live countdown timer to the next prayer, automatically transitioning to next day's Fajr (Subuh) after Isha.
- **Qibla Compass**: Real-time compass with a +-10 deg accuracy cone using Device Orientation API, plus a static degree fallback for desktop devices.
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

1. Clone the repository:
   ```bash
   git clone https://github.com/ridhozahrann/WebJadwalSholat.git
   cd WebJadwalSholat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5180` in your browser.

---

## Build & Deployment

### Production Build

To build the static production assets:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### Deploy to Vercel

1. Import this repository into [Vercel](https://vercel.com/new).
2. Vercel will automatically detect **Vite** as the framework.
3. Click **Deploy**.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
