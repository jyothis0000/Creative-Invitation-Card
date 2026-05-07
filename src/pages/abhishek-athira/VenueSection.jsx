import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from './FloralDivider';
import receptionMapImg from '../../assets/palais_coburg_map.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── Reception map with animated pin ───────────────────────────── */
function ReceptionMap({ svgRef }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={receptionMapImg}
        alt="Map showing Oasis Grand Thaliparamba location"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <svg ref={svgRef} viewBox="0 0 400 270" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g data-rm="pin" opacity="0">
          <circle cx="200" cy="135" r="8" fill="#C9A84C" filter="url(#rm-glow)" />
          <circle cx="200" cy="135" r="4" fill="#0B1810" />
        </g>
        <g data-rm="label" opacity="0">
          <rect x="142" y="105" width="116" height="13" rx="2" fill="#0B1810" fillOpacity="0.92" />
          <text x="200" y="115" textAnchor="middle" fill="#E8C97A" fontSize="8" fontFamily="Playfair Display,serif">Oasis Grand, Thaliparamba</text>
        </g>
      </svg>
    </div>
  );
}

/* ─── Compass rose ───────────────────────────────────────────────── */
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

/* ─── Reception venue card ───────────────────────────────────────── */
function ReceptionVenueCard() {
  const svgRef  = useRef(null);
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

    tl.fromTo(svg.querySelector('[data-rm="pin"]'),
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'bounce.out' }, 0.2);

    tl.to(svg.querySelector('[data-rm="label"]'), { opacity: 1, duration: 0.4 }, 0.8);

  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="aa-venue-card" style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Map */}
      <div style={{ position: 'relative', height: 310 }}>
        <ReceptionMap svgRef={svgRef} />

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
            Reception Venue
          </span>
        </div>

        <CompassRose />
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent)',
      }} />

      {/* Info */}
      <div style={{ padding: '1.5rem 1.8rem 1.8rem' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem', fontWeight: 500,
          color: '#E8C97A', marginBottom: '0.4rem',
        }}>
          Oasis Grand, Thaliparamba
        </h3>
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.72rem', letterSpacing: '0.06em',
          color: 'rgba(201,168,76,0.6)', lineHeight: 1.75,
          marginBottom: '1.2rem',
        }}>
          May 24, 2026<br />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '1rem',
            letterSpacing: 0, color: 'rgba(232,201,122,0.8)',
          }}>
            Reception begins at 5:00 PM
          </span>
        </p>

        {/* Timeline summary */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
          marginBottom: '1.4rem',
        }}>
          {[
            { t: '5:00 PM', label: 'Doors Open' },
            { t: '6:15 PM', label: 'Bride & Groom' },
            { t: '7:15 PM', label: 'Dance' },
            { t: '8:15 PM', label: 'Games' },
            { t: '9:15 PM', label: 'Photos' },
          ].map(({ t, label }) => (
            <div key={t} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '0.35rem 0.75rem',
              border: '1px solid rgba(201,168,76,0.22)',
              borderRadius: 2,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.78rem', color: '#C9A84C', fontWeight: 500,
              }}>{t}</span>
              <span style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.5rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(232,186,163,0.55)',
                marginTop: '0.15rem',
              }}>{label}</span>
            </div>
          ))}
        </div>

        <a
          href="https://maps.google.com/?q=Oasis+Grand+Thaliparamba"
          target="_blank" rel="noopener noreferrer"
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
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.14)';
            e.currentTarget.style.borderColor = '#C9A84C';
            e.currentTarget.style.color = '#E8C97A';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.38)';
            e.currentTarget.style.color = '#C9A84C';
          }}
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

/* ─── Section ────────────────────────────────────────────────────── */
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
            Join Us Here
          </motion.span>
          <motion.h2
            className="aa-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Reception Venue
          </motion.h2>
          <FloralDivider style={{ marginTop: '1.5rem' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ReceptionVenueCard />
        </motion.div>
      </div>
    </section>
  );
}
