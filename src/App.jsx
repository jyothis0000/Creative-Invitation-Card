import { useState, useEffect, lazy, Suspense } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import Hero from './components/Hero';

// ─── Existing Kerala Invitation (lazy) ─────────────────────────
const SaveTheDate    = lazy(() => import('./components/SaveTheDate'));
const CoupleStory    = lazy(() => import('./components/CoupleStory'));
const BulletRideScene = lazy(() => import('./components/BulletRideScene'));
const WeddingEvents  = lazy(() => import('./components/WeddingEvents'));
const PhotoGallery   = lazy(() => import('./components/PhotoGallery'));
const RSVPForm       = lazy(() => import('./components/RSVPForm'));
const VenueMap       = lazy(() => import('./components/VenueMap'));
const Footer         = lazy(() => import('./components/Footer'));

// ─── New Alexa & Richard Card ───────────────────────────────────
const AlexaRichardCard = lazy(() => import('./pages/AlexaRichardCard'));

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

// ─── Kerala Invitation Page ─────────────────────────────────────
function KeralaInvitation() {
  const [showMain, setShowMain] = useState(false);
  return (
    <>
      <MusicToggle />
      <EnvelopeIntro onDone={() => setShowMain(true)} />
      {showMain && (
        <main>
          <Hero />
          <Suspense fallback={<SectionLoader />}><SaveTheDate /></Suspense>
          <Suspense fallback={<SectionLoader />}><CoupleStory /></Suspense>
          <Suspense fallback={<SectionLoader />}><BulletRideScene /></Suspense>
          <Suspense fallback={<SectionLoader />}><WeddingEvents /></Suspense>
          <Suspense fallback={<SectionLoader />}><PhotoGallery /></Suspense>
          <Suspense fallback={<SectionLoader />}><RSVPForm /></Suspense>
          <Suspense fallback={<SectionLoader />}><VenueMap /></Suspense>
          <Suspense fallback={<SectionLoader />}><Footer /></Suspense>
        </main>
      )}
    </>
  );
}

// ─── Tiny Hash Router — no external deps ───────────────────────
function useHashRoute() {
  const getRoute = () => {
    const hash = window.location.hash; // e.g. "#/template6"
    const path = hash.replace(/^#/, '') || '/';
    return path;
  };
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const handler = () => setRoute(getRoute());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return route;
}

// ─── Root App ───────────────────────────────────────────────────
export default function App() {
  const route = useHashRoute();
  const isTemplate6 = route === '/template6' || route.startsWith('/template6');

  if (isTemplate6) {
    return (
      <Suspense fallback={<SectionLoader />}>
        <AlexaRichardCard />
      </Suspense>
    );
  }

  return <KeralaInvitation />;
}
