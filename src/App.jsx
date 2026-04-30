import { useState, lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnvelopeVideoIntro from './components/EnvelopeVideoIntro';
import getBGM from './utils/audio';

const AbhishekAthiraCard = lazy(() => import('./pages/AbhishekAthiraCard'));

function Loader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1B3A2D',
    }}>
      {/* <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Loading">
        <circle cx="20" cy="20" r="8" fill="none" stroke="#C9A84C" strokeWidth="2"
          strokeDasharray="20 30" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate"
            from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg> */}
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const bgm = getBGM();
    // On desktop, the intro is skipped, so we need a global interaction to start music
    const startMusic = () => {
      if (bgm) bgm.play().catch(() => { });
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
    };

    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);

    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
    };
  }, []);

  return (
    <>
      {!introDone && (
        <EnvelopeVideoIntro onComplete={() => {
          setIntroDone(true);
          const bgm = getBGM();
          if (bgm) bgm.play().catch(() => { });
        }} />
      )}

      {/* Pre-load card hidden; fade it in once intro completes */}
      <div style={{ visibility: introDone ? 'visible' : 'hidden', background: '#FAF7F2', minHeight: '100vh' }}>
        <AnimatePresence>
          {introDone && (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            >
              <Suspense fallback={<Loader />}>
                <AbhishekAthiraCard />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
