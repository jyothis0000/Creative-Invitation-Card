import { useState, lazy, Suspense } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import Hero from './components/Hero';

const SaveTheDate    = lazy(() => import('./components/SaveTheDate'));
const CoupleStory    = lazy(() => import('./components/CoupleStory'));
const BulletRideScene = lazy(() => import('./components/BulletRideScene'));
const WeddingEvents  = lazy(() => import('./components/WeddingEvents'));
const PhotoGallery   = lazy(() => import('./components/PhotoGallery'));
const RSVPForm       = lazy(() => import('./components/RSVPForm'));
const VenueMap       = lazy(() => import('./components/VenueMap'));
const Footer         = lazy(() => import('./components/Footer'));

function SectionLoader() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--cream)',
    }}>
      <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Loading">
        <circle cx="20" cy="20" r="8" fill="none" stroke="#C8941A" strokeWidth="2" strokeDasharray="20 30" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function MusicToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      className="music-toggle"
      onClick={() => setOn(v => !v)}
      aria-label={on ? 'Mute music' : 'Play music'}
      title={on ? 'Mute music' : 'Play music'}
    >
      {on ? '🎵' : '🔇'}
    </button>
  );
}

export default function App() {
  const [showMain, setShowMain] = useState(false);

  return (
    <>
      <MusicToggle />

      {/* Envelope intro — runs once per session */}
      <EnvelopeIntro onDone={() => setShowMain(true)} />

      {/* Main site — fades in after envelope */}
      {showMain && (
        <main>
          <Hero />

          <Suspense fallback={<SectionLoader />}>
            <SaveTheDate />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <CoupleStory />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <BulletRideScene />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <WeddingEvents />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <PhotoGallery />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <RSVPForm />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <VenueMap />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </main>
      )}
    </>
  );
}
