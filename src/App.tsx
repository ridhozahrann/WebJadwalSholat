import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SettingsContext } from '@/hooks/useSettings'
import { useTheme } from '@/hooks/useTheme'
import { loadSettings, saveSettings } from '@/utils/storage'
import { Settings } from '@/types'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import PageTransition from '@/components/PageTransition'
import Home from '@/pages/Home'
import Schedule from '@/pages/Schedule'
import Qibla from '@/pages/Qibla'
import SettingsPage from '@/pages/Settings'

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  useTheme(settings.theme)

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
          <Header />
          <main>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jadwal" element={<Schedule />} />
                <Route path="/kiblat" element={<Qibla />} />
                <Route path="/pengaturan" element={<SettingsPage />} />
              </Routes>
            </PageTransition>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </SettingsContext.Provider>
  )
}
