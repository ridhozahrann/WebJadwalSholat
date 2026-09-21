import { PrayerSchedule, PrayerTimes, CalculationMethod } from '@/types'

const METHOD_MAP: Record<CalculationMethod, number> = {
  'kemenag': 20,    // Kemenag RI
  'mwl': 3,         // Muslim World League
  'umm-al-qura': 4, // Umm al-Qura
}

export async function fetchPrayerSchedule(
  lat: number, lng: number, date: string, method: CalculationMethod = 'kemenag'
): Promise<PrayerSchedule> {
  const [year, month, day] = date.split('-')
  const m = METHOD_MAP[method]
  const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=${m}`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Gagal memuat jadwal sholat')

  const json = await res.json()
  const t = json.data.timings

  const times: PrayerTimes = {
    imsak: t.Imsak?.substring(0, 5) ?? '',
    fajr: t.Fajr?.substring(0, 5) ?? '',
    sunrise: t.Sunrise?.substring(0, 5) ?? '',
    dhuhr: t.Dhuhr?.substring(0, 5) ?? '',
    asr: t.Asr?.substring(0, 5) ?? '',
    maghrib: t.Maghrib?.substring(0, 5) ?? '',
    isha: t.Isha?.substring(0, 5) ?? '',
  }

  const hijri = json.data.date?.hijri
  const hijriDate = hijri ? `${hijri.day} ${hijri.month?.en ?? ''} ${hijri.year} H` : undefined

  return { date, location: '', method, times, hijriDate }
}
