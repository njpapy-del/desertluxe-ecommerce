/**
 * Œil de Ra — symbole égyptien rare (𓂀)
 * Hieroglyphe D004 · Unicode U+13080
 * Utilisé comme signature royale de MA LUXURY
 */
export default function EyeOfRa({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Œil de Ra — MA LUXURY"
    >
      {/* ── Paupière supérieure (forme amande) ── */}
      <path
        d="M4 16 C10 5, 38 5, 44 16 C38 27, 10 27, 4 16 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Iris ── */}
      <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="1.3" fill="none" />

      {/* ── Pupille ── */}
      <circle cx="24" cy="16" r="2.4" fill="currentColor" />

      {/* ── Ligne khôl égyptienne (coin extérieur → bas) ── */}
      <path
        d="M44 16 L49 22"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* ── Spirale royale (queue de l'œil) ── */}
      <path
        d="M49 22 Q52 26, 48 28 Q44 30, 42 27"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Larme sacrée (sous l'iris — marque de Ra) ── */}
      <path
        d="M24 22 L22 28 Q24 31, 26 28 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="none"
        strokeLinejoin="round"
      />

      {/* ── Sourcil royal (au-dessus) ── */}
      <path
        d="M8 9 Q24 4, 42 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
