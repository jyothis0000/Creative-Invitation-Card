export default function FloralDivider({ color = '#C9A84C', className = '' }) {
  return (
    <div className={className} style={{ textAlign: 'center', lineHeight: 0, userSelect: 'none', display: 'flex', justifyContent: 'center' }} aria-hidden="true">
      <svg width="320" height="36" viewBox="0 0 320 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left line */}
        <line x1="0" y1="18" x2="118" y2="18" stroke={color} strokeWidth="0.75" opacity="0.6" />
        {/* Left leaf */}
        <ellipse cx="125" cy="18" rx="6" ry="3" fill={color} opacity="0.5" transform="rotate(-20 125 18)" />
        <ellipse cx="133" cy="16" rx="5" ry="2.5" fill={color} opacity="0.4" transform="rotate(-10 133 16)" />
        {/* Center flower */}
        <circle cx="160" cy="18" r="5" fill={color} opacity="0.9" />
        <ellipse cx="160" cy="9" rx="3.5" ry="5.5" fill={color} opacity="0.35" />
        <ellipse cx="160" cy="27" rx="3.5" ry="5.5" fill={color} opacity="0.35" />
        <ellipse cx="151" cy="18" rx="5.5" ry="3.5" fill={color} opacity="0.35" />
        <ellipse cx="169" cy="18" rx="5.5" ry="3.5" fill={color} opacity="0.35" />
        <ellipse cx="154" cy="11" rx="3.5" ry="5.5" fill={color} opacity="0.25" transform="rotate(45 154 11)" />
        <ellipse cx="166" cy="11" rx="3.5" ry="5.5" fill={color} opacity="0.25" transform="rotate(-45 166 11)" />
        <ellipse cx="154" cy="25" rx="3.5" ry="5.5" fill={color} opacity="0.25" transform="rotate(-45 154 25)" />
        <ellipse cx="166" cy="25" rx="3.5" ry="5.5" fill={color} opacity="0.25" transform="rotate(45 166 25)" />
        <circle cx="160" cy="18" r="2.5" fill="white" opacity="0.9" />
        {/* Right leaf */}
        <ellipse cx="187" cy="18" rx="6" ry="3" fill={color} opacity="0.5" transform="rotate(20 187 18)" />
        <ellipse cx="195" cy="16" rx="5" ry="2.5" fill={color} opacity="0.4" transform="rotate(10 195 16)" />
        {/* Right line */}
        <line x1="202" y1="18" x2="320" y2="18" stroke={color} strokeWidth="0.75" opacity="0.6" />
      </svg>
    </div>
  );
}
