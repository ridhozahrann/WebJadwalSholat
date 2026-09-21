import { Location } from '@/types'
import { IconMapPin } from './Icons'

interface Props {
  location: Location | null
  onChangeLocation: () => void
  loading?: boolean
}

export default function LocationCard({ location, onChangeLocation, loading }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
      <div className="flex items-center gap-2.5 min-w-0">
        <IconMapPin size={18} className="text-[var(--color-primary)] shrink-0" />
        {loading ? (
          <span className="text-xs text-[var(--color-text-secondary)] animate-pulse">Mendeteksi lokasi...</span>
        ) : location ? (
          <span className="text-xs md:text-sm font-medium truncate">
            {location.city}{location.province ? `, ${location.province}` : ''}
          </span>
        ) : (
          <span className="text-xs text-[var(--color-text-secondary)]">Lokasi belum diatur</span>
        )}
      </div>
      <button
        onClick={onChangeLocation}
        className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
      >
        Ubah
      </button>
    </div>
  )
}
