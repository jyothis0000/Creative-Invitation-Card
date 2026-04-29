import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from './FloralDivider';
import ceremonyMapImg from '../../assets/st_augustine_map.png';
import receptionMapImg from '../../assets/palais_coburg_map.png';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   Ceremony Map SVG  (St. Augustine's Church)
───────────────────────────────────────── */
function CeremonyMap({ svgRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={ceremonyMapImg}
        alt="Artistic map of St. Augustine's Church area"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <svg ref={svgRef} viewBox="0 0 400 270" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <filter id="cm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Simple elegant pin overlay */}
        <g data-cm="pin" opacity="0">
          <circle cx="200" cy="135" r="8" fill="#C9A84C" filter="url(#cm-glow)" />
          <circle cx="200" cy="135" r="4" fill="#0B1810" />
        </g>
        <g data-cm="label" opacity="0">
          <rect x="150" y="105" width="100" height="13" rx="2" fill="#0B1810" fillOpacity="0.92" />
          <text x="200" y="115" textAnchor="middle" fill="#E8C97A" fontSize="8" fontFamily="Playfair Display,serif">St. Augustine's</text>
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   Reception Map SVG  (Palais Coburg)
───────────────────────────────────────── */
function ReceptionMap({ svgRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={receptionMapImg}
        alt="Artistic map of Palais Coburg area"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <svg ref={svgRef} viewBox="0 0 400 270" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Simple elegant pin overlay */}
        <g data-rm="pin" opacity="0">
          <circle cx="200" cy="135" r="8" fill="#C9A84C" filter="url(#rm-glow)" />
          <circle cx="200" cy="135" r="4" fill="#0B1810" />
        </g>
        <g data-rm="label" opacity="0">
          <rect x="150" y="105" width="100" height="13" rx="2" fill="#0B1810" fillOpacity="0.92" />
          <text x="200" y="115" textAnchor="middle" fill="#E8C97A" fontSize="8" fontFamily="Playfair Display,serif">Palais Coburg</text>
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   Compass rose
───────────────────────────────────────── */
function CompassRose() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38"
      style={{ position: 'absolute', bottom: 12, right: 12, opacity: 0.7 }}>
      <circle cx="19" cy="19" r="17" fill="rgba(11,24,16,0.7)" stroke="#C9A84C" strokeOpacity="0.45" strokeWidth="0.8"/>
      <circle cx="19" cy="19" r="2.5" fill="#C9A84C"/>
      <polygon points="19,3 17,15 21,15" fill="#E8C97A"/>
      <polygon points="19,35 17,23 21,23" fill="#C9A84C" fillOpacity="0.5"/>
      <polygon points="35,19 23,17 23,21" fill="#C9A84C" fillOpacity="0.5"/>
      <polygon points="3,19 15,17 15,21" fill="#C9A84C" fillOpacity="0.5"/>
      <text x="19" y="12" textAnchor="middle" fill="#E8C97A" fontSize="5.5" fontFamily="Lato" fontWeight="700">N</text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Map card  (GSAP-animated)
───────────────────────────────────────── */
function VenueMapCard({ type, name, address, time, mapsUrl }) {
  const isCeremony = type === 'ceremony';
  const svgRef = useRef(null);
  const prefix = isCeremony ? 'cm' : 'rm';
  const cardRef = useRef(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        once: true,
      },
      defaults: { ease: 'power2.out' },
    });

    /* 1. pin drops with bounce */
    tl.fromTo(svg.querySelector(`[data-${prefix}="pin"]`),
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'bounce.out' }, 0.2);

    /* 2. label fades */
    tl.to(svg.querySelector(`[data-${prefix}="label"]`), { opacity: 1, duration: 0.4 }, 0.8);

  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="aa-venue-card">
      {/* Map area */}
      <div style={{ position: 'relative', height: 270 }}>
        {isCeremony ? <CeremonyMap svgRef={svgRef} /> : <ReceptionMap svgRef={svgRef} />}

        {/* Badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          padding: '4px 13px',
          background: 'rgba(11,24,16,0.82)',
          border: '1px solid rgba(201,168,76,0.55)',
          backdropFilter: 'blur(6px)',
          borderRadius: 2,
        }}>
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.55rem', letterSpacing: '0.24em',
            textTransform: 'uppercase', color: '#E8C97A', fontWeight: 700,
          }}>
            {isCeremony ? 'Ceremony' : 'Reception'}
          </span>
        </div>

        <CompassRose />
      </div>

      {/* Divider line */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent)',
      }} />

      {/* Info */}
      <div style={{ padding: '1.3rem 1.6rem 1.5rem' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.15rem', fontWeight: 500,
          color: '#E8C97A', marginBottom: '0.4rem',
        }}>
          {name}
        </h3>
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.72rem', letterSpacing: '0.06em',
          color: 'rgba(201,168,76,0.6)', lineHeight: 1.75,
          marginBottom: '1rem',
        }}>
          {address}<br />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '0.9rem',
            letterSpacing: 0, color: 'rgba(232,201,122,0.75)',
          }}>
            {time}
          </span>
        </p>
        <a
          href={mapsUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C9A84C',
            textDecoration: 'none',
            border: '1px solid rgba(201,168,76,0.38)',
            padding: '7px 16px', borderRadius: 2,
            transition: 'background 0.2s, border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.14)'; e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#E8C97A'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.38)'; e.currentTarget.style.color = '#C9A84C'; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function VenueSection() {
  return (
    <section id="aa-venue" className="aa-section" style={{ background: 'var(--aa-cream)' }}>
      <div className="aa-container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span
            className="aa-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Getting There
          </motion.span>
          <motion.h2
            className="aa-heading"
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
        }}>
          <VenueMapCard
            type="ceremony"
            name="St. Augustine's Church"
            address="Augustinerstraße 3, 1010 Vienna, Austria"
            time="Ceremony begins at 2:00 PM"
            mapsUrl="https://maps.google.com/?q=Augustinerkirche+Vienna+Austria"
          />
          <VenueMapCard
            type="reception"
            name="Palais Coburg Grand Ballroom"
            address="Coburgbastei 4, 1010 Vienna, Austria"
            time="Doors open at 6:00 PM"
            mapsUrl="https://maps.google.com/?q=Palais+Coburg+Vienna+Austria"
          />
        </div>
      </div>
    </section>
  );
}
