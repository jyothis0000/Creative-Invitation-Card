import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

const events = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    time: '1:00 PM',
    name: 'Guest Arrival',
    location: "St. Augustine's Church, Vienna",
    desc: 'Doors open. Guests are welcomed with champagne and floral arrangements.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    time: '2:00 PM',
    name: 'Wedding Ceremony',
    location: "St. Augustine's Church, Vienna",
    desc: 'An intimate ceremony where Athira and Abhishek exchange their vows and rings.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    time: '4:00 PM',
    name: 'Cocktail Hour',
    location: 'Rose Garden Terrace',
    desc: 'Enjoy signature cocktails, canapés, and live acoustic music in the garden.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.15 12 19.79 19.79 0 0 1 .08 3.41 2 2 0 0 1 2.03 1H5a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 20 16"/>
      </svg>
    ),
    time: '6:00 PM',
    name: 'Wedding Reception',
    location: 'Grand Ballroom, Palais Coburg',
    desc: 'Dinner, dancing, toasts, and cake cutting. A night to remember forever.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    ),
    time: '9:00 PM',
    name: 'Fireworks & Farewell',
    location: 'Palace Gardens',
    desc: 'Send off the newlyweds beneath a sky lit with fireworks and dancing lanterns.',
  },
];

export default function EventsSection() {
  return (
    <section
      id="aa-events"
      className="aa-section"
      style={{
        background: 'linear-gradient(180deg, var(--aa-ivory) 0%, var(--aa-cream) 100%)',
      }}
    >
      <div className="aa-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            className="aa-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            May 24, 2026
          </motion.span>
          <motion.h2
            className="aa-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            The Day's Events
          </motion.h2>
          <FloralDivider style={{ marginTop: '1.5rem' }} />
        </div>

        {/* Timeline */}
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {events.map((ev, i) => (
            <motion.div
              key={ev.name}
              className="aa-event-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="aa-event-row" style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '1.5rem',
                alignItems: 'start',
              }}>
                {/* Time column */}
                <div className="aa-event-time" style={{ minWidth: 80, textAlign: 'right', paddingTop: '0.2rem' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--aa-gold)',
                    whiteSpace: 'nowrap',
                  }}>
                    {ev.time}
                  </span>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  {/* Icon circle */}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--aa-ivory)',
                    border: '1px solid rgba(201,168,76,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--aa-green)',
                  }}>
                    {ev.icon}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.1rem', fontWeight: 500,
                      color: 'var(--aa-green)',
                      marginBottom: '0.2rem',
                    }}>
                      {ev.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--aa-gold)',
                      marginBottom: '0.45rem',
                    }}>
                      {ev.location}
                    </p>
                    <p style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      color: 'var(--aa-text-muted)',
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
