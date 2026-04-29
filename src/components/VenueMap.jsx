import { motion } from 'framer-motion';
import LotusDivider from './ui/LotusDivider';
import keralaMapImg from '../assets/kerala_thrissur_map.png';

function KeralaMapSVG() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 380, margin: '0 auto', overflow: 'hidden', borderRadius: '4px' }}>
      <img
        src={keralaMapImg}
        alt="Artistic map of Kerala"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '45%',
        width: '12px',
        height: '12px',
        background: '#8B0000',
        borderRadius: '50%',
        boxShadow: '0 0 15px #8B0000',
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '15px',
          whiteSpace: 'nowrap',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: '#E8B84B',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}>
          Thrissur ★
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ icon, from, detail, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(200,148,26,0.3)',
      borderRadius: '4px',
      padding: '1rem 1.2rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.8rem',
    }}>
      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#E8B84B', fontWeight: 600 }}>{from}</p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: '#FAF3E0AA', lineHeight: 1.5 }}>{detail}</p>
      </div>
    </div>
  );
}

export default function VenueMap() {
  return (
    <section
      id="venue"
      style={{ background: 'var(--green)', padding: '5rem 1.5rem' }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>
            വേദിയും ഭൂപടവും
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#FAF3E0', fontWeight: 600 }}>
            Venue &amp; Directions
          </h2>
          <LotusDivider className="mt-6" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            {/* Banana leaf border around map */}
            <div style={{
              border: '2px solid rgba(200,148,26,0.4)',
              borderRadius: '6px',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Corner leaf ornaments */}
              <div style={{ position: 'absolute', top: -2, left: -2, opacity: 0.6 }}>
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                  <path d="M2,38 Q2,4 38,2" fill="none" stroke="#4a7a22" strokeWidth="2" />
                  <path d="M2,38 Q10,20 38,2" fill="#2D5016" opacity="0.4" />
                </svg>
              </div>
              <div style={{ position: 'absolute', top: -2, right: -2, opacity: 0.6, transform: 'scaleX(-1)' }}>
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                  <path d="M2,38 Q2,4 38,2" fill="none" stroke="#4a7a22" strokeWidth="2" />
                  <path d="M2,38 Q10,20 38,2" fill="#2D5016" opacity="0.4" />
                </svg>
              </div>

              <KeralaMapSVG />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {/* Venue card */}
            <div style={{
              border: '1px solid rgba(200,148,26,0.4)',
              borderRadius: '4px',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.06)',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem', fontWeight: 700 }}>
                Venue
              </p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#FAF3E0', fontWeight: 600, marginBottom: '0.3rem' }}>
                Thrissur Palace Grounds
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#FAF3E0AA', lineHeight: 1.6 }}>
                Palace Grounds, Swaraj Round, Thrissur, Kerala 680001
              </p>
              <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.9rem', color: '#C8941A', marginTop: '0.5rem' }}>
                തൃശ്ശൂർ
              </p>
            </div>

            {/* Directions */}
            <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <DirectionCard
                icon="✈"
                from="From Trivandrum Airport"
                detail="250 km · 3.5 hrs by road or 1 hr by flight to Cochin, then 80 km"
              />
              <DirectionCard
                icon="🚂"
                from="From Ernakulam Station"
                detail="80 km · 1.5 hrs by train to Thrissur Railway Station, 5 km to venue"
              />
              <DirectionCard
                icon="🚌"
                from="From Kochi"
                detail="80 km · 1.5 hrs via NH544, KSRTC buses available every 30 mins"
              />
            </div>

            {/* Get Directions button */}
            <motion.a
              href="https://maps.google.com/?q=Thrissur+Palace+Grounds+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                padding: '0.8rem 2rem',
                background: 'var(--gold)',
                color: 'var(--red)',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                borderRadius: '3px',
                textDecoration: 'none',
                border: '1.5px solid var(--gold)',
                transition: 'all 0.3s ease',
              }}
            >
              🗺 Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
