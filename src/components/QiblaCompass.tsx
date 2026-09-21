import { useState, useEffect, useCallback } from 'react'
import { IconKaaba } from './Icons'

interface Props {
  bearing: number
}

type SensorStatus = 'pending' | 'active' | 'unavailable' | 'denied'

export default function QiblaCompass({ bearing }: Props) {
  const [heading, setHeading] = useState<number | null>(null)
  const [status, setStatus] = useState<SensorStatus>('pending')
  const [accuracy, setAccuracy] = useState<'high' | 'low' | 'unknown'>('unknown')

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    const h = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null)
    if (h != null) {
      setHeading(h)
      setStatus('active')
      const acc = (e as any).webkitCompassAccuracy ?? null
      if (acc != null) {
        setAccuracy(acc < 15 ? 'high' : 'low')
      } else {
        setAccuracy('high')
      }
    }
  }, [])

  const requestPermission = useCallback(async () => {
    try {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const perm = await (DeviceOrientationEvent as any).requestPermission()
        if (perm !== 'granted') { setStatus('denied'); return }
      }
      window.addEventListener('deviceorientation', handleOrientation, true)
      setTimeout(() => {
        setStatus(prev => prev === 'pending' ? 'unavailable' : prev)
      }, 2000)
    } catch {
      setStatus('unavailable')
    }
  }, [handleOrientation])

  useEffect(() => {
    requestPermission()
    return () => window.removeEventListener('deviceorientation', handleOrientation, true)
  }, [requestPermission, handleOrientation])

  const rotation = heading != null ? bearing - heading : 0
  const isLive = status === 'active' && heading != null
  const compassSize = 280
  const center = compassSize / 2
  const radius = center - 20

  // Accuracy cone: ±10 degrees
  const coneAngle = 10
  const qiblaRotation = isLive ? rotation : bearing

  const coneStart = qiblaRotation - coneAngle
  const coneEnd = qiblaRotation + coneAngle
  const toRad = (d: number) => (d - 90) * Math.PI / 180
  const coneR = radius - 5

  const x1 = center + coneR * Math.cos(toRad(coneStart))
  const y1 = center + coneR * Math.sin(toRad(coneStart))
  const x2 = center + coneR * Math.cos(toRad(coneEnd))
  const y2 = center + coneR * Math.sin(toRad(coneEnd))

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Compass SVG */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <svg viewBox={`0 0 ${compassSize} ${compassSize}`} className="w-full h-full">
          {/* Compass ring */}
          <g style={{ transform: isLive ? `rotate(${-heading!}deg)` : 'rotate(0deg)', transformOrigin: 'center', transition: 'transform 0.3s ease-out' }}>
            <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--color-border)" strokeWidth="3" />

            {/* Degree marks */}
            {Array.from({ length: 72 }).map((_, i) => {
              const deg = i * 5
              const isMajor = deg % 90 === 0
              const isMinor = deg % 45 === 0
              const r1 = radius - (isMajor ? 12 : isMinor ? 8 : 4)
              const r2 = radius
              const rad = (deg - 90) * Math.PI / 180
              return (
                <line
                  key={i}
                  x1={center + r1 * Math.cos(rad)}
                  y1={center + r1 * Math.sin(rad)}
                  x2={center + r2 * Math.cos(rad)}
                  y2={center + r2 * Math.sin(rad)}
                  stroke="var(--color-text-secondary)"
                  strokeWidth={isMajor ? 2 : 1}
                  opacity={isMajor ? 0.8 : isMinor ? 0.5 : 0.2}
                />
              )
            })}

            {/* Cardinal labels */}
            {[
              { label: 'N', deg: 0, color: 'var(--color-primary)' },
              { label: 'E', deg: 90, color: 'var(--color-text-secondary)' },
              { label: 'S', deg: 180, color: 'var(--color-text-secondary)' },
              { label: 'W', deg: 270, color: 'var(--color-text-secondary)' },
            ].map(c => {
              const rad = (c.deg - 90) * Math.PI / 180
              const r = radius - 22
              return (
                <text
                  key={c.label}
                  x={center + r * Math.cos(rad)}
                  y={center + r * Math.sin(rad)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={c.color}
                  fontSize="14"
                  fontWeight="bold"
                >
                  {c.label}
                </text>
              )
            })}
          </g>

          {/* Accuracy cone */}
          <path
            d={`M ${center} ${center} L ${x1} ${y1} A ${coneR} ${coneR} 0 0 1 ${x2} ${y2} Z`}
            fill="var(--color-primary)"
            opacity="0.1"
            style={{ transition: 'all 0.3s ease-out' }}
          />

          {/* Qibla pointer line */}
          <line
            x1={center}
            y1={center}
            x2={center + (coneR + 5) * Math.cos(toRad(qiblaRotation))}
            y2={center + (coneR + 5) * Math.sin(toRad(qiblaRotation))}
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transition: 'all 0.3s ease-out' }}
          />

          {/* Kaaba SVG Icon position */}
          <g style={{ transition: 'all 0.3s ease-out' }}>
            <foreignObject
              x={center + (coneR - 15) * Math.cos(toRad(qiblaRotation)) - 12}
              y={center + (coneR - 15) * Math.sin(toRad(qiblaRotation)) - 12}
              width="24"
              height="24"
            >
              <div className="w-full h-full flex items-center justify-center text-[var(--color-primary)]">
                <IconKaaba size={22} />
              </div>
            </foreignObject>
          </g>

          {/* Center dot */}
          <circle cx={center} cy={center} r="5" fill="var(--color-primary)" />
          <circle cx={center} cy={center} r="2" fill="var(--color-surface)" />
        </svg>
      </div>

      {/* Bearing text */}
      <p className="text-2xl font-bold text-[var(--color-primary)]">{bearing}°</p>

      {/* Status */}
      <div className="text-center text-xs space-y-1">
        {status === 'active' && (
          <>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium">● Sensor aktif</p>
            <p className="text-[var(--color-text-secondary)]">
              {accuracy === 'high' ? 'Akurasi baik' : 'Kalibrasi diperlukan — Gerakkan HP membentuk angka 8'}
            </p>
          </>
        )}
        {status === 'pending' && <p className="text-[var(--color-text-secondary)]">Mendeteksi sensor...</p>}
        {status === 'unavailable' && <p className="text-amber-600 dark:text-amber-400">Sensor tidak tersedia — Menggunakan arah kiblat derajat</p>}
        {status === 'denied' && <p className="text-amber-600 dark:text-amber-400">Izin sensor ditolak — Menggunakan arah kiblat derajat</p>}
      </div>

      {/* Calibration / Retry */}
      {(status === 'unavailable' || status === 'denied') && (
        <button
          onClick={requestPermission}
          className="text-xs px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors font-medium"
        >
          Coba Aktifkan Kompas
        </button>
      )}
      {status === 'active' && accuracy === 'low' && (
        <button
          onClick={() => setAccuracy('unknown')}
          className="text-xs px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors font-medium"
        >
          Kalibrasi Ulang
        </button>
      )}
    </div>
  )
}
