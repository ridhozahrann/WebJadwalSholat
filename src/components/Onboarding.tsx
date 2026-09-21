import { useState } from 'react'
import { Location } from '@/types'
import { INDONESIAN_CITIES } from '@/services/locationService'
import MosqueIllustration from './MosqueIllustration'
import { IconMapPin, IconMap } from './Icons'

interface Props {
  onDetect: () => void
  onSelect: (loc: Location) => void
  detecting: boolean
}

export default function Onboarding({ onDetect, onSelect, detecting }: Props) {
  const [showCities, setShowCities] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = query
    ? INDONESIAN_CITIES.filter(c =>
        c.city.toLowerCase().includes(query.toLowerCase()) ||
        c.province.toLowerCase().includes(query.toLowerCase())
      )
    : INDONESIAN_CITIES

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-8">
      <MosqueIllustration size={160} className="mb-6" />

      <h1 className="text-xl font-bold text-center mb-2">
        Jadwal Sholat & Arah Kiblat
      </h1>
      <p className="text-xs text-[var(--color-text-secondary)] text-center max-w-xs mb-8 leading-relaxed">
        Informasi waktu sholat dan arah kiblat tepat berdasarkan lokasi Anda. Cepat, akurat, dan ringan.
      </p>

      {!showCities ? (
        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={onDetect}
            disabled={detecting}
            className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 text-xs"
          >
            {detecting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Mendeteksi Lokasi...
              </>
            ) : (
              <>
                <IconMapPin size={16} />
                <span>Gunakan Lokasi Saya</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowCities(true)}
            className="w-full py-3 rounded-xl border border-[var(--color-border)] font-medium hover:bg-[var(--color-surface-alt)] transition-colors text-xs flex items-center justify-center gap-2"
          >
            <IconMap size={16} />
            <span>Pilih Lokasi Manual</span>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={() => setShowCities(false)}
            className="text-xs text-[var(--color-primary)] font-medium"
          >
            ← Kembali
          </button>

          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari kota..."
            autoFocus
            className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />

          <div className="max-h-64 overflow-y-auto rounded-xl border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
            {filtered.map(c => (
              <button
                key={`${c.city}-${c.province}`}
                onClick={() => onSelect(c)}
                className="w-full text-left px-4 py-3 hover:bg-[var(--color-surface-alt)] transition-colors"
              >
                <p className="text-xs font-semibold">{c.city}</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">{c.province}</p>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="p-4 text-xs text-center text-[var(--color-text-secondary)]">Kota tidak ditemukan</p>
            )}
          </div>
        </div>
      )}

      <p className="text-[11px] text-[var(--color-text-secondary)] mt-8 text-center max-w-xs">
        Data lokasi hanya disimpan di browser Anda untuk menghitung jadwal sholat dan arah kiblat.
      </p>
    </div>
  )
}
