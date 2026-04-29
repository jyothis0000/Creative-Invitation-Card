import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import cardVideo from '../assets/envlope.mp4';

const isDesktop = () => window.innerWidth >= 768;

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isDesktop()) onComplete();
  }, []);

  function finish() {
    if (fading) return;
    setFading(true);
    setTimeout(onComplete, 300);
  }

  function handleClick() {
    if (playing) return;
    setPlaying(true);
    videoRef.current?.play().catch(() => { });
  }

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={!playing ? handleClick : undefined}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000',
        cursor: playing ? 'default' : 'pointer',
      }}
    >
      <video
        ref={videoRef}
        src={cardVideo}
        onEnded={finish}
        playsInline
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  );
}
