import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

const events = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    time: '5:30 PM',
    name: 'Reception Begins',
    location: 'Oasis Grand Hall Entrance',
    desc: 'Guests arrive and are welcomed with traditional flower garlands, rose petals, and warm hospitality. Find your seats and soak in the festive atmosphere.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    time: '6:15 PM',
    name: 'Bride & Groom Entry',
    location: 'Main Stage',
    desc: 'Abhishek and Athira make their grand entrance together, welcomed by cheers, music, and a shower of flower petals from family and friends.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    time: '7:15 PM',
    name: 'Dance Performances',
    location: 'Main Stage',
    desc: 'Family and friends take the stage for an hour of joyful dance performances — from classic Malayalam film songs to modern beats celebrating the couple.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    time: '8:15 PM',
    name: 'Games & Entertainment',
    location: 'Banquet Hall',
    desc: 'An hour of fun-filled games and interactive entertainment for all guests — bringing laughter, friendly competition, and unforgettable memories.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <path d="M14.5 8.5l-2 2.5 1.5 1.5 2.5-3" />
      </svg>
    ),
    time: '9:15 PM',
    name: 'Photo Session',
    location: 'Stage & Decorated Backdrop',
    desc: 'Strike a pose! Group photos with family, friends, and the couple. Capture the night with the beautifully decorated stage as your backdrop.',
  },
];

export default function EventsSection() {
  return (
    <section
      id="aa-events"
      className="aa-section"
      style={{
        background: '#FAF7F2',
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
            Reception Evening
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
