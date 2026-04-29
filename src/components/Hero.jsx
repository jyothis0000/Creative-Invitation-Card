import { motion } from 'framer-motion';
import KasavuBorder from './ui/KasavuBorder';
import NilavilakkuLamp from './ui/NilavilakkuLamp';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #3a0a0a 0%, #8B0000 30%, #C8941A 60%, #5a3000 100%)',
      }}
    >
      {/* Parallax texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,148,26,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 20% 80%, rgba(139,0,0,0.4) 0%, transparent 50%),
          radial-gradient(ellipse 60% 80% at 80% 80%, rgba(139,0,0,0.4) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Subtle grain texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundSize: '200px',
        pointerEvents: 'none',
      }} />

      {/* Top kasavu border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <KasavuBorder />
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '5rem 2rem 4rem' }}>
        {/* Lamp row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <NilavilakkuLamp size={64} />
          </motion.div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
          >
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 9vw, 6rem)',
                color: '#C8941A',
                letterSpacing: '0.05em',
                lineHeight: 1.05,
                fontWeight: 500,
                textShadow: '0 2px 40px rgba(200,148,26,0.4)',
              }}
            >
              Athira
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                style={{ display: 'block', fontSize: '0.45em', color: '#FAF3E0', fontStyle: 'italic', letterSpacing: '0.2em', margin: '0.2em 0' }}
              >
                &amp;
              </motion.span>
              Abhishek
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <NilavilakkuLamp size={64} />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#FAF3E0',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}>
            The beginning of forever
          </p>
          <p style={{
            fontFamily: "'Noto Serif Malayalam', serif",
            fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
            color: '#FAF3E0CC',
            letterSpacing: '0.02em',
          }}>
            ഒരു ജീവിതകാലം ഒരുമിച്ച്
          </p>
        </motion.div>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          style={{
            marginTop: '2.5rem',
            display: 'inline-block',
            border: '1.5px solid #C8941A',
            padding: '0.6rem 2rem',
            borderRadius: '2px',
            background: 'rgba(200,148,26,0.1)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C8941A',
            fontWeight: 700,
          }}>
            November 22, 2025
          </p>
        </motion.div>

        {/* Hashtag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            marginTop: '1.5rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            color: '#C8941Aaa',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
          }}
        >
          #AthiraWithAbhishek
        </motion.p>
      </div>

      {/* Bottom kasavu border */}
      <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0 }}>
        <KasavuBorder flip />
      </div>

      {/* Bouncing lotus scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
        }}
        aria-label="Scroll down"
        onClick={() => document.getElementById('save-the-date')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <ellipse cx="16" cy="10" rx="6" ry="8" fill="none" stroke="#C8941A" strokeWidth="1.5" />
          <ellipse cx="9" cy="16" rx="5" ry="7" fill="none" stroke="#C8941A" strokeWidth="1.2" opacity="0.7" transform="rotate(-35, 9, 16)" />
          <ellipse cx="23" cy="16" rx="5" ry="7" fill="none" stroke="#C8941A" strokeWidth="1.2" opacity="0.7" transform="rotate(35, 23, 16)" />
          <circle cx="16" cy="10" r="3" fill="#C8941A" />
          <line x1="16" y1="22" x2="16" y2="30" stroke="#C8941A" strokeWidth="1.5" />
          <polyline points="12,27 16,31 20,27" fill="none" stroke="#C8941A" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </section>
  );
}
