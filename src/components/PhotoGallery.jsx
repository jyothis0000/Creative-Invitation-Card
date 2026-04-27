import { motion } from 'framer-motion';
import LotusDivider from './ui/LotusDivider';

const COLORS = [
  ['#8B0000', '#C8941A'],
  ['#2D5016', '#4a7a22'],
  ['#C8941A', '#E8B84B'],
  ['#8B0000', '#5a3000'],
  ['#2D5016', '#8B0000'],
  ['#C8941A', '#8B0000'],
  ['#5a3000', '#C8941A'],
  ['#2D5016', '#C8941A'],
  ['#8B0000', '#2D5016'],
];

const ROTATIONS = [-4, 3, -6, 5, -2, 4, -5, 2, -3];

const ORIGINS = [
  { x: -120, y: -80 },
  { x: 120, y: -100 },
  { x: -150, y: 60 },
  { x: 160, y: 80 },
  { x: -80, y: -120 },
  { x: 100, y: -60 },
  { x: -140, y: 100 },
  { x: 130, y: 120 },
  { x: 0, y: -140 },
];

function PhotoCard({ idx }) {
  const [c1, c2] = COLORS[idx % COLORS.length];
  const rot = ROTATIONS[idx % ROTATIONS.length];
  const origin = ORIGINS[idx % ORIGINS.length];

  return (
    <motion.div
      initial={{ x: origin.x, y: origin.y, opacity: 0, rotate: rot }}
      whileInView={{ x: 0, y: 0, opacity: 1, rotate: rot }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
      style={{
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        border: '8px solid white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)',
        borderRadius: '2px',
        position: 'relative',
        aspectRatio: '3/4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        zIndex: 1,
      }}
    >
      {/* Banana leaf texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, transparent 2px, transparent 8px)',
        pointerEvents: 'none',
      }} />

      {/* Floral corner ornaments */}
      {['tl', 'tr', 'bl', 'br'].map(pos => (
        <svg key={pos} width="20" height="20" viewBox="0 0 20 20" style={{
          position: 'absolute',
          top: pos.includes('t') ? 4 : 'auto',
          bottom: pos.includes('b') ? 4 : 'auto',
          left: pos.includes('l') ? 4 : 'auto',
          right: pos.includes('r') ? 4 : 'auto',
          transform: `rotate(${pos === 'tl' ? 0 : pos === 'tr' ? 90 : pos === 'br' ? 180 : 270}deg)`,
          opacity: 0.5,
        }} aria-hidden="true">
          <path d="M2,18 Q2,4 18,2" fill="none" stroke="white" strokeWidth="1.2" />
          <circle cx="2" cy="18" r="2" fill="white" />
        </svg>
      ))}

      {/* Couple initials */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: '0.1em',
        }}>
          A&amp;A
        </p>
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          marginTop: '0.4rem',
        }}>
          Photo {idx + 1}
        </p>
      </div>

      {/* Loading lazy placeholder shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  );
}

export default function PhotoGallery() {
  return (
    <section
      id="gallery"
      className="kolam-bg"
      style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>
            ഞങ്ങളുടെ നിമിഷങ്ങൾ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--red)', fontWeight: 600 }}>
            Our Moments
          </h2>
          <LotusDivider className="mt-6" />
        </motion.div>

        {/* Banana leaf collage grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1.5rem',
          padding: '1rem',
        }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <PhotoCard key={i} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
