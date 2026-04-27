export default function ElephantSilhouette({ size = 120, flip = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 160 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Caparisoned Kerala elephant silhouette"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      {/* Body */}
      <ellipse cx="88" cy="72" rx="48" ry="36" fill="#C8941A" opacity="0.85" />
      {/* Head */}
      <circle cx="48" cy="52" r="30" fill="#C8941A" opacity="0.85" />
      {/* Trunk curled */}
      <path d="M30,72 Q10,90 20,108 Q26,120 34,112 Q30,104 38,96 Q48,88 40,76" fill="none" stroke="#C8941A" strokeWidth="12" strokeLinecap="round" opacity="0.85" />
      {/* Ear */}
      <ellipse cx="28" cy="44" rx="14" ry="18" fill="#A06810" opacity="0.7" />
      {/* Eye */}
      <circle cx="38" cy="42" r="4" fill="#2a1a0a" />
      <circle cx="36.5" cy="40.5" r="1.2" fill="white" />
      {/* Tusk */}
      <path d="M28,64 Q16,70 14,82 Q14,88 22,86 Q28,82 32,72" fill="#FDF6E3" opacity="0.9" />
      {/* Legs */}
      <rect x="60" y="100" width="14" height="20" rx="5" fill="#B8851F" />
      <rect x="82" y="100" width="14" height="20" rx="5" fill="#B8851F" />
      <rect x="104" y="100" width="14" height="20" rx="5" fill="#B8851F" />
      <rect x="126" y="100" width="14" height="20" rx="5" fill="#B8851F" />
      {/* Caparison cloth */}
      <path d="M56,54 Q88,42 130,54 L136,106 Q88,100 56,106Z" fill="#8B0000" opacity="0.7" />
      {/* Gold trim on cloth */}
      <path d="M56,54 Q88,42 130,54" fill="none" stroke="#E8B84B" strokeWidth="2.5" />
      <path d="M58,106 Q88,100 136,106" fill="none" stroke="#E8B84B" strokeWidth="2" />
      {/* Head decoration */}
      <path d="M28,28 Q48,10 68,28" fill="none" stroke="#E8B84B" strokeWidth="2" />
      <circle cx="48" cy="16" r="5" fill="#E8B84B" />
      <polygon points="48,8 51,14 45,14" fill="#E8B84B" />
      {/* Tail */}
      <path d="M134,72 Q148,76 150,92 Q148,98 142,96" fill="none" stroke="#C8941A" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
