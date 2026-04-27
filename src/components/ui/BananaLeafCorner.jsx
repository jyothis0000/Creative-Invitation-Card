export default function BananaLeafCorner({ position = 'tl', size = 80, className = '' }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  const rot = rotations[position] ?? 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Banana leaf corner decoration"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {/* Main leaf */}
      <path d="M4,4 Q4,60 60,76 Q20,60 4,4Z" fill="#2D5016" opacity="0.6" />
      <path d="M4,4 Q40,4 76,60 Q60,20 4,4Z" fill="#2D5016" opacity="0.5" />
      {/* Midrib */}
      <path d="M4,4 Q38,38 72,72" fill="none" stroke="#4a7a22" strokeWidth="1.5" opacity="0.7" />
      {/* Veins */}
      {[0.25, 0.45, 0.65].map((t, i) => {
        const x = 4 + t * 68;
        const y = 4 + t * 68;
        return (
          <line key={i} x1={x} y1={y} x2={x - 12 + i * 4} y2={y - 12} stroke="#4a7a22" strokeWidth="0.8" opacity="0.5" />
        );
      })}
      {/* Gold tip ornament */}
      <polygon points="4,4 10,4 4,10" fill="#C8941A" opacity="0.8" />
      <circle cx="4" cy="4" r="3" fill="#C8941A" />
    </svg>
  );
}
