import { useState } from 'react'
import { Location } from '@/types'
import { INDONESIAN_CITIES } from '@/services/locationService'
import MapPickerModal from './MapPickerModal'
import { IconMapPin, IconMap, IconClose } from './Icons'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (loc: Location) => void
  onDetect: () => void
  detecting?: boolean
}

export default function LocationModal({ open, onClose, onSelect, onDetect, detecting }: Props) {
  const [query, setQuery] = useState('')
  const [mapOpen, setMapOpen] = useState(false)

  if (!open) return null

  const filtered = query
    ? INDONESIAN_CITIES.filter(c =>
        c.city.toLowerCase().includes(query.toLowerCase()) ||
        c.province.toLowerCase().includes(query.toLowerCase())
      )
    : INDONESIAN_CITIES

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={onClose}>
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="relative w-full max-w-md max-h-[80vh] bg-[var(--color-surface)] rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden shadow-xl border border-[var(--color-border)]"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <h2 className="font-semibold text-sm">Pilih Lokasi</h2>
            <button onClick={onClose} className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              <IconClose size={18} />
            </button>
          </div>

          <div className="p-4 space-y-2">
            <button
              onClick={onDetect}
              disabled={detecting}
              className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              <IconMapPin size={16} />
              <span>{detecting ? 'Mendeteksi...' : 'Gunakan Lokasi Saya'}</span>
            </button>

            <button
              onClick={() => setMapOpen(true)}
              className="w-full py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-surface-alt)] transition-colors flex items-center justify-center gap-2"
            >
              <IconMap size={16} />
              <span>Pilih di Peta Interaktif</span>
            </button>

            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari kota..."
              className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
            {filtered.map(c => (
              <button
                key={`${c.city}-${c.province}`}
                onClick={() => { onSelect(c); onClose() }}
                className="w-full text-left px-4 py-3 hover:bg-[var(--color-surface-alt)] transition-colors"
              >
                <p className="text-xs font-semibold">{c.city}</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">{c.province}, {c.country}</p>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="p-4 text-xs text-center text-[var(--color-text-secondary)]">Kota tidak ditemukan</p>
            )}
          </div>
        </div>
      </div>

      <MapPickerModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onSelect={(loc) => {
          onSelect(loc)
          setMapOpen(false)
          onClose()
        }}
      />
    </>
  )
}
