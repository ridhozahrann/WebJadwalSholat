import { NavLink } from 'react-router-dom'
import { IconHome, IconCalendar, IconCompass, IconSettings } from './Icons'

const TABS = [
  { to: '/', icon: IconHome, label: 'Beranda' },
  { to: '/jadwal', icon: IconCalendar, label: 'Jadwal' },
  { to: '/kiblat', icon: IconCompass, label: 'Kiblat' },
  { to: '/pengaturan', icon: IconSettings, label: 'Pengaturan' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] md:hidden">
      <div className="flex justify-around items-center h-16">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors ${
                  isActive ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-secondary)]'
                }`
              }
            >
              <Icon size={20} />
              <span>{t.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
