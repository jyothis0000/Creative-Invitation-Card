import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function OurStorySection() {
  return (
    <section id="aa-story" className="aa-section" style={{ background: 'var(--aa-cream)' }}>
      <div className="aa-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span className="aa-eyebrow" {...fadeUp} transition={{ duration: 0.7 }}>
            How It All Began
          </motion.span>
          <motion.h2
            className="aa-heading"
            {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Our Story
          </motion.h2>
          <FloralDivider style={{ marginTop: '1.5rem' }} />
        </div>

        {/* Story blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Chapter 1 */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--aa-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <span className="aa-eyebrow" style={{ textAlign: 'left' }}>2019 — First Meeting</span>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem', fontWeight: 500,
              color: 'var(--aa-green)', marginBottom: '1rem',
            }}>
              A Chance Encounter
            </h3>
            <p style={{ lineHeight: 1.9, color: 'var(--aa-text-muted)', fontSize: '0.95rem' }}>
              It was a rainy Tuesday afternoon at a small bookshop in Vienna's first district. Athira reached for a worn copy of Pablo Neruda's poetry — and so did Abhishek. Their fingers touched, their eyes met, and neither could look away. With a laugh and an apology, they agreed to share the book over coffee that never ended.
            </p>
          </motion.div>

          {/* Chapter 2 */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.35 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--aa-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="aa-eyebrow" style={{ textAlign: 'left' }}>2021 — Growing Deeper</span>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem', fontWeight: 500,
              color: 'var(--aa-green)', marginBottom: '1rem',
            }}>
              Two Years of Adventure
            </h3>
            <p style={{ lineHeight: 1.9, color: 'var(--aa-text-muted)', fontSize: '0.95rem' }}>
              From weekend escapes to ancient monasteries in the Austrian Alps, to midnight drives along the Danube, their love grew quietly and fiercely. Through every climb and quiet evening, they discovered a shared language — one of laughter, curiosity, and a deep, unspoken knowing.
            </p>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.5 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--aa-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="aa-eyebrow" style={{ textAlign: 'left' }}>2024 — The Proposal</span>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem', fontWeight: 500,
              color: 'var(--aa-green)', marginBottom: '1rem',
            }}>
              Yes, Forever
            </h3>
            <p style={{ lineHeight: 1.9, color: 'var(--aa-text-muted)', fontSize: '0.95rem' }}>
              On a golden September evening beneath a canopy of roses in Schönbrunn Palace Gardens, Abhishek dropped to one knee with trembling hands and a ring that had belonged to his grandmother. Athira said yes before he finished the question — and the world stood still for a perfect, shining moment.
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          {...fadeUp} transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            marginTop: '5rem',
            textAlign: 'center',
            borderLeft: 'none',
            padding: '0 2rem',
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: 'var(--aa-green)',
            lineHeight: 1.6,
            fontWeight: 300,
          }}>
            "I have waited for this day longer than I have known you."
          </p>
          <footer style={{
            marginTop: '0.75rem',
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--aa-gold)',
          }}>
            — Athira
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
