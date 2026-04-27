import { motion } from 'framer-motion';
import LotusDivider from './ui/LotusDivider';

const milestones = [
  { year: '2018', icon: '✨', title: 'First Meeting', malayalam: 'ആദ്യ കൂടിക്കാഴ്ച', desc: 'Our eyes met across the crowded hall at a college festival in Thrissur. The rest, as they say, is history.' },
  { year: '2019', icon: '💌', title: 'First Date', malayalam: 'ആദ്യ ദേശം', desc: 'A quiet evening at a café in Kochi, overlooking the backwaters. Hours passed like minutes.' },
  { year: '2021', icon: '🌺', title: 'Families Met', malayalam: 'കുടുംബ ഒത്തൊരുമ', desc: 'Two families, one beautiful afternoon in Thiruvananthapuram, bound by laughter and shared dreams.' },
  { year: '2024', icon: '💍', title: 'He Asked', malayalam: 'ആ ദിവ്യ നിമിഷം', desc: 'Beside the serene Vembanad lake, under a sky full of stars, Abhishek got down on one knee.' },
  { year: '2025', icon: '🌹', title: 'Forever Begins', malayalam: 'ഒരു പുതിയ ആരംഭം', desc: 'The beginning of a lifetime together. Our families, our friends, and our forever.' },
];

function TimelineCard({ item, idx }) {
  const isLeft = idx % 2 === 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', position: 'relative' }}>
      {/* Left content */}
      <motion.div
        initial={{ x: isLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          maxWidth: 380,
          order: isLeft ? 1 : 3,
          textAlign: isLeft ? 'right' : 'left',
        }}
      >
        <div style={{
          background: 'var(--ivory)',
          border: '1px solid #C8941A44',
          borderLeft: isLeft ? 'none' : '4px solid var(--red)',
          borderRight: isLeft ? '4px solid var(--red)' : 'none',
          borderRadius: '4px',
          padding: '1.5rem',
          boxShadow: '0 4px 24px rgba(200,148,26,0.12)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isLeft ? 'flex-end' : 'flex-start',
        }}>
          {/* Oval photo placeholder */}
          <div style={{
            width: 90,
            height: 110,
            borderRadius: '50%',
            background: `linear-gradient(135deg, #8B0000 0%, #C8941A 100%)`,
            border: '3px solid #C8941A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Floral SVG border overlay */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 90 110" aria-hidden="true">
              <ellipse cx="45" cy="55" rx="43" ry="53" fill="none" stroke="#E8B84B" strokeWidth="2" strokeDasharray="6 4" />
            </svg>
            <span style={{ fontSize: '2rem', zIndex: 1 }}>{item.icon}</span>
          </div>

          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 700 }}>{item.year}</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--red)', fontWeight: 600, margin: '0.2rem 0' }}>{item.title}</h3>
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{item.malayalam}</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#5C3317', lineHeight: 1.6 }}>{item.desc}</p>
        </div>
      </motion.div>

      {/* Center timeline node */}
      <div style={{ order: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, margin: '0 1.5rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--red)', border: '3px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
          boxShadow: '0 2px 16px rgba(200,148,26,0.3)',
        }}>
          {/* Lotus node */}
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <ellipse cx="10" cy="8" rx="4" ry="6" fill="#E8B84B" />
            <ellipse cx="5" cy="11" rx="3" ry="5" fill="#E8B84B" opacity="0.7" transform="rotate(-35, 5, 11)" />
            <ellipse cx="15" cy="11" rx="3" ry="5" fill="#E8B84B" opacity="0.7" transform="rotate(35, 15, 11)" />
            <circle cx="10" cy="8" r="2.5" fill="#8B0000" />
          </svg>
        </div>
      </div>

      {/* Spacer for alternating side */}
      <div style={{ flex: 1, maxWidth: 380, order: isLeft ? 3 : 1 }} />
    </div>
  );
}

export default function CoupleStory() {
  return (
    <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>
            ഞങ്ങളുടെ കഥ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--red)', fontWeight: 600 }}>
            Our Story
          </h2>
          <LotusDivider className="mt-6" />
        </motion.div>

        {/* Vertical timeline line */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 2,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, var(--gold) 10%, var(--gold) 90%, transparent)',
            zIndex: 1,
          }} />

          {milestones.map((item, idx) => (
            <TimelineCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
