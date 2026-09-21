import { useState } from 'react'
import { PrayerWithStatus, PrayerName } from '@/types'
import { getCountdown } from '@/utils/prayer'
import { IconCheck, IconChevronDown, IconClock } from './Icons'

interface Props {
  prayers: PrayerWithStatus[]
}

const PRAYER_INFO: Partial<Record<PrayerName, { rakaat: string; sunnah?: string }>> = {
  fajr: { rakaat: '2 rakaat', sunnah: '2 rakaat sebelum' },
  dhuhr: { rakaat: '4 rakaat', sunnah: '4 sebelum, 2 sesudah' },
  asr: { rakaat: '4 rakaat' },
  maghrib: { rakaat: '3 rakaat', sunnah: '2 rakaat sesudah' },
  isha: { rakaat: '4 rakaat', sunnah: '2 rakaat sesudah' },
}

const DOA_ADZAN = 'Allāhumma Rabba hādzihid-da\'watit-tāmmah, wash-sholātil-qō\'imah, āti Muhammadanil-wasīlata wal-fadhīlah, wab\'ats-hu maqōman mahmūdanil-ladzī wa\'adtah.'

export default function PrayerSchedule({ prayers }: Props) {
  const [expanded, setExpanded] = useState<PrayerName | null>(null)

  const toggle = (name: PrayerName) => {
    setExpanded(prev => prev === name ? null : name)
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      <div className="px-4 py-2.5 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
        <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Jadwal Sholat Hari Ini</h3>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {prayers.map(p => {
          const isExpanded = expanded === p.name
          const info = PRAYER_INFO[p.name]
          const cd = p.status === 'current' ? getCountdown(p.time, new Date()) : null

          return (
            <div key={p.name}>
              <button
                onClick={() => toggle(p.name)}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                  p.status === 'current'
                    ? 'bg-[var(--color-primary)]/10 font-semibold text-[var(--color-primary)]'
                    : p.status === 'passed'
                    ? 'text-[var(--color-passed)] hover:bg-[var(--color-surface-alt)]'
                    : 'hover:bg-[var(--color-surface-alt)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-4 flex items-center justify-center">
                    {p.status === 'passed' && <IconCheck size={14} className="text-[var(--color-passed)]" />}
                    {p.status === 'current' && <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />}
                  </span>
                  <span className="text-xs md:text-sm">{p.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm font-mono">{p.time}</span>
                  <IconChevronDown size={14} className={`transition-transform duration-200 opacity-60 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 py-3 bg-[var(--color-surface-alt)] text-xs space-y-2 border-t border-[var(--color-border)]/50">
                  {cd && cd.total > 0 && (
                    <div className="flex items-center gap-2">
                      <IconClock size={14} className="text-[var(--color-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">Waktu tersisa:</span>
                      <span className="font-mono font-medium text-[var(--color-primary)]">
                        {String(cd.hours).padStart(2, '0')}:{String(cd.minutes).padStart(2, '0')}:{String(cd.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {p.status === 'passed' && (
                    <p className="text-[var(--color-text-secondary)]">Waktu telah berlalu</p>
                  )}
                  {info && (
                    <>
                      <p><span className="text-[var(--color-text-secondary)]">Sholat:</span> {info.rakaat}</p>
                      {info.sunnah && <p><span className="text-[var(--color-text-secondary)]">Sunnah:</span> {info.sunnah}</p>}
                    </>
                  )}
                  {(p.name !== 'imsak' && p.name !== 'sunrise') && (
                    <details className="mt-1">
                      <summary className="text-[var(--color-primary)] cursor-pointer font-medium">Doa Setelah Adzan</summary>
                      <p className="mt-1 text-[var(--color-text-secondary)] italic leading-relaxed">{DOA_ADZAN}</p>
                    </details>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
