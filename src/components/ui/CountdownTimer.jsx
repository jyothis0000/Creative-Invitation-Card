import { useEffect, useState } from 'react';

const TARGET = new Date('2025-11-22T10:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Ring({ value, max, label }) {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const pct = value / max;
  const offset = circ * (1 - pct);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: 96, height: 96 }}>
        <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`${value} ${label}`}>
          {/* Track */}
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="#C8941A22"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="#C8941A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform="rotate(-90 48 48)"
            style={{ transition: 'stroke-dashoffset 0.8s ease', animation: 'countdown-pulse 2s ease-in-out infinite' }}
          />
          {/* Outer ornament ring */}
          <circle cx="48" cy="48" r="45" fill="none" stroke="#C8941A44" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        {/* Value text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem',
            fontWeight: 600,
            color: '#C8941A',
            lineHeight: 1,
          }}>
            {pad(value)}
          </span>
        </div>
      </div>
      <span style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#8B0000',
        fontWeight: 700,
      }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center gap-6" role="timer" aria-live="polite" aria-label="Countdown to wedding">
      <Ring value={time.d} max={365} label="Days" />
      <Ring value={time.h} max={24} label="Hours" />
      <Ring value={time.m} max={60} label="Minutes" />
      <Ring value={time.s} max={60} label="Seconds" />
    </div>
  );
}
