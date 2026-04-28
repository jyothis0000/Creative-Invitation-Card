import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

const WEDDING_DATE = new Date('2026-05-24T14:00:00');

function getTimeLeft() {
  const diff = WEDDING_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
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
        const dist  = 45 + (i % 3) * 18;
        const color = colors[i % colors.length];
        const size  = 5 + (i % 4);
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
  const canvasRef  = useRef(null);
  const drawing    = useRef(false);
  const revealed   = useRef(false);
  const [done, setDone]           = useState(false);
  const [burst, setBurst]         = useState(false);
  const [glowing, setGlowing]     = useState(false);
  const [flipNum, setFlipNum]     = useState(false);
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

  /* Draw the scratch overlay once on mount */
  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    // Gradient base
    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#111A15');
    grad.addColorStop(1, '#1B3A2D');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle gold texture dots
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(201,168,76,${0.05 + Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Thin gold border inner glow
    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    // "SCRATCH" text
    ctx.fillStyle = 'rgba(201,168,76,0.75)';
    ctx.font = '700 10px Lato, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', w / 2, h / 2 - 12);

    // Fingernail/coin icon
    ctx.strokeStyle = 'rgba(201,168,76,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 + 6, 9, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2 - 9, h / 2 + 6);
    ctx.lineTo(w / 2 + 9, h / 2 + 6);
    ctx.stroke();
  }, [done]);

  const getXY = (e, canvas) => {
    const r = canvas.getBoundingClientRect();
    const src = e.touches?.[0] ?? e;
    return {
      x: (src.clientX - r.left) * (canvas.width  / r.width),
      y: (src.clientY - r.top)  * (canvas.height / r.height),
    };
  };

  const scratch = useCallback((x, y) => {
    if (revealed.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Check % revealed
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 64) transparent++;
    }
    const pct = (transparent / (data.length / 4)) * 100;
    if (pct > 45) {
      revealed.current = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDone(true);
      setBurst(true);
      setGlowing(true);
      setTimeout(() => setBurst(false), 900);
      setTimeout(() => setGlowing(false), 1800);
    }
  }, []);

  const onDown  = (e) => { drawing.current = true; const p = getXY(e, canvasRef.current); scratch(p.x, p.y); };
  const onMove  = (e) => { if (!drawing.current) return; const p = getXY(e, canvasRef.current); scratch(p.x, p.y); };
  const onUp    = () => { drawing.current = false; };
  const onTStart = (e) => { e.preventDefault(); onDown(e); };
  const onTMove  = (e) => { e.preventDefault(); onMove(e); };

  return (
    <motion.div
      className="ar-scratch-tile"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      style={{
        position: 'relative',
        boxShadow: glowing
          ? '0 0 0 2px #C9A84C, 0 0 20px rgba(201,168,76,0.5)'
          : undefined,
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Revealed value (always rendered behind) */}
      <div className="ar-scratch-back">
        <motion.span
          className="ar-countdown-num"
          style={{
            transform: flipNum ? 'translateY(-6px)' : 'translateY(0)',
            opacity: flipNum ? 0.4 : 1,
            transition: 'transform 0.22s ease, opacity 0.22s ease',
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        <span className="ar-countdown-label">{label}</span>
      </div>

      {/* Canvas scratch layer */}
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
    { key: 'days',    value: time.days,    label: 'Days',    delay: 0.3 },
    { key: 'hours',   value: time.hours,   label: 'Hours',   delay: 0.4 },
    { key: 'minutes', value: time.minutes, label: 'Minutes', delay: 0.5 },
    { key: 'seconds', value: time.seconds, label: 'Seconds', delay: 0.6 },
  ];

  return (
    <section
      id="ar-countdown"
      className="ar-section"
      style={{ background: 'var(--ar-ivory)', textAlign: 'center' }}
    >
      <div className="ar-container--narrow">
        <motion.span
          className="ar-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Mark Your Calendar
        </motion.span>

        <motion.h2
          className="ar-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.4rem' }}
        >
          Counting Down
        </motion.h2>

        <motion.p
          className="ar-subheading"
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
            color: 'var(--ar-green)', marginBottom: '2.5rem',
            flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          <span>May</span>
          <span style={{ color: 'var(--ar-gold)', fontWeight: 600, fontSize: '1.6em' }}>24</span>
          <span>2026</span>
          <span style={{ color: 'rgba(201,168,76,0.4)' }}>◆</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--ar-text-muted)' }}>
            Vienna, Austria
          </span>
        </motion.div>

        {/* Scratch row */}
        <div className="ar-scratch-row">
          {tiles.map((t, i) => (
            <div key={t.key} className="ar-scratch-group">
              <ScratchTile
                value={t.value}
                label={t.label}
                delay={t.delay}
              />
              {i < tiles.length - 1 && (
                <span className="ar-scratch-sep">:</span>
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
            color: 'var(--ar-text-muted)',
            marginTop: '2.5rem',
          }}
        >
          "A lifetime of love starts with a single moment."
        </motion.p>
      </div>
    </section>
  );
}
