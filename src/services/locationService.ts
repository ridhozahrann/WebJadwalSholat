import { Location } from '@/types'

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation tidak didukung browser'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true, timeout: 10000, maximumAge: 300000,
    })
  })
}

export async function reverseGeocode(lat: number, lng: number): Promise<Partial<Location>> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`)
    if (!res.ok) return { latitude: lat, longitude: lng }
    const data = await res.json()
    const addr = data.address ?? {}
    return {
      city: addr.city || addr.town || addr.village || addr.county || 'Tidak diketahui',
      province: addr.state || '',
      country: addr.country || 'Indonesia',
      latitude: lat,
      longitude: lng,
    }
  } catch {
    return { latitude: lat, longitude: lng, city: 'Tidak diketahui', province: '', country: '' }
  }
}

// Common Indonesian cities for manual selection
export const INDONESIAN_CITIES: Location[] = [
  { city: 'Jakarta', province: 'DKI Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 },
  { city: 'Bandung', province: 'Jawa Barat', country: 'Indonesia', latitude: -6.9175, longitude: 107.6191 },
  { city: 'Surabaya', province: 'Jawa Timur', country: 'Indonesia', latitude: -7.2575, longitude: 112.7521 },
  { city: 'Yogyakarta', province: 'DI Yogyakarta', country: 'Indonesia', latitude: -7.7956, longitude: 110.3695 },
  { city: 'Semarang', province: 'Jawa Tengah', country: 'Indonesia', latitude: -6.9666, longitude: 110.4196 },
  { city: 'Medan', province: 'Sumatera Utara', country: 'Indonesia', latitude: 3.5952, longitude: 98.6722 },
  { city: 'Makassar', province: 'Sulawesi Selatan', country: 'Indonesia', latitude: -5.1477, longitude: 119.4327 },
  { city: 'Palembang', province: 'Sumatera Selatan', country: 'Indonesia', latitude: -2.9761, longitude: 104.7754 },
  { city: 'Denpasar', province: 'Bali', country: 'Indonesia', latitude: -8.6500, longitude: 115.2167 },
  { city: 'Balikpapan', province: 'Kalimantan Timur', country: 'Indonesia', latitude: -1.2654, longitude: 116.8311 },
  { city: 'Banjarmasin', province: 'Kalimantan Selatan', country: 'Indonesia', latitude: -3.3194, longitude: 114.5908 },
  { city: 'Pontianak', province: 'Kalimantan Barat', country: 'Indonesia', latitude: -0.0263, longitude: 109.3425 },
  { city: 'Manado', province: 'Sulawesi Utara', country: 'Indonesia', latitude: 1.4748, longitude: 124.8421 },
  { city: 'Padang', province: 'Sumatera Barat', country: 'Indonesia', latitude: -0.9471, longitude: 100.4172 },
  { city: 'Pekanbaru', province: 'Riau', country: 'Indonesia', latitude: 0.5071, longitude: 101.4478 },
  { city: 'Malang', province: 'Jawa Timur', country: 'Indonesia', latitude: -7.9666, longitude: 112.6326 },
  { city: 'Aceh', province: 'Aceh', country: 'Indonesia', latitude: 5.5483, longitude: 95.3238 },
  { city: 'Depok', province: 'Jawa Barat', country: 'Indonesia', latitude: -6.4025, longitude: 106.7942 },
  { city: 'Tangerang', province: 'Banten', country: 'Indonesia', latitude: -6.1781, longitude: 106.6319 },
  { city: 'Bekasi', province: 'Jawa Barat', country: 'Indonesia', latitude: -6.2349, longitude: 106.9896 },
]
