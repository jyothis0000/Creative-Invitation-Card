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
    time: '5:00 PM',
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
    location: 'The Grand Entrance',
    desc: 'Abhishek and Athira make their grand entrance together, welcomed by cheers, music, and a shower of flower petals from family and friends.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M3.5 21h17" />
        <path d="M12 12v3m-4-3v3m8-3v3" />
      </svg>
    ),
    time: '6:45 PM',
    name: 'Cake Cutting Ceremony',
    location: 'The Grand Stage',
    desc: 'A sweet moment as Abhishek and Athira cut their wedding cake together, celebrating their new chapter with the blessings of all loved ones.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <circle cx="12" cy="6" r="2" />
      </svg>
    ),
    time: '7:00 PM',
    name: 'Dinner Opens',
    location: 'The Dining Hall',
    desc: 'Join us for an exquisite culinary experience. Enjoy a curated menu of authentic flavors and delicacies as you celebrate with family and friends.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    time: '7:30 PM',
    name: 'Dance & Entertainment',
    location: 'The Celebration Stage',
    desc: 'Family and friends take the stage for joyful performances — from classic songs to modern beats celebrating Abhishek and Athira.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5.5" cy="19.5" r="2.5" />
        <circle cx="18.5" cy="19.5" r="2.5" />
        <path d="M7 19.5h11.5" />
        <path d="M12 12v7.5" />
        <path d="M9 2h6a2 2 0 0 1 2 2v8H7V4a2 2 0 0 1 2-2z" />
      </svg>
    ),
    time: '8:30 PM',
    name: 'Open Dance Floor / DJ Night',
    location: 'The Main Hall',
    desc: 'Free dance session with guests, group photos & candid moments. The night comes alive as everyone joins in for a celebration of music, laughter, and unforgettable memories!',
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
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--aa-green)',
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
