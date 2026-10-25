// Logo do Capacita+: um "C" com um "+" (crescimento), feito em SVG (desenho em código)
export default function Logo({ tamanho = 36 }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="var(--primaria)" />
      <path d="M31 15a12 12 0 1 0 0 18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M36 20v8M32 24h8" stroke="var(--destaque)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
