import { useEffect, useState } from 'react'
import { useStore } from './store'

function systemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** Tema efetivo ('light' ou 'dark'), aplicado ao <html data-theme>. */
export function useTheme(): { effective: 'light' | 'dark' } {
  const theme = useStore((s) => s.p.settings.theme)
  const [sys, setSys] = useState(systemDark)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const on = () => setSys(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const scale = useStore((s) => s.p.settings.fontScale ?? 100)
  useEffect(() => {
    document.documentElement.style.fontSize = `${scale}%`
  }, [scale])
  const effective = theme === 'system' ? (sys ? 'dark' : 'light') : theme
  useEffect(() => {
    document.documentElement.dataset.theme = effective
  }, [effective])
  return { effective }
}
