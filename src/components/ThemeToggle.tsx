import { useSettings } from '@/hooks/useSettings'
import { Theme } from '@/types'
import { IconSun, IconMoon, IconMonitor } from './Icons'

const CYCLE: Theme[] = ['light', 'dark', 'system']

export default function ThemeToggle() {
  const { settings, updateSettings } = useSettings()
  const next = () => {
    const i = CYCLE.indexOf(settings.theme)
    updateSettings({ theme: CYCLE[(i + 1) % CYCLE.length] })
  }

  return (
    <button
      onClick={next}
      className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
      aria-label={`Tema: ${settings.theme}`}
      title={`Tema: ${settings.theme}`}
    >
      {settings.theme === 'light' && <IconSun size={18} />}
      {settings.theme === 'dark' && <IconMoon size={18} />}
      {settings.theme === 'system' && <IconMonitor size={18} />}
    </button>
  )
}
