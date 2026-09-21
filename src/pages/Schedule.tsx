import { useState, useEffect, useCallback } from 'react'
import { useSettings } from '@/hooks/useSettings'
import { fetchPrayerSchedule } from '@/services/prayerService'
import { formatDateID, formatHijri, formatDateISO, addDays } from '@/utils/date'
import { getPrayersWithStatus } from '@/utils/prayer'
import { PrayerSchedule as PS, PrayerWithStatus } from '@/types'
import PrayerScheduleComp from '@/components/PrayerSchedule'
import MosqueIllustration from '@/components/MosqueIllustration'
import WeeklySchedule from '@/components/WeeklySchedule'
import ShareButton from '@/components/ShareButton'

export default function Schedule() {
  const { settings } = useSettings()
  const [date, setDate] = useState(new Date())
  const [schedule, setSchedule] = useState<PS | null>(null)
  const [prayers, setPrayers] = useState<PrayerWithStatus[]>([])
  const [loading, setLoading] = useState(false)

  const loc = settings.location
  const isToday = formatDateISO(date) === formatDateISO(new Date())

  const load = useCallback(async () => {
    if (!loc) return
    setLoading(true)
    try {
      const s = await fetchPrayerSchedule(loc.latitude, loc.longitude, formatDateISO(date), settings.calculationMethod)
      s.hijriDate = s.hijriDate || formatHijri(date)
      setSchedule(s)
    } catch { /* handled by empty schedule */ }
    setLoading(false)
  }, [loc, date, settings.calculationMethod])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (!schedule) return
    const update = () => setPrayers(getPrayersWithStatus(schedule.times, isToday ? new Date() : new Date(0)))
    update()
    if (isToday) {
      const id = setInterval(update, 1000)
      return () => clearInterval(id)
    }
  }, [schedule, isToday])

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-4 pb-20 md:pb-4">
      <h1 className="text-lg font-bold">Jadwal Sholat</h1>

      {/* Date nav */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setDate(d => addDays(d, -1))}
          className="px-3 py-1.5 rounded-lg text-sm border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          ← Sebelumnya
        </button>
        {!isToday && (
          <button
            onClick={() => setDate(new Date())}
            className="px-3 py-1.5 rounded-lg text-sm bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            Hari Ini
          </button>
        )}
        <button
          onClick={() => setDate(d => addDays(d, 1))}
          className="px-3 py-1.5 rounded-lg text-sm border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          Berikutnya →
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium">{formatDateID(date)}</p>
        {schedule?.hijriDate && <p className="text-xs text-[var(--color-text-secondary)]">{schedule.hijriDate}</p>}
      </div>

      {!loc && (
        <div className="flex flex-col items-center py-8 space-y-4">
          <MosqueIllustration size={160} />
          <p className="text-center text-sm text-[var(--color-text-secondary)]">
            Silakan atur lokasi terlebih dahulu di halaman Beranda.
          </p>
        </div>
      )}

      {loading && <p className="text-center text-sm text-[var(--color-text-secondary)] py-4">Memuat...</p>}

      {!loading && !schedule && loc && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-center space-y-2">
          <p className="text-sm text-red-700 dark:text-red-300">Gagal memuat jadwal sholat.</p>
          <button
            onClick={load}
            className="text-xs font-medium px-4 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 hover:opacity-80 transition-opacity"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {prayers.length > 0 && (
        <>
          <div className="flex justify-end">
            <ShareButton
              prayers={prayers}
              location={loc ? `${loc.city}, ${loc.province}` : ''}
              date={formatDateID(date)}
              hijriDate={schedule?.hijriDate}
            />
          </div>
          <PrayerScheduleComp prayers={prayers} />
        </>
      )}

      {loc && (
        <WeeklySchedule lat={loc.latitude} lng={loc.longitude} method={settings.calculationMethod} />
      )}
    </div>
  )
}
