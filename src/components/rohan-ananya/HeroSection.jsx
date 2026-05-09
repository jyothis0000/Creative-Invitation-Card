import { useRef, forwardRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import MandalaDecor from './MandalaDecor';
import brideImg from '../../assets/bride.png';
import groomImg from '../../assets/groom.png';

gsap.registerPlugin(ScrollTrigger);

/* ── Corner bracket ── */
function CornerBracket({ top, left }) {
  const deg = (top ? 0 : 180) + (left ? 0 : 90);
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{
      position: 'absolute',
      top: top ? '1.25rem' : 'auto',
      bottom: top ? 'auto' : '1.25rem',
      left: left ? '1.25rem' : 'auto',
      right: left ? 'auto' : '1.25rem',
      transform: `rotate(${deg}deg)`,
      opacity: 0.38,
      pointerEvents: 'none',
    }}>
      <path d="M6 6 L6 34" stroke="#C8962E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 6 L34 6" stroke="#C8962E" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6" cy="6" r="2.5" fill="#C8962E" />
      <circle cx="18" cy="18" r="1.2" fill="#C8962E" opacity="0.5" />
    </svg>
  );
}

/* ── Falling marigold / diya shapes ── */
const SHAPES = {
  marigold: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(d => (
        <ellipse key={d} cx="10" cy="4" rx="2.5" ry="4.5"
          fill="#C8962E" opacity="0.55"
          transform={`rotate(${d} 10 10)`} />
      ))}
      <circle cx="10" cy="10" r="3" fill="#E8C47A" opacity="0.8" />
    </svg>
  ),
  petal: (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
      <path d="M7 21 C1 15 0 7 4 2 Q7 -1 10 2 C14 7 13 15 7 21Z" fill="#C97070" opacity="0.6" />
    </svg>
  ),
  leaf: (
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
      <path d="M6 19 C1 13 0 6 3 2 Q6 -1 9 2 C12 6 11 13 6 19Z" fill="#6B1515" opacity="0.4" />
    </svg>
  ),
  diya: (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <ellipse cx="11" cy="11" rx="9" ry="4" fill="#C8962E" opacity="0.45" />
      <path d="M11 11 Q12 4 11 1 Q10 4 11 11" stroke="#E8C47A" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
};

const fallingItems = [
  { left: '7%',  dur: 9,  delay: 0,   drift: '35px',  shape: 'marigold' },
  { left: '18%', dur: 11, delay: 2.5, drift: '-28px', shape: 'petal' },
  { left: '32%', dur: 8,  delay: 1,   drift: '22px',  shape: 'leaf' },
  { left: '50%', dur: 10, delay: 5,   drift: '18px',  shape: 'diya' },
  { left: '65%', dur: 9,  delay: 3,   drift: '-42px', shape: 'marigold' },
  { left: '78%', dur: 7,  delay: 0.5, drift: '30px',  shape: 'petal' },
  { left: '90%', dur: 12, delay: 4,   drift: '-20px', shape: 'leaf' },
  { left: '42%', dur: 8,  delay: 3.5, drift: '-30px', shape: 'diya' },
];

/* ── Portrait ── */
const Portrait = forwardRef(function Portrait({ src, name, side }, ref) {
  return (
    <div ref={ref} style={{
      position: 'absolute',
      bottom: 0,
      [side]: 0,
      zIndex: side === 'left' ? 5 : 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: side === 'right' ? 0.4 : 0 },
        }}
      >
        <img src={src} alt={name} className="ra-portrait-img" />
      </motion.div>
      <span className="ra-portrait-label">{name}</span>
    </div>
  );
});

export default function HeroSection() {
  const sectionRef = useRef(null);
  const groomRef   = useRef(null);
  const brideRef   = useRef(null);

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

    mm.add('(min-width: 769px)', () => buildTimeline(-110, false));
    mm.add('(max-width: 768px)', () => buildTimeline(-50, true));
    return () => mm.revert();
  }, { scope: sectionRef });

  useEffect(() => {
    const doRefresh = () => ScrollTrigger.refresh();
    const imgs = document.querySelectorAll('.ra-portrait-img');
    let pending = 0;
    imgs.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        pending++;
        img.addEventListener('load', () => { pending--; if (pending === 0) doRefresh(); }, { once: true });
      }
    });
    if (pending === 0) {
      const raf = requestAnimationFrame(doRefresh);
      return () => cancelAnimationFrame(raf);
    }
    const fallback = setTimeout(doRefresh, 800);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ra-hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #2C0F0F 0%, #4A1515 45%, #6B2020 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 1.5rem',
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,150,46,0.09) 0%, transparent 70%)',
      }} />

      {/* Corner brackets */}
      <CornerBracket top left />
      <CornerBracket top left={false} />
      <CornerBracket top={false} left />
      <CornerBracket top={false} left={false} />

      {/* Falling elements */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.4 }}>
        {fallingItems.map((p, i) => (
          <div key={i} aria-hidden="true" style={{
            position: 'absolute', left: p.left, top: '-40px', opacity: 0.75,
            animation: `ra-petal-spin ${p.dur}s linear ${p.delay}s infinite`,
            '--drift': p.drift, pointerEvents: 'none',
          }}>
            {SHAPES[p.shape]}
          </div>
        ))}
      </motion.div>

      {/* Portraits */}
      <Portrait ref={groomRef} src={groomImg} name="Rohan" side="left" />
      <Portrait ref={brideRef} src={brideImg} name="Ananya" side="right" />

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', width: '100%',
        paddingBottom: 'clamp(6rem, 18vw, 12rem)',
      }}>
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'block',
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.55rem',
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            color: 'rgba(200,150,46,0.7)',
            marginBottom: '1rem',
          }}
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
            color: '#FEF6EC',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            marginBottom: '0.2em',
          }}
        >
          Rohan
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            style={{
              display: 'block',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.38em',
              color: '#C8962E',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              margin: '0.3em 0',
              fontWeight: 300,
            }}
          >
            &amp;
          </motion.span>
          Ananya
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <MandalaDecor style={{ margin: '1.25rem 0' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.8vw, 1.4rem)',
            color: 'rgba(240,213,197,0.75)',
            marginBottom: '0.5rem',
            fontWeight: 300,
          }}
        >
          with joy & blessings, we invite you to celebrate our wedding
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
        >
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.5rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(200,150,46,0.6)',
          }}>
            scroll to discover
          </span>
          <motion.svg
            width="18" height="28" viewBox="0 0 18 28" fill="none"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          >
            <line x1="9" y1="0" x2="9" y2="20" stroke="#C8962E" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M2 14 L9 22 L16 14" stroke="#C8962E" strokeWidth="1.2" strokeOpacity="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
