export default function MandalaDecor({ style = {} }) {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45) * Math.PI / 180;
    return {
      x: 16 + Math.cos(angle) * 9,
      y: 16 + Math.sin(angle) * 9,
    };
  });

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '0.9rem',
      ...style,
    }}>
      <div style={{
        height: 1, flex: 1,
        background: 'linear-gradient(to right, transparent, rgba(200,150,46,0.35))',
      }} />

      <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
        {/* Outer ring */}
        <circle cx="16" cy="16" r="13" stroke="#C8962E" strokeWidth="0.4" opacity="0.3" />
        {/* Mid ring */}
        <circle cx="16" cy="16" r="9" stroke="#C8962E" strokeWidth="0.4" opacity="0.45" />
        {/* Inner ring */}
        <circle cx="16" cy="16" r="5" stroke="#C8962E" strokeWidth="0.6" opacity="0.55" />
        {/* Center dot */}
        <circle cx="16" cy="16" r="1.8" fill="#C8962E" opacity="0.9" />
        {/* Petal dots */}
        {petals.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="#C8962E" opacity="0.5" />
        ))}
        {/* Diamond cross */}
        <path d="M16 4 L18 16 L16 28 L14 16 Z" stroke="#C8962E" strokeWidth="0.4" fill="none" opacity="0.25" />
        <path d="M4 16 L16 14 L28 16 L16 18 Z" stroke="#C8962E" strokeWidth="0.4" fill="none" opacity="0.25" />
      </svg>

      <div style={{
        height: 1, flex: 1,
        background: 'linear-gradient(to left, transparent, rgba(200,150,46,0.35))',
      }} />
    </div>
  );
}
