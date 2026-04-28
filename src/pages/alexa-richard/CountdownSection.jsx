import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloralDivider from './FloralDivider';

const WEDDING_DATE = new Date('2025-09-14T14:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Tile({ value, label, delay }) {
  const [flip, setFlip] = useState(false);
  const prevRef = useRef(value);
  useEffect(() => {
    if (prevRef.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 300);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <motion.div
      className="ar-countdown-tile"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
    >
      <span
        className="ar-countdown-num"
        style={{
          display: 'inline-block',
          transform: flip ? 'translateY(-6px)' : 'translateY(0)',
          opacity: flip ? 0.4 : 1,
          transition: 'transform 0.25s ease, opacity 0.25s ease',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="ar-countdown-label">{label}</span>
    </motion.div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="ar-countdown" className="ar-section" style={{ background: 'var(--ar-ivory)', textAlign: 'center' }}>
      <div className="ar-container--narrow">
        <motion.span
          className="ar-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Mark Your Calendar
        </motion.span>

        <motion.h2
          className="ar-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}
        >
          Counting Down
        </motion.h2>

        <motion.p
          className="ar-subheading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', marginBottom: '0.5rem' }}
        >
          to our special moment
        </motion.p>

        <FloralDivider className="my-8 flex justify-center" style={{ margin: '2rem 0' }} />

        {/* Date display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'var(--ar-green)',
            marginBottom: '2.5rem',
            letterSpacing: '0.05em',
          }}
        >
          <span>September</span>
          <span style={{ color: 'var(--ar-gold)', fontWeight: 600, fontSize: '1.8em' }}>14</span>
          <span>2025</span>
          <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.7em' }}>◆</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--ar-text-muted)' }}>
            Vienna, Austria
          </span>
        </motion.div>

        {/* Countdown tiles */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Tile value={time.days} label="Days" delay={0.3} />
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--ar-gold)', fontSize: '2rem', fontFamily: "'Playfair Display', serif", paddingBottom: '1rem' }}>:</div>
          <Tile value={time.hours} label="Hours" delay={0.4} />
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--ar-gold)', fontSize: '2rem', fontFamily: "'Playfair Display', serif", paddingBottom: '1rem' }}>:</div>
          <Tile value={time.minutes} label="Minutes" delay={0.5} />
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--ar-gold)', fontSize: '2rem', fontFamily: "'Playfair Display', serif", paddingBottom: '1rem' }}>:</div>
          <Tile value={time.seconds} label="Seconds" delay={0.6} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--ar-text-muted)',
            marginTop: '2.5rem',
          }}
        >
          "A lifetime of love starts with a single moment."
        </motion.p>
      </div>
    </section>
  );
}
