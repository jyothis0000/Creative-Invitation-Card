import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MandalaDecor from './MandalaDecor';

gsap.registerPlugin(ScrollTrigger);

/* ── Stylised city-grid SVG map ── */
function CityMapSVG() {
  return (
    <svg viewBox="0 0 400 270" width="100%" height="100%"
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="400" height="270" fill="#1a0a0a" />

      {/* Major roads */}
      <line x1="0" y1="135" x2="400" y2="135" stroke="#3a1a1a" strokeWidth="14" />
      <line x1="200" y1="0" x2="200" y2="270" stroke="#3a1a1a" strokeWidth="14" />
      <line x1="0" y1="80" x2="400" y2="80" stroke="#2a1212" strokeWidth="6" />
      <line x1="0" y1="190" x2="400" y2="190" stroke="#2a1212" strokeWidth="6" />
      <line x1="100" y1="0" x2="100" y2="270" stroke="#2a1212" strokeWidth="6" />
      <line x1="300" y1="0" x2="300" y2="270" stroke="#2a1212" strokeWidth="6" />

      {/* Secondary roads */}
      <line x1="0" y1="40" x2="400" y2="40" stroke="#221010" strokeWidth="3" />
      <line x1="0" y1="230" x2="400" y2="230" stroke="#221010" strokeWidth="3" />
      <line x1="50" y1="0" x2="50" y2="270" stroke="#221010" strokeWidth="3" />
      <line x1="150" y1="0" x2="150" y2="270" stroke="#221010" strokeWidth="3" />
      <line x1="250" y1="0" x2="250" y2="270" stroke="#221010" strokeWidth="3" />
      <line x1="350" y1="0" x2="350" y2="270" stroke="#221010" strokeWidth="3" />

      {/* Road labels */}
      <text x="200" y="128" textAnchor="middle" fill="rgba(200,150,46,0.35)" fontSize="7" fontFamily="Lato,sans-serif" letterSpacing="2">PALACE ROAD</text>
      <text x="92" y="118" textAnchor="middle" fill="rgba(200,150,46,0.25)" fontSize="6" fontFamily="Lato,sans-serif" transform="rotate(-90,92,118)">CIVIL LINES</text>

      {/* Blocks */}
      {[
        [10,10,80,60], [110,10,80,60], [210,10,80,60], [310,10,80,60],
        [10,90,80,35], [110,90,80,35], [210,90,80,35], [310,90,80,35],
        [10,145,80,35], [110,145,80,35], [310,145,80,35],
        [10,200,80,60], [110,200,80,60], [210,200,80,60], [310,200,80,60],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h}
          fill={`rgba(107,21,21,${0.12 + (i % 3) * 0.04})`}
          rx="2"
        />
      ))}

      {/* Venue block highlight */}
      <rect x="155" y="107" width="85" height="52"
        fill="rgba(200,150,46,0.15)"
        stroke="rgba(200,150,46,0.45)"
        strokeWidth="1" rx="3"
      />
    </svg>
  );
}

/* ── Compass rose ── */
function CompassRose() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38"
      style={{ position: 'absolute', bottom: 12, right: 12, opacity: 0.7 }}>
      <circle cx="19" cy="19" r="17" fill="rgba(44,15,15,0.8)" stroke="#C8962E" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="19" cy="19" r="2.5" fill="#C8962E" />
      <polygon points="19,3 17,15 21,15" fill="#E8C47A" />
      <polygon points="19,35 17,23 21,23" fill="#C8962E" fillOpacity="0.5" />
      <polygon points="35,19 23,17 23,21" fill="#C8962E" fillOpacity="0.5" />
      <polygon points="3,19 15,17 15,21" fill="#C8962E" fillOpacity="0.5" />
      <text x="19" y="12" textAnchor="middle" fill="#E8C47A" fontSize="5.5" fontFamily="Lato" fontWeight="700">N</text>
    </svg>
  );
}

/* ── Map with animated pin ── */
function VenueMap({ svgRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CityMapSVG />

      {/* Animated pin overlay */}
      <svg ref={svgRef} viewBox="0 0 400 270"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="ra-glow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g data-rm="pin" opacity="0">
          <circle cx="200" cy="130" r="10" fill="#C8962E" filter="url(#ra-glow)" />
          <circle cx="200" cy="130" r="4.5" fill="#1a0a0a" />
          <circle cx="200" cy="130" r="2" fill="#C8962E" />
        </g>
        <g data-rm="label" opacity="0">
          <rect x="130" y="100" width="140" height="18" rx="3" fill="rgba(44,15,15,0.92)" />
          <text x="200" y="113" textAnchor="middle" fill="#E8C47A" fontSize="8.5" fontFamily="Playfair Display,serif">
            The Ritz Grand Palace
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ── Venue card ── */
function VenueCard() {
  const svgRef  = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
      defaults: { ease: 'power2.out' },
    });
    tl.fromTo(svg.querySelector('[data-rm="pin"]'),
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'bounce.out' }, 0.2);
    tl.to(svg.querySelector('[data-rm="label"]'), { opacity: 1, duration: 0.4 }, 0.85);
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="ra-venue-card">
      {/* Map area */}
      <div style={{ position: 'relative', height: 310 }}>
        <VenueMap svgRef={svgRef} />

        {/* Badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          padding: '4px 13px',
          background: 'rgba(44,15,15,0.88)',
          border: '1px solid rgba(200,150,46,0.5)',
          backdropFilter: 'blur(6px)',
          borderRadius: 2,
        }}>
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.52rem', letterSpacing: '0.24em',
            textTransform: 'uppercase', color: '#E8C47A', fontWeight: 700,
          }}>
            Wedding Venue
          </span>
        </div>

        <CompassRose />
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(200,150,46,0.4) 30%, rgba(200,150,46,0.4) 70%, transparent)',
      }} />

      {/* Info */}
      <div style={{ padding: '1.5rem 1.8rem 1.8rem' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem', fontWeight: 500,
          color: '#E8C47A', marginBottom: '0.4rem',
        }}>
          The Ritz Grand Palace, Jaipur
        </h3>
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.72rem', letterSpacing: '0.06em',
          color: 'rgba(200,150,46,0.6)', lineHeight: 1.75, marginBottom: '1.2rem',
        }}>
          December 12, 2026<br />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '1rem',
            letterSpacing: 0, color: 'rgba(232,196,122,0.8)',
          }}>
            Celebrations begin at 5:30 PM
          </span>
        </p>

        {/* Timeline chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.4rem' }}>
          {[
            { t: '5:30 PM', label: 'Arrival' },
            { t: '6:30 PM', label: 'Baraat' },
            { t: '7:15 PM', label: 'Var Mala' },
            { t: '8:00 PM', label: 'Vows' },
            { t: '9:30 PM', label: 'Dinner' },
          ].map(({ t, label }) => (
            <div key={t} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '0.35rem 0.75rem',
              border: '1px solid rgba(200,150,46,0.22)', borderRadius: 2,
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', color: '#C8962E', fontWeight: 500 }}>{t}</span>
              <span style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.48rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(240,213,197,0.5)', marginTop: '0.15rem',
              }}>{label}</span>
            </div>
          ))}
        </div>

        <a
          href="https://maps.google.com/?q=Jaipur+Rajasthan+Palace+Road"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C8962E',
            textDecoration: 'none',
            border: '1px solid rgba(200,150,46,0.38)',
            padding: '7px 16px', borderRadius: 2,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,150,46,0.14)'; e.currentTarget.style.color = '#E8C47A'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8962E'; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function VenueSection() {
  return (
    <section id="ra-venue" className="ra-section" style={{ background: 'var(--ra-dark)' }}>
      <div className="ra-container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span className="ra-eyebrow"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ color: 'rgba(200,150,46,0.7)' }}>
            Join Us Here
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#FEF6EC', fontWeight: 600,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              margin: '0 0 0.5rem',
            }}>
            Wedding Venue
          </motion.h2>
          <MandalaDecor style={{ marginTop: '1.5rem' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VenueCard />
        </motion.div>
      </div>
    </section>
  );
}
