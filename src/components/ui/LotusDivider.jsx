export default function LotusDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-label="Lotus flower divider">
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C8941A)' }} />
      <svg width="48" height="32" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
        {/* Center petal */}
        <ellipse cx="24" cy="14" rx="7" ry="10" fill="none" stroke="#C8941A" strokeWidth="1.2" />
        {/* Left petals */}
        <ellipse cx="14" cy="18" rx="6" ry="8" fill="none" stroke="#C8941A" strokeWidth="1" opacity="0.8" transform="rotate(-25, 14, 18)" />
        <ellipse cx="7" cy="22" rx="5" ry="6" fill="none" stroke="#C8941A" strokeWidth="0.8" opacity="0.5" transform="rotate(-45, 7, 22)" />
        {/* Right petals */}
        <ellipse cx="34" cy="18" rx="6" ry="8" fill="none" stroke="#C8941A" strokeWidth="1" opacity="0.8" transform="rotate(25, 34, 18)" />
        <ellipse cx="41" cy="22" rx="5" ry="6" fill="none" stroke="#C8941A" strokeWidth="0.8" opacity="0.5" transform="rotate(45, 41, 22)" />
        {/* Center dot */}
        <circle cx="24" cy="14" r="3" fill="#C8941A" />
        {/* Stem */}
        <line x1="24" y1="24" x2="24" y2="30" stroke="#C8941A" strokeWidth="1.2" />
        <line x1="18" y1="30" x2="30" y2="30" stroke="#C8941A" strokeWidth="1" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C8941A)' }} />
    </div>
  );
}
