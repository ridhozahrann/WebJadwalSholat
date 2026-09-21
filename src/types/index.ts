export interface Location {
  city: string
  province: string
  country: string
  latitude: number
  longitude: number
}

export interface PrayerTimes {
  imsak: string   // "HH:mm"
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export interface PrayerSchedule {
  date: string       // "YYYY-MM-DD"
  location: string
  method: CalculationMethod
  times: PrayerTimes
  hijriDate?: string
}

export type PrayerName = 'imsak' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
export type PrayerStatus = 'passed' | 'current' | 'upcoming'

export interface PrayerWithStatus {
  name: PrayerName
  label: string
  time: string
  status: PrayerStatus
}

export type CalculationMethod = 'kemenag' | 'mwl' | 'umm-al-qura'
export type TimeFormat = '24h' | '12h'
export type Theme = 'light' | 'dark' | 'system'

export interface Settings {
  location: Location | null
  calculationMethod: CalculationMethod
  timeFormat: TimeFormat
  theme: Theme
  showQiblaDegree: boolean
  useCompass: boolean
  favoriteLocations: Location[]
  language: 'id' | 'en'
}

export interface QiblaData {
  bearing: number          // degrees from north
  compassDirection: string // e.g. "Barat Laut"
}
