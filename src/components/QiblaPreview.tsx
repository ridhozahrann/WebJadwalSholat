import { Link } from 'react-router-dom'
import { IconCompass } from './Icons'

interface Props {
  bearing: number
  direction: string
}

export default function QiblaPreview({ bearing, direction }: Props) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4 text-center bg-[var(--color-surface-alt)]">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] mb-2">
        <IconCompass size={16} className="text-[var(--color-primary)]" />
        <span>Arah Kiblat</span>
      </div>
      <p className="text-3xl font-bold text-[var(--color-primary)]">{bearing}°</p>
      <p className="text-xs text-[var(--color-text-secondary)] mt-1">{direction}</p>
      <Link
        to="/kiblat"
        className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
      >
        <IconCompass size={14} />
        <span>Buka Kompas Kiblat</span>
      </Link>
    </div>
  )
}
