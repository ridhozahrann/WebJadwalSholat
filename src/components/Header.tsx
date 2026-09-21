import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { IconMosqueLogo, IconHome, IconCalendar, IconCompass, IconSettings } from './Icons'

const NAV = [
  { to: '/', label: 'Beranda', icon: IconHome },
  { to: '/jadwal', label: 'Jadwal', icon: IconCalendar },
  { to: '/kiblat', label: 'Kiblat', icon: IconCompass },
  { to: '/pengaturan', label: 'Pengaturan', icon: IconSettings },
]

export default function Header() {
  return (
    <>
      {/* Mobile header */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)] md:hidden">
        <div className="px-4 h-12 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-[var(--color-primary)]">
            <IconMosqueLogo size={20} />
            <span>Jadwal Sholat</span>
          </NavLink>
          <ThemeToggle />
        </div>
      </header>

      {/* Desktop header */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)] hidden md:block">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-[var(--color-primary)]">
              <IconMosqueLogo size={24} />
              <span>Jadwal Sholat</span>
            </NavLink>
            <nav className="flex gap-1">
              {NAV.map(n => {
                const Icon = n.icon
                return (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]'
                      }`
                    }
                  >
                    <Icon size={16} />
                    <span>{n.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}
