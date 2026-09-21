import { useEffect } from 'react'
import { Theme } from '@/types'

export function useTheme(theme: Theme) {
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      // system
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const apply = () => {
        if (mq.matches) root.classList.add('dark')
        else root.classList.remove('dark')
      }
      apply()
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])
}
