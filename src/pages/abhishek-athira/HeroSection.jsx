import { useRef, forwardRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';
import brideImg from '../../assets/bride.png';
import groomImg from '../../assets/groom.png';

gsap.registerPlugin(ScrollTrigger);

/* ── Detailed botanical corner illustration ── */
function BotanicalCorner({ flip = false }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...(flip
          ? { bottom: 0, right: 0, transform: 'rotate(180deg)' }
          : { top: 0, left: 0 }),
        width: 270, height: 270,
        opacity: 0.24,
        pointerEvents: 'none',
      }}
      viewBox="0 0 270 270"
    >
      {/* Main stem from corner */}
      <path d="M0 0 C25 45, 48 92, 52 158" stroke="#C9A84C" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Branch right */}
      <path d="M22 48 C62 30, 108 17, 158 7" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Branch down-left */}
      <path d="M38 100 C22 116, 12 138, 4 164" stroke="#C9A84C" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Small branch off main */}
      <path d="M46 128 C62 120, 80 116, 96 112" stroke="#C9A84C" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* ── Full rose at main stem end ── */}
      <g transform="translate(52,158)">
        {[0, 60, 120, 180, 240, 300].map(d => (
          <path key={d}
            d="M0 0 C-13 -17,-10 -38,0 -42 C10 -38,13 -17,0 0"
            fill="#C9A84C" fillOpacity="0.27"
            stroke="#C9A84C" strokeOpacity="0.16" strokeWidth="0.3"
            transform={`rotate(${d})`}
          />
        ))}
        {[30, 90, 150, 210, 270, 330].map(d => (
          <path key={d}
            d="M0 0 C-9 -12,-7 -27,0 -30 C7 -27,9 -12,0 0"
            fill="#C9A84C" fillOpacity="0.42"
            transform={`rotate(${d})`}
          />
        ))}
        {[15, 135, 255].map(d => (
          <path key={d}
            d="M0 0 C-5 -8,-4 -18,0 -20 C4 -18,5 -8,0 0"
            fill="#C9A84C" fillOpacity="0.62"
            transform={`rotate(${d})`}
          />
        ))}
        <circle cx="0" cy="0" r="7" fill="#C9A84C" fillOpacity="0.65" />
        <circle cx="0" cy="0" r="3.5" fill="#E8C97A" fillOpacity="0.72" />
        <circle cx="-1.5" cy="-1.5" r="1.5" fill="white" fillOpacity="0.22" />
      </g>

      {/* ── Rose bud at right branch end ── */}
      <g transform="translate(158,10) rotate(10)">
        <path d="M0 4 C-3 0,-3 -8,0 -10 C3 -8,3 0,0 4" fill="#3E7558" fillOpacity="0.45" />
        <path d="M0 2 C-6 -5,-5 -18,0 -21 C5 -18,6 -5,0 2" fill="#C9A84C" fillOpacity="0.38" />
        <path d="M0 2 C-3 -5,-3 -15,0 -17 C3 -15,3 -5,0 2" fill="#C9A84C" fillOpacity="0.56" />
        <path d="M0 4 L0 14" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
      </g>

      {/* ── Rose bud at bottom branch end ── */}
      <g transform="translate(5,164) rotate(-75)">
        <path d="M0 4 C-3 0,-3 -7,0 -9 C3 -7,3 0,0 4" fill="#3E7558" fillOpacity="0.4" />
        <path d="M0 2 C-5 -4,-4 -15,0 -18 C4 -15,5 -4,0 2" fill="#C9A84C" fillOpacity="0.35" />
        <path d="M0 2 C-3 -4,-3 -12,0 -14 C3 -12,3 -4,0 2" fill="#C9A84C" fillOpacity="0.5" />
      </g>

      {/* ── Small 5-petal flower at small branch end ── */}
      <g transform="translate(96,112)">
        {[0, 72, 144, 216, 288].map(d => (
          <ellipse key={d} cx="0" cy="-8" rx="3.5" ry="6"
            fill="#C9A84C" fillOpacity="0.28"
            transform={`rotate(${d})`}
          />
        ))}
        <circle cx="0" cy="0" r="3" fill="#E8C97A" fillOpacity="0.55" />
      </g>

      {/* ── Leaves ── */}
      <g transform="translate(16,42) rotate(-110)">
        <path d="M0 0 C-11 -7,-13 -23,0 -30 C13 -23,11 -7,0 0"
          fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="0" y2="-30" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.4" />
      </g>
      <g transform="translate(40,87) rotate(65)">
        <path d="M0 0 C-10 -6,-11 -22,0 -27 C11 -22,10 -6,0 0"
          fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="0" y2="-27" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.4" />
      </g>
      <g transform="translate(73,25) rotate(-25)">
        <path d="M0 0 C-9 -6,-10 -20,0 -25 C10 -20,9 -6,0 0"
          fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="0" y2="-25" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.4" />
      </g>
      <g transform="translate(115,13) rotate(-46)">
        <path d="M0 0 C-8 -5,-9 -18,0 -22 C9 -18,8 -5,0 0"
          fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="0" y2="-22" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.4" />
      </g>
      <g transform="translate(20,132) rotate(-158)">
        <path d="M0 0 C-8 -5,-9 -18,0 -22 C9 -18,8 -5,0 0"
          fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="0" y2="-22" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.4" />
      </g>
      <g transform="translate(64,117) rotate(18)">
        <path d="M0 0 C-7 -5,-8 -16,0 -20 C8 -16,7 -5,0 0"
          fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeOpacity="0.22" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="0" y2="-20" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.4" />
      </g>

      {/* ── Berry cluster ── */}
      <circle cx="32" cy="114" r="2.8" fill="#C9A84C" fillOpacity="0.35" />
      <circle cx="26" cy="108" r="2" fill="#C9A84C" fillOpacity="0.28" />
      <circle cx="38" cy="109" r="1.6" fill="#C9A84C" fillOpacity="0.24" />
      <path d="M32 114 L26 108 M32 114 L38 109" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.5" fill="none" />

      {/* ── Corner accent mini-flower ── */}
      <g transform="translate(8,15)">
        {[0, 72, 144, 216, 288].map(d => (
          <ellipse key={d} cx="0" cy="-6" rx="2.5" ry="4"
            fill="#C9A84C" fillOpacity="0.3"
            transform={`rotate(${d})`}
          />
        ))}
        <circle cx="0" cy="0" r="2.5" fill="#E8C97A" fillOpacity="0.45" />
      </g>
    </svg>
  );
}

/* ── SVG wedding elements replacing emojis ── */
const SHAPES = {
  petal: (
    <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
      <path d="M9 25 C2 18 0 9 4 3 Q9 -1 14 3 C18 9 16 18 9 25Z" fill="#C9A84C" opacity="0.58" />
      <path d="M9 24 Q8 14 9 4" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
    </svg>
  ),
  leaf: (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
      <path d="M7 21 C1 15 0 7 4 2 Q7 -1 10 2 C14 7 13 15 7 21Z" fill="#3E7558" opacity="0.55" />
      <path d="M7 20 L7 2" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" />
    </svg>
  ),
  ring: (
    <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
      <circle cx="9" cy="8" r="7.5" stroke="#C9A84C" strokeWidth="1.5" opacity="0.62" />
      <circle cx="19" cy="8" r="7.5" stroke="#E8C97A" strokeWidth="1.5" opacity="0.62" />
    </svg>
  ),
  blossom: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <ellipse cx="11" cy="4.5" rx="3" ry="5.5" fill="#C9A84C" opacity="0.38" />
      <ellipse cx="11" cy="4.5" rx="3" ry="5.5" fill="#C9A84C" opacity="0.38" transform="rotate(60 11 11)" />
      <ellipse cx="11" cy="4.5" rx="3" ry="5.5" fill="#C9A84C" opacity="0.38" transform="rotate(120 11 11)" />
      <ellipse cx="11" cy="4.5" rx="3" ry="5.5" fill="#C9A84C" opacity="0.38" transform="rotate(180 11 11)" />
      <ellipse cx="11" cy="4.5" rx="3" ry="5.5" fill="#C9A84C" opacity="0.38" transform="rotate(240 11 11)" />
      <ellipse cx="11" cy="4.5" rx="3" ry="5.5" fill="#C9A84C" opacity="0.38" transform="rotate(300 11 11)" />
      <circle cx="11" cy="11" r="3.5" fill="#E8C97A" opacity="0.7" />
    </svg>
  ),
};

const petals = [
  { left: '8%', dur: 8, delay: 0, drift: '40px', shape: 'petal' },
  { left: '20%', dur: 10, delay: 2.5, drift: '-30px', shape: 'blossom' },
  { left: '35%', dur: 9, delay: 1, drift: '20px', shape: 'leaf' },
  { left: '50%', dur: 9, delay: 5.5, drift: '25px', shape: 'blossom' },
  { left: '62%', dur: 11, delay: 3, drift: '-50px', shape: 'petal' },
  { left: '75%', dur: 7, delay: 0.5, drift: '35px', shape: 'ring' },
  { left: '88%', dur: 12, delay: 4, drift: '-20px', shape: 'leaf' },
  { left: '28%', dur: 8, delay: 3.5, drift: '-35px', shape: 'petal' },
];

function FallingElement({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: style.left,
        top: '-40px',
        opacity: 0.7,
        animation: `aa-petal-spin ${style.dur}s linear ${style.delay}s infinite`,
        '--drift': style.drift,
        pointerEvents: 'none',
      }}
    >
      {SHAPES[style.shape]}
    </div>
  );
}

/* ── Portrait: starts at the side edges, GSAP ScrollTrigger slides to center ── */
const Portrait = forwardRef(function Portrait({ src, name, side, zIndex = 3 }, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: 0,
        [side]: 0,           /* groom: left:0  bride: right:0 — visible from page load */
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 1.0, delay: 0.3 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: side === 'right' ? 0.4 : 0 }
        }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img src={src} alt={name} className="aa-portrait-img" />
        <span className="aa-portrait-label">{name}</span>
      </motion.div>
    </div>
  );
});

export default function HeroSection() {
  const sectionRef = useRef(null);
  const groomRef = useRef(null);
  const brideRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const buildTimeline = (gap, offScreen = false) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=900',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      const groomEnd = { x: () => sectionRef.current.offsetWidth / 2 - groomRef.current.offsetWidth - gap, ease: 'power2.out', duration: 1 };
      const brideEnd = { x: () => -(sectionRef.current.offsetWidth / 2 - brideRef.current.offsetWidth - gap), ease: 'power2.out', duration: 1 };

      if (offScreen) {
        tl.fromTo(groomRef.current, { x: () => -window.innerWidth }, groomEnd)
          .fromTo(brideRef.current, { x: () => window.innerWidth }, brideEnd, '<');
      } else {
        tl.to(groomRef.current, groomEnd)
          .to(brideRef.current, brideEnd, '<');
      }

      return () => tl.kill();
    };

    mm.add('(min-width: 769px)', () => buildTimeline(-110, false));  // desktop — visible from start
    mm.add('(max-width: 768px)', () => buildTimeline(-52, true));   // mobile — starts off-screen

    return () => mm.revert();
  }, { scope: sectionRef });

  /* Force ScrollTrigger to re-measure after all assets load.
     On first mobile visit images aren't decoded yet at GSAP init time,
     so pin/end positions are wrong until a refresh recalculates them. */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
      return () => window.removeEventListener('load', refresh);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="aa-hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #111A15 0%, #1B3A2D 45%, #2D5740 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 1.5rem',
      }}
    >
      {/* SVG wedding elements falling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        {petals.map((p, i) => <FallingElement key={i} style={p} />)}
      </motion.div>

      {/* Subtle radial glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Botanical corner illustrations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.2 }}
      >
        <BotanicalCorner />
        <BotanicalCorner flip />
      </motion.div>

      {/* Portraits — slide in from opposite sides and meet at center */}
      <Portrait ref={groomRef} src={groomImg} name="Abhishek" side="left" zIndex={5} />
      <Portrait ref={brideRef} src={brideImg} name="Athira" side="right" zIndex={4} />

      {/* Main content */}
      <div className="aa-hero-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', paddingBottom: 'clamp(6rem, 18vw, 12rem)' }}>
        <motion.span
          className="aa-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Together Forever
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 500,
            color: '#FAF7F2',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            marginBottom: '0.2em',
          }}
        >
          Abhishek
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            style={{
              display: 'block',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.38em',
              color: '#C9A84C',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              margin: '0.3em 0',
              fontWeight: 300,
            }}
          >
            &amp;
          </motion.span>
          Athira
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <FloralDivider color="#C9A84C" className="aa-hero-divider flex justify-center" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 3vw, 1.55rem)',
            color: '#E8BAA3',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}
        >
          with great joy, we invite you to celebrate our wedding reception
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            marginTop: '2.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.45rem',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)',
            fontWeight: 300,
          }}>
            scroll to discover
          </span>
          <motion.svg
            width="18" height="28" viewBox="0 0 18 28" fill="none"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          >
            <line x1="9" y1="0" x2="9" y2="20" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M2 14 L9 22 L16 14" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
