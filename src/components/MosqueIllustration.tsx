interface Props {
  className?: string
  size?: number
}

export default function MosqueIllustration({ className = '', size = 200 }: Props) {
  return (
    <svg
      viewBox="0 0 200 160"
      width={size}
      height={size * 0.8}
      className={className}
      aria-hidden="true"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill="url(#skyGrad)" rx="12" />

      {/* Main dome */}
      <path
        d="M70 90 Q100 40 130 90"
        fill="var(--color-primary)"
        opacity="0.15"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />

      {/* Main building */}
      <rect x="65" y="90" width="70" height="45" fill="var(--color-primary)" opacity="0.12" stroke="var(--color-primary)" strokeWidth="1.5" rx="2" />

      {/* Door */}
      <rect x="90" y="110" width="20" height="25" fill="var(--color-primary)" opacity="0.2" rx="10 10 0 0" />

      {/* Windows */}
      <rect x="72" y="100" width="10" height="14" fill="var(--color-primary)" opacity="0.2" rx="5 5 0 0" />
      <rect x="118" y="100" width="10" height="14" fill="var(--color-primary)" opacity="0.2" rx="5 5 0 0" />

      {/* Left minaret */}
      <rect x="48" y="60" width="12" height="75" fill="var(--color-primary)" opacity="0.12" stroke="var(--color-primary)" strokeWidth="1.5" rx="2" />
      <path d="M48 60 Q54 45 60 60" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" strokeWidth="1.5" />
      {/* Crescent */}
      <circle cx="54" cy="42" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />

      {/* Right minaret */}
      <rect x="140" y="60" width="12" height="75" fill="var(--color-primary)" opacity="0.12" stroke="var(--color-primary)" strokeWidth="1.5" rx="2" />
      <path d="M140 60 Q146 45 152 60" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" strokeWidth="1.5" />
      {/* Crescent */}
      <circle cx="146" cy="42" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />

      {/* Crescent on main dome */}
      <circle cx="100" cy="38" r="5" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.5" />

      {/* Ground line */}
      <line x1="30" y1="135" x2="170" y2="135" stroke="var(--color-primary)" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}
