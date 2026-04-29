import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';
import caricature from '../../assets/caricature.png';

export default function FooterSection() {
  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #111A15 0%, #1B3A2D 100%)',
        padding: '5rem 1.5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 Q720,50 1440,0 L1440,0 L0,0 Z" fill="var(--aa-cream)" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, width: '100%' }}>
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
              A&A
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 500,
            color: '#FAF7F2',
            lineHeight: 1.1,
          }}>
            Abhishek &amp; Athira
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
            May 24, 2026 — Vienna, Austria
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'rgba(201,168,76,0.7)',
          }}>
            #AbhishekAndAthira
          </p>
        </motion.div>


      </div>

      {/* Caricature — in normal flow, sits at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: '2.5rem',
        }}
      >
        <img
          src={caricature}
          alt="Athira and Abhishek caricature"
          className="aa-footer-caricature"
          style={{ display: 'block', width: 'auto', objectFit: 'contain' }}
        />
      </motion.div>
      <p style={{
        marginBottom: '1rem',
        fontFamily: "'Lato', sans-serif",
        fontSize: '0.85rem',
        color: 'rgba(201,168,76,0.3)',
        letterSpacing: '0.15em',
      }}>
        Designed by ♥ Digitaalbuddha
      </p>
    </footer>
  );
}
