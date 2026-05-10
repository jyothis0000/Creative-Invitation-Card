import { motion } from 'framer-motion';
import WaveDecor from './WaveDecor';

const EVENTS = [
  {
    time: '4:00 PM',
    name: 'Welcome Cocktails on the Deck',
    location: 'Sunset Deck, Coral Cove Resort',
    description: 'Arrive to tropical drinks, ocean breezes, and golden light as the day begins to soften.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 6h12l-4 8h-4L8 6Z" stroke="#3DBFB8" strokeWidth="1.4" fill="rgba(61,191,184,0.12)" strokeLinejoin="round" />
        <path d="M12 14v6" stroke="#3DBFB8" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 20h10" stroke="#3DBFB8" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M16 8l2-2" stroke="#E8805A" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="19" cy="5" r="1.2" fill="#E8805A" opacity="0.7" />
      </svg>
    ),
  },
  {
    time: '5:00 PM',
    name: 'Beach Ceremony at Sunset',
    location: 'Private Beach, Coral Cove Resort',
    description: 'Exchange vows as the sun dips toward the horizon, with waves as witnesses and sand beneath your feet.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="#D4A840" strokeWidth="1.4" fill="rgba(212,168,64,0.1)" />
        <path d="M14 2v2M14 18v2M2 10h2M22 10h2" stroke="#D4A840" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5.5 4.5l1.4 1.4M21.1 4.5l-1.4 1.4" stroke="#D4A840" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M4 20 Q9 16 14 19 Q19 22 24 19" stroke="#3DBFB8" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: '6:15 PM',
    name: 'Golden Hour Photo Walk',
    location: 'Shoreline & Rock Pools',
    description: 'Stroll with the newlyweds along the shore as the sky turns amber and memories are made.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="9" width="18" height="13" rx="2" stroke="#3DBFB8" strokeWidth="1.4" fill="rgba(61,191,184,0.08)" />
        <circle cx="14" cy="15.5" r="3.5" stroke="#3DBFB8" strokeWidth="1.3" />
        <path d="M10 9l1.5-3h5L18 9" stroke="#3DBFB8" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="19.5" cy="12" r="1" fill="#D4A840" />
      </svg>
    ),
  },
  {
    time: '7:30 PM',
    name: 'Candlelit Dinner on the Shore',
    location: 'Beach Dining Tables, Coral Cove',
    description: 'Dine under the stars with candlelight reflecting on the waves, seafood fresh from the ocean.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 22V12c0-3.3 2.7-6 6-6s6 2.7 6 6v10" stroke="#3DBFB8" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5 22h18" stroke="#3DBFB8" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 6V4" stroke="#D4A840" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M11 7l-1-2M17 7l1-2" stroke="#D4A840" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: '9:00 PM',
    name: 'Bonfire & Barefoot Dance',
    location: 'Beach Bonfire, North End',
    description: 'Kick off your shoes, feel the sand, and dance around the bonfire until the stars fade.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 22c4 0 7-3 7-7 0-2.5-2-4.5-4-3.5 1-2-1-5-3-4 1-2-2-4-4-2.5C7.5 6.5 7 9 8 11c-2-1-4 1-4 3.5 0 4 3 7 7 7" fill="rgba(232,128,90,0.15)" stroke="#E8805A" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M14 22c2 0 3.5-1.5 3.5-3.5 0-1.2-1-2.2-2-1.7.5-1-.5-2.5-1.5-2" stroke="#D4A840" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M4 22h20" stroke="#3DBFB8" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function EventsSection() {
  return (
    <section id="js-events" className="js-section" style={{ background: 'var(--js-sky-light)', background: 'linear-gradient(180deg, #FFFDF7 0%, #EAF5FD 100%)' }}>
      <div className="js-container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span className="js-eyebrow"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            The Celebration
          </motion.span>
          <motion.h2 className="js-heading"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Day at a Glance
          </motion.h2>
          <WaveDecor style={{ marginTop: '1.5rem' }} />
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {EVENTS.map((ev, i) => (
            <motion.div
              key={i}
              className="js-event-card"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                {/* Time */}
                <div style={{ flexShrink: 0, minWidth: 70 }}>
                  <span style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.7rem', letterSpacing: '0.15em',
                    fontWeight: 700, color: 'var(--js-gold)',
                  }}>
                    {ev.time}
                  </span>
                </div>

                {/* Icon */}
                <div style={{
                  flexShrink: 0, width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(61,191,184,0.07)',
                  borderRadius: '50%',
                  border: '1px solid rgba(61,191,184,0.2)',
                }}>
                  {ev.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.15rem', fontWeight: 600,
                    color: 'var(--js-text)', margin: '0 0 0.2rem',
                  }}>
                    {ev.name}
                  </h3>
                  <p className="js-label" style={{ marginBottom: '0.5rem', color: 'var(--js-turq)' }}>
                    {ev.location}
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic', fontSize: '1rem',
                    color: 'var(--js-text-muted)', lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {ev.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: '3rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '1rem',
            color: 'var(--js-text-muted)',
          }}>
          Dress code: Beach Elegant · Pastels & Whites welcome
        </motion.p>
      </div>
    </section>
  );
}
