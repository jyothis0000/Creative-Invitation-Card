import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloralDivider from './FloralDivider';

const RSVP_OPTIONS = [
  { value: 'yes', emoji: '🥂', label: 'Yes, I will attend!' },
  { value: 'no', emoji: '😔', label: "Unfortunately, I can't" },
  // { value: 'later', emoji: '⏳', label: "I'll tell you a bit later" },
];

/* Confetti burst */
function Confetti() {
  const colors = ['#C9A84C', '#1B3A2D', '#E8BAA3', '#C48D77', '#FAF7F2', '#3E7558'];
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
          className="aa-confetti-piece"
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
  const [selected, setSelected] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [flying, setFlying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function openPopup(value) {
    setSelected(value);
    setPopupOpen(true);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selected) return;
    setPopupOpen(false);
    setFlying(true);
    setTimeout(() => { setFlying(false); setSubmitted(true); }, 1200);
  }

  return (
    <section id="aa-rsvp" className="aa-section" style={{ background: 'var(--aa-ivory)' }}>
      {submitted && <Confetti />}

      {/* Flying envelope animation */}
      {flying && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', bottom: '45%', left: '45%',
            fontSize: '2.5rem', zIndex: 9998, pointerEvents: 'none',
            animation: 'aa-plane-fly 1.1s ease-in-out forwards',
          }}
        >
          💌
        </div>
      )}

      <div className="aa-container--narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span
            className="aa-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Kindly Reply By April 1, 2026
          </motion.span>
          <motion.h2
            className="aa-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Will You Join Us?
          </motion.h2>
          <FloralDivider style={{ marginTop: '1.5rem' }} />
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="options"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="aa-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
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
                    className={`aa-rsvp-option${selected === opt.value ? ' selected' : ''}`}
                    onClick={() => openPopup(opt.value)}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="aa-rsvp-dot" />
                    <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
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
                border: '1px solid rgba(201,168,76,0.4)',
                padding: '4rem 2rem',
                background: 'white',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🌸</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem', fontWeight: 500,
                color: 'var(--aa-green)', marginBottom: '0.75rem',
              }}>
                Thank You!
              </h3>
              <FloralDivider style={{ margin: '1rem 0' }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'var(--aa-text-muted)',
                marginBottom: '0.5rem',
              }}>
                {selected === 'yes'
                  ? "We can't wait to celebrate with you!"
                  : selected === 'no'
                    ? "We'll miss you dearly — we'll think of you on the day."
                    : "Take your time — we'll be here whenever you're ready."}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--aa-text-muted)' }}>
                — Abhishek & Athira
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Popup Modal ── */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="aa-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePopup}
          >
            {/* Panel — child of backdrop so flex centering works */}
            <motion.div
              className="aa-popup"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                type="button"
                className="aa-popup-close"
                onClick={closePopup}
                aria-label="Close"
              >
                ×
              </button>

              {/* Selected option badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.9rem 1.2rem',
                background: 'var(--aa-ivory)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 4,
                marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                  {RSVP_OPTIONS.find(o => o.value === selected)?.emoji}
                </span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: 'var(--aa-text-muted)',
                }}>
                  {RSVP_OPTIONS.find(o => o.value === selected)?.label}
                </span>
              </div>

              <FloralDivider style={{ margin: '0 0 1.5rem' }} />

              <form onSubmit={handleSubmit}>
                <motion.button
                  type="submit"
                  className="aa-btn aa-btn--solid"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ fontSize: '0.75rem', letterSpacing: '0.25em', width: '100%' }}
                >
                  Send My RSVP 💌
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
