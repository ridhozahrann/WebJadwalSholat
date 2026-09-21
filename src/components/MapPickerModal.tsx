import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Location } from '@/types'
import { reverseGeocode } from '@/services/locationService'
import { IconClose } from './Icons'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (loc: Location) => void
  initialLat?: number
  initialLng?: number
}

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapPickerModal({ open, onClose, onSelect, initialLat = -6.2088, initialLng = 106.8456 }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({
    lat: initialLat,
    lng: initialLng,
  })
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState<Partial<Location> | null>(null)

  useEffect(() => {
    if (!open || !mapContainerRef.current) return

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([initialLat, initialLng], 12)
      mapRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      const marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map)
      markerRef.current = marker

      const updatePosition = async (lat: number, lng: number) => {
        setSelectedCoords({ lat, lng })
        setLoading(true)
        const geo = await reverseGeocode(lat, lng)
        setAddress(geo)
        setLoading(false)
      }

      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        marker.setLatLng([lat, lng])
        updatePosition(lat, lng)
      })

      marker.on('dragend', () => {
        const pos = marker.getLatLng()
        updatePosition(pos.lat, pos.lng)
      })

      updatePosition(initialLat, initialLng)
    } else {
      mapRef.current.invalidateSize()
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [open, initialLat, initialLng])

  if (!open) return null

  const handleConfirm = () => {
    const loc: Location = {
      city: address?.city || 'Lokasi Terpilih',
      province: address?.province || '',
      country: address?.country || 'Indonesia',
      latitude: selectedCoords.lat,
      longitude: selectedCoords.lng,
    }
    onSelect(loc)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative w-full max-w-lg h-[85vh] bg-[var(--color-surface)] rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden shadow-xl border border-[var(--color-border)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-semibold text-xs md:text-sm">Pilih Lokasi di Peta</h2>
            <p className="text-[11px] text-[var(--color-text-secondary)]">Klik atau geser pin untuk memilih lokasi</p>
          </div>
          <button onClick={onClose} className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            <IconClose size={18} />
          </button>
        </div>

        {/* Map container */}
        <div ref={mapContainerRef} className="flex-1 w-full h-full min-h-[300px]" />

        {/* Selected location info + confirm button */}
        <div className="p-4 border-t border-[var(--color-border)] space-y-3 shrink-0 bg-[var(--color-surface)]">
          <div className="text-xs">
            <span className="text-[var(--color-text-secondary)]">Lokasi terpilih: </span>
            {loading ? (
              <span className="font-medium animate-pulse">Mencari nama tempat...</span>
            ) : (
              <span className="font-semibold">
                {address?.city}{address?.province ? `, ${address.province}` : ''} ({selectedCoords.lat.toFixed(4)}, {selectedCoords.lng.toFixed(4)})
              </span>
            )}
          </div>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            Konfirmasi Lokasi Ini
          </button>
        </div>
      </div>
    </div>
  )
}
