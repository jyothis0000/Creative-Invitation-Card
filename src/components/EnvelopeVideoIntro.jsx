import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getBGM from '../utils/audio';
import cardVideo from '../assets/card.mp4';

const isDesktop = () => window.innerWidth >= 768;

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (isDesktop()) {
      onComplete();
    }
  }, []);

  if (isDesktop()) return null;

  function finish() {
    if (fading) return;
    const bgm = getBGM();
    if (bgm) bgm.play().catch(() => { });
    setFading(true);
    setTimeout(onComplete, 150);
  }

  function handleClick() {
    if (playing) return;
    setPlaying(true);
    const bgm = getBGM();
    if (bgm) {
      bgm.play().catch(() => {
        // If blocked, it will retry on next interaction
      });
    }
    videoRef.current?.play().catch(() => { });
  }

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={!playing ? handleClick : undefined}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#FAF7F2',
        cursor: playing ? 'default' : 'pointer',
      }}
    >
      <video
        ref={videoRef}
        src={`${cardVideo}#t=0.001`}
        onEnded={finish}
        playsInline
        muted
        preload="metadata"
        onPlay={() => setPlaying(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {!playing && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ textAlign: 'center', marginTop: '15rem' }}
          >
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginTop: '0.5rem', color: '#C9A84C', fontSize: '0.9rem' }}
            >
              ▲
            </motion.div>
            <motion.p
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                color: '#C9A84C',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                margin: 0,
              }}
            >
              Tap to Open
            </motion.p>

          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
