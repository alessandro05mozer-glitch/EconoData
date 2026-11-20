// Ícones de traço simples, desenhados à mão (sem biblioteca externa).
const PATHS: Record<string, string> = {
  home: 'M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1z',
  code: 'm8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12',
  book: 'M5 5.5A1.5 1.5 0 0 1 6.5 4H19v13H6.5A1.5 1.5 0 0 0 5 18.5zM5 18.5A1.5 1.5 0 0 0 6.5 20H19v-3',
  cards: 'M7 4h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM9 20h8a2 2 0 0 0 2-2V8',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 12a7 7 0 0 0-.1-1.2l1.8-1.4-1.8-3.1-2.1.8a7 7 0 0 0-2-1.2L14.5 4h-3.6l-.3 2.3a7 7 0 0 0-2 1.2l-2.1-.8-1.8 3.1 1.8 1.4a7 7 0 0 0 0 2.4l-1.8 1.4 1.8 3.1 2.1-.8a7 7 0 0 0 2 1.2l.3 2.3h3.6l.3-2.3a7 7 0 0 0 2-1.2l2.1.8 1.8-3.1-1.8-1.4c.1-.4.1-.8.1-1.2z',
  flame: 'M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1.5.6-2.6 1.5-3.5C10 9.5 11 8 12 3zM12 20a2.5 2.5 0 0 0 2.5-2.5c0-1.4-1.2-2-2.5-3.5-1.3 1.5-2.5 2.1-2.5 3.5A2.5 2.5 0 0 0 12 20z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z',
  play: 'M8 5.5v13l11-6.5z',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
}

export function Icon({ name, size = 20 }: { name: keyof typeof PATHS | string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name] ?? ''} />
    </svg>
  )
}
