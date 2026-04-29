import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from './FloralDivider';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   Ceremony Map SVG  (St. Augustine's Church)
───────────────────────────────────────── */
function CeremonyMap({ svgRef }) {
  return (
    <svg ref={svgRef} viewBox="0 0 400 270" width="100%" height="100%"
      style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="cm-bg" cx="38%" cy="62%" r="60%">
          <stop offset="0%" stopColor="#1E3D2A" />
          <stop offset="100%" stopColor="#0B1810" />
        </radialGradient>
        <radialGradient id="cm-pin-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8C97A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
        <filter id="cm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="cm-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="cm-clip"><rect width="400" height="270" /></clipPath>
      </defs>

      {/* Background */}
      <rect width="400" height="270" fill="url(#cm-bg)" />

      {/* Grid */}
      <g data-cm="grid" opacity="0" clipPath="url(#cm-clip)">
        {[1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*55} y1="0" x2={i*55} y2="270" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.12"/>)}
        {[1,2,3].map(i => <line key={`h${i}`} x1="0" y1={i*67} x2="400" y2={i*67} stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.12"/>)}
      </g>

      {/* Parks */}
      <g data-cm="parks" opacity="0">
        <ellipse cx="320" cy="85" rx="58" ry="42" fill="#22503A" fillOpacity="0.6"/>
        <text x="320" y="88" textAnchor="middle" fill="#C9A84C" fillOpacity="0.5" fontSize="6.5" fontFamily="Lato,sans-serif" letterSpacing="1.5" fontWeight="700">STADTPARK</text>
        <rect x="58" y="152" width="54" height="34" rx="5" fill="#1E4832" fillOpacity="0.55"/>
        <text x="85" y="172" textAnchor="middle" fill="#C9A84C" fillOpacity="0.4" fontSize="5.5" fontFamily="Lato,sans-serif" letterSpacing="1">BURGGARTEN</text>
      </g>

      {/* Ringstraße — main boulevard */}
      <path data-cm="ring"
        d="M 10 205 Q 55 248 128 253 Q 210 258 278 226 Q 342 196 358 144 Q 368 102 342 62"
        fill="none" stroke="#C9A84C" strokeOpacity="0.55" strokeWidth="10" strokeLinecap="round"
        strokeDasharray="1000" strokeDashoffset="1000" opacity="0"/>
      {/* Ringstraße centre line */}
      <path data-cm="ring-dash"
        d="M 10 205 Q 55 248 128 253 Q 210 258 278 226 Q 342 196 358 144 Q 368 102 342 62"
        fill="none" stroke="#E8C97A" strokeOpacity="0.15" strokeWidth="1" strokeLinecap="round"
        strokeDasharray="6 8" strokeDashoffset="1000" opacity="0"/>

      {/* Secondary streets */}
      <line data-cm="st" x1="135" y1="0" x2="130" y2="270" stroke="#C9A84C" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-cm="st" x1="195" y1="0" x2="190" y2="270" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-cm="st" x1="255" y1="0" x2="252" y2="270" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-cm="st" x1="72" y1="0" x2="70" y2="270" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-cm="st" x1="0" y1="88" x2="400" y2="86" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" opacity="0"/>
      <line data-cm="st" x1="0" y1="168" x2="400" y2="165" stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="2.5" strokeDasharray="400" strokeDashoffset="400" opacity="0"/>
      <line data-cm="st" x1="0" y1="128" x2="400" y2="126" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="400" opacity="0"/>

      {/* Pin glow halo */}
      <circle data-cm="halo" cx="144" cy="168" r="48" fill="url(#cm-pin-glow)" opacity="0"/>

      {/* Pulse rings */}
      <circle data-cm="ring1" cx="144" cy="168" r="0" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0"/>
      <circle data-cm="ring2" cx="144" cy="168" r="0" fill="none" stroke="#E8C97A" strokeWidth="1" opacity="0"/>

      {/* Pin group */}
      <g data-cm="pin" opacity="0">
        <path d="M144 152 C134 152 126 160 126 170 C126 183 144 198 144 198 C144 198 162 183 162 170 C162 160 154 152 144 152Z"
          fill="#C9A84C" filter="url(#cm-glow)"/>
        <circle cx="144" cy="169" r="6" fill="#0B1810"/>
        <circle cx="144" cy="169" r="2.5" fill="#E8C97A"/>
      </g>

      {/* Venue label */}
      <g data-cm="label" opacity="0">
        <rect x="94" y="136" width="100" height="13" rx="2" fill="#0B1810" fillOpacity="0.92"/>
        <rect x="94" y="136" width="100" height="13" rx="2" fill="none" stroke="#C9A84C" strokeOpacity="0.35" strokeWidth="0.8"/>
        <text x="144" y="146" textAnchor="middle" fill="#E8C97A" fontSize="8" fontFamily="Playfair Display,serif" fontWeight="500">St. Augustine's</text>
      </g>

      {/* Ringstraße text path */}
      <defs><path id="cm-rp" d="M 10 205 Q 55 248 128 253 Q 210 258 278 226 Q 342 196 358 144"/></defs>
      <text data-cm="rlabel" fontSize="7" fill="#C9A84C" fillOpacity="0" fontFamily="Lato,sans-serif" letterSpacing="2.5">
        <textPath href="#cm-rp" startOffset="10%">RINGSTRASSE</textPath>
      </text>

      {/* Frame */}
      <rect width="400" height="270" fill="none" stroke="#C9A84C" strokeOpacity="0.2" strokeWidth="1"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Reception Map SVG  (Palais Coburg)
───────────────────────────────────────── */
function ReceptionMap({ svgRef }) {
  return (
    <svg ref={svgRef} viewBox="0 0 400 270" width="100%" height="100%"
      style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="rm-bg" cx="55%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#1A3828" />
          <stop offset="100%" stopColor="#0A1710" />
        </radialGradient>
        <radialGradient id="rm-pin-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8C97A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
        <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="rm-clip"><rect width="400" height="270" /></clipPath>
      </defs>

      <rect width="400" height="270" fill="url(#rm-bg)" />

      {/* Grid */}
      <g data-rm="grid" opacity="0" clipPath="url(#rm-clip)">
        {[1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*55} y1="0" x2={i*55} y2="270" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.12"/>)}
        {[1,2,3].map(i => <line key={`h${i}`} x1="0" y1={i*67} x2="400" y2={i*67} stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.12"/>)}
      </g>

      {/* Parks */}
      <g data-rm="parks" opacity="0">
        <ellipse cx="325" cy="80" rx="55" ry="40" fill="#22503A" fillOpacity="0.6"/>
        <text x="325" y="83" textAnchor="middle" fill="#C9A84C" fillOpacity="0.5" fontSize="6.5" fontFamily="Lato,sans-serif" letterSpacing="1.5" fontWeight="700">STADTPARK</text>
        <ellipse cx="60" cy="200" rx="40" ry="28" fill="#1E4832" fillOpacity="0.5"/>
        <text x="60" y="203" textAnchor="middle" fill="#C9A84C" fillOpacity="0.35" fontSize="5.5" fontFamily="Lato,sans-serif" letterSpacing="0.8">CITY PARK</text>
      </g>

      {/* Ringstraße */}
      <path data-rm="ring"
        d="M 18 195 Q 65 242 148 250 Q 234 257 296 222 Q 350 192 362 140 Q 370 96 348 58"
        fill="none" stroke="#C9A84C" strokeOpacity="0.55" strokeWidth="10" strokeLinecap="round"
        strokeDasharray="1000" strokeDashoffset="1000" opacity="0"/>
      <path data-rm="ring-dash"
        d="M 18 195 Q 65 242 148 250 Q 234 257 296 222 Q 350 192 362 140 Q 370 96 348 58"
        fill="none" stroke="#E8C97A" strokeOpacity="0.15" strokeWidth="1"
        strokeDasharray="6 8" strokeDashoffset="1000" opacity="0"/>

      {/* Schubertring label */}
      <text data-rm="rlabel" fontSize="7" fill="#C9A84C" fillOpacity="0" fontFamily="Lato,sans-serif" letterSpacing="2.5">
        <textPath href="#rm-rp" startOffset="12%">RINGSTRASSE</textPath>
      </text>
      <defs><path id="rm-rp" d="M 18 195 Q 65 242 148 250 Q 234 257 296 222 Q 350 192 362 140"/></defs>

      {/* Streets */}
      <line data-rm="st" x1="165" y1="0" x2="162" y2="270" stroke="#C9A84C" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-rm="st" x1="218" y1="0" x2="215" y2="270" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-rm="st" x1="270" y1="0" x2="267" y2="270" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-rm="st" x1="100" y1="0" x2="97" y2="270" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="300" strokeDashoffset="300" opacity="0"/>
      <line data-rm="st" x1="0" y1="108" x2="400" y2="106" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" opacity="0"/>
      <line data-rm="st" x1="0" y1="158" x2="400" y2="155" stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="2.5" strokeDasharray="400" strokeDashoffset="400" opacity="0"/>
      <line data-rm="st" x1="0" y1="75" x2="400" y2="73" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="400" opacity="0"/>
      {/* Coburgbastei diagonal */}
      <line data-rm="st" x1="165" y1="158" x2="220" y2="105" stroke="#C9A84C" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" opacity="0"/>

      {/* Pin glow halo */}
      <circle data-rm="halo" cx="218" cy="155" r="48" fill="url(#rm-pin-glow)" opacity="0"/>

      {/* Pulse rings */}
      <circle data-rm="ring1" cx="218" cy="155" r="0" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0"/>
      <circle data-rm="ring2" cx="218" cy="155" r="0" fill="none" stroke="#E8C97A" strokeWidth="1" opacity="0"/>

      {/* Pin */}
      <g data-rm="pin" opacity="0">
        <path d="M218 139 C208 139 200 147 200 157 C200 170 218 185 218 185 C218 185 236 170 236 157 C236 147 228 139 218 139Z"
          fill="#C9A84C" filter="url(#rm-glow)"/>
        <circle cx="218" cy="156" r="6" fill="#0A1710"/>
        <circle cx="218" cy="156" r="2.5" fill="#E8C97A"/>
      </g>

      {/* Label */}
      <g data-rm="label" opacity="0">
        <rect x="168" y="120" width="100" height="13" rx="2" fill="#0A1710" fillOpacity="0.92"/>
        <rect x="168" y="120" width="100" height="13" rx="2" fill="none" stroke="#C9A84C" strokeOpacity="0.35" strokeWidth="0.8"/>
        <text x="218" y="130" textAnchor="middle" fill="#E8C97A" fontSize="8" fontFamily="Playfair Display,serif" fontWeight="500">Palais Coburg</text>
      </g>

      {/* Frame */}
      <rect width="400" height="270" fill="none" stroke="#C9A84C" strokeOpacity="0.2" strokeWidth="1"/>
    </svg>
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

    /* 1. grid fade */
    tl.to(svg.querySelector(`[data-${prefix}="grid"]`), { opacity: 1, duration: 0.5 }, 0);

    /* 2. parks scale in */
    tl.fromTo(svg.querySelector(`[data-${prefix}="parks"]`),
      { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' },
      { opacity: 1, scale: 1, duration: 0.6 }, 0.15);

    /* 3. streets draw in */
    const streets = svg.querySelectorAll(`[data-${prefix}="st"]`);
    streets.forEach(el => {
      const len = el.getTotalLength ? el.getTotalLength() : 400;
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    });
    tl.to(streets, { strokeDashoffset: 0, opacity: 1, duration: 1, stagger: 0.08 }, 0.2);

    /* 4. Ringstraße draws in */
    const ring = svg.querySelector(`[data-${prefix}="ring"]`);
    const ringDash = svg.querySelector(`[data-${prefix}="ring-dash"]`);
    const ringLen = ring.getTotalLength ? ring.getTotalLength() : 1000;
    gsap.set([ring, ringDash], { strokeDasharray: ringLen, strokeDashoffset: ringLen, opacity: 1 });
    tl.to(ring, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' }, 0.3);
    tl.to(ringDash, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' }, 0.3);

    /* 5. Ringstraße label */
    tl.to(svg.querySelector(`[data-${prefix}="rlabel"]`), { fillOpacity: 0.45, duration: 0.5 }, 1.2);

    /* 6. halo glow */
    tl.to(svg.querySelector(`[data-${prefix}="halo"]`), { opacity: 1, duration: 0.6 }, 1.4);

    /* 7. pin drops with bounce */
    tl.fromTo(svg.querySelector(`[data-${prefix}="pin"]`),
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'bounce.out' }, 1.5);

    /* 8. label fades */
    tl.to(svg.querySelector(`[data-${prefix}="label"]`), { opacity: 1, duration: 0.4 }, 2.1);

    /* 9. pulse rings loop */
    const r1 = svg.querySelector(`[data-${prefix}="ring1"]`);
    const r2 = svg.querySelector(`[data-${prefix}="ring2"]`);
    tl.call(() => {
      gsap.to(r1, { attr: { r: 38 }, opacity: 0, duration: 1.8, ease: 'power1.out', repeat: -1, repeatDelay: 0.4 });
      gsap.fromTo(r1, { opacity: 0.7 }, { opacity: 0, duration: 1.8, repeat: -1, repeatDelay: 0.4 });
      gsap.to(r2, { attr: { r: 55 }, opacity: 0, duration: 2.2, ease: 'power1.out', delay: 0.7, repeat: -1, repeatDelay: 0.4 });
      gsap.fromTo(r2, { opacity: 0 }, { opacity: 0.45, duration: 0.1, delay: 0.7, yoyo: false });
    }, [], 2.0);

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
