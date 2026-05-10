import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import WaveDecor from './WaveDecor';

gsap.registerPlugin(ScrollTrigger);

function CompassRose() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="26" stroke="rgba(135,196,232,0.2)" strokeWidth="1" />
      <circle cx="28" cy="28" r="18" stroke="rgba(135,196,232,0.12)" strokeWidth="1" />
      <path d="M28 4v20M28 32v20" stroke="rgba(135,196,232,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 28h20M32 28h20" stroke="rgba(135,196,232,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28 4l-4 10h8L28 4Z" fill="#87C4E8" opacity="0.7" />
      <path d="M28 52l4-10h-8l4 10Z" fill="rgba(135,196,232,0.3)" />
      <circle cx="28" cy="28" r="3" fill="#3DBFB8" />
      <text x="28" y="12" textAnchor="middle" fill="rgba(135,196,232,0.8)" fontSize="7" fontFamily="Lato, sans-serif" fontWeight="700">N</text>
      <text x="28" y="48" textAnchor="middle" fill="rgba(135,196,232,0.4)" fontSize="6" fontFamily="Lato, sans-serif">S</text>
      <text x="44" y="30" textAnchor="middle" fill="rgba(135,196,232,0.4)" fontSize="6" fontFamily="Lato, sans-serif">E</text>
      <text x="12" y="30" textAnchor="middle" fill="rgba(135,196,232,0.4)" fontSize="6" fontFamily="Lato, sans-serif">W</text>
    </svg>
  );
}

function CoastalMap({ pinRef, pinLabelRef }) {
  return (
    <svg width="100%" viewBox="0 0 420 260" fill="none" style={{ display: 'block' }}>
      {/* Ocean */}
      <rect width="420" height="260" fill="#0D2137" />

      {/* Water shimmer */}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${30 + i * 30} Q105 ${25 + i * 30} 210 ${30 + i * 30} Q315 ${35 + i * 30} 420 ${30 + i * 30}`}
          stroke="rgba(135,196,232,0.06)" strokeWidth="1" fill="none"
        />
      ))}

      {/* Land mass — Goa coastline shape */}
      <path
        d="M0 260 L0 180 Q20 160 50 155 Q80 150 90 140 Q110 120 130 118 Q155 115 170 125 Q185 135 190 150 Q200 170 220 165 Q245 160 260 145 Q280 130 300 128 Q330 125 355 140 Q380 158 400 165 Q415 170 420 175 L420 260 Z"
        fill="#1A3A52"
        stroke="rgba(135,196,232,0.15)" strokeWidth="1"
      />

      {/* Roads */}
      <path d="M60 260 L80 200 L120 160 L160 140" stroke="rgba(135,196,232,0.15)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M160 140 L200 135 L250 138 L300 130" stroke="rgba(135,196,232,0.15)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M160 140 L155 200 L150 260" stroke="rgba(135,196,232,0.12)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M250 138 L248 200 L245 260" stroke="rgba(135,196,232,0.12)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 260 L105 220 L110 180" stroke="rgba(135,196,232,0.1)" strokeWidth="1" strokeLinecap="round" />
      <path d="M320 130 L340 190 L360 260" stroke="rgba(135,196,232,0.1)" strokeWidth="1" strokeLinecap="round" />

      {/* City blocks */}
      <rect x="135" y="145" width="14" height="10" rx="1" fill="rgba(135,196,232,0.06)" />
      <rect x="155" y="148" width="10" height="8" rx="1" fill="rgba(135,196,232,0.06)" />
      <rect x="220" y="140" width="18" height="12" rx="1" fill="rgba(135,196,232,0.06)" />
      <rect x="270" y="133" width="14" height="10" rx="1" fill="rgba(135,196,232,0.06)" />

      {/* Venue block — Coral Cove Resort */}
      <rect x="185" y="148" width="28" height="20" rx="2" fill="rgba(61,191,184,0.25)" stroke="#3DBFB8" strokeWidth="1.5" />
      <text x="199" y="162" textAnchor="middle" fill="rgba(61,191,184,0.9)" fontSize="6.5" fontFamily="Lato, sans-serif" fontWeight="700">VENUE</text>

      {/* Beach line */}
      <path
        d="M130 118 Q155 108 180 112 Q200 116 220 113 Q250 109 280 112 Q305 115 330 122"
        stroke="rgba(242,222,179,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round"
        strokeDasharray="4 3"
      />

      {/* Water label */}
      <text x="60" y="80" fill="rgba(135,196,232,0.25)" fontSize="11" fontFamily="Cormorant Garamond, serif" fontStyle="italic">Arabian Sea</text>

      {/* Pin group */}
      <g ref={pinRef} style={{ opacity: 0 }}>
        <line x1="199" y1="148" x2="199" y2="100" stroke="#3DBFB8" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="199" cy="96" r="10" fill="#3DBFB8" />
        <circle cx="199" cy="96" r="4" fill="white" />
        <path d="M199 106 L194 116 L199 113 L204 116 Z" fill="#3DBFB8" />
      </g>

      {/* Pin label */}
      <g ref={pinLabelRef} style={{ opacity: 0 }}>
        <rect x="140" y="68" width="118" height="22" rx="3" fill="rgba(13,33,55,0.9)" stroke="rgba(61,191,184,0.4)" strokeWidth="1" />
        <text x="199" y="83" textAnchor="middle" fill="#3DBFB8" fontSize="8" fontFamily="Lato, sans-serif" letterSpacing="1">CORAL COVE RESORT</text>
      </g>
    </svg>
  );
}

export default function VenueSection() {
  const sectionRef  = useRef(null);
  const pinRef      = useRef(null);
  const pinLabelRef = useRef(null);

  useGSAP(() => {
    if (!pinRef.current || !pinLabelRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        gsap.fromTo(pinRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'bounce.out', delay: 0.3 }
        );
        gsap.fromTo(pinLabelRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.9 }
        );
      },
    });
  }, { scope: sectionRef });

  const TIMELINE = [
    { time: '4:00 PM', label: 'Welcome Cocktails' },
    { time: '5:00 PM', label: 'Beach Ceremony' },
    { time: '7:30 PM', label: 'Dinner & Dance' },
    { time: '9:00 PM', label: 'Bonfire Party' },
  ];

  return (
    <section ref={sectionRef} id="js-venue" className="js-section"
      style={{ background: 'linear-gradient(180deg, #0D2137 0%, #1A3A52 100%)' }}>
      <div className="js-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span className="js-eyebrow"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ color: '#3DBFB8' }}>
            Where to Find Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600,
              color: '#FFFDF7', margin: '0 0 0.5rem',
            }}>
            The Venue
          </motion.h2>
          <WaveDecor light style={{ marginTop: '1.5rem' }} />
        </div>

        <motion.div
          className="js-venue-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Map */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <CoastalMap pinRef={pinRef} pinLabelRef={pinLabelRef} />

            {/* Compass */}
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <CompassRose />
            </div>
          </div>

          {/* Info panel */}
          <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            {/* Venue name */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.55rem', letterSpacing: '0.35em',
                  textTransform: 'uppercase', color: '#3DBFB8',
                  marginBottom: '0.3rem',
                }}>
                  Venue
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 600,
                  color: '#FFFDF7', margin: 0,
                }}>
                  Coral Cove Resort
                </h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic', fontSize: '1rem',
                  color: 'rgba(135,196,232,0.65)', margin: '0.2rem 0 0',
                }}>
                  Goa, India
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.55rem', letterSpacing: '0.35em',
                  textTransform: 'uppercase', color: '#3DBFB8',
                  marginBottom: '0.3rem',
                }}>
                  Date &amp; Time
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem', color: '#FFFDF7',
                  margin: 0,
                }}>
                  March 15, 2027
                </p>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.78rem', color: 'rgba(135,196,232,0.65)',
                  margin: '0.2rem 0 0',
                }}>
                  4:00 PM onwards
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(135,196,232,0.12)', marginBottom: '1.5rem' }} />

            {/* Timeline chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.75rem' }}>
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 0.9rem',
                    background: 'rgba(61,191,184,0.08)',
                    border: '1px solid rgba(61,191,184,0.2)',
                    borderRadius: 20,
                  }}
                >
                  <span style={{
                    fontFamily: "'Lato', sans-serif", fontWeight: 700,
                    fontSize: '0.6rem', letterSpacing: '0.1em',
                    color: '#3DBFB8',
                  }}>
                    {item.time}
                  </span>
                  <span style={{
                    width: 1, height: 10,
                    background: 'rgba(61,191,184,0.3)',
                  }} />
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.9rem', color: 'rgba(255,253,247,0.75)',
                  }}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Get directions */}
            <motion.a
              href="https://maps.google.com/?q=Coral+Cove+Resort+Goa+India"
              target="_blank"
              rel="noopener noreferrer"
              className="js-btn js-btn--solid"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                textDecoration: 'none',
                background: '#3DBFB8',
                color: '#0D2137',
                fontSize: '0.62rem',
                letterSpacing: '0.25em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="#0D2137" strokeWidth="1.8" fill="none" />
                <circle cx="12" cy="9" r="2.5" stroke="#0D2137" strokeWidth="1.5" fill="none" />
              </svg>
              Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
