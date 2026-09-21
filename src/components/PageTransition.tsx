import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [show, setShow] = useState(true)
  const [displayLocation, setDisplayLocation] = useState(location)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setShow(false)
      const t = setTimeout(() => {
        setDisplayLocation(location)
        setShow(true)
      }, 150)
      return () => clearTimeout(t)
    }
  }, [location, displayLocation])

  return (
    <div
      className={`transition-opacity duration-150 ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}
