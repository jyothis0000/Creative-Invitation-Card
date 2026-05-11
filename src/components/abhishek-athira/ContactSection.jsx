import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';
import groomImg from '../../assets/groom6.png';
import brideImg from '../../assets/bride6.png';

const WHATSAPP_NUMBER = '919567610436';
const WHATSAPP_DISPLAY = '+91 95676 10436';

const profiles = [
  {
    name: 'Abhishek',
    handle: '@abhishek_raveendran',
    href: 'https://www.instagram.com/abhishek_raveendran?igsh=MWFqdGh3cjEwaWU4Mg==',
    img: groomImg,
  },
  {
    name: 'Athira',
    handle: '@athira_surendrn',
    href: 'https://www.instagram.com/athira_surendrn?igsh=b2xuM3R2aG42djBy',
    img: brideImg,
  },
];

function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="cs-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#cs-ig-grad)" />
      <circle cx="12" cy="12" r="4" stroke="url(#cs-ig-grad)" />
      <circle cx="17.5" cy="6.5" r="1" fill="#f09433" stroke="none" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section
      id="aa-contact"
      className="aa-section"
      style={{ background: 'var(--aa-ivory)', position: 'relative' }}
    >
      <div className="aa-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span
            className="aa-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            For Any Enquiries
          </motion.span>
          <motion.h2
            className="aa-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Get in Touch
          </motion.h2>
          <FloralDivider style={{ marginTop: '1.5rem' }} />
        </div>

        {/* Instagram profiles */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}>
          {profiles.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                background: '#fff',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 12,
                padding: '1.5rem 2rem 1.2rem',
                minWidth: 150,
                boxShadow: '0 4px 24px rgba(27,58,45,0.07)',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(27,58,45,0.13)' }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{ height: 100, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))' }}
              />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--aa-green)',
                  marginBottom: '0.2rem',
                }}>
                  {p.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <IgIcon />
                  <span style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.04em',
                    color: 'var(--aa-text-muted)',
                  }}>
                    {p.handle}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20have%20an%20enquiry%20about%20Abhishek%20%26%20Athira%27s%20wedding%20reception.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#25D366',
              color: '#fff',
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textDecoration: 'none',
              padding: '0.75rem 2rem',
              borderRadius: 50,
              boxShadow: '0 4px 18px rgba(37,211,102,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(37,211,102,0.35)';
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp · {WHATSAPP_DISPLAY}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
