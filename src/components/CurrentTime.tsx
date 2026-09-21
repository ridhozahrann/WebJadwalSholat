import { useState, useEffect } from 'react'
import { formatTime } from '@/utils/date'

export default function CurrentTime() {
  const [time, setTime] = useState(formatTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-center">
      <p className="text-3xl font-mono font-bold tracking-wider">{time}</p>
    </div>
  )
}
