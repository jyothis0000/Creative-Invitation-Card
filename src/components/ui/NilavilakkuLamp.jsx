export default function NilavilakkuLamp({ size = 80, className = '' }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s * 1.6}
      viewBox="0 0 80 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nilavilakku traditional Kerala brass lamp"
      style={{ animation: 'nilavilakku-glow 2.5s ease-in-out infinite' }}
    >
      {/* Base */}
      <ellipse cx="40" cy="120" rx="22" ry="5" fill="#A0742A" />
      <rect x="28" y="112" width="24" height="8" rx="2" fill="#B8851F" />
      {/* Stem */}
      <rect x="37" y="60" width="6" height="54" rx="3" fill="#C8941A" />
      {/* Upper bowl ring */}
      <ellipse cx="40" cy="60" rx="16" ry="5" fill="#B8851F" />
      {/* Wicks & oil */}
      <ellipse cx="40" cy="58" rx="14" ry="4" fill="#8B6010" />
      {/* Petals / decorative cups */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx={40 + 14 * Math.cos((angle * Math.PI) / 180)}
          cy={58 + 5 * Math.sin((angle * Math.PI) / 180)}
          rx="5"
          ry="3"
          fill="#C8941A"
          opacity="0.9"
        />
      ))}
      {/* Flame group */}
      <g style={{ transformOrigin: '40px 50px', animation: 'flicker 0.9s ease-in-out infinite' }}>
        {/* Outer flame */}
        <path
          d="M40,54 C36,48 34,40 37,32 C38,28 40,24 40,20 C40,24 42,28 43,32 C46,40 44,48 40,54Z"
          fill="url(#flame-grad)"
          style={{ animation: 'flameglow 1.2s ease-in-out infinite' }}
        />
        {/* Inner flame */}
        <path
          d="M40,52 C38,47 37,42 39,36 C39.5,33 40,30 40,28 C40,30 40.5,33 41,36 C43,42 42,47 40,52Z"
          fill="#fff7aa"
          opacity="0.85"
        />
      </g>
      {/* Wick dot */}
      <circle cx="40" cy="54" r="2" fill="#fff3" />
      {/* Decorative mid stem disc */}
      <ellipse cx="40" cy="90" rx="10" ry="3" fill="#B8851F" />
      <defs>
        <radialGradient id="flame-grad" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#fff59d" />
          <stop offset="40%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#e65100" stopOpacity="0.7" />
        </radialGradient>
      </defs>
    </svg>
  );
}
