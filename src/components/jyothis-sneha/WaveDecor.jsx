export default function WaveDecor({ style = {}, light = false }) {
  const lineColor = light
    ? 'rgba(255,253,247,0.3)'
    : 'rgba(135,196,232,0.4)';
  const accentColor = light ? 'rgba(255,253,247,0.7)' : '#3DBFB8';

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '0.8rem',
      ...style,
    }}>
      <div style={{
        height: 1, flex: 1,
        background: `linear-gradient(to right, transparent, ${lineColor})`,
      }} />

      <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
        {/* Wave line */}
        <path
          d="M0 12 Q8 4 16 12 Q24 20 32 12 Q40 4 48 12 Q56 20 64 12"
          stroke={accentColor}
          strokeWidth="1.2"
          fill="none"
          opacity="0.65"
        />
        {/* Seashell in center */}
        <g transform="translate(28, 4)">
          <path d="M4 8 Q0 4 2 0 Q4 -1 6 0 Q8 4 4 8Z" fill={accentColor} opacity="0.7" />
          <path d="M4 8 Q2 5 3 2" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.5" />
          <path d="M4 8 Q5 5 6 3" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.5" />
          <path d="M4 8 Q4 5 5 1.5" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.5" />
          <circle cx="4" cy="8.5" r="1.2" fill={accentColor} opacity="0.8" />
        </g>
        {/* Small dots */}
        <circle cx="12" cy="12" r="1.5" fill={accentColor} opacity="0.4" />
        <circle cx="52" cy="12" r="1.5" fill={accentColor} opacity="0.4" />
      </svg>

      <div style={{
        height: 1, flex: 1,
        background: `linear-gradient(to left, transparent, ${lineColor})`,
      }} />
    </div>
  );
}
