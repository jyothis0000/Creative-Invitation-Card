import { lazy, Suspense, useEffect } from 'react';
import '../components/rohan-ananya/rohan-ananya.css';
import HeroSection from '../components/rohan-ananya/HeroSection';

const CountdownSection = lazy(() => import('../components/rohan-ananya/CountdownSection'));
const EventsSection    = lazy(() => import('../components/rohan-ananya/EventsSection'));
const RSVPSection   = lazy(() => import('../components/rohan-ananya/RSVPSection'));
const VenueSection  = lazy(() => import('../components/rohan-ananya/VenueSection'));
const FooterSection = lazy(() => import('../components/rohan-ananya/FooterSection'));

function SectionFallback() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--ra-cream)',
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-label="Loading" role="status">
        <circle cx="18" cy="18" r="8" fill="none" stroke="#C8962E" strokeWidth="2"
          strokeDasharray="20 30" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate"
            from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

export default function RohanAnanyaCard() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Rohan & Ananya — Wedding Invitation';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="ra-page">
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
