import { useState, useEffect } from 'react'
import { getCountdown } from '@/utils/prayer'

interface Props {
  name: string
  time: string
}

export default function NextPrayer({ name, time }: Props) {
  const [cd, setCd] = useState(getCountdown(time, new Date()))

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown(time, new Date())), 1000)
    return () => clearInterval(id)
  }, [time])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="text-center py-6 px-4 rounded-2xl bg-[var(--color-primary)] text-white">
      <p className="text-xs font-medium uppercase tracking-widest opacity-80">Sholat Berikutnya</p>
      <p className="text-2xl font-bold mt-2">{name}</p>
      <p className="text-lg mt-1 opacity-90">{time}</p>
      <p className="text-4xl font-mono font-bold mt-3 tracking-wider">
        {pad(cd.hours)} : {pad(cd.minutes)} : {pad(cd.seconds)}
      </p>
    </div>
  )
}
