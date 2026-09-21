import { useSettings } from '@/hooks/useSettings'
import { calculateQibla } from '@/utils/qibla'
import QiblaCompass from '@/components/QiblaCompass'
import MosqueIllustration from '@/components/MosqueIllustration'

export default function Qibla() {
  const { settings } = useSettings()
  const loc = settings.location
  const qibla = loc ? calculateQibla(loc.latitude, loc.longitude) : null

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-6 pb-20 md:pb-4">
      <h1 className="text-lg font-bold text-center">Arah Kiblat</h1>

      {!loc ? (
        <div className="flex flex-col items-center py-8 space-y-4">
          <MosqueIllustration size={160} />
          <p className="text-center text-sm text-[var(--color-text-secondary)]">
            Silakan atur lokasi terlebih dahulu di halaman Beranda.
          </p>
        </div>
      ) : qibla ? (
        <>
          <div className="text-center text-xs text-[var(--color-text-secondary)]">
            📍 {loc.city}{loc.province ? `, ${loc.province}` : ''}
          </div>
          <QiblaCompass bearing={qibla.bearing} />
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">{qibla.compassDirection} dari Utara</p>
          </div>
        </>
      ) : null}
    </div>
  )
}
