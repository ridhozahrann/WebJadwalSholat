import { useState } from 'react'
import { IconClose } from './Icons'

interface IslamicDate {
  hijriDay: number
  hijriMonth: string
  event: string
}

const IMPORTANT_EVENTS: IslamicDate[] = [
  { hijriDay: 1, hijriMonth: 'Muharram', event: 'Tahun Baru Islam 1448 H' },
  { hijriDay: 10, hijriMonth: 'Muharram', event: 'Hari Asyura' },
  { hijriDay: 12, hijriMonth: 'Rabiul Awal', event: 'Maulid Nabi Muhammad SAW' },
  { hijriDay: 27, hijriMonth: 'Rajab', event: 'Isra Miraj' },
  { hijriDay: 15, hijriMonth: 'Sya\'ban', event: 'Nisfu Sya\'ban' },
  { hijriDay: 1, hijriMonth: 'Ramadhan', event: 'Awal Puasa Ramadhan' },
  { hijriDay: 17, hijriMonth: 'Ramadhan', event: 'Nuzulul Quran' },
  { hijriDay: 1, hijriMonth: 'Syawal', event: 'Hari Raya Idul Fitri' },
  { hijriDay: 9, hijriMonth: 'Dzulhijjah', event: 'Hari Arafah' },
  { hijriDay: 10, hijriMonth: 'Dzulhijjah', event: 'Hari Raya Idul Adha' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function HijriCalendarModal({ open, onClose }: Props) {
  const [selectedMonth, setSelectedMonth] = useState('All')

  if (!open) return null

  const HIJRI_MONTHS = [
    'All', 'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
    'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah',
  ]

  const filtered = selectedMonth === 'All'
    ? IMPORTANT_EVENTS
    : IMPORTANT_EVENTS.filter(e => e.hijriMonth === selectedMonth)

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative w-full max-w-md max-h-[80vh] bg-[var(--color-surface)] rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden shadow-xl border border-[var(--color-border)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <h2 className="font-semibold text-sm">Kalender & Hari Penting Islam</h2>
          <button onClick={onClose} className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            <IconClose size={18} />
          </button>
        </div>

        {/* Filter month */}
        <div className="p-3 border-b border-[var(--color-border)] flex gap-2 overflow-x-auto text-xs">
          {HIJRI_MONTHS.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`shrink-0 px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                selectedMonth === m
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((ev, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] flex items-center gap-3"
            >
              <div className="text-center px-2.5 py-1.5 bg-[var(--color-primary)]/10 rounded-lg shrink-0 min-w-[54px]">
                <p className="text-base font-bold text-[var(--color-primary)]">{ev.hijriDay}</p>
                <p className="text-[10px] text-[var(--color-text-secondary)] truncate">{ev.hijriMonth}</p>
              </div>
              <div>
                <p className="text-xs font-semibold">{ev.event}</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">Hari Penting Islam</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
