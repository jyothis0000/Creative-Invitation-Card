import { motion } from 'framer-motion';
import KasavuBorder from './ui/KasavuBorder';
import LotusDivider from './ui/LotusDivider';

const events = [
  {
    name: 'Nichayathartham',
    malayalam: 'നിശ്ചയതാർത്ഥം',
    english: 'Engagement',
    date: 'November 18, 2025',
    time: '10:00 AM',
    venue: 'Athira\'s Residence, Thrissur',
    icon: HandsIcon,
  },
  {
    name: 'Mehendi Evening',
    malayalam: 'മൈലാഞ്ചി',
    english: 'Henna Ceremony',
    date: 'November 20, 2025',
    time: '5:00 PM',
    venue: 'Abhishek\'s Residence, Kochi',
    icon: MehendiIcon,
  },
  {
    name: 'Vidhi',
    malayalam: 'വിധി',
    english: 'Pre-Wedding Rituals',
    date: 'November 21, 2025',
    time: '7:00 AM',
    venue: 'Community Hall, Thrissur',
    icon: UruliIcon,
  },
  {
    name: 'Wedding Day',
    malayalam: 'വിവാഹം',
    english: 'The Grand Celebration',
    date: 'November 22, 2025',
    time: '10:00 AM',
    venue: 'Thrisshur Palace Grounds',
    icon: LampIcon,
  },
];

function HandsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M18,28 Q12,24 12,18 Q12,12 18,10 Q22,9 26,12 Q30,9 34,10 Q40,12 40,18 Q40,24 34,28 L24,40Z" fill="none" stroke="#C8941A" strokeWidth="2" strokeLinecap="round" />
      <path d="M20,14 Q24,10 28,14" fill="none" stroke="#E8B84B" strokeWidth="1.5" />
      {[0,1,2,3].map(i => <circle key={i} cx={16 + i * 6} cy={28 - i} r="1.5" fill="#C8941A" />)}
    </svg>
  );
}
function MehendiIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24,44 Q8,36 8,20 Q8,8 24,6 Q40,8 40,20 Q40,36 24,44Z" fill="none" stroke="#C8941A" strokeWidth="2" />
      {[8,12,16,20].map(y => <path key={y} d={`M14,${y} Q24,${y-3} 34,${y}`} fill="none" stroke="#E8B84B" strokeWidth="1" opacity="0.7" />)}
      <circle cx="24" cy="24" r="4" fill="#C8941A" opacity="0.8" />
    </svg>
  );
}
function UruliIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="30" rx="18" ry="8" fill="none" stroke="#C8941A" strokeWidth="2" />
      <ellipse cx="24" cy="30" rx="18" ry="8" fill="#C8941A" opacity="0.15" />
      <path d="M6,30 Q4,20 24,18 Q44,20 42,30" fill="#C8941A" opacity="0.2" />
      <path d="M6,30 Q4,20 24,18 Q44,20 42,30" fill="none" stroke="#C8941A" strokeWidth="2" />
      {[0,1,2,3,4].map(i => (
        <ellipse key={i} cx={12 + i * 6} cy={18} rx="3" ry="4" fill="#ff9999" opacity="0.7" />
      ))}
    </svg>
  );
}
function LampIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="22" y="24" width="4" height="18" rx="2" fill="#C8941A" />
      <ellipse cx="24" cy="24" rx="12" ry="4" fill="#C8941A" />
      <ellipse cx="24" cy="42" rx="10" ry="3" fill="#A06810" />
      <path d="M24,20 C22,16 21,12 22,9 C22.5,7 24,5 24,4 C24,5 25.5,7 26,9 C27,12 26,16 24,20Z" fill="#ffb300" />
      <path d="M24,19 C23,16 22.5,13 23.5,10 C24,8 24,6 24,5 C24,6 24,8 24.5,10 C25.5,13 25,16 24,19Z" fill="#fff59d" />
    </svg>
  );
}

function EventCard({ event, idx }) {
  const Icon = event.icon;
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className="event-card"
      style={{
        background: `
          repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.01) 0px,
            rgba(255,255,255,0.02) 2px,
            transparent 2px,
            transparent 8px
          ),
          repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.05) 0px,
            transparent 1px,
            transparent 20px
          ),
          linear-gradient(135deg, #1a0a00 0%, #2a1200 100%)
        `,
        border: '1.5px solid #C8941A44',
        borderRadius: '4px',
        padding: '2rem 1.5rem',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Gold corner accents */}
      {[['tl','0,0'], ['tr','100%,0'], ['bl','0,100%'], ['br','100%,100%']].map(([pos, origin]) => (
        <div key={pos} style={{
          position: 'absolute',
          width: 16, height: 16,
          borderTop: pos.includes('t') ? '2px solid #C8941A' : 'none',
          borderBottom: pos.includes('b') ? '2px solid #C8941A' : 'none',
          borderLeft: pos.includes('l') ? '2px solid #C8941A' : 'none',
          borderRight: pos.includes('r') ? '2px solid #C8941A' : 'none',
          top: pos.includes('t') ? 8 : 'auto',
          bottom: pos.includes('b') ? 8 : 'auto',
          left: pos.includes('l') ? 8 : 'auto',
          right: pos.includes('r') ? 8 : 'auto',
        }} />
      ))}

      {/* Icon */}
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          border: '1.5px solid #C8941A55',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(200,148,26,0.08)',
        }}>
          <Icon />
        </div>
      </div>

      {/* Names */}
      <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.95rem', color: '#C8941A', textAlign: 'center', marginBottom: '0.2rem' }}>
        {event.malayalam}
      </p>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.5rem', fontWeight: 600,
        color: '#FAF3E0',
        textAlign: 'center', marginBottom: '0.2rem',
      }}>
        {event.name}
      </h3>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8941A88', textAlign: 'center', marginBottom: '1.2rem' }}>
        {event.english}
      </p>

      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #C8941A55, transparent)', marginBottom: '1rem' }} />

      {/* Details */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: '#E8B84B', marginBottom: '0.2rem' }}>
          {event.date}
        </p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#FAF3E0AA', marginBottom: '0.4rem' }}>
          {event.time}
        </p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: '#FAF3E088', lineHeight: 1.5 }}>
          {event.venue}
        </p>
      </div>
    </motion.div>
  );
}

export default function WeddingEvents() {
  return (
    <section
      id="events"
      style={{ background: 'var(--red)', padding: '5rem 1.5rem' }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1.1rem', color: '#C8941A', marginBottom: '0.4rem' }}>
            ആഘോഷ പരിപാടികൾ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#FAF3E0', fontWeight: 600 }}>
            Wedding Events
          </h2>
          <LotusDivider className="mt-6" />
        </motion.div>

        <KasavuBorder className="mb-10" />

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} idx={idx} />
          ))}
        </div>

        <KasavuBorder className="mt-10" flip />
      </div>
    </section>
  );
}
