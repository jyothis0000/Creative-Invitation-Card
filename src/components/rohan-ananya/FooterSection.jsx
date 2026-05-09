import { motion } from 'framer-motion';
import MandalaDecor from './MandalaDecor';

export default function FooterSection() {
  return (
    <footer style={{
      background: 'var(--ra-dark)',
      padding: 'clamp(3rem, 8vw, 5rem) 1.5rem 2.5rem',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.52rem',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'rgba(200,150,46,0.55)',
          marginBottom: '1.25rem',
        }}>
          With love & blessings
        </p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: 500,
          color: '#FEF6EC',
          lineHeight: 1,
          margin: 0,
        }}>
          Rohan
        </h2>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '1rem',
          margin: '0.75rem 0',
        }}>
          <div style={{ height: 1, width: 60, background: 'rgba(200,150,46,0.35)' }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            color: '#C8962E',
          }}>
            &amp;
          </span>
          <div style={{ height: 1, width: 60, background: 'rgba(200,150,46,0.35)' }} />
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: 500,
          color: '#FEF6EC',
          lineHeight: 1,
          margin: 0,
        }}>
          Ananya
        </h2>

        <MandalaDecor style={{ margin: '2rem 0' }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'rgba(254,246,236,0.55)',
          marginBottom: '0.4rem',
        }}>
          December 12, 2026 · The Ritz Grand Palace, Jaipur
        </p>

        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(200,150,46,0.4)',
          marginTop: '2.5rem',
        }}>
          © 2026 Rohan & Ananya
        </p>
      </motion.div>
    </footer>
  );
}
