import { useState } from 'react'
import { useSettings } from '@/hooks/useSettings'
import { CalculationMethod, TimeFormat, Theme } from '@/types'
import LocationModal from '@/components/LocationModal'
import { getCurrentPosition, reverseGeocode } from '@/services/locationService'
import { Location } from '@/types'
import FavoriteLocations from '@/components/FavoriteLocations'

const METHODS: { value: CalculationMethod; label: string }[] = [
  { value: 'kemenag', label: 'Kementerian Agama RI' },
  { value: 'mwl', label: 'Muslim World League' },
  { value: 'umm-al-qura', label: 'Umm al-Qura' },
]

const TIME_FORMATS: { value: TimeFormat; label: string }[] = [
  { value: '24h', label: '24 Jam' },
  { value: '12h', label: '12 Jam' },
]

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Terang' },
  { value: 'dark', label: 'Gelap' },
  { value: 'system', label: 'Sistem' },
]

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings()
  const [locationModal, setLocationModal] = useState(false)
  const [detecting, setDetecting] = useState(false)

  const detectLocation = async () => {
    setDetecting(true)
    try {
      const pos = await getCurrentPosition()
      const geo = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      const newLoc: Location = {
        city: geo.city || 'Tidak diketahui', province: geo.province || '',
        country: geo.country || 'Indonesia', latitude: pos.coords.latitude, longitude: pos.coords.longitude,
      }
      updateSettings({ location: newLoc })
      setLocationModal(false)
    } catch { /* ignore */ }
    setDetecting(false)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-6 pb-20 md:pb-4">
      <h1 className="text-lg font-bold">Pengaturan</h1>

      {/* Location */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)]">Lokasi</h2>
        <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
          <p className="text-sm font-medium">
            {settings.location ? `${settings.location.city}, ${settings.location.province}` : 'Belum diatur'}
          </p>
          <button
            onClick={() => setLocationModal(true)}
            className="mt-2 text-xs text-[var(--color-primary)] font-medium"
          >
            Ubah Lokasi
          </button>
        </div>
      </section>

      {/* Favorite Locations */}
      <section>
        <FavoriteLocations onSelect={(l) => { updateSettings({ location: l }) }} />
      </section>

      {/* Calculation Method */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)]">Metode Perhitungan</h2>
        <div className="space-y-1">
          {METHODS.map(m => (
            <label key={m.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-surface-alt)] cursor-pointer transition-colors">
              <input
                type="radio"
                name="method"
                checked={settings.calculationMethod === m.value}
                onChange={() => updateSettings({ calculationMethod: m.value })}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm">{m.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Time Format */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)]">Format Waktu</h2>
        <div className="flex gap-2">
          {TIME_FORMATS.map(f => (
            <button
              key={f.value}
              onClick={() => updateSettings({ timeFormat: f.value })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                settings.timeFormat === f.value
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)]">Tema</h2>
        <div className="flex gap-2">
          {THEMES.map(t => (
            <button
              key={t.value}
              onClick={() => updateSettings({ theme: t.value })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                settings.theme === t.value
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <LocationModal
        open={locationModal}
        onClose={() => setLocationModal(false)}
        onSelect={(l) => { updateSettings({ location: l }); setLocationModal(false) }}
        onDetect={detectLocation}
        detecting={detecting}
      />
    </div>
  )
}
