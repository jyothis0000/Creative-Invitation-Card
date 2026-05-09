import { motion } from 'framer-motion';
import MandalaDecor from './MandalaDecor';

const events = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    time: '5:30 PM',
    name: 'Guest Arrival & Welcome',
    location: 'Grand Foyer, Ritz Palace',
    desc: 'Guests arrive to the fragrance of marigolds and rose petals. Be welcomed by the family with garlands and traditional aarti.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    time: '6:30 PM',
    name: 'Baraat & Groom Entry',
    location: 'Palace Entrance',
    desc: 'The groom arrives in a grand procession with dhol, shehnai and dancing relatives — a celebration of joy before the sacred union begins.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    time: '7:15 PM',
    name: 'Var Mala Ceremony',
    location: 'Main Mandap',
    desc: 'Rohan and Ananya exchange flower garlands in the Var Mala — a beautiful tradition symbolising their acceptance of each other.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    time: '8:00 PM',
    name: 'Saptapadi & Sacred Vows',
    location: 'Main Mandap',
    desc: 'The couple takes the seven sacred steps around the holy fire, binding their souls in a lifelong promise witnessed by family and God.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    time: '9:30 PM',
    name: 'Grand Dinner & Reception',
    location: 'Palace Banquet Hall',
    desc: 'Savour an elaborate spread of North Indian cuisine, live music and the warm company of loved ones as the night of celebrations continues.',
  },
];

export default function EventsSection() {
  return (
    <section
      id="ra-events"
      className="ra-section"
      style={{ background: 'var(--ra-cream)' }}
    >
      <div className="ra-container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            className="ra-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            December 12, 2026
          </motion.span>
          <motion.h2
            className="ra-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Wedding Celebrations
          </motion.h2>
          <MandalaDecor style={{ marginTop: '1.75rem' }} />
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {events.map((ev, i) => (
            <motion.div
              key={ev.name}
              className="ra-event-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '1.5rem',
                alignItems: 'start',
              }}>
                {/* Time */}
                <div style={{ minWidth: 76, textAlign: 'right', paddingTop: '0.15rem' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--ra-gold)',
                    whiteSpace: 'nowrap',
                  }}>
                    {ev.time}
                  </span>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--ra-ivory)',
                    border: '1px solid rgba(200,150,46,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--ra-maroon)',
                  }}>
                    {ev.icon}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.1rem', fontWeight: 500,
                      color: 'var(--ra-maroon)',
                      marginBottom: '0.2rem',
                    }}>
                      {ev.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ra-gold)',
                      marginBottom: '0.4rem',
                    }}>
                      {ev.location}
                    </p>
                    <p style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      color: 'var(--ra-text-muted)',
                    }}>
                      {ev.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
