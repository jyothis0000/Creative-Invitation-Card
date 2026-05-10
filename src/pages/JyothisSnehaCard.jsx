import { lazy, Suspense, useEffect } from 'react';
import '../components/jyothis-sneha/jyothis-sneha.css';
import HeroSection from '../components/jyothis-sneha/HeroSection';

const CountdownSection = lazy(() => import('../components/jyothis-sneha/CountdownSection'));
const EventsSection    = lazy(() => import('../components/jyothis-sneha/EventsSection'));
const RSVPSection      = lazy(() => import('../components/jyothis-sneha/RSVPSection'));
const VenueSection     = lazy(() => import('../components/jyothis-sneha/VenueSection'));
const FooterSection    = lazy(() => import('../components/jyothis-sneha/FooterSection'));

function SectionFallback() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--js-cream)',
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-label="Loading" role="status">
        <circle cx="18" cy="18" r="8" fill="none" stroke="#3DBFB8" strokeWidth="2"
          strokeDasharray="20 30" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate"
            from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

export default function JyothisSnehaCard() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Jyothis & Sneha — Beach Wedding';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="js-page">
      <HeroSection />

      <Suspense fallback={<SectionFallback />}>
        <CountdownSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <EventsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <RSVPSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <VenueSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
