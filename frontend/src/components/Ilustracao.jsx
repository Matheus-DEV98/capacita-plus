// Ilustração da página inicial: notebook com um gráfico subindo, capelo de formatura e certificado.
// Feita em SVG, então não depende de imagens externas e fica nítida em qualquer tamanho.
export default function Ilustracao() {
  return (
    <svg viewBox="0 0 400 300" className="ilustracao" role="img" aria-label="Notebook com gráfico de crescimento e capelo de formatura">
      <circle cx="210" cy="150" r="130" fill="var(--primaria-clara)" />
      {/* notebook */}
      <rect x="95" y="95" width="210" height="135" rx="10" fill="var(--primaria-escura)" />
      <rect x="107" y="107" width="186" height="111" rx="4" fill="#fff" />
      <path d="M75 232h250l-14 16H89z" fill="var(--primaria)" />
      {/* gráfico subindo dentro da tela */}
      <rect x="125" y="180" width="22" height="25" rx="3" fill="var(--primaria-clara)" />
      <rect x="157" y="160" width="22" height="45" rx="3" fill="var(--primaria-media)" />
      <rect x="189" y="140" width="22" height="65" rx="3" fill="var(--primaria)" />
      <rect x="221" y="120" width="22" height="85" rx="3" fill="var(--destaque)" />
      <path d="M128 172l35-20 32-18 34-18" fill="none" stroke="var(--primaria-escura)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="263" cy="128" r="12" fill="var(--destaque)" />
      <path d="M263 122v12M257 128h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {/* capelo de formatura */}
      <g transform="translate(270 40)">
        <path d="M0 22L45 4l45 18-45 18z" fill="var(--primaria-escura)" />
        <path d="M20 31v16c0 6 50 6 50 0V31l-25 10z" fill="var(--primaria)" />
        <path d="M82 25v22" stroke="var(--destaque)" strokeWidth="3" />
        <circle cx="82" cy="49" r="4" fill="var(--destaque)" />
      </g>
      {/* certificado */}
      <g transform="translate(30 60) rotate(-8)">
        <rect width="80" height="58" rx="6" fill="#fff" stroke="var(--primaria-media)" strokeWidth="2" />
        <path d="M14 18h52M14 28h40M14 38h46" stroke="var(--primaria-media)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="62" cy="46" r="8" fill="var(--destaque)" />
      </g>
    </svg>
  )
}
