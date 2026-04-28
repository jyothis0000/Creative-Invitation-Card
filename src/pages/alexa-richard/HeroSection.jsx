import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

/* Falling petal particle */
function Petal({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        fontSize: '1rem',
        opacity: 0.7,
        animation: `ar-petal-spin ${style.dur}s linear ${style.delay}s infinite`,
        '--drift': style.drift,
        left: style.left,
        top: '-30px',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {style.char}
    </div>
  );
}

const petals = [
  { left: '8%', dur: 8, delay: 0, drift: '40px', char: '🌿' },
  { left: '20%', dur: 10, delay: 2.5, drift: '-30px', char: '🌸' },
  { left: '40%', dur: 9, delay: 1, drift: '20px', char: '🍃' },
  { left: '62%', dur: 11, delay: 3, drift: '-50px', char: '🌸' },
  { left: '75%', dur: 7, delay: 0.5, drift: '35px', char: '🌿' },
  { left: '88%', dur: 12, delay: 4, drift: '-20px', char: '🍃' },
];

export default function HeroSection() {
  return (
    <section
      id="ar-hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #111A15 0%, #1B3A2D 45%, #2D5740 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 1.5rem',
      }}
    >
      {/* Falling petals */}
      {petals.map((p, i) => <Petal key={i} style={p} />)}

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
      }} />

      {/* Botanical corner SVGs */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, width: 220, height: 220, opacity: 0.18 }}
        viewBox="0 0 220 220"
      >
        <ellipse cx="40" cy="80" rx="18" ry="50" fill="#C9A84C" transform="rotate(-30 40 80)" />
        <ellipse cx="70" cy="60" rx="14" ry="40" fill="#C9A84C" transform="rotate(-15 70 60)" />
        <ellipse cx="100" cy="50" rx="12" ry="35" fill="#C9A84C" transform="rotate(0 100 50)" />
        <ellipse cx="20" cy="100" rx="10" ry="30" fill="#E8C97A" transform="rotate(-40 20 100)" opacity="0.6" />
        <ellipse cx="55" cy="30" rx="8" ry="25" fill="#E8C97A" transform="rotate(-20 55 30)" opacity="0.5" />
      </svg>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, right: 0, width: 220, height: 220, opacity: 0.18, transform: 'rotate(180deg)' }}
        viewBox="0 0 220 220"
      >
        <ellipse cx="40" cy="80" rx="18" ry="50" fill="#C9A84C" transform="rotate(-30 40 80)" />
        <ellipse cx="70" cy="60" rx="14" ry="40" fill="#C9A84C" transform="rotate(-15 70 60)" />
        <ellipse cx="100" cy="50" rx="12" ry="35" fill="#C9A84C" transform="rotate(0 100 50)" />
        <ellipse cx="20" cy="100" rx="10" ry="30" fill="#E8C97A" transform="rotate(-40 20 100)" opacity="0.6" />
      </svg>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 720 }}>
        {/* Together forever eyebrow */}
        <motion.span
          className="ar-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Together Forever
        </motion.span>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 500,
            color: '#FAF7F2',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            marginBottom: '0.2em',
          }}
        >
          Alexa
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: 'block',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.38em',
              color: '#C9A84C',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              margin: '0.3em 0',
              fontWeight: 300,
            }}
          >
            &amp;
          </motion.span>
          Richard
        </motion.h1>

        {/* Floral divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <FloralDivider color="#C9A84C" className="ar-hero-divider flex justify-center" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 3vw, 1.55rem)',
            color: '#E8BAA3',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}
        >
          are inviting you to their wedding!
        </motion.p>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2rem',
            border: '1px solid rgba(201,168,76,0.5)',
            padding: '0.7rem 2.2rem',
            position: 'relative',
          }}
        >
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            fontWeight: 700,
          }}>
            September 14, 2025
          </span>
          <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.8rem' }}>◆</span>
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(232,186,163,0.85)',
          }}>
            Vienna, Austria
          </span>
        </motion.div>

        {/* RSVP CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.55 }}
          style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#ar-rsvp" className="ar-btn">RSVP Now</a>
          <a href="#ar-story" className="ar-btn" style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#E8BAA3' }}>
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => document.getElementById('ar-countdown')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          cursor: 'pointer', zIndex: 2,
        }}
        aria-label="Scroll down"
      >
        <svg width="28" height="44" viewBox="0 0 28 44" fill="none">
          <rect x="1" y="1" width="26" height="42" rx="13" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" />
          <circle cx="14" cy="10" r="3" fill="#C9A84C">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M0,0 L0,20" />
          </circle>
        </svg>
      </motion.div>
    </section>
  );
}
