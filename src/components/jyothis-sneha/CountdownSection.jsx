import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaveDecor from './WaveDecor';

const WEDDING_DATE = new Date('2027-03-15T16:00:00');

const DATE_TILES = [
  { key: 'day',   value: '15',    label: 'Day',   delay: 0.3 },
  { key: 'month', value: 'Mar',   label: 'Month', delay: 0.4 },
  { key: 'year',  value: '2027',  label: 'Year',  delay: 0.5 },
];

const CONFETTI = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * 360;
  const rad = angle * (Math.PI / 180);
  const dist = 120 + (i % 5) * 35;
  const colors = ['#87C4E8', '#3DBFB8', '#FFFDF7', '#2E6FA8', '#F2DEB3', '#E8805A', '#C8E8F8', '#D4A840'];
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

function PopperConfetti() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1100, overflow: 'hidden' }}>
      {CONFETTI.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: '50vw', y: '50vh', opacity: 1, scale: 1, rotate: 0 }}
          animate={{ x: `calc(50vw + ${p.tx}px)`, y: `calc(50vh + ${p.ty}px)`, opacity: 0, scale: 0.2, rotate: p.rotate }}
          transition={{ duration: 1.2 + p.delay * 2, delay: p.delay, ease: [0.2, 0.9, 0.3, 1] }}
          style={{
            position: 'absolute',
            width: p.isRect ? p.size : p.size * 0.9,
            height: p.isRect ? p.size * 0.45 : p.size * 0.9,
            borderRadius: p.isRect ? 2 : '50%',
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

function AddToCalendarButton() {
  const [hovered, setHovered] = useState(false);
  const text     = encodeURIComponent("Jyothis & Sneha's Beach Wedding");
  const details  = encodeURIComponent("You're invited to celebrate the beach wedding of Jyothis & Sneha at Coral Cove Resort, Goa!");
  const location = encodeURIComponent('Coral Cove Resort, Goa');
  const dates    = '20270315T160000/20270315T210000';
  const calUrl   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;

  return (
    <motion.a
      href={calUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.7rem 1.8rem',
        background: hovered ? '#3DBFB8' : 'transparent',
        border: '1px solid #3DBFB8',
        borderRadius: 3, cursor: 'pointer',
        transition: 'background 0.2s ease',
        marginTop: '1.5rem', textDecoration: 'none',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke={hovered ? '#0D2137' : '#3DBFB8'} strokeWidth="1.8" fill="none" />
        <path d="M3 9h18" stroke={hovered ? '#0D2137' : '#3DBFB8'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 2v4M16 2v4" stroke={hovered ? '#0D2137' : '#3DBFB8'} strokeWidth="1.8" strokeLinecap="round" />
        <rect x="7.5" y="13" width="2.5" height="2.5" rx="0.4" fill={hovered ? '#0D2137' : '#3DBFB8'} />
      </svg>
      <span style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: '0.6rem', letterSpacing: '0.25em',
        textTransform: 'uppercase', fontWeight: 700,
        color: hovered ? '#0D2137' : '#3DBFB8',
        transition: 'color 0.2s ease', whiteSpace: 'nowrap',
      }}>
        Add to Google Calendar
      </span>
    </motion.a>
  );
}

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

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(13,33,55,0.92)',
          backdropFilter: 'blur(10px)', cursor: 'pointer',
        }}
      />

      <div style={{
        position: 'fixed', inset: 0, zIndex: 1050,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', pointerEvents: 'none',
      }}>
        <motion.div
          initial={{ scale: 0.25, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{
            position: 'relative', pointerEvents: 'auto',
            background: 'linear-gradient(155deg, #0D2137 0%, #1A3A52 100%)',
            border: '1px solid rgba(135,196,232,0.35)',
            borderRadius: 8,
            padding: 'clamp(1.4rem, 5vw, 2.8rem) clamp(1.2rem, 6vw, 3rem)',
            textAlign: 'center', width: '100%', maxWidth: 500,
            boxShadow: '0 0 100px rgba(61,191,184,0.1), 0 40px 80px rgba(13,33,55,0.7)',
            maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          <button onClick={onClose} style={{
            position: 'absolute', top: '0.9rem', right: '1rem',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(135,196,232,0.5)', fontSize: '1.1rem', lineHeight: 1, padding: '0.2rem 0.4rem',
          }} aria-label="Close">✕</button>

          {/* Wave icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            style={{ marginBottom: '1rem' }}
          >
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
              <path d="M0 12 Q8 4 16 12 Q24 20 32 12 Q40 4 48 12 Q56 20 64 12"
                stroke="#3DBFB8" strokeWidth="2" fill="none" opacity="0.8" />
              <circle cx="32" cy="12" r="3" fill="#3DBFB8" opacity="0.9" />
              <circle cx="12" cy="12" r="2" fill="#87C4E8" opacity="0.5" />
              <circle cx="52" cy="12" r="2" fill="#87C4E8" opacity="0.5" />
            </svg>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#3DBFB8', marginBottom: '0.3rem' }}>
            Counting down to
          </motion.p>

          <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', color: '#FFFDF7', fontWeight: 500, marginBottom: '0.15rem' }}>
            Jyothis &amp; Sneha
          </motion.h3>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(135,196,232,0.65)', marginBottom: '2rem' }}>
            March 15, 2027 — Coral Cove Resort · Goa
          </motion.p>

          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {nums.map(({ value, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AnimatePresence mode="popLayout">
                  <motion.span key={value}
                    initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                      fontWeight: 600, color: '#87C4E8', lineHeight: 1, display: 'block',
                      background: 'rgba(135,196,232,0.08)', borderRadius: 4,
                      padding: '0.4rem 0.65rem',
                      border: '1px solid rgba(135,196,232,0.2)',
                      minWidth: 'clamp(3rem, 8vw, 3.8rem)', textAlign: 'center',
                    }}>
                    {String(value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(135,196,232,0.5)', marginTop: '0.4rem',
                }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          <WaveDecor light style={{ margin: '1.6rem 0 0.4rem' }} />
          <AddToCalendarButton />
        </motion.div>
      </div>
    </>
  );
}

function CelebrationBurst() {
  const colors = ['#87C4E8', '#3DBFB8', '#F2DEB3', '#2E6FA8', '#E8805A', '#C8E8F8'];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'visible' }}>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360;
        const dist = 45 + (i % 3) * 18;
        return (
          <motion.div key={i}
            initial={{ x: '50%', y: '50%', scale: 1, opacity: 1 }}
            animate={{
              x: `calc(50% + ${Math.cos(angle * Math.PI / 180) * dist}px)`,
              y: `calc(50% + ${Math.sin(angle * Math.PI / 180) * dist}px)`,
              scale: 0, opacity: 0,
            }}
            transition={{ duration: 0.75, delay: i * 0.015, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 5 + (i % 4), height: 5 + (i % 4),
              borderRadius: i % 3 === 0 ? '0' : '50%',
              background: colors[i % colors.length],
              transform: 'translate(-50%,-50%)',
            }}
          />
        );
      })}
    </div>
  );
}

function ScratchTile({ value, label, delay, onReveal }) {
  const canvasRef = useRef(null);
  const maskRef   = useRef(null);
  const baseRef   = useRef(null);
  const rafRef    = useRef(null);
  const drawing   = useRef(false);
  const revealed  = useRef(false);
  const [done, setDone]       = useState(false);
  const [burst, setBurst]     = useState(false);
  const [glowing, setGlowing] = useState(false);

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

    // Ocean-blue scratch surface
    const grad = b.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1A3A52');
    grad.addColorStop(1, '#0D2137');
    b.fillStyle = grad;
    b.fillRect(0, 0, W, H);

    // Wave pattern overlay
    for (let row = 0; row < 3; row++) {
      b.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = 30 + row * 30 + Math.sin((x / W) * Math.PI * 4) * 4;
        if (x === 0) b.moveTo(x, y); else b.lineTo(x, y);
      }
      b.strokeStyle = 'rgba(135,196,232,0.12)'; b.lineWidth = 1; b.stroke();
    }

    b.strokeStyle = 'rgba(61,191,184,0.55)'; b.lineWidth = 1;
    b.strokeRect(4, 4, W - 8, H - 8);
    b.strokeStyle = 'rgba(135,196,232,0.2)'; b.lineWidth = 1;
    b.strokeRect(7, 7, W - 14, H - 14);

    b.shadowColor = 'rgba(61,191,184,0.8)'; b.shadowBlur = 8;
    b.fillStyle = 'rgba(135,196,232,0.9)';
    b.font = 'bold 12px Lato, sans-serif';
    b.textAlign = 'center'; b.textBaseline = 'middle';
    b.fillText('~ SCRATCH ~', W / 2, H / 2 - 12);
    b.shadowBlur = 0;
    b.font = '10px Lato, sans-serif';
    b.fillStyle = 'rgba(135,196,232,0.65)';
    b.fillText('TO REVEAL', W / 2, H / 2 + 14);

    // Seashell deco
    b.fillStyle = 'rgba(242,222,179,0.3)';
    b.font = '18px serif';
    b.fillText('🐚', W / 2, H - 16);

    baseRef.current = base;

    let shimmerX = -80;
    let frameId;

    function frame() {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(baseRef.current, 0, 0);

      shimmerX += 1.2;
      if (shimmerX > W + 80) shimmerX = -80;

      ctx.save();
      ctx.transform(1, 0, 0.3, 1, 0, 0);
      const shimmer = ctx.createLinearGradient(shimmerX - 55, 0, shimmerX + 55, 0);
      shimmer.addColorStop(0, 'rgba(255,255,255,0)');
      shimmer.addColorStop(0.3, 'rgba(135,196,232,0.12)');
      shimmer.addColorStop(0.5, 'rgba(200,240,255,0.45)');
      shimmer.addColorStop(0.7, 'rgba(135,196,232,0.12)');
      shimmer.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = shimmer;
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
    return { x: (src.clientX - r.left) * (canvas.width / r.width), y: (src.clientY - r.top) * (canvas.height / r.height) };
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
    for (let i = 3; i < data.length; i += 4) { if (data[i] < 64) transparent++; }
    if ((transparent / (data.length / 4)) * 100 > 45) {
      revealed.current = true;
      cancelAnimationFrame(rafRef.current);
      setDone(true); setBurst(true); setGlowing(true);
      onReveal?.();
      setTimeout(() => setBurst(false), 900);
      setTimeout(() => setGlowing(false), 1800);
    }
  }, [onReveal]);

  const onDown  = e => { drawing.current = true; scratch(...Object.values(getXY(e, canvasRef.current))); };
  const onMove  = e => { if (!drawing.current) return; scratch(...Object.values(getXY(e, canvasRef.current))); };
  const onUp    = () => { drawing.current = false; };
  const onTStart = e => { e.preventDefault(); onDown(e); };
  const onTMove  = e => { e.preventDefault(); onMove(e); };

  return (
    <motion.div
      className="js-scratch-tile"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      style={{
        boxShadow: glowing
          ? '0 0 0 2px #3DBFB8, 0 0 28px rgba(61,191,184,0.65), 0 0 60px rgba(61,191,184,0.3)'
          : !done
            ? '0 0 0 1px rgba(61,191,184,0.4), 0 4px 18px rgba(13,33,55,0.35)'
            : undefined,
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <div className="js-scratch-back">
        <span className="js-countdown-num">{value}</span>
        <span className="js-countdown-label">{label}</span>
      </div>

      {!done && (
        <canvas ref={canvasRef} width={120} height={120}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            cursor: 'crosshair', touchAction: 'none',
            borderRadius: 'inherit', zIndex: 99,
          }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onTStart} onTouchMove={onTMove} onTouchEnd={onUp}
        />
      )}

      {burst && <CelebrationBurst />}
    </motion.div>
  );
}

export default function CountdownSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleReveal = useCallback(() => setRevealedCount(c => c + 1), []);

  useEffect(() => {
    if (revealedCount === DATE_TILES.length) {
      const t = setTimeout(() => setShowPopup(true), 500);
      return () => clearTimeout(t);
    }
  }, [revealedCount]);

  return (
    <section id="js-countdown" className="js-section" style={{ background: 'var(--js-cream)', textAlign: 'center' }}>
      <div className="js-container--narrow">
        <motion.span className="js-eyebrow"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          Mark Your Calendar
        </motion.span>

        <motion.h2 className="js-heading"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.4rem' }}>
          Save the Date
        </motion.h2>

        <motion.p className="js-subheading"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
          Scratch each tile to reveal the wedding date
        </motion.p>

        <WaveDecor style={{ margin: '1.75rem 0' }} />

        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <AddToCalendarButton />
        </div>

        <div className="js-scratch-row">
          {DATE_TILES.map((t, i) => (
            <div key={t.key} className="js-scratch-group">
              <ScratchTile value={t.value} label={t.label} delay={t.delay} onReveal={handleReveal} />
              {i < DATE_TILES.length - 1 && <span className="js-scratch-sep">🐚</span>}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '1.05rem',
            color: 'var(--js-text-muted)', marginTop: '2.5rem',
          }}>
          "Where the ocean meets forever — come celebrate with us."
        </motion.p>
      </div>

      <AnimatePresence>
        {showPopup && <CountdownPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </section>
  );
}
