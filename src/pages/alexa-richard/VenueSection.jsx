import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

export default function VenueSection() {
  return (
    <section id="ar-venue" className="ar-section" style={{ background: 'var(--ar-cream)' }}>
      <div className="ar-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span
            className="ar-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Getting There
          </motion.span>
          <motion.h2
            className="ar-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Venue & Location
          </motion.h2>
          <FloralDivider style={{ marginTop: '1.5rem' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Venue info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Ceremony */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--ar-green)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <span className="ar-eyebrow" style={{ margin: 0 }}>Ceremony</span>
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem', fontWeight: 500,
                color: 'var(--ar-green)', marginBottom: '0.4rem',
              }}>
                St. Augustine's Church
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ar-text-muted)', lineHeight: 1.8 }}>
                Augustinerstraße 3<br />
                1010 Vienna, Austria<br />
                <em style={{ fontFamily: "'Cormorant Garamond', serif" }}>Ceremony begins at 2:00 PM</em>
              </p>
            </div>

            {/* Reception */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--ar-green)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
                  </svg>
                </div>
                <span className="ar-eyebrow" style={{ margin: 0 }}>Reception</span>
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem', fontWeight: 500,
                color: 'var(--ar-green)', marginBottom: '0.4rem',
              }}>
                Palais Coburg Grand Ballroom
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ar-text-muted)', lineHeight: 1.8 }}>
                Coburgbastei 4<br />
                1010 Vienna, Austria<br />
                <em style={{ fontFamily: "'Cormorant Garamond', serif" }}>Doors open at 6:00 PM</em>
              </p>
            </div>

            {/* Directions button */}
            <a
              href="https://maps.google.com/?q=St.+Augustine's+Church+Vienna+Austria"
              target="_blank"
              rel="noopener noreferrer"
              className="ar-btn"
              style={{ display: 'inline-block', marginTop: '0.5rem' }}
            >
              Get Directions
            </a>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              overflow: 'hidden',
              height: 380,
              position: 'relative',
            }}
          >
            <iframe
              title="Wedding Venue Map — St. Augustine's Church, Vienna"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.9934936714396!2d16.364!3d48.2046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079c478e4d81%3A0x59c16a14b5af1e37!2sSt.%20Augustine%27s%20Church!5e0!3m2!1sen!2sat!4v1698000000000!5m2!1sen!2sat"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Accommodation note */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginTop: '3.5rem',
            padding: '1.75rem 2rem',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'white',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🏨</span>
          <div>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem', color: 'var(--ar-green)',
              marginBottom: '0.35rem', fontWeight: 500,
            }}>
              Accommodation
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--ar-text-muted)' }}>
              A room block has been reserved at <strong style={{ color: 'var(--ar-green)' }}>Hotel Sacher Vienna</strong> for our guests. Please book before <strong>May 1, 2026</strong> using code <strong style={{ color: 'var(--ar-gold)' }}>ALEXA-RICHARD-2026</strong> for a special rate.
            </p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
