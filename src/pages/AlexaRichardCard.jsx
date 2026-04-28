import { lazy, Suspense, useEffect } from 'react';
import './alexa-richard/alexa-richard.css';
import HeroSection from './alexa-richard/HeroSection';

const CountdownSection = lazy(() => import('./alexa-richard/CountdownSection'));
const OurStorySection  = lazy(() => import('./alexa-richard/OurStorySection'));
const EventsSection    = lazy(() => import('./alexa-richard/EventsSection'));
const PhotoGallery     = lazy(() => import('./alexa-richard/PhotoGallery'));
const RSVPSection      = lazy(() => import('./alexa-richard/RSVPSection'));
const VenueSection     = lazy(() => import('./alexa-richard/VenueSection'));
const FooterSection    = lazy(() => import('./alexa-richard/FooterSection'));

function SectionFallback() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--ar-cream)',
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-label="Loading" role="status">
        <circle
          cx="18" cy="18" r="8"
          fill="none" stroke="#C9A84C" strokeWidth="2"
          strokeDasharray="20 30" strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 18 18" to="360 18 18"
            dur="1s" repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default function AlexaRichardCard() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Alexa & Richard — Wedding Invitation';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="ar-page">
      {/* Hero — eager loaded */}
      <HeroSection />

      {/* Remaining sections — lazy loaded */}
      <Suspense fallback={<SectionFallback />}>
        <CountdownSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <OurStorySection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <EventsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PhotoGallery />
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
