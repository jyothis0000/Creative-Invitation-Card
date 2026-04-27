import { motion } from 'framer-motion';
import LotusDivider from './ui/LotusDivider';

function KeralaMapSVG() {
  return (
    <svg
      viewBox="0 0 400 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block', margin: '0 auto' }}
      aria-label="Simplified Kerala map showing wedding venue location"
    >
      {/* Kerala outline — simplified */}
      <path
        d="M180,20 Q220,15 240,30 Q280,45 295,80 Q310,120 305,160 Q310,200 300,240 Q295,280 280,320 Q265,360 255,400 Q248,430 240,460 Q230,490 220,510 Q215,518 210,512 Q200,495 195,475 Q185,445 182,415 Q178,385 172,355 Q162,320 158,290 Q148,255 148,220 Q145,185 148,150 Q150,115 155,85 Q163,50 180,20Z"
        fill="#2D5016"
        opacity="0.85"
        stroke="#4a7a22"
        strokeWidth="2"
      />
      {/* Western coast highlights */}
      <path
        d="M148,220 Q138,240 132,270 Q128,295 135,310 Q140,290 148,255Z"
        fill="#1a4010"
        opacity="0.6"
      />
      {/* Water bodies — backwaters */}
      <path
        d="M200,320 Q210,330 215,350 Q210,370 200,375 Q195,365 200,345Z"
        fill="#4a90c4"
        opacity="0.6"
      />
      <path
        d="M215,380 Q225,385 228,400 Q220,408 212,400 Q210,390 215,380Z"
        fill="#4a90c4"
        opacity="0.5"
      />
      {/* Rivers */}
      <path
        d="M180,180 Q192,200 188,220 Q182,238 178,255"
        fill="none" stroke="#4a90c4" strokeWidth="2" opacity="0.7"
      />
      <path
        d="M230,280 Q222,295 215,310 Q210,325 208,340"
        fill="none" stroke="#4a90c4" strokeWidth="1.5" opacity="0.6"
      />

      {/* Cities/markers */}
      {/* Trivandrum */}
      <g transform="translate(215, 460)">
        <circle cx="0" cy="0" r="5" fill="#C8941A" opacity="0.9" />
        <circle cx="0" cy="0" r="9" fill="none" stroke="#C8941A" strokeWidth="1" opacity="0.5" />
        <text x="10" y="4" fontFamily="'Lato', sans-serif" fontSize="10" fill="#FAF3E0" opacity="0.9">Trivandrum</text>
        {/* Airport icon */}
        <text x="-4" y="-10" fontSize="10" fill="#E8B84B">✈</text>
      </g>

      {/* Kochi/Ernakulam */}
      <g transform="translate(165, 290)">
        <circle cx="0" cy="0" r="5" fill="#C8941A" opacity="0.9" />
        <circle cx="0" cy="0" r="9" fill="none" stroke="#C8941A" strokeWidth="1" opacity="0.5" />
        <text x="10" y="4" fontFamily="'Lato', sans-serif" fontSize="10" fill="#FAF3E0" opacity="0.9">Ernakulam</text>
        {/* Train icon */}
        <text x="-5" y="-10" fontSize="9" fill="#E8B84B">🚂</text>
      </g>

      {/* Thrissur — VENUE */}
      <g transform="translate(175, 230)">
        {/* Pulsing venue pin */}
        <circle cx="0" cy="0" r="14" fill="#8B0000" opacity="0.2">
          <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="8" fill="#8B0000" opacity="0.9" />
        <circle cx="0" cy="0" r="4" fill="#E8B84B" />
        {/* Pin tail */}
        <path d="M0,8 L0,20" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="21" r="2" fill="#8B0000" />
        <text x="12" y="4" fontFamily="'Cormorant Garamond', serif" fontSize="13" fontWeight="600" fill="#E8B84B">Thrissur ★</text>
        <text x="12" y="16" fontFamily="'Lato', sans-serif" fontSize="8" fill="#FAF3E0" opacity="0.8">Palace Grounds</text>
      </g>

      {/* Route lines */}
      <path
        d="M215,460 Q200,380 175,230"
        fill="none" stroke="#C8941A" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"
      />
      <path
        d="M165,290 Q168,260 175,230"
        fill="none" stroke="#C8941A" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"
      />

      {/* Compass rose */}
      <g transform="translate(340, 60)">
        <circle cx="0" cy="0" r="18" fill="none" stroke="#C8941A" strokeWidth="1" opacity="0.5" />
        <polygon points="0,-14 3,-4 0,-8 -3,-4" fill="#C8941A" opacity="0.8" />
        <polygon points="0,14 3,4 0,8 -3,4" fill="#FAF3E088" opacity="0.5" />
        <polygon points="-14,0 -4,-3 -8,0 -4,3" fill="#FAF3E088" opacity="0.5" />
        <polygon points="14,0 4,-3 8,0 4,3" fill="#FAF3E088" opacity="0.5" />
        <text x="-2" y="-16" fontFamily="'Lato', sans-serif" fontSize="8" fill="#C8941A" fontWeight="700">N</text>
      </g>
    </svg>
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
