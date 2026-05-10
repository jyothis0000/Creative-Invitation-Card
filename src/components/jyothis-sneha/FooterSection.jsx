import { motion } from 'framer-motion';
import WaveDecor from './WaveDecor';

function MocktailSVG() {
  return (
    <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
      {/* Glass */}
      <path d="M12 18 L18 72 L42 72 L48 18 Z" fill="rgba(135,196,232,0.15)" stroke="rgba(135,196,232,0.4)" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Drink fill — tropical layered */}
      <path d="M17 55 L19 72 L41 72 L43 55 Z" fill="rgba(232,128,90,0.5)" />
      <path d="M15 35 L17 55 L43 55 L45 35 Z" fill="rgba(61,191,184,0.4)" />
      <path d="M13 22 L15 35 L45 35 L47 22 Z" fill="rgba(212,168,64,0.35)" />
      {/* Straw */}
      <path d="M34 72 L42 18" stroke="#E8805A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Umbrella */}
      <path d="M42 18 L32 12 Q38 8 46 10 Q50 14 42 18Z" fill="#3DBFB8" opacity="0.85" />
      <path d="M42 18 L52 14 Q52 8 46 10Z" fill="#87C4E8" opacity="0.7" />
      <path d="M42 18 L42 12" stroke="#D4A840" strokeWidth="1" strokeLinecap="round" />
      {/* Base */}
      <rect x="14" y="72" width="32" height="4" rx="2" fill="rgba(135,196,232,0.25)" />
      {/* Stem */}
      <rect x="27" y="76" width="6" height="12" rx="3" fill="rgba(135,196,232,0.2)" />
      {/* Foot */}
      <rect x="20" y="87" width="20" height="4" rx="2" fill="rgba(135,196,232,0.2)" />
      {/* Bubbles */}
      <circle cx="25" cy="65" r="1.5" fill="rgba(255,253,247,0.4)" />
      <circle cx="32" cy="58" r="1" fill="rgba(255,253,247,0.3)" />
      <circle cx="28" cy="48" r="1.2" fill="rgba(255,253,247,0.3)" />
      {/* Orange slice garnish */}
      <circle cx="12" cy="18" r="6" fill="rgba(232,128,90,0.7)" />
      <path d="M12 12 L12 24M6 18 L18 18M7.8 13.8 L16.2 22.2M16.2 13.8 L7.8 22.2" stroke="rgba(255,253,247,0.5)" strokeWidth="0.7" />
    </svg>
  );
}

function StarfishSVG() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L18 13 L27 10 L20 17 L27 22 L18 20 L16 28 L14 20 L5 22 L12 17 L5 10 L14 13 Z"
        fill="rgba(242,222,179,0.4)" stroke="rgba(212,168,64,0.5)" strokeWidth="0.8" />
    </svg>
  );
}

function ShellSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 22 Q6 16 8 8 Q10 3 14 3 Q18 3 20 8 Q22 16 14 22Z"
        fill="rgba(135,196,232,0.3)" stroke="rgba(61,191,184,0.4)" strokeWidth="0.8" />
      <path d="M14 22 Q10 16 11 10" stroke="rgba(61,191,184,0.3)" strokeWidth="0.6" fill="none" />
      <path d="M14 22 Q14 15 15 9" stroke="rgba(61,191,184,0.3)" strokeWidth="0.6" fill="none" />
      <path d="M14 22 Q17 15 17 10" stroke="rgba(61,191,184,0.3)" strokeWidth="0.6" fill="none" />
      <circle cx="14" cy="23" r="2" fill="rgba(61,191,184,0.4)" />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer id="js-footer" style={{
      background: '#0D2137',
      padding: 'clamp(4rem, 10vw, 7rem) 1.5rem 3rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background wave lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: 'absolute',
            left: 0, right: 0,
            top: `${15 + i * 22}%`,
            height: 1,
            background: `rgba(135,196,232,${0.04 - i * 0.008})`,
          }} />
        ))}
        {/* Glow orb bottom center */}
        <div style={{
          position: 'absolute',
          bottom: '-20%', left: '50%',
          transform: 'translateX(-50%)',
          width: 400, height: 200,
          background: 'radial-gradient(ellipse, rgba(61,191,184,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div className="js-container--narrow" style={{ position: 'relative' }}>
        {/* Floating beach elements */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '2rem', marginBottom: '1.5rem', opacity: 0.6,
        }}>
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <StarfishSVG />
          </motion.div>

          {/* Main mocktail — centered, larger */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <MocktailSVG />
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <ShellSVG />
          </motion.div>
        </div>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 600,
            color: '#FFFDF7',
            margin: '0 0 0.25rem',
            letterSpacing: '-0.01em',
          }}
        >
          Jyothis &amp; Sneha
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'rgba(135,196,232,0.6)',
            margin: '0 0 1.5rem',
          }}
        >
          are getting married
        </motion.p>

        <WaveDecor light style={{ margin: '0 auto 2rem', maxWidth: 320 }} />

        {/* Date & Venue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.72rem', letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3DBFB8',
            marginBottom: '0.4rem',
          }}>
            March 15, 2027 · 4:00 PM
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            color: 'rgba(255,253,247,0.5)',
            margin: 0,
          }}>
            Coral Cove Resort · Goa, India
          </p>
        </motion.div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(135,196,232,0.15), transparent)',
          marginBottom: '2rem',
        }} />

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'rgba(135,196,232,0.45)',
            marginBottom: '2.5rem',
            lineHeight: 1.8,
          }}
        >
          "The ocean does not apologize for its depth — and neither shall we for our love."
        </motion.p>

        {/* Copyright */}
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.55rem', letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(135,196,232,0.2)',
          margin: 0,
        }}>
          © 2027 Jyothis &amp; Sneha · Crafted with love by the shore
        </p>
      </div>
    </footer>
  );
}
