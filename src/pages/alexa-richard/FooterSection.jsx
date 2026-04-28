import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

export default function FooterSection() {
  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #111A15 0%, #1B3A2D 100%)',
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 Q720,50 1440,0 L1440,0 L0,0 Z" fill="var(--ar-cream)" />
        </svg>
      </div>

      {/* Corner botanical */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, left: 0, width: 160, height: 160, opacity: 0.1 }}
        viewBox="0 0 160 160"
      >
        <ellipse cx="30" cy="60" rx="14" ry="40" fill="#C9A84C" transform="rotate(-25 30 60)" />
        <ellipse cx="55" cy="45" rx="11" ry="32" fill="#C9A84C" transform="rotate(-12 55 45)" />
        <ellipse cx="80" cy="35" rx="9" ry="28" fill="#C9A84C" transform="rotate(0 80 35)" />
      </svg>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, right: 0, width: 160, height: 160, opacity: 0.1, transform: 'scaleX(-1)' }}
        viewBox="0 0 160 160"
      >
        <ellipse cx="30" cy="60" rx="14" ry="40" fill="#C9A84C" transform="rotate(-25 30 60)" />
        <ellipse cx="55" cy="45" rx="11" ry="32" fill="#C9A84C" transform="rotate(-12 55 45)" />
        <ellipse cx="80" cy="35" rx="9" ry="28" fill="#C9A84C" transform="rotate(0 80 35)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, margin: '0 auto' }}>
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            border: '1.5px solid rgba(201,168,76,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              color: '#C9A84C',
              fontStyle: 'italic',
            }}>
              A&R
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 500,
            color: '#FAF7F2',
            lineHeight: 1.1,
          }}>
            Alexa &amp; Richard
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FloralDivider color="#C9A84C" style={{ margin: '1.5rem 0' }} />

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: 'rgba(232,186,163,0.9)',
            marginBottom: '1rem',
            lineHeight: 1.7,
          }}>
            "Whatever our souls are made of,<br />his and mine are the same."
          </p>
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)',
          }}>
            — Emily Brontë
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginTop: '3rem' }}
        >
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '0.5rem',
          }}>
            September 14, 2025 — Vienna, Austria
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'rgba(201,168,76,0.7)',
          }}>
            #AlexaAndRichard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a href="#ar-hero" className="ar-btn" style={{ fontSize: '0.6rem', borderColor: 'rgba(201,168,76,0.35)', color: 'rgba(201,168,76,0.7)' }}>
            Back to Top
          </a>
          <a href="#ar-rsvp" className="ar-btn" style={{ fontSize: '0.6rem' }}>
            RSVP
          </a>
        </motion.div>

        <p style={{
          marginTop: '4rem',
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.65rem',
          color: 'rgba(201,168,76,0.3)',
          letterSpacing: '0.15em',
        }}>
          Made with ♥ for Alexa & Richard
        </p>
      </div>
    </footer>
  );
}
