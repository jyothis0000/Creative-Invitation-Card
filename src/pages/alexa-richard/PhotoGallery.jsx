import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloralDivider from './FloralDivider';

/* Beautiful SVG gradient placeholders — replace src with real photos at /gallery/ar-N.png */
function makeSvgPlaceholder(color1, color2, label) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <defs>
      <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='${color1}'/>
        <stop offset='100%' stop-color='${color2}'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(%23g)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
      font-family='serif' font-size='28' fill='rgba(255,255,255,0.5)'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${svg.replace(/#/g, '%23').replace(/\n/g, '').replace(/\s+/g, ' ')}`;
}

const images = [
  // { src: '/gallery/ar-1.png', fallback: makeSvgPlaceholder('%231B3A2D','%232D5740','Alexa & Richard'), alt: 'Alexa and Richard couple portrait', span: true },
  { src: '/gallery/ar-2.png', fallback: makeSvgPlaceholder('%232D5740', '%23C9A84C', 'The Venue'), alt: 'Wedding venue chapel' },
  { src: '/gallery/ar-3.png', fallback: makeSvgPlaceholder('%23E8BAA3', '%23C48D77', 'Reception'), alt: 'Reception table setting' },
  { src: '/gallery/ar-4.png', fallback: makeSvgPlaceholder('%231B3A2D', '%23E8BAA3', 'Garden'), alt: 'Couple in garden' },
  { src: '/gallery/ar-5.png', fallback: makeSvgPlaceholder('%23C9A84C', '%23E8C97A', 'The Cake'), alt: 'Wedding cake' },
  { src: '/gallery/ar-6.png', fallback: makeSvgPlaceholder('%232D5740', '%23C9A84C', 'The Rings'), alt: 'Wedding rings' },
];

function GalleryImage({ src, fallback, alt, style }) {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={errored ? fallback : src}
      onError={() => setErrored(true)}
      alt={alt}
      loading="lazy"
      style={style}
    />
  );
}


export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="ar-gallery" className="ar-section" style={{ background: 'var(--ar-green)', position: 'relative' }}>
      {/* Decorative top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 Q360,40 720,20 Q1080,0 1440,30 L1440,0 Z" fill="var(--ar-cream)" />
        </svg>
      </div>

      <div className="ar-container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span
            className="ar-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ color: 'var(--ar-gold)' }}
          >
            Captured Memories
          </motion.span>
          <motion.h2
            className="ar-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--ar-cream)' }}
          >
            Our Moments
          </motion.h2>
          <FloralDivider color="#C9A84C" style={{ marginTop: '1.5rem' }} />
        </div>

        {/* Gallery grid */}
        <div className="ar-gallery-flex">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="ar-gallery-item"
              style={{
                height: img.span ? 420 : 200,
                gridRow: img.span ? 'span 2' : undefined,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setLightbox(img)}
            >
              <GalleryImage src={img.src} fallback={img.fallback} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
              <div className="ar-gallery-overlay">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </motion.div>
          ))}
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
          <span style={{ color: 'var(--ar-gold)', fontWeight: 600 }}>#AlexaAndRichard</span>
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
              onError={e => { e.target.src = lightbox.fallback; }}
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
          <path d="M0,40 Q360,0 720,20 Q1080,40 1440,10 L1440,40 Z" fill="var(--ar-ivory)" />
        </svg>
      </div>
    </section>
  );
}
