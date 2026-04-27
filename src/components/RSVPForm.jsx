import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KasavuBorder from './ui/KasavuBorder';
import LotusDivider from './ui/LotusDivider';
import NilavilakkuLamp from './ui/NilavilakkuLamp';
import BananaLeafCorner from './ui/BananaLeafCorner';

const eventOptions = ['Nichayathartham', 'Mehendi Evening', 'Vidhi', 'Wedding Day'];

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'var(--ivory)',
  border: '1px solid #C8941A55',
  borderRadius: '3px',
  fontFamily: "'Lato', sans-serif",
  fontSize: '0.9rem',
  color: '#2a1a0a',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const labelStyle = {
  display: 'block',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '0.85rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  marginBottom: '0.4rem',
  fontWeight: 600,
};

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [flying, setFlying] = useState(false);
  const [form, setForm] = useState({
    name: '',
    guests: 1,
    events: [],
    dietary: 'vegetarian',
    message: '',
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        events: checked ? [...f.events, value] : f.events.filter(ev => ev !== value),
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFlying(true);
    setTimeout(() => {
      setSubmitted(true);
      setFlying(false);
    }, 1200);
  }

  return (
    <section
      id="rsvp"
      style={{ background: 'var(--ivory)', padding: '5rem 1.5rem', position: 'relative' }}
    >
      <KasavuBorder className="mb-12" />

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.4rem' }}>
            ആഘോഷത്തിൽ പങ്കുചേരൂ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--red)', fontWeight: 600 }}>
            Join Our Celebration
          </h2>
          <LotusDivider className="mt-6" />
        </motion.div>

        {/* Paper plane animation */}
        {flying && (
          <div style={{
            position: 'fixed', bottom: '40%', left: '50%',
            zIndex: 9998, pointerEvents: 'none',
            animation: 'paper-plane 1.1s ease-in-out forwards',
            fontSize: '2rem',
          }}>
            💌
          </div>
        )}

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Form card with double gold frame */}
              <div style={{ position: 'relative' }}>
                {/* Corner decorations */}
                <BananaLeafCorner position="tl" size={60} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, opacity: 0.7 }} />
                <BananaLeafCorner position="tr" size={60} style={{ position: 'absolute', top: 0, right: 0, zIndex: 2, opacity: 0.7 }} />
                <BananaLeafCorner position="bl" size={60} style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 2, opacity: 0.7 }} />
                <BananaLeafCorner position="br" size={60} style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 2, opacity: 0.7 }} />

                {/* Outer frame */}
                <div style={{
                  border: '2px solid #C8941A',
                  borderRadius: '4px',
                  padding: '3px',
                }}>
                  {/* Inner frame */}
                  <div style={{
                    border: '1px solid #C8941A88',
                    borderRadius: '3px',
                    padding: '2.5rem 2rem',
                    background: 'var(--cream)',
                  }}>
                    <form onSubmit={handleSubmit} noValidate>
                      <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {/* Full Name */}
                        <div>
                          <label htmlFor="rsvp-name" style={labelStyle}>
                            Full Name
                          </label>
                          <input
                            id="rsvp-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                            aria-required="true"
                            placeholder="Your full name"
                          />
                        </div>

                        {/* Number of Guests */}
                        <div>
                          <label htmlFor="rsvp-guests" style={labelStyle}>
                            Number of Guests
                          </label>
                          <input
                            id="rsvp-guests"
                            name="guests"
                            type="number"
                            min="1"
                            max="10"
                            value={form.guests}
                            onChange={handleChange}
                            style={inputStyle}
                            aria-required="true"
                          />
                        </div>

                        {/* Events attending */}
                        <fieldset style={{ border: 'none', padding: 0 }}>
                          <legend style={labelStyle}>Events Attending</legend>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '0.5rem' }}>
                            {eventOptions.map(ev => (
                              <label key={ev} style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#5C3317',
                                cursor: 'pointer',
                              }}>
                                <input
                                  type="checkbox"
                                  name="events"
                                  value={ev}
                                  checked={form.events.includes(ev)}
                                  onChange={handleChange}
                                  style={{ accentColor: 'var(--gold)' }}
                                />
                                {ev}
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        {/* Dietary */}
                        <fieldset style={{ border: 'none', padding: 0 }}>
                          <legend style={labelStyle}>Dietary Preference</legend>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                            {[
                              { value: 'vegetarian', label: 'Vegetarian (Kerala Sadhya)' },
                              { value: 'vegan', label: 'Vegan' },
                              { value: 'other', label: 'Other' },
                            ].map(opt => (
                              <label key={opt.value} style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#5C3317',
                                cursor: 'pointer',
                              }}>
                                <input
                                  type="radio"
                                  name="dietary"
                                  value={opt.value}
                                  checked={form.dietary === opt.value}
                                  onChange={handleChange}
                                  style={{ accentColor: 'var(--gold)' }}
                                />
                                {opt.label}
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        {/* Message */}
                        <div>
                          <label htmlFor="rsvp-message" style={labelStyle}>
                            Message to the Couple
                          </label>
                          <textarea
                            id="rsvp-message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            style={{ ...inputStyle, resize: 'vertical' }}
                            placeholder="Write your heartfelt wishes..."
                          />
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            width: '100%',
                            padding: '0.9rem 2rem',
                            background: 'var(--red)',
                            color: 'var(--gold)',
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            border: '1.5px solid var(--gold)',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          Send with Love 💌
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: '2px solid var(--gold)',
                borderRadius: '4px',
                padding: '3rem 2rem',
                background: 'var(--cream)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                <NilavilakkuLamp size={60} />
                <NilavilakkuLamp size={60} />
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem', color: 'var(--red)',
                fontWeight: 600, marginBottom: '0.5rem',
              }}>
                We'll see you soon! 🌸
              </h3>
              <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '1rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                ഞങ്ങൾ നിങ്ങളെ കാത്തിരിക്കുന്നു!
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#5C3317' }}>
                Thank you for your RSVP. We can't wait to celebrate with you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <KasavuBorder className="mt-12" flip />
    </section>
  );
}
