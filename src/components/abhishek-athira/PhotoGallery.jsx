import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';
import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';

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
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const jumping = useRef(false);
  const scrollTimer = useRef(null);

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
            >
              <img src={img.src} alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </motion.div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="aa-gallery-mobile">
          <div className="aa-gallery-slider" ref={sliderRef}>
            {SLIDES.map((img, i) => (
              <div key={i} className="aa-gallery-slide">
                <img src={img.src} alt={img.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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

      {/* Floating Instagram profile icons */}
      {[
        { name: 'Abhishek', href: 'https://www.instagram.com/abhishek_raveendran?igsh=MWFqdGh3cjEwaWU4Mg==', side: { left: '3%' }, top: '52%', floatDelay: 0 },
        { name: 'Athira',   href: 'https://www.instagram.com/athira_surendrn?igsh=b2xuM3R2aG42djBy',        side: { right: '3%' }, top: '40%', floatDelay: 0.8 },
      ].map(({ name, href, side, top, floatDelay }) => (
        <motion.a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: floatDelay * 0.4 }}
          animate={{ y: [0, -10, 0] }}
          style={{
            position: 'absolute',
            top,
            ...side,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {/* Instagram gradient ring */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
          >
            <div style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              borderRadius: '50%',
              padding: 2.5,
              boxShadow: '0 4px 16px rgba(220,39,67,0.4)',
            }}>
              <div style={{
                width: 46, height: 46,
                borderRadius: '50%',
                background: '#1B3A2D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8C97A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#E8C97A" stroke="none" />
                </svg>
              </div>
            </div>
          </motion.div>
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(232,201,122,0.85)',
            fontWeight: 600,
          }}>{name}</span>
        </motion.a>
      ))}

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,40 Q360,0 720,20 Q1080,40 1440,10 L1440,40 Z" fill="var(--aa-ivory)" />
        </svg>
      </div>
    </section>
  );
}
