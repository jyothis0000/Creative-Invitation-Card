import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

const WEDDING_DATE = new Date('2026-05-24T14:00:00');

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
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
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
        marginBottom: '2.2rem',
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

/* ─── Celebration particles ─────────────────────────────────── */
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
      {/* Star burst */}
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

/* ─── Individual scratch tile ───────────────────────────────── */
function ScratchTile({ value, label, delay }) {
  const canvasRef = useRef(null);
  const maskRef   = useRef(null); // in-memory: white=covered, transparent=scratched
  const baseRef   = useRef(null); // pre-rendered static gold base
  const rafRef    = useRef(null);
  const drawing   = useRef(false);
  const revealed  = useRef(false);
  const [done, setDone]       = useState(false);
  const [burst, setBurst]     = useState(false);
  const [glowing, setGlowing] = useState(false);
  const [flipNum, setFlipNum] = useState(false);
  const prevVal = useRef(value);

  /* Flash the number when it changes (after reveal) */
  useEffect(() => {
    if (done && prevVal.current !== value) {
      setFlipNum(true);
      const t = setTimeout(() => setFlipNum(false), 280);
      prevVal.current = value;
      return () => clearTimeout(t);
    }
  }, [value, done]);

  /* Live shimmer animation loop */
  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // In-memory scratch mask (white = covered, transparent = scratched)
    const mask = document.createElement('canvas');
    mask.width = 120; mask.height = 120;
    const mCtx = mask.getContext('2d');
    mCtx.fillStyle = 'white';
    mCtx.fillRect(0, 0, 120, 120);
    maskRef.current = mask;

    // Pre-render static gold base once (reused every frame for performance)
    const base = document.createElement('canvas');
    base.width = 120; base.height = 120;
    const b = base.getContext('2d');
    const W = 120, H = 120;

    // Flat gold base — no static bright spot, only the animated sweep provides shine
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

    // RAF loop — sweeps a right-tilted shine strip across every frame
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
      ctx.transform(1, 0, 0.4, 1, 0, 0); // right-leaning tilt
      const grad = ctx.createLinearGradient(shimmerX - 55, 0, shimmerX + 55, 0);
      grad.addColorStop(0,   'rgba(255,255,255,0)');
      grad.addColorStop(0.3, 'rgba(255,248,180,0.2)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.58)');
      grad.addColorStop(0.7, 'rgba(255,248,180,0.2)');
      grad.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(shimmerX - 55, -20, 110, H + 40);
      ctx.restore();

      // Clip to scratch mask (destination-in hides scratched areas)
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
      y: (src.clientY - r.top) * (canvas.height / r.height),
    };
  };

  const scratch = useCallback((x, y) => {
    if (revealed.current || !maskRef.current) return;
    const mask = maskRef.current;
    const ctx = mask.getContext('2d');
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
      setTimeout(() => setBurst(false), 900);
      setTimeout(() => setGlowing(false), 1800);
    }
  }, []);

  const onDown   = (e) => { drawing.current = true; const p = getXY(e, canvasRef.current); scratch(p.x, p.y); };
  const onMove   = (e) => { if (!drawing.current) return; const p = getXY(e, canvasRef.current); scratch(p.x, p.y); };
  const onUp     = () => { drawing.current = false; };
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
      {/* Revealed value (always rendered behind) */}
      <div className="aa-scratch-back">
        <motion.span
          className="aa-countdown-num"
          style={{
            transform: flipNum ? 'translateY(-6px)' : 'translateY(0)',
            opacity: flipNum ? 0.4 : 1,
            transition: 'transform 0.22s ease, opacity 0.22s ease',
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        <span className="aa-countdown-label">{label}</span>
      </div>

      {/* Canvas scratch layer — drawn by RAF loop */}
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

      {/* Celebration burst */}
      {burst && <CelebrationBurst />}
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────── */
export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const tiles = [
    { key: 'days', value: time.days, label: 'Days', delay: 0.3 },
    { key: 'hours', value: time.hours, label: 'Hours', delay: 0.4 },
    { key: 'minutes', value: time.minutes, label: 'Minutes', delay: 0.5 },
    { key: 'seconds', value: time.seconds, label: 'Seconds', delay: 0.6 },
  ];

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
          Counting Down
        </motion.h2>

        <motion.p
          className="aa-subheading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}
        >
          Scratch each tile to reveal the countdown
        </motion.p>

        <FloralDivider style={{ margin: '1.75rem 0' }} />

        {/* Date line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
            color: 'var(--aa-green)', marginBottom: '2.5rem',
            flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          <span>May</span>
          <span style={{ color: 'var(--aa-gold)', fontWeight: 600, fontSize: '1.6em' }}>24</span>
          <span>2026</span>
          <span style={{ color: 'rgba(201,168,76,0.4)' }}>◆</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--aa-text-muted)' }}>
            Vienna, Austria
          </span>
        </motion.div>

        {/* Add to Calendar */}
        <div style={{ textAlign: 'center' }}>
          <AddToCalendarButton />
        </div>

        {/* Scratch row */}
        <div className="aa-scratch-row">
          {tiles.map((t, i) => (
            <div key={t.key} className="aa-scratch-group">
              <ScratchTile
                value={t.value}
                label={t.label}
                delay={t.delay}
              />
              {i < tiles.length - 1 && (
                <span className="aa-scratch-sep">:</span>
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
    </section>
  );
}
