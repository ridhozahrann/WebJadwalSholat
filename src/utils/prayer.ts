import { PrayerTimes, PrayerName, PrayerWithStatus, PrayerStatus } from '@/types'

const PRAYER_LABELS: Record<PrayerName, string> = {
  imsak: 'Imsak', fajr: 'Subuh', sunrise: 'Terbit',
  dhuhr: 'Dzuhur', asr: 'Ashar', maghrib: 'Maghrib', isha: 'Isya',
}

const PRAYER_ORDER: PrayerName[] = ['imsak', 'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function getPrayersWithStatus(times: PrayerTimes, now: Date): PrayerWithStatus[] {
  const nowMin = now.getHours() * 60 + now.getMinutes()
  let nextFound = false

  return PRAYER_ORDER.map((name) => {
    const time = times[name]
    const min = timeToMinutes(time)
    let status: PrayerStatus

    if (min <= nowMin) {
      status = 'passed'
    } else if (!nextFound) {
      status = 'current'
      nextFound = true
    } else {
      status = 'upcoming'
    }
    return { name, label: PRAYER_LABELS[name], time, status }
  })
}

export function getNextPrayer(times: PrayerTimes, now: Date): { name: PrayerName; label: string; time: string } {
  const nowMin = now.getHours() * 60 + now.getMinutes()
  for (const name of PRAYER_ORDER) {
    if (timeToMinutes(times[name]) > nowMin) {
      return { name, label: PRAYER_LABELS[name], time: times[name] }
    }
  }
  // All passed today -> Next is Subuh (Besok)
  return { name: 'fajr', label: 'Subuh (Besok)', time: times.fajr }
}

export function getCountdown(targetTime: string, now: Date): { hours: number; minutes: number; seconds: number; total: number } {
  const [th, tm] = targetTime.split(':').map(Number)
  const target = new Date(now)
  target.setHours(th, tm, 0, 0)

  if (target <= now) {
    // target is tomorrow (wrap around after isha)
    target.setDate(target.getDate() + 1)
  }

  const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000))
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    total,
  }
}

export { PRAYER_LABELS, PRAYER_ORDER }
