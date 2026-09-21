import { useState, useEffect, useCallback } from 'react'
import { useSettings } from '@/hooks/useSettings'
import { fetchPrayerSchedule } from '@/services/prayerService'
import { getCurrentPosition, reverseGeocode } from '@/services/locationService'
import { formatDateID, formatHijri, formatDateISO } from '@/utils/date'
import { getPrayersWithStatus, getNextPrayer } from '@/utils/prayer'
import { calculateQibla } from '@/utils/qibla'
import { Location, PrayerSchedule as PS, PrayerWithStatus } from '@/types'
import LocationCard from '@/components/LocationCard'
import LocationModal from '@/components/LocationModal'
import DateCard from '@/components/DateCard'
import CurrentTime from '@/components/CurrentTime'
import NextPrayer from '@/components/NextPrayer'
import PrayerScheduleComp from '@/components/PrayerSchedule'
import QiblaPreview from '@/components/QiblaPreview'
import Onboarding from '@/components/Onboarding'
import { NextPrayerSkeleton, PrayerScheduleSkeleton, QiblaPreviewSkeleton } from '@/components/Skeleton'

export default function Home() {
  const { settings, updateSettings } = useSettings()
  const [schedule, setSchedule] = useState<PS | null>(null)
  const [prayers, setPrayers] = useState<PrayerWithStatus[]>([])
  const [nextP, setNextP] = useState<{ name: string; label: string; time: string } | null>(null)
  const [locationModal, setLocationModal] = useState(false)
  const [detecting, setDetecting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loc = settings.location
  const [showOnboarding, setShowOnboarding] = useState(!loc)

  const loadSchedule = useCallback(async (l: Location) => {
    try {
      setLoading(true)
      setError('')
      const date = formatDateISO(new Date())
      const s = await fetchPrayerSchedule(l.latitude, l.longitude, date, settings.calculationMethod)
      s.location = `${l.city}, ${l.province}`
      s.hijriDate = s.hijriDate || formatHijri(new Date())
      setSchedule(s)
    } catch {
      setError('Gagal memuat jadwal sholat. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }, [settings.calculationMethod])

  // Update prayer status every second
  useEffect(() => {
    if (!schedule) return
    const update = () => {
      const now = new Date()
      setPrayers(getPrayersWithStatus(schedule.times, now))
      setNextP(getNextPrayer(schedule.times, now))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [schedule])

  // Auto-detect location on first load
  useEffect(() => {
    if (loc) {
      setShowOnboarding(false)
      loadSchedule(loc)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Reload when method changes
  useEffect(() => {
    if (loc) loadSchedule(loc)
  }, [settings.calculationMethod]) // eslint-disable-line react-hooks/exhaustive-deps

  const detectLocation = async () => {
    setDetecting(true)
    try {
      const pos = await getCurrentPosition()
      const geo = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      const newLoc: Location = {
        city: geo.city || 'Tidak diketahui',
        province: geo.province || '',
        country: geo.country || 'Indonesia',
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      updateSettings({ location: newLoc })
      await loadSchedule(newLoc)
      setShowOnboarding(false)
      setLocationModal(false)
    } catch {
      setError('Lokasi tidak dapat diakses. Pilih lokasi secara manual.')
      setLoading(false)
    } finally {
      setDetecting(false)
    }
  }

  const selectLocation = async (l: Location) => {
    updateSettings({ location: l })
    setShowOnboarding(false)
    await loadSchedule(l)
  }

  const qibla = loc ? calculateQibla(loc.latitude, loc.longitude) : null

  if (showOnboarding) {
    return (
      <div className="max-w-lg mx-auto px-4 pb-20 md:pb-4">
        <Onboarding
          onDetect={detectLocation}
          onSelect={selectLocation}
          detecting={detecting}
        />
        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs text-center -mt-4 mb-4 mx-4">
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-4 pb-20 md:pb-4">
      <LocationCard location={loc} onChangeLocation={() => setLocationModal(true)} loading={detecting} />
      <DateCard masehiDate={formatDateID(new Date())} hijriDate={schedule?.hijriDate || formatHijri(new Date())} />
      <CurrentTime />

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-center space-y-2">
          <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => loc ? loadSchedule(loc) : detectLocation()}
            className="text-xs font-medium px-4 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 hover:opacity-80 transition-opacity"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {loading && !schedule && (
        <>
          <NextPrayerSkeleton />
          <PrayerScheduleSkeleton />
          <QiblaPreviewSkeleton />
        </>
      )}

      {nextP && <NextPrayer name={nextP.label} time={nextP.time} />}

      {prayers.length > 0 && <PrayerScheduleComp prayers={prayers} />}
      {qibla && <QiblaPreview bearing={qibla.bearing} direction={qibla.compassDirection} />}

      <LocationModal
        open={locationModal}
        onClose={() => setLocationModal(false)}
        onSelect={selectLocation}
        onDetect={detectLocation}
        detecting={detecting}
      />
    </div>
  )
}
