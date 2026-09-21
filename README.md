# Jadwal Sholat & Arah Kiblat

A modern, fast, responsive, and offline-first Progressive Web App (PWA) for accurate Islamic prayer schedules and Qibla direction based on the user's location.

Built with React 19, TypeScript, Tailwind CSS v4, and Vite.

---

## Features

- Automatic & Manual Location Detection: Detect current location via browser Geolocation or select from interactive Leaflet map / preset Indonesian cities.
- Real-time Next Prayer Countdown: Auto-calculates upcoming prayer and live countdown timer (including auto-wrap to next day's Fajr/Subuh after Isha).
- Accurate Qibla Compass: Device Orientation API integration with a +-10 deg Cone of Accuracy and fallback degree mode for desktop/devices without compass sensors.
- Interactive Map Picker: Integrated Leaflet + OpenStreetMap location selector without requiring any paid API keys.
- 7-Day Weekly Schedule & Share: View a 7-day prayer schedule table and share today's timings via WhatsApp or Web Share API.
- Hijri Calendar & Islamic Events: View current Hijri date and important Islamic dates (Ramadhan, Idul Fitri, Idul Adha, Isra Miraj, etc.).
- Multi-Location Favorites: Save and quickly switch between your favorite locations (Home, Office, Campus, etc.).
- Offline-First PWA: Service Worker caching for instant loading and offline capability.
- Modern Minimalist UI: Clean SVG icon system, dark/light/system theme switcher, and Emerald + Amber color palette.

---

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS v4, Custom CSS Variables
- Routing: React Router DOM v7
- Maps & Geocoding: Leaflet.js, OpenStreetMap, Nominatim API
- Prayer API: Aladhan API (Supports Kemenag RI, MWL, Umm al-Qura methods)
- State & Storage: React Context + localStorage

---

## Getting Started Locally

### Prerequisites

- Node.js (v18.0 or higher)
- npm or yarn

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/ridhozahrann/WebJadwalSholat.git
cd WebJadwalSholat

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open http://localhost:5180 in your browser.

---

## Build for Production

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

---

## How to Push to GitHub

Run these commands in your terminal to publish changes:

```bash
git add .
git commit -m "docs: update README.md"
git push origin main
```

---

## Deploying to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Push your code to GitHub.
2. Go to Vercel Dashboard (https://vercel.com/new).
3. Select Import next to your `WebJadwalSholat` repository.
4. Framework Preset will automatically detect Vite.
5. Click Deploy. Vercel will build and provide a production HTTPS URL.

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## License

MIT License. Free to use and distribute.
