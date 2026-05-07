import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloralDivider from './FloralDivider';

const WEDDING_DATE = new Date('2026-05-24T14:00:00');

/* ─── Static date revealed by scratching ─────────────────────── */
const DATE_TILES = [
  { key: 'day',   value: '24',  label: 'Day',   delay: 0.3 },
  { key: 'month', value: 'May', label: 'Month', delay: 0.4 },
  { key: 'year',  value: '2026',label: 'Year',  delay: 0.5 },
];

/* ─── Pre-seeded confetti pieces (avoids Math.random on render) ─ */
const CONFETTI = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * 360;
  const rad = angle * (Math.PI / 180);
  const dist = 120 + (i % 5) * 35;
  const colors = ['#C9A84C', '#E8BAA3', '#FAF7F2', '#3E7558', '#E8C97A', '#C48D77', '#FFB347', '#A8E6CF'];
  return {
    color: colors[i % colors.length],
    tx: Math.cos(rad) * dist,
    ty: Math.sin(rad) * dist - 80,
    rotate: (i % 7) * 51,
    size: 6 + (i % 5),
    isRect: i % 3 !== 0,
    delay: (i % 6) * 0.03,
  };
});

function AddToCalendarButton() {
  const [hovered, setHovered] = useState(false);

  function openCalendar() {
    const text = encodeURIComponent("Athira & Abhishek's Wedding");
    const details = encodeURIComponent("You're invited to celebrate the wedding of Athira & Abhishek. Join us for a joyous celebration!");
    const location = encodeURIComponent('Vienna, Austria');
    const dates = '20260524T140000/20260524T180000';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <motion.button
      onClick={openCalendar}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.7rem 1.8rem',
        background: hovered ? '#C9A84C' : 'transparent',
        border: '1px solid #C9A84C',
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'background 0.2s ease, color 0.2s ease',
        marginTop: '1.5rem',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <rect x="3" y="4" width="18" height="17" rx="2"
          stroke={hovered ? '#1B3A2D' : '#C9A84C'} strokeWidth="1.8" fill="none" />
        <path d="M3 9h18"
          stroke={hovered ? '#1B3A2D' : '#C9A84C'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 2v4M16 2v4"
          stroke={hovered ? '#1B3A2D' : '#C9A84C'} strokeWidth="1.8" strokeLinecap="round" />
        <rect x="7.5" y="13" width="2.5" height="2.5" rx="0.4"
          fill={hovered ? '#1B3A2D' : '#C9A84C'} />
      </svg>
      <span style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: hovered ? '#1B3A2D' : '#C9A84C',
        transition: 'color 0.2s ease',
        whiteSpace: 'nowrap',
      }}>
        Add to Google Calendar
      </span>
    </motion.button>
  );
}

function getTimeLeft() {
  const diff = WEDDING_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ─── Full-screen confetti popper ───────────────────────────────── */
function PopperConfetti() {
  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: 'none',
      zIndex: 1100, overflow: 'hidden',
    }}>
      {CONFETTI.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: '50vw', y: '50vh', opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            x: `calc(50vw + ${p.tx}px)`,
            y: `calc(50vh + ${p.ty}px)`,
            opacity: 0,
            scale: 0.2,
            rotate: p.rotate,
          }}
          transition={{ duration: 1.2 + p.delay * 2, delay: p.delay, ease: [0.2, 0.9, 0.3, 1] }}
          style={{
            position: 'absolute',
            width: p.isRect ? p.size : p.size * 0.9,
            height: p.isRect ? p.size * 0.45 : p.size * 0.9,
            borderRadius: p.isRect ? 2 : '50%',
            background: p.color,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Countdown popup ───────────────────────────────────────────── */
function CountdownPopup({ onClose }) {
  const [time, setTime] = useState(getTimeLeft());
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const nums = [
    { value: time.days,    label: 'Days' },
    { value: time.hours,   label: 'Hours' },
    { value: time.minutes, label: 'Mins' },
    { value: time.seconds, label: 'Secs' },
  ];

  return (
    <>
      {showConfetti && <PopperConfetti />}

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(17, 26, 21, 0.85)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
        }}
      />

      {/* Card wrapper — flexbox centering works on all screen sizes */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1050,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        pointerEvents: 'none',
      }}>
      <motion.div
        initial={{ scale: 0.25, opacity: 0, y: 40 }}
        animate={{ scale: 1,    opacity: 1, y: 0 }}
        exit={{   scale: 0.85,  opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{
          position: 'relative',
          pointerEvents: 'auto',
          background: 'linear-gradient(155deg, #111A15 0%, #1B3A2D 100%)',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: 6,
          padding: 'clamp(1.4rem, 5vw, 2.8rem) clamp(1.2rem, 6vw, 3rem)',
          textAlign: 'center',
          width: '100%',
          maxWidth: 480,
          boxShadow: '0 0 100px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.55)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '0.9rem', right: '1rem',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(201,168,76,0.55)', fontSize: '1.1rem',
            lineHeight: 1, padding: '0.2rem 0.4rem',
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Rings icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1,  rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
          style={{ marginBottom: '1rem' }}
        >
          <svg width="52" height="30" viewBox="0 0 52 30" fill="none">
            <circle cx="17" cy="15" r="13" stroke="#C9A84C"  strokeWidth="2.5" opacity="0.85" />
            <circle cx="35" cy="15" r="13" stroke="#E8C97A"  strokeWidth="2.5" opacity="0.85" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.58rem', letterSpacing: '0.38em',
            textTransform: 'uppercase', color: '#C9A84C',
            marginBottom: '0.3rem',
          }}
        >
          Counting down to
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
            color: '#FAF7F2', fontWeight: 500,
            marginBottom: '0.15rem',
          }}
        >
          Abhishek &amp; Athira
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '0.95rem',
            color: 'rgba(232,186,163,0.7)', marginBottom: '2rem',
          }}
        >
          May 24, 2026 — Vienna, Austria
        </motion.p>

        {/* Live countdown numbers */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {nums.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: -14, opacity: 0 }}
                  animate={{ y: 0,   opacity: 1 }}
                  exit={{    y:  14, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                    fontWeight: 600, color: '#C9A84C',
                    lineHeight: 1, display: 'block',
                    background: 'rgba(201,168,76,0.1)',
                    borderRadius: 4,
                    padding: '0.4rem 0.65rem',
                    border: '1px solid rgba(201,168,76,0.22)',
                    minWidth: 'clamp(3rem, 8vw, 3.8rem)',
                    textAlign: 'center',
                  }}
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.5rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(232,186,163,0.55)', marginTop: '0.4rem',
              }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <FloralDivider style={{ margin: '1.6rem 0 0.4rem' }} />
        <AddToCalendarButton />
      </motion.div>
      </div>
    </>
  );
}

/* ─── Celebration particles (per-tile reveal) ───────────────────── */
function CelebrationBurst() {
  const colors = ['#C9A84C', '#E8BAA3', '#FAF7F2', '#3E7558', '#E8C97A', '#C48D77'];
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 20, overflow: 'visible',
    }}>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360;
        const dist = 45 + (i % 3) * 18;
        const color = colors[i % colors.length];
        const size = 5 + (i % 4);
        return (
          <motion.div
            key={i}
            initial={{ x: '50%', y: '50%', scale: 1, opacity: 1 }}
            animate={{
              x: `calc(50% + ${Math.cos(angle * Math.PI / 180) * dist}px)`,
              y: `calc(50% + ${Math.sin(angle * Math.PI / 180) * dist}px)`,
              scale: 0, opacity: 0,
            }}
            transition={{ duration: 0.75, delay: i * 0.015, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: i % 3 === 0 ? '0' : '50%',
              background: color,
              transform: 'translate(-50%,-50%)',
            }}
          />
        );
      })}
      <motion.div
        initial={{ scale: 0, opacity: 1, rotate: 0 }}
        animate={{ scale: 2.5, opacity: 0, rotate: 180 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: '1.5rem',
        }}
      >
        ✨
      </motion.div>
    </div>
  );
}

/* ─── Individual scratch tile ───────────────────────────────────── */
function ScratchTile({ value, label, delay, onReveal }) {
  const canvasRef = useRef(null);
  const maskRef   = useRef(null);
  const baseRef   = useRef(null);
  const rafRef    = useRef(null);
  const drawing   = useRef(false);
  const revealed  = useRef(false);
  const [done,    setDone]    = useState(false);
  const [burst,   setBurst]   = useState(false);
  const [glowing, setGlowing] = useState(false);

  /* Shimmer RAF loop */
  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mask = document.createElement('canvas');
    mask.width = 120; mask.height = 120;
    const mCtx = mask.getContext('2d');
    mCtx.fillStyle = 'white';
    mCtx.fillRect(0, 0, 120, 120);
    maskRef.current = mask;

    const base = document.createElement('canvas');
    base.width = 120; base.height = 120;
    const b = base.getContext('2d');
    const W = 120, H = 120;

    b.fillStyle = '#C9A84C';
    b.fillRect(0, 0, W, H);

    for (let i = -H; i < W + H; i += 5) {
      b.beginPath(); b.moveTo(i, 0); b.lineTo(i + H, H);
      b.strokeStyle = 'rgba(0,0,0,0.045)'; b.lineWidth = 1; b.stroke();
    }

    b.strokeStyle = 'rgba(255,255,255,0.55)'; b.lineWidth = 1;
    b.strokeRect(4, 4, W - 8, H - 8);
    b.strokeStyle = 'rgba(80,45,0,0.25)'; b.lineWidth = 1;
    b.strokeRect(6, 6, W - 12, H - 12);

    b.shadowColor = 'rgba(255,200,60,0.7)'; b.shadowBlur = 8;
    b.fillStyle = 'rgba(45,25,0,0.85)';
    b.font = 'bold 15px Lato, sans-serif';
    b.textAlign = 'center'; b.textBaseline = 'middle';
    b.fillText('✶ SCRATCH ✶', W / 2, H / 2 - 13);
    b.shadowBlur = 0;
    b.font = '12px Lato, sans-serif';
    b.fillStyle = 'rgba(45,25,0,0.65)';
    b.fillText('TO REVEAL', W / 2, H / 2 + 14);

    baseRef.current = base;

    let shimmerX = -80;
    let frameId;

    function frame() {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(baseRef.current, 0, 0);

      shimmerX += 1.4;
      if (shimmerX > W + 80) shimmerX = -80;

      ctx.save();
      ctx.transform(1, 0, 0.4, 1, 0, 0);
      const grad = ctx.createLinearGradient(shimmerX - 55, 0, shimmerX + 55, 0);
      grad.addColorStop(0,   'rgba(255,255,255,0)');
      grad.addColorStop(0.3, 'rgba(255,248,180,0.2)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.58)');
      grad.addColorStop(0.7, 'rgba(255,248,180,0.2)');
      grad.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(shimmerX - 55, -20, 110, H + 40);
      ctx.restore();

      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(maskRef.current, 0, 0);

      frameId = requestAnimationFrame(frame);
    }

    frameId = requestAnimationFrame(frame);
    rafRef.current = frameId;
    return () => cancelAnimationFrame(frameId);
  }, [done]);

  const getXY = (e, canvas) => {
    const r = canvas.getBoundingClientRect();
    const src = e.touches?.[0] ?? e;
    return {
      x: (src.clientX - r.left) * (canvas.width / r.width),
      y: (src.clientY - r.top)  * (canvas.height / r.height),
    };
  };

  const scratch = useCallback((x, y) => {
    if (revealed.current || !maskRef.current) return;
    const mask = maskRef.current;
    const ctx  = mask.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, mask.width, mask.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 64) transparent++;
    }
    if ((transparent / (data.length / 4)) * 100 > 45) {
      revealed.current = true;
      cancelAnimationFrame(rafRef.current);
      setDone(true);
      setBurst(true);
      setGlowing(true);
      onReveal?.();
      setTimeout(() => setBurst(false),   900);
      setTimeout(() => setGlowing(false), 1800);
    }
  }, [onReveal]);

  const onDown  = (e) => { drawing.current = true;  scratch(...Object.values(getXY(e, canvasRef.current))); };
  const onMove  = (e) => { if (!drawing.current) return; scratch(...Object.values(getXY(e, canvasRef.current))); };
  const onUp    = ()  => { drawing.current = false; };
  const onTStart = (e) => { e.preventDefault(); onDown(e); };
  const onTMove  = (e) => { e.preventDefault(); onMove(e); };

  return (
    <motion.div
      className="aa-scratch-tile"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      style={{
        position: 'relative',
        boxShadow: glowing
          ? '0 0 0 2px #C9A84C, 0 0 28px rgba(201,168,76,0.65), 0 0 60px rgba(201,168,76,0.3)'
          : !done
            ? '0 0 0 1px rgba(201,168,76,0.5), 0 4px 18px rgba(201,168,76,0.3), 0 0 40px rgba(201,168,76,0.15)'
            : undefined,
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Revealed date value */}
      <div className="aa-scratch-back">
        <span className="aa-countdown-num">{value}</span>
        <span className="aa-countdown-label">{label}</span>
      </div>

      {!done && (
        <canvas
          ref={canvasRef}
          width={120}
          height={120}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            cursor: 'crosshair',
            touchAction: 'none',
            borderRadius: 'inherit',
            zIndex: 99,
          }}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onTStart}
          onTouchMove={onTMove}
          onTouchEnd={onUp}
        />
      )}

      {burst && <CelebrationBurst />}
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────────── */
export default function CountdownSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showPopup,     setShowPopup]     = useState(false);

  const handleReveal = useCallback(() => {
    setRevealedCount(c => c + 1);
  }, []);

  useEffect(() => {
    if (revealedCount === DATE_TILES.length) {
      const t = setTimeout(() => setShowPopup(true), 500);
      return () => clearTimeout(t);
    }
  }, [revealedCount]);

  return (
    <section
      id="aa-countdown"
      className="aa-section"
      style={{ background: 'var(--aa-ivory)', textAlign: 'center' }}
    >
      <div className="aa-container--narrow">
        <motion.span
          className="aa-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Mark Your Calendar
        </motion.span>

        <motion.h2
          className="aa-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.4rem' }}
        >
          Save the Date
        </motion.h2>

        <motion.p
          className="aa-subheading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}
        >
          Scratch each tile to reveal the date
        </motion.p>

        <FloralDivider style={{ margin: '1.75rem 0' }} />

        {/* Add to Calendar */}
        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <AddToCalendarButton />
        </div>

        {/* Scratch row */}
        <div className="aa-scratch-row">
          {DATE_TILES.map((t, i) => (
            <div key={t.key} className="aa-scratch-group">
              <ScratchTile
                value={t.value}
                label={t.label}
                delay={t.delay}
                onReveal={handleReveal}
              />
              {i < DATE_TILES.length - 1 && (
                <span className="aa-scratch-sep">◆</span>
              )}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--aa-text-muted)',
            marginTop: '2.5rem',
          }}
        >
          "A lifetime of love starts with a single moment."
        </motion.p>
      </div>

      {/* Countdown popup — appears after all tiles are scratched */}
      <AnimatePresence>
        {showPopup && (
          <CountdownPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
