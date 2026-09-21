import { createContext, useContext } from 'react'
import { Settings } from '@/types'

interface SettingsContextType {
  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void
}

export const SettingsContext = createContext<SettingsContextType>(null!)

export function useSettings() {
  return useContext(SettingsContext)
}
