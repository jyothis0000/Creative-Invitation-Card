import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloralDivider from './FloralDivider';

const RSVP_OPTIONS = [
  { value: 'yes',   emoji: '🥂', label: 'Yes, I will attend!' },
  { value: 'no',    emoji: '😔', label: "Unfortunately, I can't" },
  { value: 'later', emoji: '⏳', label: "I'll tell you a bit later" },
];

/* Confetti burst */
function Confetti() {
  const colors = ['#C9A84C','#1B3A2D','#E8BAA3','#C48D77','#FAF7F2','#3E7558'];
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
          className="ar-confetti-piece"
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
  const [form, setForm]         = useState({ name: '', email: '', message: '' });
  const [flying, setFlying]     = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selected) return;
    setFlying(true);
    setTimeout(() => { setFlying(false); setSubmitted(true); }, 1200);
  }

  return (
    <section id="ar-rsvp" className="ar-section" style={{ background: 'var(--ar-ivory)' }}>
      {submitted && <Confetti />}

      {/* Flying envelope animation */}
      {flying && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', bottom: '45%', left: '45%',
            fontSize: '2.5rem', zIndex: 9998, pointerEvents: 'none',
            animation: 'ar-plane-fly 1.1s ease-in-out forwards',
          }}
        >
          💌
        </div>
      )}

      <div className="ar-container--narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span
            className="ar-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Kindly Reply By April 1, 2026
          </motion.span>
          <motion.h2
            className="ar-heading"
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
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* RSVP selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <p className="ar-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  Your Response
                </p>
                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                  {RSVP_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`ar-rsvp-option${selected === opt.value ? ' selected' : ''}`}
                      onClick={() => setSelected(opt.value)}
                    >
                      <div className="ar-rsvp-dot" />
                      <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Fields — shown only when Yes or Maybe */}
              <AnimatePresence>
                {selected && selected !== 'no' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ display: 'grid', gap: '1.25rem', paddingTop: '0.5rem' }}>
                      <div>
                        <label className="ar-label" htmlFor="ar-name">Your Name</label>
                        <input
                          id="ar-name" name="name" type="text"
                          value={form.name} onChange={handleChange}
                          className="ar-input" required
                          placeholder="Alexa & Richard's dearest guest"
                        />
                      </div>
                      <div>
                        <label className="ar-label" htmlFor="ar-email">Email Address</label>
                        <input
                          id="ar-email" name="email" type="email"
                          value={form.email} onChange={handleChange}
                          className="ar-input"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="ar-label" htmlFor="ar-message">A Note for the Couple</label>
                        <textarea
                          id="ar-message" name="message"
                          value={form.message} onChange={handleChange}
                          rows={4}
                          className="ar-input"
                          style={{ resize: 'vertical' }}
                          placeholder="Share your wishes and love..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name field for "No" option */}
              <AnimatePresence>
                {selected === 'no' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingTop: '0.5rem' }}>
                      <label className="ar-label" htmlFor="ar-name-no">Your Name</label>
                      <input
                        id="ar-name-no" name="name" type="text"
                        value={form.name} onChange={handleChange}
                        className="ar-input"
                        placeholder="So we can send you a warm wish"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ marginTop: '2rem', textAlign: 'center' }}
                >
                  <motion.button
                    type="submit"
                    className="ar-btn ar-btn--solid"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontSize: '0.75rem', letterSpacing: '0.25em' }}
                  >
                    Send My RSVP 💌
                  </motion.button>
                </motion.div>
              )}
            </motion.form>
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
                color: 'var(--ar-green)', marginBottom: '0.75rem',
              }}>
                Thank You!
              </h3>
              <FloralDivider style={{ margin: '1rem 0' }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'var(--ar-text-muted)',
                marginBottom: '0.5rem',
              }}>
                {selected === 'yes'
                  ? "We can't wait to celebrate with you!"
                  : selected === 'no'
                  ? "We'll miss you dearly — we'll think of you on the day."
                  : "Take your time — we'll be here whenever you're ready."}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--ar-text-muted)' }}>
                — Alexa & Richard
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
