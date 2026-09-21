import { PrayerWithStatus } from '@/types'
import { IconShare } from './Icons'

interface Props {
  prayers: PrayerWithStatus[]
  location: string
  date: string
  hijriDate?: string
}

export default function ShareButton({ prayers, location, date, hijriDate }: Props) {
  const generateText = () => {
    let text = `Jadwal Sholat\nLokasi: ${location}\nTanggal: ${date}`
    if (hijriDate) text += `\nHijriah: ${hijriDate}`
    text += '\n\n'
    text += prayers.map(p => `${p.label.padEnd(10)} ${p.time}`).join('\n')
    text += '\n\n— Website Jadwal Sholat & Arah Kiblat'
    return text
  }

  const handleShare = async () => {
    const text = generateText()

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Jadwal Sholat', text })
        return
      } catch {
        // User cancelled or share failed
      }
    }

    try {
      await navigator.clipboard.writeText(text)
      alert('Jadwal disalin ke clipboard!')
    } catch {
      prompt('Salin jadwal:', text)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors"
      title="Bagikan jadwal"
    >
      <IconShare size={14} />
      <span>Bagikan</span>
    </button>
  )
}
