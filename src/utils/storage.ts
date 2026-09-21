import { Settings } from '@/types'

const STORAGE_KEY = 'jadwal-sholat-settings'

const DEFAULT_SETTINGS: Settings = {
  location: null,
  calculationMethod: 'kemenag',
  timeFormat: '24h',
  theme: 'system',
  showQiblaDegree: true,
  useCompass: true,
  favoriteLocations: [],
  language: 'id',
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}
