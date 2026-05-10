import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getBGM from '../../utils/audio';
import cardVideo from '../../assets/card.mp4';

const isDesktop = () => window.innerWidth >= 768;

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const blobUrlRef = useRef(null);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isDesktop()) { onComplete(); return; }

    let cancelled = false;
    const video = videoRef.current;

    // Gate tap on canplaythrough so play() never glitches
    function onCanPlayThrough() {
      if (!cancelled) setReady(true);
    }
    if (video) video.addEventListener('canplaythrough', onCanPlayThrough);

    // Fetch full video as blob for instant in-memory playback
    fetch(cardVideo)
      .then(res => {
        if (!res.body) throw new Error('no body');
        const total = Number(res.headers.get('content-length')) || 0;
        const reader = res.body.getReader();
        const chunks = [];
        let received = 0;

        function pump() {
          return reader.read().then(({ done, value }) => {
            if (cancelled) return;
            if (done) {
              const blob = new Blob(chunks, { type: 'video/mp4' });
              const url = URL.createObjectURL(blob);
              blobUrlRef.current = url;
              if (video) { video.src = url; video.load(); }
              return;
            }
            chunks.push(value);
            received += value.length;
            if (total > 0) setLoadPct(Math.round((received / total) * 100));
            return pump();
          });
        }
        return pump();
      })
      .catch(() => {
        if (cancelled) return;
        if (video) { video.src = cardVideo; video.load(); }
      });

    return () => {
      cancelled = true;
      if (video) video.removeEventListener('canplaythrough', onCanPlayThrough);
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  if (isDesktop()) return null;

  function finish() {
    if (fading) return;
    const bgm = getBGM();
    if (bgm) bgm.play().catch(() => { });
    setFading(true);
    setTimeout(onComplete, 300);
  }

  function handleClick() {
    if (playing || !ready) return;
    setPlaying(true);
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
    const bgm = getBGM();
    if (bgm) bgm.play().catch(() => { });
  }

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={handleClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#FAF7F2',
        cursor: ready && !playing ? 'pointer' : 'default',
      }}
    >
      <video
        ref={videoRef}
        onEnded={finish}
        onPlay={() => setPlaying(true)}
        playsInline
        muted
        preload="none"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Thin progress bar along the bottom while fetching */}
      {!ready && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: 'rgba(199,122,18,0.15)',
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${loadPct}%` }}
            transition={{ ease: 'linear', duration: 0.25 }}
            style={{ height: '100%', background: '#c77a12' }}
          />
        </div>
      )}

      {/* Tap to Open / loading hint */}
      {!playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            top: '75%',
            left: 0, right: 0,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {ready ? (
            <>
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
                Tap to Open
              </motion.p>
            </>
          ) : (
            <p style={{
              color: 'rgba(199,122,18,0.65)',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              letterSpacing: '0.12em',
              margin: 0,
            }}>
              {loadPct < 100 ? `Loading… ${loadPct}%` : 'Almost ready…'}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
