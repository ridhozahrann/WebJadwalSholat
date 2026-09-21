import { useState, useEffect } from 'react'
import { fetchPrayerSchedule } from '@/services/prayerService'
import { formatDateISO, addDays } from '@/utils/date'
import { PrayerTimes, CalculationMethod } from '@/types'

const DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const PRAYER_LABELS = ['Subuh', 'Terbit', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya']
const PRAYER_KEYS: (keyof PrayerTimes)[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

interface Props {
  lat: number
  lng: number
  method: CalculationMethod
}

interface DaySchedule {
  date: Date
  dateStr: string
  times: PrayerTimes | null
}

export default function WeeklySchedule({ lat, lng, method }: Props) {
  const [days, setDays] = useState<DaySchedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const today = new Date()

      const promises = Array.from({ length: 7 }).map((_, i) => {
        const d = addDays(today, i)
        const iso = formatDateISO(d)
        return fetchPrayerSchedule(lat, lng, iso, method)
          .then(s => ({ date: d, dateStr: iso, times: s.times }))
          .catch(() => ({ date: d, dateStr: iso, times: null as PrayerTimes | null }))
      })

      const res = await Promise.all(promises)
      if (!cancelled) {
        setDays(res)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [lat, lng, method])

  if (loading) {
    return (
      <div className="text-center py-6 text-sm text-[var(--color-text-secondary)]">
        Memuat jadwal mingguan...
      </div>
    )
  }

  const todayISO = formatDateISO(new Date())

  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      <div className="px-4 py-2.5 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold">Jadwal 7 Hari</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[500px]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="px-3 py-2 text-left font-semibold text-[var(--color-text-secondary)] sticky left-0 bg-[var(--color-surface)]">Hari</th>
              {PRAYER_LABELS.map(l => (
                <th key={l} className="px-2 py-2 text-center font-semibold text-[var(--color-text-secondary)]">{l}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {days.map(d => {
              const isToday = d.dateStr === todayISO
              return (
                <tr key={d.dateStr} className={isToday ? 'bg-[var(--color-primary)]/5' : ''}>
                  <td className={`px-3 py-2.5 sticky left-0 ${isToday ? 'bg-[var(--color-primary)]/5 font-bold text-[var(--color-primary)]' : 'bg-[var(--color-surface)]'}`}>
                    <div>{DAYS_SHORT[d.date.getDay()]}</div>
                    <div className="text-[10px] text-[var(--color-text-secondary)]">{d.date.getDate()}/{d.date.getMonth() + 1}</div>
                  </td>
                  {PRAYER_KEYS.map(k => (
                    <td key={k} className="px-2 py-2.5 text-center font-mono">
                      {d.times ? d.times[k] : '-'}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
