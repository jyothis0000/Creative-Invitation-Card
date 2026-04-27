import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKIP_KEY = 'aw_envelope_seen';

export default function EnvelopeIntro({ onDone }) {
  const [phase, setPhase] = useState('seal'); // seal → open → slide → done
  const skipRef = useRef(false);

  useEffect(() => {
    /* prefers-reduced-motion → instant skip */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }
    /* session seen → skip */
    if (sessionStorage.getItem(SKIP_KEY)) {
      onDone();
      return;
    }

    const t1 = setTimeout(() => setPhase('open'), 800);
    const t2 = setTimeout(() => setPhase('slide'), 2000);
    const t3 = setTimeout(() => setPhase('done'), 3200);
    const t4 = setTimeout(() => {
      sessionStorage.setItem(SKIP_KEY, '1');
      onDone();
    }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  function handleSkip() {
    if (skipRef.current) return;
    skipRef.current = true;
    sessionStorage.setItem(SKIP_KEY, '1');
    onDone();
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #3a1a00 0%, #1a0800 50%, #0a0400 100%)',
          }}
          onClick={handleSkip}
        >
          {/* Glowing nilavilakku background */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(200,148,26,0.12) 0%, transparent 70%)',
          }} />

          {/* Envelope container */}
          <div
            className="relative"
            style={{
              width: 'min(520px, 90vw)',
              height: 'min(360px, 62vw)',
              perspective: '800px',
            }}
          >
            {/* Envelope body */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #F5E6C8 0%, #EDD8A0 40%, #E0C878 100%)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 4px 20px rgba(200,148,26,0.4)',
                border: '2px solid #C8941A',
              }}
            >
              {/* Kasavu border inside envelope */}
              <KasavuEnvelopeBorder />

              {/* Bottom triangle fold */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, #D4A843 0%, #EDD8A0 100%)',
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }} />

              {/* Left fold */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%',
                background: 'linear-gradient(to right, #C8941A22, transparent)',
                clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
              }} />
              {/* Right fold */}
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
                background: 'linear-gradient(to left, #C8941A22, transparent)',
                clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
              }} />
            </div>

            {/* Flap — top triangle with 3D flip */}
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '52%',
                transformOrigin: 'center top',
                transformStyle: 'preserve-3d',
                transform: phase === 'open' || phase === 'slide'
                  ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                transition: 'transform 1.2s ease-out',
                zIndex: 10,
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(160deg, #EDD8A0 0%, #D4A843 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
                border: '1px solid #C8941A44',
              }}>
                {/* Wax seal */}
                <div style={{
                  position: 'absolute',
                  bottom: 8, left: '50%',
                  transform: 'translateX(-50%)',
                }}>
                  <WaxSeal cracking={phase === 'open'} />
                </div>
              </div>
            </div>

            {/* Invitation card sliding up */}
            {(phase === 'slide' || phase === 'done') && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="absolute inset-x-4 rounded-lg flex flex-col items-center justify-center text-center"
                style={{
                  top: '12%', bottom: '10%',
                  background: 'linear-gradient(160deg, #FDF6E3 0%, #FAF3E0 100%)',
                  border: '2px solid #C8941A',
                  zIndex: 5,
                  padding: '1.5rem',
                }}
              >
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C8941A', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  You are cordially invited
                </p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', color: '#8B0000', fontWeight: 600, lineHeight: 1.1 }}>
                  Athira<br />
                  <span style={{ fontSize: '0.8em', color: '#C8941A', fontStyle: 'italic' }}>&amp;</span>
                  <br />Abhishek
                </h1>
                <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.85rem', color: '#5C3317', marginTop: '0.5rem' }}>
                  ഒരു ജീവിതകാലം ഒരുമിച്ച്
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: '#C8941A', marginTop: '0.4rem', letterSpacing: '0.1em', fontStyle: 'italic' }}>
                  #AthiraWithAbhishek
                </p>
              </motion.div>
            )}
          </div>

          {/* Skip hint */}
          <p style={{
            marginTop: '2rem',
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.7rem',
            color: '#C8941A66',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Click anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function KasavuEnvelopeBorder() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 100 100" preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="94" height="94" fill="none" stroke="#C8941A" strokeWidth="0.8" opacity="0.6" />
      <rect x="5" y="5" width="90" height="90" fill="none" stroke="#C8941A" strokeWidth="0.4" opacity="0.4" />
      {/* corner lotus nodes */}
      {[[8,8],[92,8],[8,92],[92,92]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#C8941A" opacity="0.7" />
      ))}
    </svg>
  );
}

function WaxSeal({ cracking }) {
  return (
    <div style={{ position: 'relative', width: 56, height: 56 }}>
      <svg width="56" height="56" viewBox="0 0 56 56" aria-label="Red wax seal with lotus">
        <circle cx="28" cy="28" r="26" fill="#8B0000" />
        <circle cx="28" cy="28" r="22" fill="#a30000" />
        {/* Lotus in seal */}
        <g transform="translate(28,28)">
          <ellipse cx="0" cy="-8" rx="5" ry="7" fill="#FAF3E0" opacity="0.8" />
          <ellipse cx="-6" cy="-2" rx="5" ry="7" fill="#FAF3E0" opacity="0.7" transform="rotate(-50)" />
          <ellipse cx="6" cy="-2" rx="5" ry="7" fill="#FAF3E0" opacity="0.7" transform="rotate(50)" />
          <ellipse cx="0" cy="6" rx="5" ry="6" fill="#FAF3E0" opacity="0.6" />
          <circle cx="0" cy="-2" r="4" fill="#C8941A" />
        </g>
        <circle cx="28" cy="28" r="26" fill="none" stroke="#E8B84B" strokeWidth="1.5" />
      </svg>
      {/* Cracking overlay */}
      {cracking && (
        <div style={{
          position: 'absolute', inset: 0,
          animation: 'wax-crack 1.2s ease-out forwards',
          background: '#8B0000',
          borderRadius: '50%',
        }} />
      )}
    </div>
  );
}
