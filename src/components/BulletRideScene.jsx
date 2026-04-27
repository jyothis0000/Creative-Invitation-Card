import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── Petal Component ───────────────────────────────────── */
function Petal({ style }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: 12,
        height: 18,
        background: 'radial-gradient(ellipse at center, #ffb3c6, #ff6b8a)',
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        animation: `petal-fall ${3 + Math.random() * 4}s linear infinite`,
        animationDelay: `${Math.random() * 6}s`,
        '--drift': `${(Math.random() - 0.5) * 120}px`,
        ...style,
      }}
    />
  );
}

/* ─── Bird Component ────────────────────────────────────── */
function Bird({ x, y, delay }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={`M0,0 Q5,-6 10,0 Q15,-6 20,0`}
        fill="none"
        stroke="#2D5016"
        strokeWidth="1.5"
        style={{
          transformOrigin: '10px 0',
          animation: `bird-flap 0.4s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </g>
  );
}

/* ─── Motorcycle SVG ─────────────────────────────────────── */
function MotorcycleSVG({ wheelProgress }) {
  const rot = wheelProgress * 1440;
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" aria-label="Royal Enfield Bullet motorcycle with Abhishek and Athira">
      {/* Rear wheel */}
      <g transform="translate(46, 82)">
        <circle cx="0" cy="0" r="32" fill="none" stroke="#2a1a0a" strokeWidth="6" />
        <circle cx="0" cy="0" r="20" fill="none" stroke="#5C3317" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#C8941A" />
        {/* Spokes */}
        {[0, 45, 90, 135].map((a, i) => (
          <line
            key={i}
            x1={-26 * Math.cos(((a + rot) * Math.PI) / 180)}
            y1={-26 * Math.sin(((a + rot) * Math.PI) / 180)}
            x2={26 * Math.cos(((a + rot) * Math.PI) / 180)}
            y2={26 * Math.sin(((a + rot) * Math.PI) / 180)}
            stroke="#5C3317" strokeWidth="1.5"
          />
        ))}
      </g>

      {/* Front wheel */}
      <g transform="translate(174, 82)">
        <circle cx="0" cy="0" r="28" fill="none" stroke="#2a1a0a" strokeWidth="6" />
        <circle cx="0" cy="0" r="18" fill="none" stroke="#5C3317" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#C8941A" />
        {[0, 45, 90, 135].map((a, i) => (
          <line
            key={i}
            x1={-22 * Math.cos(((a + rot) * Math.PI) / 180)}
            y1={-22 * Math.sin(((a + rot) * Math.PI) / 180)}
            x2={22 * Math.cos(((a + rot) * Math.PI) / 180)}
            y2={22 * Math.sin(((a + rot) * Math.PI) / 180)}
            stroke="#5C3317" strokeWidth="1.5"
          />
        ))}
      </g>

      {/* Frame */}
      <path d="M46,50 L78,38 L120,36 L150,42 L174,54" fill="none" stroke="#2a1a0a" strokeWidth="5" strokeLinecap="round" />
      {/* Engine block */}
      <rect x="80" y="52" width="52" height="28" rx="4" fill="#3a2a10" />
      <rect x="86" y="58" width="38" height="16" rx="2" fill="#5C3317" />
      {/* Tank */}
      <path d="M96,36 Q120,28 144,38 L144,54 Q120,48 96,52Z" fill="#8B0000" />
      {/* Fender rear */}
      <path d="M26,54 Q36,44 46,50" fill="none" stroke="#2a1a0a" strokeWidth="4" />
      {/* Handlebar */}
      <path d="M150,36 L160,28 L168,26" fill="none" stroke="#2a1a0a" strokeWidth="3" strokeLinecap="round" />
      {/* Exhaust */}
      <path d="M80,74 Q60,80 40,78 Q34,76 32,72" fill="none" stroke="#5C3317" strokeWidth="4" strokeLinecap="round" />
      {/* Headlight */}
      <ellipse cx="196" cy="54" rx="12" ry="10" fill="#E8B84B" opacity="0.8" stroke="#C8941A" strokeWidth="1.5" />

      {/* ABHISHEK — rider silhouette */}
      <g transform="translate(100, 0)">
        {/* Body */}
        <rect x="8" y="14" width="16" height="26" rx="4" fill="#2a1a0a" />
        {/* Head */}
        <circle cx="16" cy="10" r="9" fill="#C8941A" opacity="0.9" />
        {/* Arm forward */}
        <path d="M24,22 Q38,20 44,26" fill="none" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" />
        {/* Leg */}
        <path d="M14,38 L10,52 L6,52" fill="none" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" />
        <path d="M20,38 L22,52 L26,52" fill="none" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* ATHIRA — pillion silhouette in kasavu saree */}
      <g transform="translate(74, 0)">
        {/* Kasavu saree drape */}
        <path d="M10,16 Q2,26 4,40 Q8,44 16,42 Q22,38 20,24Z" fill="#FAF3E0" opacity="0.95" />
        {/* Gold border on saree */}
        <path d="M4,40 Q8,44 16,42" fill="none" stroke="#C8941A" strokeWidth="1.5" />
        {/* Body */}
        <rect x="8" y="14" width="14" height="22" rx="4" fill="#8B0000" opacity="0.9" />
        {/* Head */}
        <circle cx="15" cy="10" r="8" fill="#C8941A" opacity="0.9" />
        {/* Flowers in hair */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx={10 + i * 4} cy={4} r="2.5" fill="#ff9999" opacity="0.9" />
        ))}
        {/* Dupatta */}
        <path d="M22,18 Q30,24 28,36" fill="none" stroke="#FAF3E0" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        {/* Arm holding groom */}
        <path d="M22,22 Q28,20 32,22" fill="none" stroke="#C8941A" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  );
}

/* ─── Kerala Landscape SVG ───────────────────────────────── */
function KeralaLandscape({ cloudOffset, motoX, motoY, wheelProgress }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-label="Kerala countryside landscape with coconut palms, paddy fields and temple"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3a6e" />
          <stop offset="40%" stopColor="#4a7ab5" />
          <stop offset="100%" stopColor="#f4a261" />
        </linearGradient>
        <linearGradient id="hill-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#1a3010" />
        </linearGradient>
        <linearGradient id="road-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a3a1a" />
          <stop offset="100%" stopColor="#5C3317" />
        </linearGradient>
        <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a90c4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2a6a9a" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* ── Layer 1: Sky ── */}
      <rect x="0" y="0" width="1000" height="600" fill="url(#sky-grad)" />

      {/* Clouds — drift slowly */}
      <g transform={`translate(${cloudOffset * 0.3}, 0)`} opacity="0.6">
        <ellipse cx="150" cy="80" rx="80" ry="30" fill="white" opacity="0.7" />
        <ellipse cx="200" cy="70" rx="60" ry="25" fill="white" opacity="0.8" />
        <ellipse cx="120" cy="85" rx="50" ry="22" fill="white" opacity="0.6" />
      </g>
      <g transform={`translate(${cloudOffset * 0.15}, 0)`} opacity="0.5">
        <ellipse cx="650" cy="60" rx="90" ry="28" fill="white" opacity="0.7" />
        <ellipse cx="700" cy="52" rx="65" ry="24" fill="white" opacity="0.8" />
      </g>
      <g transform={`translate(${cloudOffset * 0.2}, 0)`} opacity="0.4">
        <ellipse cx="420" cy="90" rx="70" ry="26" fill="white" opacity="0.6" />
        <ellipse cx="460" cy="80" rx="50" ry="22" fill="white" />
      </g>

      {/* ── Layer 2: Temple gopuram silhouette ── */}
      <g opacity="0.6">
        <rect x="800" y="180" width="60" height="220" fill="#1a3010" />
        <polygon points="800,180 830,120 860,180" fill="#1a3010" />
        <polygon points="808,160 830,110 852,160" fill="#2D5016" />
        <rect x="814" y="140" width="32" height="10" fill="#1a3010" />
        <rect x="810" y="128" width="40" height="10" fill="#1a3010" />
        <rect x="818" y="118" width="24" height="8" fill="#1a3010" />
        {/* Flagpole */}
        <rect x="828" y="60" width="4" height="60" fill="#C8941A" opacity="0.7" />
        <polygon points="832,62 848,70 832,78" fill="#C8941A" opacity="0.7" />
      </g>

      {/* ── Layer 2: Distant hills ── */}
      <path d="M0,300 Q200,200 400,250 Q600,200 800,240 Q900,210 1000,260 L1000,400 L0,400Z" fill="url(#hill-grad)" opacity="0.7" />
      <path d="M0,340 Q150,280 350,300 Q550,270 750,290 Q900,270 1000,300 L1000,420 L0,420Z" fill="#2D5016" opacity="0.6" />

      {/* ── Layer 3: Paddy fields ── */}
      <path d="M0,380 L1000,340 L1000,480 L0,500Z" fill="#4a7a22" opacity="0.8" />
      {/* Field rows */}
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M0,${390 + i * 20} L1000,${350 + i * 20}`} fill="none" stroke="#3a6018" strokeWidth="1" opacity="0.5" />
      ))}

      {/* Coconut palms — Layer 3 */}
      {[80, 200, 320, 550, 680, 880].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${280 + (i % 3) * 20})`}>
          {/* Trunk */}
          <path d={`M0,0 Q${(i % 2 === 0 ? 5 : -5)},${-80} 0,${-160}`} fill="none" stroke="#5C3317" strokeWidth={6 - i * 0.3} />
          {/* Fronds */}
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, j) => (
            <path
              key={j}
              d={`M0,-160 Q${40 * Math.cos((angle * Math.PI) / 180)},${40 * Math.sin((angle * Math.PI) / 180) - 80} ${70 * Math.cos((angle * Math.PI) / 180)},${70 * Math.sin((angle * Math.PI) / 180) - 120}`}
              fill="none"
              stroke="#2D5016"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
          {/* Coconuts */}
          <circle cx={6} cy={-165} r={5} fill="#8B6010" />
          <circle cx={-4} cy={-168} r={4} fill="#8B6010" />
        </g>
      ))}

      {/* ── Layer 4: River with canoe ── */}
      <path d="M-50,450 Q200,420 400,440 Q600,460 800,430 Q900,420 1050,445 L1050,520 Q900,510 800,530 Q600,550 400,530 Q200,510 -50,540Z" fill="url(#water-grad)" />
      {/* River shimmer */}
      {[0, 1, 2].map(i => (
        <path key={i} d={`M${100 + i * 300},${440 + i * 5} Q${200 + i * 300},${435 + i * 5} ${300 + i * 300},${440 + i * 5}`} fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      ))}
      {/* Canoe */}
      <g transform="translate(300, 460)">
        <path d="M-30,8 Q0,-4 30,8 L25,16 Q0,20 -25,16Z" fill="#5C3317" />
        <line x1="0" y1="-4" x2="0" y2="20" stroke="#3a2a10" strokeWidth="2" />
        <path d="M0,20 L12,14 L12,18Z" fill="#8B6010" />
        {/* Person in canoe */}
        <circle cx="0" cy="-10" r="6" fill="#C8941A" opacity="0.8" />
        <rect x="-4" y="-4" width="8" height="12" rx="2" fill="#2D5016" opacity="0.8" />
      </g>

      {/* ── Layer 4: Laterite road ── */}
      <path d="M-80,580 Q100,480 300,430 Q500,380 700,360 Q850,345 1050,300"
        fill="none" stroke="url(#road-grad)" strokeWidth="28" strokeLinecap="round" />
      {/* Road center line */}
      <path d="M-80,580 Q100,480 300,430 Q500,380 700,360 Q850,345 1050,300"
        fill="none" stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" strokeDasharray="20 16" opacity="0.5" />
      {/* Road edge lines */}
      <path d="M-80,568 Q100,468 300,418 Q500,368 700,348 Q850,333 1050,288"
        fill="none" stroke="#C8941A" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* ── Layer 5: Motorcycle ── */}
      <g transform={`translate(${motoX}, ${motoY})`} style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
        <MotorcycleSVG wheelProgress={wheelProgress} />
      </g>

      {/* Foreground grass tufts */}
      {[0, 120, 250, 400, 560, 720, 900].map((x, i) => (
        <g key={i} transform={`translate(${x}, 570)`}>
          {[0, 8, 16].map(j => (
            <path key={j} d={`M${j},0 Q${j + (i % 2 === 0 ? 4 : -4)},-18 ${j + 2},-28`} fill="none" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function BulletRideScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const motoXRaw = useTransform(scrollYProgress, [0, 1], [-120, 900]);
  const motoYRaw = useTransform(scrollYProgress, [0, 1], [380, 220]);
  const wheelRot = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cloudOffset = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

  /* Petal array */
  const petals = Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 7 + Math.random() * 10) % 95}%`,
    top: `-${20 + Math.random() * 30}px`,
    animationDelay: `${i * 0.4}s`,
  }));

  if (isMobile) {
    /* Static Kerala scene for mobile */
    return (
      <section
        style={{
          background: 'linear-gradient(180deg, #1a3a6e 0%, #4a7ab5 30%, #4a7a22 60%, #5C3317 100%)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1.4rem', color: '#C8941A', marginBottom: '0.5rem' }}>
          ഒരു പുതിയ യാത്ര ആരംഭിക്കുന്നു
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#FAF3E0CC' }}>
          A new journey begins...
        </p>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      style={{ height: '400vh', position: 'relative' }}
      aria-label="Cinematic Kerala countryside motorcycle scroll scene"
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Landscape */}
        <motion.div style={{ position: 'absolute', inset: 0 }}>
          <motion.div style={{ position: 'absolute', inset: 0 }}>
            {/* Use motion values for JS-driven animation */}
            <MotionLandscape
              cloudOffset={cloudOffset}
              motoX={motoXRaw}
              motoY={motoYRaw}
              wheelProgress={wheelRot}
            />
          </motion.div>
        </motion.div>

        {/* Falling petals */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {petals.map((p, i) => (
            <Petal key={i} style={{ left: p.left, top: p.top, animationDelay: p.animationDelay }} />
          ))}
        </div>

        {/* Text overlay */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: textOpacity,
            y: textY,
            pointerEvents: 'none',
            zIndex: 10,
            width: '90%',
          }}
        >
          <p style={{
            fontFamily: "'Noto Serif Malayalam', serif",
            fontSize: 'clamp(1.4rem, 4vw, 3rem)',
            color: '#C8941A',
            textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            marginBottom: '0.5rem',
            fontWeight: 600,
          }}>
            ഒരു പുതിയ യാത്ര ആരംഭിക്കുന്നു
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            color: '#FAF3E0CC',
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
          }}>
            A new journey begins...
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* Use motion component to pass MotionValues directly */
function MotionLandscape({ cloudOffset, motoX, motoY, wheelProgress }) {
  const cloudVal = useMotionValue(cloudOffset);
  return (
    <MotionSVGScene
      cloudOffset={cloudOffset}
      motoX={motoX}
      motoY={motoY}
      wheelProgress={wheelProgress}
    />
  );
}

function useMotionValue(val) { return val; }

function MotionSVGScene({ cloudOffset, motoX, motoY, wheelProgress }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const unsubs = [
      cloudOffset.on('change', (v) => {
        if (!svgRef.current) return;
        const clouds = svgRef.current.querySelectorAll('[data-cloud]');
        clouds.forEach((c, i) => {
          const factor = [0.3, 0.15, 0.2][i] ?? 0.2;
          c.setAttribute('transform', `translate(${v * factor}, 0)`);
        });
      }),
      motoX.on('change', updateMoto),
      motoY.on('change', updateMoto),
      wheelProgress.on('change', (v) => {
        if (!svgRef.current) return;
        const rot = v * 1440;
        svgRef.current.querySelectorAll('[data-spoke]').forEach((el, i) => {
          const baseAngle = (i % 4) * 45 + rot;
          const cx = el.getAttribute('data-cx');
          const cy = el.getAttribute('data-cy');
          const r = parseFloat(el.getAttribute('data-r'));
          const angle = (baseAngle * Math.PI) / 180;
          el.setAttribute('x1', cx - r * Math.cos(angle));
          el.setAttribute('y1', cy - r * Math.sin(angle));
          el.setAttribute('x2', cx + r * Math.cos(angle) * 1);
          el.setAttribute('y2', cy + r * Math.sin(angle) * 1);
        });
      }),
    ];
    function updateMoto() {
      if (!svgRef.current) return;
      const x = motoX.get();
      const y = motoY.get();
      const motoGroup = svgRef.current.querySelector('[data-moto]');
      if (motoGroup) {
        motoGroup.setAttribute('transform', `translate(${x}, ${y})`);
      }
    }
    return () => unsubs.forEach(u => u());
  }, [cloudOffset, motoX, motoY, wheelProgress]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 600"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      preserveAspectRatio="xMidYMid slice"
      aria-label="Kerala countryside scene"
    >
      <defs>
        <linearGradient id="brs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2557" />
          <stop offset="40%" stopColor="#3a6ab0" />
          <stop offset="100%" stopColor="#e88a50" />
        </linearGradient>
        <linearGradient id="brs-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="100%" stopColor="#1a3010" />
        </linearGradient>
        <linearGradient id="brs-road" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a3a1a" />
          <stop offset="100%" stopColor="#5C3317" />
        </linearGradient>
        <linearGradient id="brs-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a90c4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2a6a9a" stopOpacity="0.5" />
        </linearGradient>
        <filter id="brs-blur">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1000" height="600" fill="url(#brs-sky)" />

      {/* Clouds */}
      <g data-cloud opacity="0.65">
        <ellipse cx="150" cy="80" rx="80" ry="30" fill="white" opacity="0.7" />
        <ellipse cx="200" cy="70" rx="60" ry="25" fill="white" opacity="0.8" />
        <ellipse cx="120" cy="85" rx="50" ry="22" fill="white" opacity="0.6" />
      </g>
      <g data-cloud opacity="0.5">
        <ellipse cx="650" cy="60" rx="90" ry="28" fill="white" opacity="0.7" />
        <ellipse cx="700" cy="52" rx="65" ry="24" fill="white" opacity="0.8" />
      </g>
      <g data-cloud opacity="0.4">
        <ellipse cx="420" cy="90" rx="70" ry="26" fill="white" opacity="0.6" />
        <ellipse cx="460" cy="80" rx="50" ry="22" fill="white" />
      </g>

      {/* Sun glow */}
      <circle cx="160" cy="120" r="45" fill="#f4a261" opacity="0.5" filter="url(#brs-blur)" />
      <circle cx="160" cy="120" r="28" fill="#ffd166" opacity="0.8" />

      {/* Temple gopuram */}
      <g opacity="0.55">
        <rect x="820" y="185" width="55" height="215" fill="url(#brs-hill)" />
        <polygon points="820,185 847,130 875,185" fill="#1a3010" />
        <polygon points="828,168 847,122 867,168" fill="#2D5016" />
        <rect x="833" y="148" width="28" height="8" fill="#1a3010" />
        <rect x="830" y="136" width="35" height="8" fill="#1a3010" />
        <rect x="836" y="125" width="22" height="8" fill="#1a3010" />
        <rect x="846" y="65" width="3" height="68" fill="#C8941A" opacity="0.8" />
        <polygon points="849,67 862,75 849,82" fill="#C8941A" opacity="0.7" />
      </g>

      {/* Hills */}
      <path d="M0,300 Q200,200 400,250 Q600,200 800,240 Q900,210 1000,260 L1000,400 L0,400Z" fill="url(#brs-hill)" opacity="0.65" />
      <path d="M0,340 Q150,280 350,305 Q550,275 750,295 Q900,275 1000,305 L1000,420 L0,420Z" fill="#2D5016" opacity="0.55" />

      {/* Paddy fields */}
      <path d="M0,380 L1000,340 L1000,490 L0,510Z" fill="#4a7a22" opacity="0.75" />
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M0,${392 + i * 22} L1000,${352 + i * 22}`} fill="none" stroke="#3a6018" strokeWidth="1" opacity="0.4" />
      ))}

      {/* Coconut palms */}
      {[70, 190, 310, 540, 670, 870].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${290 + (i % 3) * 18})`}>
          <path d={`M0,0 Q${i % 2 === 0 ? 6 : -6},-85 0,-165`} fill="none" stroke="#5C3317" strokeWidth={5.5 - i * 0.2} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
            <path
              key={j}
              d={`M0,-165 Q${38 * Math.cos((angle * Math.PI) / 180)},${38 * Math.sin((angle * Math.PI) / 180) - 82} ${65 * Math.cos((angle * Math.PI) / 180)},${65 * Math.sin((angle * Math.PI) / 180) - 122}`}
              fill="none" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round"
            />
          ))}
          <circle cx={5} cy={-168} r={4.5} fill="#8B6010" />
          <circle cx={-3} cy={-172} r={3.5} fill="#8B6010" />
          {/* Birds flying away */}
          {i === 2 && [0, 1, 2].map(b => (
            <g key={b} transform={`translate(${30 + b * 20}, ${-180 - b * 10})`} opacity="0.7">
              <path d="M0,0 Q5,-5 10,0 Q15,-5 20,0" fill="none" stroke="#1a3010" strokeWidth="1.2"
                style={{ animation: `bird-flap 0.4s ease-in-out infinite`, animationDelay: `${b * 0.15}s` }} />
            </g>
          ))}
        </g>
      ))}

      {/* River */}
      <path d="M-50,455 Q200,425 400,445 Q600,465 800,435 Q900,425 1050,450 L1050,525 Q900,515 800,535 Q600,555 400,535 Q200,515 -50,545Z" fill="url(#brs-water)" />
      {[0, 1, 2].map(i => (
        <path key={i} d={`M${110 + i * 290},${447 + i * 5} Q${210 + i * 290},${442 + i * 5} ${300 + i * 290},${447 + i * 5}`} fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      ))}
      {/* Canoe */}
      <g transform="translate(310, 462)">
        <path d="M-28,8 Q0,-4 28,8 L23,16 Q0,20 -23,16Z" fill="#5C3317" />
        <line x1="0" y1="-4" x2="0" y2="20" stroke="#3a2a10" strokeWidth="2" />
        <path d="M0,20 L10,14 L10,18Z" fill="#8B6010" />
        <circle cx="0" cy="-9" r="5" fill="#C8941A" opacity="0.8" />
        <rect x="-3" y="-4" width="6" height="10" rx="2" fill="#2D5016" opacity="0.8" />
      </g>

      {/* Road */}
      <path d="M-80,582 Q100,482 300,432 Q500,382 700,362 Q855,347 1055,302"
        fill="none" stroke="url(#brs-road)" strokeWidth="30" strokeLinecap="round" />
      <path d="M-80,582 Q100,482 300,432 Q500,382 700,362 Q855,347 1055,302"
        fill="none" stroke="#E8B84B" strokeWidth="2" strokeDasharray="22 16" opacity="0.55" />
      <path d="M-80,568 Q100,468 300,418 Q500,368 700,348 Q855,333 1055,288"
        fill="none" stroke="#C8941A" strokeWidth="1" opacity="0.5" />

      {/* Motorcycle group — JS-driven */}
      <g data-moto transform="translate(-120, 380)" style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.5))' }}>
        {/* Rear wheel */}
        <g>
          <circle cx="46" cy="88" r="30" fill="none" stroke="#2a1a0a" strokeWidth="6" />
          <circle cx="46" cy="88" r="18" fill="none" stroke="#5C3317" strokeWidth="2" />
          <circle cx="46" cy="88" r="5" fill="#C8941A" />
          {[0, 45, 90, 135].map((a, i) => (
            <line
              key={i}
              data-spoke data-cx="46" data-cy="88" data-r="24"
              x1={46 - 24 * Math.cos((a * Math.PI) / 180)}
              y1={88 - 24 * Math.sin((a * Math.PI) / 180)}
              x2={46 + 24 * Math.cos((a * Math.PI) / 180)}
              y2={88 + 24 * Math.sin((a * Math.PI) / 180)}
              stroke="#5C3317" strokeWidth="1.5"
            />
          ))}
        </g>
        {/* Front wheel */}
        <g>
          <circle cx="174" cy="88" r="26" fill="none" stroke="#2a1a0a" strokeWidth="6" />
          <circle cx="174" cy="88" r="16" fill="none" stroke="#5C3317" strokeWidth="2" />
          <circle cx="174" cy="88" r="5" fill="#C8941A" />
          {[0, 45, 90, 135].map((a, i) => (
            <line
              key={i}
              data-spoke data-cx="174" data-cy="88" data-r="20"
              x1={174 - 20 * Math.cos((a * Math.PI) / 180)}
              y1={88 - 20 * Math.sin((a * Math.PI) / 180)}
              x2={174 + 20 * Math.cos((a * Math.PI) / 180)}
              y2={88 + 20 * Math.sin((a * Math.PI) / 180)}
              stroke="#5C3317" strokeWidth="1.5"
            />
          ))}
        </g>
        {/* Frame */}
        <path d="M46,56 L78,42 L120,40 L150,46 L174,58" fill="none" stroke="#2a1a0a" strokeWidth="5" strokeLinecap="round" />
        {/* Engine */}
        <rect x="80" y="54" width="50" height="28" rx="4" fill="#3a2a10" />
        <rect x="86" y="60" width="36" height="14" rx="2" fill="#5C3317" />
        {/* Tank */}
        <path d="M96,40 Q118,32 142,42 L142,58 Q118,52 96,56Z" fill="#8B0000" />
        {/* Handlebar */}
        <path d="M148,40 L158,32 L166,30" fill="none" stroke="#2a1a0a" strokeWidth="3" strokeLinecap="round" />
        {/* Exhaust */}
        <path d="M80,76 Q60,82 40,80 Q34,78 32,74" fill="none" stroke="#5C3317" strokeWidth="4" strokeLinecap="round" />
        {/* Headlight */}
        <ellipse cx="192" cy="58" rx="10" ry="8" fill="#E8B84B" opacity="0.9" stroke="#C8941A" strokeWidth="1.5" />
        {/* Headlight glow */}
        <ellipse cx="192" cy="58" rx="16" ry="12" fill="#E8B84B" opacity="0.2" />
        {/* Fender */}
        <path d="M28,58 Q36,48 46,56" fill="none" stroke="#2a1a0a" strokeWidth="4" />

        {/* ABHISHEK */}
        <g transform="translate(100, 0)">
          <rect x="8" y="14" width="16" height="26" rx="4" fill="#2a1a0a" />
          <circle cx="16" cy="10" r="9" fill="#C8941A" opacity="0.9" />
          <path d="M24,22 Q38,20 44,26" fill="none" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" />
          <path d="M14,38 L10,52" fill="none" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" />
          <path d="M20,38 L22,52" fill="none" stroke="#2a1a0a" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* ATHIRA */}
        <g transform="translate(74, 0)">
          <path d="M10,16 Q2,26 4,42 Q8,46 16,44 Q22,40 20,24Z" fill="#FAF3E0" opacity="0.95" />
          <path d="M4,42 Q8,46 16,44" fill="none" stroke="#C8941A" strokeWidth="1.8" />
          <rect x="8" y="14" width="14" height="22" rx="4" fill="#8B0000" opacity="0.9" />
          <circle cx="15" cy="10" r="8" fill="#C8941A" opacity="0.9" />
          {[0, 1, 2].map(i => <circle key={i} cx={9 + i * 4} cy={4} r="2.5" fill="#ff9999" opacity="0.9" />)}
          <path d="M22,18 Q30,24 28,36" fill="none" stroke="#FAF3E0" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>

      {/* Foreground grass */}
      {[0, 100, 230, 390, 550, 710, 880].map((x, i) => (
        <g key={i} transform={`translate(${x}, 572)`}>
          {[0, 9, 18].map(j => (
            <path key={j} d={`M${j},0 Q${j + (i % 2 === 0 ? 4 : -4)},-16 ${j + 2},-26`} fill="none" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </g>
      ))}
    </svg>
  );
}
