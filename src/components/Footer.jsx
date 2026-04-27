import { motion } from 'framer-motion';
import NilavilakkuLamp from './ui/NilavilakkuLamp';

function GarlandSVG() {
  return (
    <svg
      viewBox="0 0 1440 60"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 60, display: 'block' }}
      aria-label="Decorative flower garland"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Vine rope */}
      <path
        d="M0,30 Q120,10 240,30 Q360,50 480,30 Q600,10 720,30 Q840,50 960,30 Q1080,10 1200,30 Q1320,50 1440,30"
        fill="none"
        stroke="#2D5016"
        strokeWidth="2"
        style={{ animation: 'garland-sway 3s ease-in-out infinite' }}
      />
      {/* Flowers at intervals */}
      {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320].map((x, i) => {
        const y = i % 2 === 0 ? 15 : 45;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Petals */}
            {[0, 60, 120, 180, 240, 300].map((angle, j) => (
              <ellipse
                key={j}
                cx={8 * Math.cos((angle * Math.PI) / 180)}
                cy={8 * Math.sin((angle * Math.PI) / 180)}
                rx="5" ry="3"
                fill={i % 3 === 0 ? '#ff9999' : i % 3 === 1 ? '#ffcc99' : '#ffb3c6'}
                opacity="0.85"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="4" fill="#C8941A" />
          </g>
        );
      })}
      {/* Leaves */}
      {[60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140, 1260, 1380].map((x, i) => {
        const y = i % 2 === 0 ? 22 : 38;
        return (
          <ellipse key={i} cx={x} cy={y} rx="8" ry="4" fill="#2D5016" opacity="0.7" transform={`rotate(${i % 2 === 0 ? -30 : 30}, ${x}, ${y})`} />
        );
      })}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--red)' }}>
      {/* Garland */}
      <GarlandSVG />

      <div style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        {/* Lamps */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3rem', marginBottom: '2.5rem' }}>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <NilavilakkuLamp size={70} />
          </motion.div>

          {/* Hashtag */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                color: 'var(--gold)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              #AthiraWithAbhishek
            </motion.h2>
          </div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <NilavilakkuLamp size={70} />
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #C8941A, transparent)', marginBottom: '2rem' }} />

        {/* Family blessing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#FAF3E0CC', marginBottom: '0.4rem' }}>
            With love and blessings from both families
          </p>
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.95rem', color: '#C8941A' }}>
            ഇരു കുടുംബങ്ങളുടെ സ്നേഹത്തോടും അനുഗ്രഹത്തോടും
          </p>
        </motion.div>

        {/* Social share */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
          {/* Instagram */}
          <motion.a
            href={`https://www.instagram.com/explore/tags/AthiraWithAbhishek/`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            aria-label="Share on Instagram"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44,
              border: '1.5px solid #C8941A',
              borderRadius: '50%',
              color: '#C8941A',
              textDecoration: 'none',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={`https://api.whatsapp.com/send?text=Join%20us%20for%20Athira%20%26%20Abhishek's%20wedding!%20%23AthiraWithAbhishek`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -2 }}
            aria-label="Share on WhatsApp"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44,
              border: '1.5px solid #C8941A',
              borderRadius: '50%',
              color: '#C8941A',
              textDecoration: 'none',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>
        </div>

        {/* Bottom copyright */}
        <p style={{
          marginTop: '3rem',
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#FAF3E044',
        }}>
          Athira &amp; Abhishek · November 22, 2025
        </p>
      </div>

      {/* Bottom garland (flipped) */}
      <div style={{ transform: 'scaleY(-1)' }}>
        <GarlandSVG />
      </div>
    </footer>
  );
}
