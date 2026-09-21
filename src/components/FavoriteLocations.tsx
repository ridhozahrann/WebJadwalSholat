import { Location } from '@/types'
import { useSettings } from '@/hooks/useSettings'
import { IconMapPin, IconClose } from './Icons'

interface Props {
  onSelect: (loc: Location) => void
}

export default function FavoriteLocations({ onSelect }: Props) {
  const { settings, updateSettings } = useSettings()
  const favorites = settings.favoriteLocations

  const addCurrent = () => {
    if (!settings.location) return
    const exists = favorites.some(
      f => f.latitude === settings.location!.latitude && f.longitude === settings.location!.longitude
    )
    if (exists) return
    updateSettings({ favoriteLocations: [...favorites, settings.location] })
  }

  const remove = (idx: number) => {
    updateSettings({ favoriteLocations: favorites.filter((_, i) => i !== idx) })
  }

  const currentIsFavorite = settings.location && favorites.some(
    f => f.latitude === settings.location!.latitude && f.longitude === settings.location!.longitude
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Lokasi Favorit</h3>
        {settings.location && !currentIsFavorite && (
          <button
            onClick={addCurrent}
            className="text-xs text-[var(--color-primary)] font-medium hover:underline"
          >
            + Simpan Lokasi Saat Ini
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-xs text-[var(--color-text-secondary)] py-2">Belum ada lokasi favorit tersimpan.</p>
      ) : (
        <div className="space-y-1.5">
          {favorites.map((f, i) => {
            const isActive = settings.location?.latitude === f.latitude && settings.location?.longitude === f.longitude
            return (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  isActive
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 font-semibold'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
                }`}
              >
                <button
                  onClick={() => onSelect(f)}
                  className="flex-1 text-left flex items-center gap-2"
                >
                  <IconMapPin size={16} className="text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="text-xs font-medium">{f.city}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">{f.province}</p>
                  </div>
                </button>
                <button
                  onClick={() => remove(i)}
                  className="p-1 text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
                  title="Hapus"
                >
                  <IconClose size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
