import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaveDecor from './WaveDecor';

const RSVP_OPTIONS = [
  { value: 'yes', emoji: '🌊', label: "Yes, count me in!" },
  { value: 'no',  emoji: '🌴', label: "Sending love, can't make it" },
];

function Confetti() {
  const colors = ['#87C4E8', '#3DBFB8', '#F2DEB3', '#2E6FA8', '#E8805A', '#FFFDF7', '#C8E8F8', '#D4A840'];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    color: colors[i % colors.length],
    dur: 2 + Math.random() * 2,
    delay: Math.random() * 0.8,
    size: 6 + Math.random() * 6,
    drift: `${(Math.random() - 0.5) * 120}px`,
  }));
  return (
    <>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="js-confetti-piece"
          style={{
            left: p.left,
            width: p.size, height: p.size,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--drift': p.drift,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </>
  );
}

export default function RSVPSection() {
  const [selected, setSelected]         = useState(null);
  const [popupOpen, setPopupOpen]       = useState(false);
  const [flying, setFlying]             = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [guestCount, setGuestCount]     = useState(1);
  const [changing, setChanging]         = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selected) return;
    setPopupOpen(false);
    setFlying(true);
    setTimeout(() => {
      setFlying(false);
      setSubmitted(true);
      setJustSubmitted(true);
      setChanging(false);
    }, 1200);
  }

  const showForm = !submitted || changing;

  return (
    <section id="js-rsvp" className="js-section" style={{ background: 'var(--js-cream)' }}>
      {justSubmitted && <Confetti />}

      {flying && (
        <div aria-hidden="true" style={{
          position: 'fixed', bottom: '45%', left: '45%',
          fontSize: '2.5rem', zIndex: 9998, pointerEvents: 'none',
          animation: 'js-fly 1.1s ease-in-out forwards',
        }}>
          💌
        </div>
      )}

      <div className="js-container--narrow">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span className="js-eyebrow"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            Kindly Reply
          </motion.span>
          <motion.h2 className="js-heading"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Will You Join Us at the Shore?
          </motion.h2>
          <WaveDecor style={{ marginTop: '1.5rem' }} />
        </div>

        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="options"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="js-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Your Response
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ display: 'grid', gap: '0.75rem' }}
              >
                {RSVP_OPTIONS.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    type="button"
                    className={`js-rsvp-option${selected === opt.value ? ' selected' : ''}`}
                    onClick={() => { setSelected(opt.value); setPopupOpen(true); }}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="js-rsvp-dot" />
                    <span style={{ fontSize: '1.3rem' }}>{opt.emoji}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                      {opt.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center',
                border: '1px solid rgba(61,191,184,0.3)',
                padding: '4rem 2rem',
                background: 'white',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                {selected === 'yes' ? '🌊' : '🌴'}
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem', fontWeight: 500,
                color: 'var(--js-deep)', marginBottom: '0.75rem',
              }}>
                {selected === 'yes' ? 'See You at the Shore!' : 'You Will Be Missed!'}
              </h3>
              <WaveDecor style={{ margin: '1rem 0' }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'var(--js-text-muted)',
                marginBottom: '0.5rem',
              }}>
                {selected === 'yes'
                  ? 'Get ready for sand, sun, and the most beautiful celebration!'
                  : 'We carry you in our hearts as we say our vows by the sea.'}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--js-text-muted)', marginBottom: '1.75rem' }}>
                — Jyothis &amp; Sneha
              </p>
              <button
                type="button"
                onClick={() => { setChanging(true); setSubmitted(false); }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(61,191,184,0.4)',
                  color: 'var(--js-text-muted)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1.25rem',
                  cursor: 'pointer',
                  borderRadius: 2,
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                Change My Response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="js-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPopupOpen(false)}
          >
            <motion.div
              className="js-popup"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                className="js-popup-close"
                onClick={() => setPopupOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              <WaveDecor style={{ marginBottom: '1.5rem' }} />

              <form onSubmit={handleSubmit}>
                {selected === 'yes' && (
                  <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <p style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.58rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'var(--js-text-muted)',
                    }}>
                      Number of Guests
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setGuestCount(c => Math.max(1, c - 1))}
                        style={{
                          width: 36, height: 36, border: '1px solid rgba(61,191,184,0.5)',
                          background: 'transparent', color: 'var(--js-turq)',
                          fontSize: '1.2rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >−</button>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.6rem', fontWeight: 600,
                        color: 'var(--js-deep)',
                        minWidth: 28, textAlign: 'center',
                      }}>
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(c => Math.min(10, c + 1))}
                        style={{
                          width: 36, height: 36, border: '1px solid rgba(61,191,184,0.5)',
                          background: 'transparent', color: 'var(--js-turq)',
                          fontSize: '1.2rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >+</button>
                    </div>
                  </div>
                )}
                <motion.button
                  type="submit"
                  className="js-btn js-btn--solid"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ fontSize: '0.72rem', letterSpacing: '0.25em', width: '100%' }}
                >
                  Send My Reply 💌
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
