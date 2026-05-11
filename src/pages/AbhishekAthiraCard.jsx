import { lazy, Suspense, useEffect } from 'react';
import '../components/abhishek-athira/abhishek-athira.css';
import HeroSection from '../components/abhishek-athira/HeroSection';

const CountdownSection = lazy(() => import('../components/abhishek-athira/CountdownSection'));
// const OurStorySection = lazy(() => import('../components/abhishek-athira/OurStorySection'));
const EventsSection = lazy(() => import('../components/abhishek-athira/EventsSection'));
const PhotoGallery = lazy(() => import('../components/abhishek-athira/PhotoGallery'));
const RSVPSection = lazy(() => import('../components/abhishek-athira/RSVPSection'));
const VenueSection = lazy(() => import('../components/abhishek-athira/VenueSection'));
const ContactSection = lazy(() => import('../components/abhishek-athira/ContactSection'));
const FooterSection = lazy(() => import('../components/abhishek-athira/FooterSection'));

function SectionFallback() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--aa-cream)',
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

export default function AbhishekAthiraCard() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Abhishek & Athira — Wedding Invitation';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="aa-page">
      {/* Hero — eager loaded */}
      <HeroSection />

      {/* Remaining sections — lazy loaded */}
      <Suspense fallback={<SectionFallback />}>
        <CountdownSection />
      </Suspense>

      {/* <Suspense fallback={<SectionFallback />}>
        <OurStorySection />
      </Suspense> */}

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
        <ContactSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
