export default function KasavuBorder({ flip = false, className = '' }) {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      aria-label="Kerala kasavu decorative border with lotus pattern"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <svg
        viewBox="0 0 800 32"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Top gold line */}
        <line x1="0" y1="4" x2="800" y2="4" stroke="#C8941A" strokeWidth="1.5" />
        {/* Bottom gold line */}
        <line x1="0" y1="28" x2="800" y2="28" strokeWidth="1.5" stroke="#C8941A" />
        {/* Repeating motifs */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <g key={i} transform={`translate(${i * 64 - 16}, 0)`}>
            <ellipse cx="32" cy="10" rx="6" ry="3" fill="none" stroke="#C8941A55" strokeWidth="0.8" />
            <ellipse cx="32" cy="22" rx="6" ry="3" fill="none" stroke="#C8941A55" strokeWidth="0.8" />
          </g>
        ))}
        {/* Center lotus */}
        <g transform="translate(400, 16)">
          <ellipse cx="0" cy="-4" rx="8" ry="4" fill="#C8941A" opacity="0.9" />
          <ellipse cx="-8" cy="2" rx="5" ry="3" fill="#C8941A" opacity="0.7" transform="rotate(-30)" />
          <ellipse cx="8" cy="2" rx="5" ry="3" fill="#C8941A" opacity="0.7" transform="rotate(30)" />
          <ellipse cx="0" cy="5" rx="5" ry="3" fill="#C8941A" opacity="0.6" />
          <circle cx="0" cy="-2" r="3" fill="#E8B84B" />
          {/* Flanking lines */}
          <line x1="-40" y1="0" x2="-18" y2="0" stroke="#C8941A" strokeWidth="1" />
          <line x1="18" y1="0" x2="40" y2="0" stroke="#C8941A" strokeWidth="1" />
          {/* Diamond ornaments */}
          <polygon points="-45,0 -42,-3 -39,0 -42,3" fill="#C8941A" opacity="0.8" />
          <polygon points="39,0 42,-3 45,0 42,3" fill="#C8941A" opacity="0.8" />
        </g>
        {/* Elephant silhouettes at edges */}
        <g transform="translate(60, 8)" opacity="0.5">
          <path d="M0,14 Q4,6 10,8 Q14,2 18,6 L20,6 Q22,4 24,8 L24,14 Q20,18 10,18 Q4,18 0,14Z" fill="#C8941A" />
          <circle cx="10" cy="7" r="2" fill="#C8941A" />
        </g>
        <g transform="translate(740, 8)" opacity="0.5" style={{ transform: 'translate(740px,8px) scaleX(-1)' }}>
          <path d="M0,14 Q4,6 10,8 Q14,2 18,6 L20,6 Q22,4 24,8 L24,14 Q20,18 10,18 Q4,18 0,14Z" fill="#C8941A" />
          <circle cx="10" cy="7" r="2" fill="#C8941A" />
        </g>
      </svg>
    </div>
  );
}
