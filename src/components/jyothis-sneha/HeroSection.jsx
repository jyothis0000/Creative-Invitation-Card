import { useRef, forwardRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import WaveDecor from './WaveDecor';

gsap.registerPlugin(ScrollTrigger);

/* ── SVG Caricature: Jyothis (Beach Groom) ── */
function GroomSVG() {
  return (
    <svg viewBox="0 0 140 320" width="140" height="320" style={{ display: 'block', overflow: 'visible' }}>
      {/* Shadow */}
      <ellipse cx="70" cy="316" rx="38" ry="6" fill="rgba(13,33,55,0.15)" />
      {/* Bare feet */}
      <ellipse cx="52" cy="305" rx="16" ry="7" fill="#B8845A" />
      <ellipse cx="88" cy="305" rx="16" ry="7" fill="#B8845A" />
      {/* Toes left */}
      {[42,47,52,57,62].map((x, i) => <ellipse key={i} cx={x} cy={299} rx="3" ry="2.5" fill="#A87848" />)}
      {/* Toes right */}
      {[78,83,88,93,98].map((x, i) => <ellipse key={i} cx={x} cy={299} rx="3" ry="2.5" fill="#A87848" />)}
      {/* Legs */}
      <rect x="47" y="228" width="22" height="72" rx="11" fill="#C8906A" />
      <rect x="72" y="228" width="22" height="72" rx="11" fill="#BE8860" />
      {/* Shorts waistband */}
      <rect x="36" y="218" width="70" height="8" rx="4" fill="#BCA06A" />
      {/* Shorts */}
      <rect x="36" y="168" width="70" height="60" rx="12" fill="#D4B878" />
      <line x1="71" y1="172" x2="71" y2="228" stroke="rgba(160,130,60,0.35)" strokeWidth="1.5" />
      {/* Shirt body */}
      <rect x="32" y="100" width="78" height="76" rx="14" fill="#F0F8FF" />
      {/* Shirt collar open V */}
      <path d="M56 100 L71 122 L86 100" fill="#E8F4FC" stroke="#D0E8F8" strokeWidth="1" />
      {/* Chest tan skin */}
      <path d="M58 100 L71 118 L84 100" fill="#C8906A" opacity="0.3" />
      {/* Left arm */}
      <rect x="10" y="106" width="25" height="52" rx="12" fill="#F0F8FF" />
      {/* Left rolled sleeve */}
      <rect x="10" y="146" width="25" height="14" rx="7" fill="#D0E8F8" opacity="0.8" />
      {/* Left forearm skin */}
      <rect x="10" y="156" width="25" height="24" rx="10" fill="#C8906A" />
      {/* Left hand */}
      <ellipse cx="22" cy="184" rx="11" ry="9" fill="#C8906A" />
      {/* Right arm */}
      <rect x="107" y="106" width="25" height="52" rx="12" fill="#F0F8FF" />
      {/* Right rolled sleeve */}
      <rect x="107" y="146" width="25" height="14" rx="7" fill="#D0E8F8" opacity="0.8" />
      {/* Right forearm skin */}
      <rect x="107" y="156" width="25" height="24" rx="10" fill="#C8906A" />
      {/* Right hand */}
      <ellipse cx="120" cy="184" rx="11" ry="9" fill="#C8906A" />
      {/* Shirt buttons */}
      {[128, 142, 156].map((y, i) => <circle key={i} cx="71" cy={y} r="2.2" fill="#B8D8F0" />)}
      {/* Pocket */}
      <rect x="42" y="116" width="18" height="14" rx="3" fill="none" stroke="#D0E8F8" strokeWidth="1" />
      {/* Boutonnière */}
      <circle cx="51" cy="110" r="5.5" fill="#FFB8C8" />
      <circle cx="51" cy="110" r="3" fill="#FFE066" />
      {[0,60,120,180,240,300].map((a, i) => (
        <ellipse key={i} cx={51 + Math.cos(a*Math.PI/180)*5.5} cy={110 + Math.sin(a*Math.PI/180)*5.5}
          rx="2" ry="3" fill="#FFB8C8" opacity="0.5"
          transform={`rotate(${a} ${51 + Math.cos(a*Math.PI/180)*5.5} ${110 + Math.sin(a*Math.PI/180)*5.5})`} />
      ))}
      {/* Neck */}
      <rect x="57" y="87" width="28" height="20" rx="12" fill="#C8906A" />
      {/* Head */}
      <ellipse cx="71" cy="66" rx="36" ry="40" fill="#D4A07A" />
      {/* Hair */}
      <path d="M35 52 Q38 26 71 24 Q104 26 107 52 Q104 32 71 30 Q38 32 35 52Z" fill="#1A0C06" />
      <path d="M35 52 Q33 62 37 72" fill="#1A0C06" />
      <path d="M107 52 Q109 62 105 72" fill="#1A0C06" />
      {/* Beach wave in hair (subtle) */}
      <path d="M45 30 Q55 26 65 30 Q75 34 85 30 Q95 26 100 32" stroke="rgba(61,191,184,0.3)" strokeWidth="1.5" fill="none" />
      {/* Ears */}
      <ellipse cx="36" cy="66" rx="9" ry="11" fill="#C4906A" />
      <ellipse cx="106" cy="66" rx="9" ry="11" fill="#C4906A" />
      <ellipse cx="36" cy="66" rx="6" ry="8" fill="#D4A07A" />
      <ellipse cx="106" cy="66" rx="6" ry="8" fill="#D4A07A" />
      {/* Sunglasses pushed up */}
      <rect x="45" y="44" width="52" height="10" rx="5" fill="#1A3A52" opacity="0.7" />
      <circle cx="57" cy="49" r="7" fill="none" stroke="#2E6FA8" strokeWidth="1.5" opacity="0.8" />
      <circle cx="85" cy="49" r="7" fill="none" stroke="#2E6FA8" strokeWidth="1.5" opacity="0.8" />
      <line x1="64" y1="49" x2="78" y2="49" stroke="#2E6FA8" strokeWidth="1.5" opacity="0.8" />
      {/* Eyes */}
      <ellipse cx="57" cy="68" rx="9" ry="10" fill="white" />
      <ellipse cx="85" cy="68" rx="9" ry="10" fill="white" />
      <circle cx="59" cy="70" r="6" fill="#2C1A10" />
      <circle cx="87" cy="70" r="6" fill="#2C1A10" />
      <circle cx="61" cy="67" r="2" fill="white" />
      <circle cx="89" cy="67" r="2" fill="white" />
      {/* Eyebrows */}
      <path d="M49 57 Q57 52 65 57" stroke="#1A0C06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M77 57 Q85 52 93 57" stroke="#1A0C06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M68 79 Q71 86 74 79" stroke="#B07848" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="65" cy="82" rx="3" ry="2" fill="rgba(160,100,60,0.15)" />
      <ellipse cx="77" cy="82" rx="3" ry="2" fill="rgba(160,100,60,0.15)" />
      {/* Big smile */}
      <path d="M51 92 Q71 112 91 92" stroke="#B07848" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M54 93 Q71 108 88 93" fill="rgba(255,255,255,0.45)" />
      {/* Cheeks */}
      <ellipse cx="45" cy="88" rx="9" ry="6" fill="rgba(232,128,90,0.22)" />
      <ellipse cx="97" cy="88" rx="9" ry="6" fill="rgba(232,128,90,0.22)" />
    </svg>
  );
}

/* ── SVG Caricature: Sneha (Beach Bride) ── */
function BrideSVG() {
  return (
    <svg viewBox="0 0 140 320" width="140" height="320" style={{ display: 'block', overflow: 'visible' }}>
      {/* Shadow */}
      <ellipse cx="70" cy="316" rx="38" ry="6" fill="rgba(13,33,55,0.15)" />
      {/* Dress flowing bottom */}
      <path d="M30 200 Q20 260 15 315 Q70 330 125 315 Q120 260 112 200Z" fill="#FFFEF9" stroke="rgba(135,196,232,0.3)" strokeWidth="0.5" />
      {/* Dress inner layer shimmer */}
      <path d="M35 200 Q30 255 28 310 Q70 322 112 310 Q110 255 107 200Z" fill="rgba(135,196,232,0.08)" />
      {/* Dress body strapless */}
      <rect x="30" y="130" width="82" height="75" rx="10" fill="#FFFEF9" />
      {/* Dress bodice detail */}
      <path d="M30 145 Q70 135 112 145" stroke="rgba(135,196,232,0.4)" strokeWidth="1" fill="none" />
      <path d="M30 160 Q70 152 112 160" stroke="rgba(135,196,232,0.25)" strokeWidth="0.8" fill="none" />
      {/* Left arm */}
      <rect x="10" y="132" width="22" height="60" rx="11" fill="#D4A07A" />
      {/* Left hand + bouquet */}
      <ellipse cx="21" cy="196" rx="10" ry="8" fill="#D4A07A" />
      {/* Bouquet stems */}
      <path d="M15 196 Q12 215 14 230" stroke="#4A8A3A" strokeWidth="2" fill="none" />
      <path d="M21 198 Q20 218 20 232" stroke="#4A8A3A" strokeWidth="2" fill="none" />
      <path d="M27 196 Q28 215 26 230" stroke="#4A8A3A" strokeWidth="2" fill="none" />
      {/* Bouquet flowers */}
      {[
        [12, 186, '#FF8FAB'], [20, 180, '#FFD700'], [28, 186, '#FF6B9A'],
        [8, 180, '#FFB8C8'], [32, 180, '#FF8FAB'], [20, 172, '#FF6B9A'],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={c} opacity="0.85" />
          <circle cx={x} cy={y} r="3" fill="#FFE566" opacity="0.9" />
        </g>
      ))}
      {/* Bouquet leaves */}
      <path d="M4 188 Q8 182 12 188" fill="#5A9A4A" opacity="0.6" />
      <path d="M28 188 Q32 182 36 188" fill="#5A9A4A" opacity="0.6" />
      {/* Right arm */}
      <rect x="110" y="132" width="22" height="50" rx="11" fill="#D4A07A" />
      <ellipse cx="121" cy="186" rx="10" ry="8" fill="#D4A07A" />
      {/* Neck */}
      <rect x="56" y="112" width="28" height="22" rx="12" fill="#D4A07A" />
      {/* Collarbone */}
      <path d="M36 132 Q70 126 106 132" stroke="rgba(210,160,120,0.4)" strokeWidth="1" fill="none" />
      {/* Head */}
      <ellipse cx="70" cy="84" rx="34" ry="38" fill="#D4A07A" />
      {/* Flowing hair left */}
      <path d="M36 72 Q28 95 30 130 Q35 125 38 112 Q40 98 44 82Z" fill="#1A0C06" />
      {/* Flowing hair right */}
      <path d="M104 72 Q112 95 110 130 Q105 125 102 112 Q100 98 96 82Z" fill="#1A0C06" />
      {/* Top hair */}
      <path d="M36 68 Q40 40 70 38 Q100 40 104 68 Q100 48 70 46 Q40 48 36 68Z" fill="#1A0C06" />
      {/* Hair waves */}
      <path d="M36 90 Q32 100 34 112 Q36 105 40 98Z" fill="#1A0C06" />
      <path d="M104 90 Q108 100 106 112 Q104 105 100 98Z" fill="#1A0C06" />
      {/* Hair highlight */}
      <path d="M50 42 Q62 38 74 42" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
      {/* Flower crown */}
      {[
        [44, 50, '#FFB8C8', 7], [56, 42, '#FF8FAB', 6], [70, 39, '#FFD700', 7],
        [84, 42, '#FF8FAB', 6], [96, 50, '#FFB8C8', 7],
      ].map(([x, y, c, r], i) => (
        <g key={i}>
          {[0,60,120,180,240,300].map((a, j) => (
            <ellipse key={j} cx={x + Math.cos(a*Math.PI/180)*r} cy={y + Math.sin(a*Math.PI/180)*r}
              rx="2.5" ry="4" fill={c} opacity="0.75"
              transform={`rotate(${a} ${x + Math.cos(a*Math.PI/180)*r} ${y + Math.sin(a*Math.PI/180)*r})`} />
          ))}
          <circle cx={x} cy={y} r="3" fill="#FFE566" opacity="0.9" />
        </g>
      ))}
      {/* Tropical leaves in crown */}
      <path d="M36 52 Q40 45 48 50" fill="#4A9A3A" opacity="0.6" />
      <path d="M104 52 Q100 45 92 50" fill="#4A9A3A" opacity="0.6" />
      {/* Ears */}
      <ellipse cx="37" cy="82" rx="8" ry="10" fill="#C4906A" />
      <ellipse cx="103" cy="82" rx="8" ry="10" fill="#C4906A" />
      <ellipse cx="37" cy="82" rx="5" ry="7" fill="#D4A07A" />
      <ellipse cx="103" cy="82" rx="5" ry="7" fill="#D4A07A" />
      {/* Small pearl earrings */}
      <circle cx="37" cy="86" r="3" fill="white" opacity="0.9" />
      <circle cx="103" cy="86" r="3" fill="white" opacity="0.9" />
      {/* Eyes with lashes */}
      <ellipse cx="57" cy="80" rx="9" ry="10" fill="white" />
      <ellipse cx="83" cy="80" rx="9" ry="10" fill="white" />
      <circle cx="59" cy="82" r="6.5" fill="#2C1A10" />
      <circle cx="85" cy="82" r="6.5" fill="#2C1A10" />
      <circle cx="61" cy="79" r="2.2" fill="white" />
      <circle cx="87" cy="79" r="2.2" fill="white" />
      {/* Lashes top */}
      {[-3,-1,1,3,5].map((dx, i) => (
        <line key={i} x1={57+dx} y1={70} x2={57+dx-1} y2={65} stroke="#1A0C06" strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {[-3,-1,1,3,5].map((dx, i) => (
        <line key={i} x1={83+dx} y1={70} x2={83+dx-1} y2={65} stroke="#1A0C06" strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {/* Eyebrows - elegant arched */}
      <path d="M49 68 Q57 63 65 68" stroke="#1A0C06" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M75 68 Q83 63 91 68" stroke="#1A0C06" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose - delicate */}
      <path d="M67 89 Q70 95 73 89" stroke="#B07848" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Radiant smile */}
      <path d="M53 102 Q70 118 87 102" stroke="#B07848" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M56 103 Q70 115 84 103" fill="rgba(255,255,255,0.5)" />
      {/* Cheeks */}
      <ellipse cx="44" cy="98" rx="9" ry="6" fill="rgba(232,128,90,0.2)" />
      <ellipse cx="96" cy="98" rx="9" ry="6" fill="rgba(232,128,90,0.2)" />
      {/* Dress sparkle details */}
      {[[45,145],[65,155],[90,148],[105,162],[38,168],[75,172]].map(([x,y],i) => (
        <path key={i} d={`M${x} ${y} L${x+2} ${y+3} L${x} ${y+6} L${x-2} ${y+3}Z`}
          fill="rgba(135,196,232,0.5)" />
      ))}
    </svg>
  );
}

/* ── Floating beach elements ── */
const FLOAT_ITEMS = [
  { x: '8%',  y: '30%', delay: 0,   dur: 4,   r: '-8deg',  svg: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4 Q20 10 22 18 Q16 24 10 22 Q4 16 6 8 Q10 2 14 4Z" fill="#F2DEB3" stroke="rgba(135,196,232,0.6)" strokeWidth="1"/>
      <path d="M14 4 Q14 14 14 24" stroke="rgba(135,196,232,0.4)" strokeWidth="0.8" fill="none"/>
      <path d="M6 12 Q14 10 22 12" stroke="rgba(135,196,232,0.4)" strokeWidth="0.8" fill="none"/>
    </svg>
  )},
  { x: '88%', y: '25%', delay: 1.5, dur: 5,   r: '12deg',  svg: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {[0,72,144,216,288].map((a,i)=>(
        <path key={i} d={`M16 16 L${16+Math.cos(a*Math.PI/180)*14} ${16+Math.sin(a*Math.PI/180)*14}`}
          stroke="#E8C47A" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      <circle cx="16" cy="16" r="6" fill="#FFD700" opacity="0.8"/>
    </svg>
  )},
  { x: '15%', y: '60%', delay: 0.8, dur: 3.5, r: '5deg',  svg: (
    <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
      <rect x="14" y="20" width="8" height="28" rx="4" fill="#F2DEB3"/>
      <ellipse cx="18" cy="20" rx="10" ry="6" fill="rgba(135,196,232,0.8)"/>
      <rect x="16" y="5" width="4" height="16" rx="2" fill="#D4B87A"/>
      <path d="M10 8 Q18 2 26 8" fill="rgba(255,220,100,0.6)" stroke="rgba(255,200,60,0.5)" strokeWidth="0.5"/>
      <path d="M12 13 Q18 8 24 13" fill="rgba(255,220,100,0.5)"/>
      <circle cx="18" cy="22" r="3" fill="rgba(61,191,184,0.5)"/>
    </svg>
  )},
  { x: '82%', y: '58%', delay: 2.2, dur: 4.5, r: '-12deg', svg: (
    <svg width="28" height="30" viewBox="0 0 28 30" fill="none">
      <path d="M14 28 Q4 20 4 14 Q4 4 14 2 Q24 4 24 14 Q24 20 14 28Z" fill="#E8805A" opacity="0.7"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <line key={i} x1="14" y1="14" x2={14+Math.cos(a*Math.PI/180)*8} y2={14+Math.sin(a*Math.PI/180)*8}
          stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
      ))}
      <circle cx="14" cy="14" r="4" fill="rgba(255,255,255,0.6)"/>
    </svg>
  )},
];

/* ── Palm tree silhouette ── */
function PalmTree({ side }) {
  const flip = side === 'right';
  return (
    <svg
      viewBox="0 0 80 220" width="80" height="220"
      style={{
        position: 'absolute', bottom: 60,
        [side]: -10, pointerEvents: 'none',
        transform: flip ? 'scaleX(-1)' : 'none',
        opacity: 0.55,
      }}
    >
      {/* Trunk */}
      <path d="M40 220 Q36 180 38 140 Q35 100 40 60" stroke="#1A3A52" strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* Fronds */}
      <path d="M40 60 Q20 40 0 55" stroke="#1A5236" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M40 60 Q30 35 40 20" stroke="#1A5236" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M40 60 Q55 38 70 48" stroke="#1A5236" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M40 60 Q60 50 78 62" stroke="#1A5236" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M40 60 Q18 55 5 68" stroke="#1A5236" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Frond leaves */}
      {[[0,55,15,42],[40,20,52,12],[70,48,68,36],[78,62,72,50]].map(([x1,y1,x2,y2],i)=>(
        <path key={i} d={`M${x1} ${y1} Q${(x1+x2)/2+8} ${(y1+y2)/2-6} ${x2} ${y2}`}
          stroke="#2A6A40" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      ))}
    </svg>
  );
}

/* ── Cloud SVG ── */
function Cloud({ w = 120, opacity = 0.85 }) {
  return (
    <svg width={w} height={w * 0.45} viewBox="0 0 120 54" fill="none">
      <ellipse cx="60" cy="38" rx="55" ry="22" fill="white" opacity={opacity} />
      <ellipse cx="40" cy="32" rx="28" ry="20" fill="white" opacity={opacity} />
      <ellipse cx="75" cy="28" rx="32" ry="22" fill="white" opacity={opacity} />
      <ellipse cx="55" cy="24" rx="22" ry="18" fill="white" opacity={opacity} />
    </svg>
  );
}

/* ── Wave layers ── */
function OceanWaves() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, overflow: 'hidden' }}>
      {[
        { color: 'rgba(13,33,55,0.9)',  height: 50, speed: '8s',  offset: '0s'    },
        { color: 'rgba(46,111,168,0.6)', height: 40, speed: '12s', offset: '-4s'  },
        { color: 'rgba(61,191,184,0.4)', height: 30, speed: '6s',  offset: '-2s'  },
      ].map((w, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '200%', height: w.height,
          animation: `js-wave-move ${w.speed} linear ${w.offset} infinite`,
        }}>
          <svg width="100%" height={w.height} viewBox={`0 0 1440 ${w.height}`} preserveAspectRatio="none">
            <path
              d={`M0 ${w.height} Q180 0 360 ${w.height/2} Q540 ${w.height} 720 ${w.height/2} Q900 0 1080 ${w.height/2} Q1260 ${w.height} 1440 ${w.height/2} L1440 ${w.height}Z`}
              fill={w.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ── Portrait wrapper ── */
const Portrait = forwardRef(function Portrait({ children, name, side }, ref) {
  return (
    <div ref={ref} style={{
      position: 'absolute', bottom: 68,
      [side]: 0, zIndex: side === 'left' ? 5 : 4,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', pointerEvents: 'none',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: side === 'right' ? 0.5 : 0 },
        }}
      >
        {children}
      </motion.div>
      <span className="js-portrait-label">{name}</span>
    </div>
  );
});

/* ── Main Hero ── */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const groomRef   = useRef(null);
  const brideRef   = useRef(null);
  const cloud1Ref  = useRef(null);
  const cloud2Ref  = useRef(null);
  const cloud3Ref  = useRef(null);

  /* Cloud drift animation */
  useGSAP(() => {
    const vw = window.innerWidth;
    [
      { ref: cloud1Ref, dur: 28, delay: 0 },
      { ref: cloud2Ref, dur: 40, delay: -14 },
      { ref: cloud3Ref, dur: 22, delay: -8 },
    ].forEach(({ ref, dur, delay }) => {
      if (!ref.current) return;
      gsap.fromTo(ref.current,
        { x: vw + 200 },
        { x: -400, duration: dur, repeat: -1, ease: 'none', delay }
      );
    });
  }, []);

  /* Caricature slide-in ScrollTrigger */
  useGSAP(() => {
    const mm = gsap.matchMedia();
    const build = (gap, offScreen) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: '+=900',
          scrub: 1.5, pin: true, pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      const ge = { x: () => sectionRef.current.offsetWidth / 2 - groomRef.current.offsetWidth - gap, ease: 'power2.out', duration: 1 };
      const be = { x: () => -(sectionRef.current.offsetWidth / 2 - brideRef.current.offsetWidth - gap), ease: 'power2.out', duration: 1 };
      if (offScreen) {
        tl.fromTo(groomRef.current, { x: () => -window.innerWidth }, ge)
          .fromTo(brideRef.current, { x: () => window.innerWidth }, be, '<');
      } else {
        tl.to(groomRef.current, ge).to(brideRef.current, be, '<');
      }
      return () => tl.kill();
    };
    mm.add('(min-width: 769px)', () => build(-100, false));
    mm.add('(max-width: 768px)', () => build(-44, true));
    return () => mm.revert();
  }, { scope: sectionRef });

  useEffect(() => {
    const doRefresh = () => ScrollTrigger.refresh();
    const t = setTimeout(doRefresh, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} id="js-hero" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #87C4E8 0%, #B8DDF2 40%, #D8EEF8 70%, #F0F8FF 85%, #FFFDF7 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '3rem 1.5rem',
    }}>
      {/* Sun glow */}
      <div style={{
        position: 'absolute', top: '8%', right: '12%',
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,220,80,0.9) 0%, rgba(255,180,50,0.5) 40%, transparent 70%)',
        boxShadow: '0 0 60px rgba(255,200,60,0.4)',
        pointerEvents: 'none',
      }} />

      {/* Clouds */}
      <div ref={cloud1Ref} style={{ position: 'absolute', top: '8%', left: 0, pointerEvents: 'none' }}>
        <Cloud w={180} opacity={0.9} />
      </div>
      <div ref={cloud2Ref} style={{ position: 'absolute', top: '18%', left: 0, pointerEvents: 'none' }}>
        <Cloud w={130} opacity={0.75} />
      </div>
      <div ref={cloud3Ref} style={{ position: 'absolute', top: '5%', left: 0, pointerEvents: 'none' }}>
        <Cloud w={220} opacity={0.65} />
      </div>

      {/* Floating beach elements */}
      {FLOAT_ITEMS.map((item, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute', left: item.x, top: item.y,
          animation: `js-float ${item.dur}s ease-in-out ${item.delay}s infinite`,
          '--r': item.r, pointerEvents: 'none', zIndex: 1,
        }}>
          {item.svg}
        </div>
      ))}

      {/* Palm trees */}
      <PalmTree side="left" />
      <PalmTree side="right" />

      {/* Caricatures */}
      <Portrait ref={groomRef} name="Jyothis" side="left">
        <GroomSVG />
      </Portrait>
      <Portrait ref={brideRef} name="Sneha" side="right">
        <BrideSVG />
      </Portrait>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center', width: '100%',
        paddingBottom: 'clamp(6rem, 18vw, 12rem)',
      }}>
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'block',
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.55rem', letterSpacing: '0.44em',
            textTransform: 'uppercase', color: '#2E6FA8',
            marginBottom: '1rem',
          }}
        >
          You're invited to a beach wedding
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.2rem, 10vw, 6.5rem)',
            fontWeight: 500, color: '#0D2137',
            lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '0.2em',
          }}
        >
          Jyothis
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            style={{
              display: 'block',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontSize: '0.36em',
              color: '#3DBFB8', letterSpacing: '0.3em',
              textTransform: 'uppercase', margin: '0.3em 0', fontWeight: 300,
            }}
          >
            &amp;
          </motion.span>
          Sneha
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <WaveDecor style={{ margin: '1.25rem auto', maxWidth: 320 }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.8vw, 1.4rem)',
            color: '#2E6FA8', marginBottom: '0.5rem', fontWeight: 300,
          }}
        >
          March 15, 2027
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#3DBFB8',
          }}
        >
          Coral Cove Resort · Goa
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            marginTop: '2rem',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.4rem',
          }}
        >
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.48rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'rgba(46,111,168,0.6)',
          }}>
            scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            style={{ color: '#3DBFB8', fontSize: '1rem' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Ocean waves at bottom */}
      <OceanWaves />
    </section>
  );
}
