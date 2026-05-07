import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloralDivider from './FloralDivider';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';

const images = [
  { src: img1, alt: 'Photo 1' },
  { src: img4, alt: 'Photo 4' },
  { src: img2, alt: 'Photo 2' },
  { src: img3, alt: 'Photo 3' },
  { src: img5, alt: 'Photo 5' },
];

/* Clone last + first for infinite loop: [last, ...real, first] */
const SLIDES = [images[images.length - 1], ...images, images[0]];

export default function PhotoGallery() {
  const [lightbox,    setLightbox]    = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef   = useRef(null);
  const jumping     = useRef(false);
  const scrollTimer = useRef(null);
  const autoTimer   = useRef(null);
  const isPaused    = useRef(false);

  /* On mount: position to first real slide (index 1, after the clone) */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollLeft = el.offsetWidth;
  }, []);

  /* Scroll handler: update dots + handle infinite loop jump */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onScroll = () => {
      if (jumping.current) return;

      const idx = Math.round(el.scrollLeft / el.offsetWidth);

      // Update dot (real index = slider index - 1)
      const realIdx = Math.max(0, Math.min(idx - 1, images.length - 1));
      setActiveSlide(realIdx);

      // After scroll settles, silently jump from clone to real slide
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        const settled = Math.round(el.scrollLeft / el.offsetWidth);
        if (settled === 0) {
          // At clone of last → jump to real last
          jumping.current = true;
          el.scrollLeft = el.offsetWidth * images.length;
          setActiveSlide(images.length - 1);
          requestAnimationFrame(() => { jumping.current = false; });
        } else if (settled === SLIDES.length - 1) {
          // At clone of first → jump to real first
          jumping.current = true;
          el.scrollLeft = el.offsetWidth;
          setActiveSlide(0);
          requestAnimationFrame(() => { jumping.current = false; });
        }
      }, 120);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  /* Custom eased scroll — gives us full control over duration & curve */
  const smoothScroll = (el, targetLeft, duration = 750) => {
    const startLeft = el.scrollLeft;
    const diff = targetLeft - startLeft;
    if (diff === 0) return;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      el.scrollLeft = startLeft + diff * ease(progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* Autoplay: advance one slide every 4s, pause on touch */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const next = () => {
      if (isPaused.current || jumping.current) return;
      const current = Math.round(el.scrollLeft / el.offsetWidth);
      smoothScroll(el, (current + 1) * el.offsetWidth);
    };

    const pause  = () => { isPaused.current = true; };
    const resume = () => { isPaused.current = false; };

    autoTimer.current = setInterval(next, 4000);
    el.addEventListener('touchstart', pause,  { passive: true });
    el.addEventListener('touchend',   resume, { passive: true });

    return () => {
      clearInterval(autoTimer.current);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend',   resume);
    };
  }, []);

  /* Dot tap: account for +1 offset due to leading clone */
  const goTo = (i) => {
    const el = sliderRef.current;
    if (el) smoothScroll(el, (i + 1) * el.offsetWidth);
  };

  return (
    <section id="aa-gallery" className="aa-section" style={{ background: 'var(--aa-green)', position: 'relative' }}>
      {/* Decorative top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 Q360,40 720,20 Q1080,0 1440,30 L1440,0 Z" fill="var(--aa-cream)" />
        </svg>
      </div>

      <div className="aa-container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span
            className="aa-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ color: 'var(--aa-gold)' }}
          >
            Captured Memories
          </motion.span>
          <motion.h2
            className="aa-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--aa-cream)' }}
          >
            Our Moments
          </motion.h2>
          <FloralDivider color="#C9A84C" style={{ marginTop: '1.5rem' }} />
        </div>

        {/* Desktop grid */}
        <div className="aa-gallery-flex aa-gallery-desktop">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="aa-gallery-item"
              style={{ height: 200 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setLightbox(img)}
            >
              <img src={img.src} alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
              <div className="aa-gallery-overlay">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="aa-gallery-mobile">
          <div className="aa-gallery-slider" ref={sliderRef}>
            {SLIDES.map((img, i) => (
              <div
                key={i}
                className="aa-gallery-slide"
                onClick={() => setLightbox(img)}
              >
                <img src={img.src} alt={img.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="aa-gallery-overlay" style={{ opacity: 0.15 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="aa-gallery-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`aa-gallery-dot${i === activeSlide ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'rgba(232,186,163,0.8)',
          }}
        >
          Share your photos with us using{' '}
          <span style={{ color: 'var(--aa-gold)', fontWeight: 600 }}>#AbhishekAndAthira</span>
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem', cursor: 'zoom-out',
            }}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 2 }}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'fixed', top: '1.5rem', right: '1.5rem',
                background: 'transparent', border: 'none', color: 'white',
                fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
              }}
              aria-label="Close lightbox"
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,40 Q360,0 720,20 Q1080,40 1440,10 L1440,40 Z" fill="var(--aa-ivory)" />
        </svg>
      </div>
    </section>
  );
}
