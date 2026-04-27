import { motion } from 'framer-motion';
import KasavuBorder from './ui/KasavuBorder';
import CountdownTimer from './ui/CountdownTimer';
import LotusDivider from './ui/LotusDivider';

export default function SaveTheDate() {
  return (
    <section
      id="save-the-date"
      style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}
    >
      <KasavuBorder className="mb-12" />

      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        {/* Malayalam heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Noto Serif Malayalam', serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            color: 'var(--gold)',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}
        >
          ശുഭദിനം
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: 'var(--red)',
            fontWeight: 600,
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}
        >
          Save the Date
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: '#5C3317',
          }}
        >
          Auspicious Day
        </motion.p>

        <LotusDivider className="my-10" />

        {/* Date card — double-line gold SVG frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{ position: 'relative', display: 'inline-block', marginBottom: '3.5rem' }}
        >
          {/* Outer frame SVG */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 100 100" preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="96" height="96" fill="none" stroke="#C8941A" strokeWidth="1.5" />
            <rect x="4.5" y="4.5" width="91" height="91" fill="none" stroke="#C8941A" strokeWidth="0.7" />
            {[[6,6],[94,6],[6,94],[94,94]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#C8941A" />
            ))}
            {/* Side lotus ornaments */}
            <ellipse cx="50" cy="2" rx="6" ry="3" fill="#C8941A" opacity="0.7" />
            <ellipse cx="50" cy="98" rx="6" ry="3" fill="#C8941A" opacity="0.7" />
            <ellipse cx="2" cy="50" rx="3" ry="6" fill="#C8941A" opacity="0.7" />
            <ellipse cx="98" cy="50" rx="3" ry="6" fill="#C8941A" opacity="0.7" />
          </svg>

          <div style={{ padding: '2.5rem 3.5rem' }}>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.8rem',
              fontWeight: 700,
            }}>
              Wedding Day
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: 'var(--red)',
              fontWeight: 600,
              lineHeight: 1,
            }}>
              22
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
              color: 'var(--brown)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              November 2025
            </p>
            <div style={{ margin: '0.8rem 0', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
            <p style={{
              fontFamily: "'Noto Serif Malayalam', serif",
              fontSize: '1rem',
              color: 'var(--brown)',
            }}>
              Karthika Nakshatram
            </p>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.85rem',
              color: '#5C3317',
              marginTop: '0.3rem',
            }}>
              10:00 AM onwards
            </p>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
            fontWeight: 700,
          }}>
            Counting Down to Our Day
          </p>
          <CountdownTimer />
        </motion.div>
      </div>

      <KasavuBorder className="mt-12" flip />
    </section>
  );
}
