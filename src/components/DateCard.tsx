import { useState } from 'react'
import HijriCalendarModal from './HijriCalendarModal'
import { IconCalendar } from './Icons'

interface Props {
  masehiDate: string
  hijriDate: string
}

export default function DateCard({ masehiDate, hijriDate }: Props) {
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className="text-center py-1">
        <p className="text-sm font-medium">{masehiDate}</p>
        {hijriDate && (
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline transition-all mt-0.5"
            title="Lihat kalender Hijriah"
          >
            <IconCalendar size={12} />
            <span>{hijriDate}</span>
          </button>
        )}
      </div>

      <HijriCalendarModal open={modal} onClose={() => setModal(false)} />
    </>
  )
}
