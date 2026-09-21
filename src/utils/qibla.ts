import { QiblaData } from '@/types'

const KAABA_LAT = 21.4225
const KAABA_LNG = 39.8262

function toRad(deg: number): number { return deg * Math.PI / 180 }
function toDeg(rad: number): number { return rad * 180 / Math.PI }

export function calculateQibla(lat: number, lng: number): QiblaData {
  const φ1 = toRad(lat)
  const φ2 = toRad(KAABA_LAT)
  const Δλ = toRad(KAABA_LNG - lng)

  const x = Math.sin(Δλ)
  const y = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ)

  let bearing = toDeg(Math.atan2(x, y))
  bearing = ((bearing % 360) + 360) % 360

  return { bearing: Math.round(bearing * 10) / 10, compassDirection: getCompassDirection(bearing) }
}

function getCompassDirection(deg: number): string {
  const dirs = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut']
  const i = Math.round(deg / 45) % 8
  return dirs[i]
}
