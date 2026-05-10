import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getBGM from '../../utils/audio';
import cardVideo from '../../assets/card.mp4';

const isDesktop = () => window.innerWidth >= 768;

export default function VideoIntro({ onComplete }) {
  const videoRef   = useRef(null);
  const [ready, setReady]     = useState(false);   // video can play without stutter
  const [playing, setPlaying] = useState(false);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    if (isDesktop()) { onComplete(); return; }

    const video = videoRef.current;
    if (!video) return;

    // Start buffering immediately so the video is ready when the user taps
    video.load();

    const onCanPlay = () => setReady(true);
    video.addEventListener('canplay', onCanPlay);
    return () => video.removeEventListener('canplay', onCanPlay);
  }, []);

  if (isDesktop()) return null;

  function finish() {
    if (fading) return;
    const bgm = getBGM();
    if (bgm) bgm.play().catch(() => {});
    setFading(true);
    setTimeout(onComplete, 300);
  }

  function handleClick() {
    if (playing) return;
    const video = videoRef.current;
    if (!video) return;

    setPlaying(true);

    const bgm = getBGM();
    const playVideo = () => {
      video.play().catch(() => {});
      if (bgm) bgm.play().catch(() => {});
    };

    if (video.readyState >= 3) {
      // HAVE_FUTURE_DATA — safe to play immediately
      playVideo();
    } else {
      // Not buffered yet — wait for canplay before starting
      video.addEventListener('canplay', playVideo, { once: true });
    }
  }

  const showBuffering = playing && !fading && videoRef.current?.readyState < 3;

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
        src={cardVideo}
        onEnded={finish}
        onPlay={() => setPlaying(true)}
        playsInline
        muted
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Tap to Open prompt */}
      {!playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            position: 'absolute',
            top: '75%',
            left: 0, right: 0,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#c77a12', fontSize: '0.9rem', marginBottom: '0.25rem' }}
          >
            ▲
          </motion.div>
          <motion.p
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              color: '#c77a12',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
              letterSpacing: '0.1em',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              margin: 0,
            }}
          >
            {ready ? 'Tap to Open' : 'Loading…'}
          </motion.p>
        </motion.div>
      )}

      {/* Buffering spinner — shown if user tapped before video was ready */}
      {showBuffering && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44" aria-label="Loading">
            <circle cx="22" cy="22" r="10" fill="none" stroke="rgba(199,122,18,0.35)" strokeWidth="2.5" />
            <circle cx="22" cy="22" r="10" fill="none" stroke="#c77a12" strokeWidth="2.5"
              strokeDasharray="18 44" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate"
                from="0 22 22" to="360 22 22" dur="0.9s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      )}
    </motion.div>
  );
}
