import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

const PIN = import.meta.env.VITE_DASHBOARD_PIN ?? '2526';

/* ── Shared styles ── */
const btn = (bg, color, border = 'none') => ({
  padding: '0.45rem 0.9rem', background: bg, color, border,
  borderRadius: 5, fontSize: '0.72rem', letterSpacing: '0.1em',
  cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase',
  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
});

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '0.65rem 0.9rem', border: '1px solid rgba(201,168,76,0.4)',
  borderRadius: 6, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
};

/* ── Stat card ── */
function StatCard({ label, value, sub, color = '#1B3A2D' }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(201,168,76,0.25)',
      borderRadius: 8, padding: '1.5rem', textAlign: 'center', flex: '1 1 140px',
    }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 700, color, fontFamily: "'Playfair Display', serif" }}>
        {value ?? '—'}
      </div>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginTop: '0.25rem' }}>
        {label}
      </div>
      {sub && <div style={{ fontSize: '0.8rem', color: '#C9A84C', marginTop: '0.25rem' }}>{sub}</div>}
    </div>
  );
}

/* ── Create / Edit modal ── */
function EntryModal({ entry, onClose, onSave }) {
  const isEdit = !!entry?.id;
  const [response, setResponse] = useState(entry?.response ?? 'yes');
  const [guestCount, setGuestCount] = useState(entry?.guest_count ?? 1);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await onSave({ response, guest_count: response === 'yes' ? guestCount : 0 }, entry?.id);
    setSaving(false);
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 10, padding: '2rem',
          width: '100%', maxWidth: 380, boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
        }}
      >
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1B3A2D', margin: '0 0 1.25rem', fontSize: '1.2rem' }}>
          {isEdit ? 'Edit Response' : 'Add Response'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Response toggle */}
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
            Response
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {['yes', 'no'].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setResponse(v)}
                style={{
                  flex: 1, padding: '0.6rem',
                  border: `2px solid ${response === v ? (v === 'yes' ? '#1B3A2D' : '#c0392b') : '#e0e0e0'}`,
                  borderRadius: 6, background: response === v ? (v === 'yes' ? '#1B3A2D' : '#c0392b') : '#fff',
                  color: response === v ? '#fff' : '#888',
                  cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'all 0.15s',
                }}
              >
                {v === 'yes' ? '🥂 Attending' : '😔 Declining'}
              </button>
            ))}
          </div>

          {/* Guest count — only when attending */}
          {response === 'yes' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
                Number of Guests
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button type="button" onClick={() => setGuestCount(c => Math.max(1, c - 1))}
                  style={{ ...inputStyle, width: 36, height: 36, padding: 0, textAlign: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#C9A84C' }}>
                  −
                </button>
                <input
                  type="number" min={1} max={20} value={guestCount}
                  onChange={e => setGuestCount(Math.max(1, Math.min(20, Number(e.target.value))))}
                  style={{ ...inputStyle, width: 60, textAlign: 'center', flex: 'none' }}
                />
                <button type="button" onClick={() => setGuestCount(c => Math.min(20, c + 1))}
                  style={{ ...inputStyle, width: 36, height: 36, padding: 0, textAlign: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#C9A84C' }}>
                  +
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose}
              style={{ ...btn('#f0f0f0', '#555'), flex: 1 }}>
              Cancel
            </button>
            <button type="submit" disabled={saving}
              style={{ ...btn('#1B3A2D', '#fff'), flex: 2, justifyContent: 'center', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── PIN gate ── */
function PinGate({ onAuth }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  function handle(e) {
    e.preventDefault();
    if (pin === PIN) onAuth();
    else setError('Incorrect PIN');
  }
  return (
    <div style={{
      minHeight: '100vh', background: '#FAF7F2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Lato', sans-serif",
    }}>
      <div style={{
        background: '#fff', padding: '2.5rem 2rem', borderRadius: 10,
        border: '1px solid rgba(201,168,76,0.3)', width: '100%', maxWidth: 340,
        boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>💌</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#1B3A2D', margin: 0, fontWeight: 600 }}>
            RSVP Dashboard
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.4rem' }}>
            Abhishek &amp; Athira Reception
          </p>
        </div>
        <form onSubmit={handle}>
          <input
            type="password" placeholder="Enter PIN" value={pin}
            onChange={e => setPin(e.target.value)} autoFocus
            style={{ ...inputStyle, marginBottom: '0.75rem', letterSpacing: '0.2em' }}
          />
          {error && <p style={{ color: '#c0392b', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{error}</p>}
          <button type="submit"
            style={{ ...btn('#1B3A2D', '#fff'), width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Main dashboard ── */
export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // null | 'create' | {id, response, guest_count}
  const [confirmDelete, setConfirmDelete] = useState(null); // row id

  const fetchRows = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) fetchRows(); }, [authed, fetchRows]);

  async function handleSave(fields, id) {
    if (id) {
      await supabase.from('rsvps').update(fields).eq('id', id);
    } else {
      await supabase.from('rsvps').insert(fields);
    }
    fetchRows();
  }

  async function handleDelete(id) {
    await supabase.from('rsvps').delete().eq('id', id);
    setConfirmDelete(null);
    fetchRows();
  }

  if (!authed) return <PinGate onAuth={() => setAuthed(true)} />;

  const attending = rows.filter(r => r.response === 'yes');
  const declining = rows.filter(r => r.response === 'no');
  const totalGuests = attending.reduce((s, r) => s + (r.guest_count ?? 1), 0);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', fontFamily: "'Lato', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: '#1B3A2D', padding: '1.25rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#C9A84C', margin: 0, fontSize: '1.3rem', fontWeight: 600 }}>
            RSVP Dashboard
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.72rem', letterSpacing: '0.12em' }}>
            ABHISHEK &amp; ATHIRA · 24 MAY 2026
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={fetchRows}
            style={btn('rgba(201,168,76,0.15)', '#C9A84C', '1px solid rgba(201,168,76,0.4)')}>
            ↻ Refresh
          </button>
          <button onClick={() => setModal('create')}
            style={btn('#C9A84C', '#1B3A2D')}>
            + Add Entry
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <StatCard label="Total Responses" value={rows.length} />
          <StatCard label="guests total" value={totalGuests} sub={`${attending.length} Attending`} color="#1B3A2D" />
          <StatCard label="Declining" value={declining.length} color="#c0392b" />
        </div>

        {/* Progress bar */}
        {rows.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>
              <span>ATTENDING ({Math.round((attending.length / rows.length) * 100)}%)</span>
              <span>DECLINING</span>
            </div>
            <div style={{ height: 8, background: '#e8e8e8', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg, #1B3A2D, #3E7558)',
                width: `${(attending.length / rows.length) * 100}%`,
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        )}

        {/* Response list */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#1B3A2D', margin: 0, fontWeight: 600 }}>
            All Responses
          </h2>
          <span style={{ fontSize: '0.72rem', color: '#aaa' }}>{rows.length} entries</span>
        </div>

        {loading ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>Loading…</p>
        ) : rows.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem', fontStyle: 'italic' }}>No responses yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {rows.map(r => (
              <div key={r.id}>
                <div style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderLeft: `3px solid ${r.response === 'yes' ? '#1B3A2D' : '#c0392b'}`,
                  borderRadius: confirmDelete === r.id ? '6px 6px 0 0' : 6,
                  padding: '0.75rem 1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                }}>
                  {/* Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{r.response === 'yes' ? '🥂' : '😔'}</span>
                    <div style={{ minWidth: 0 }}>
                      <span style={{
                        fontSize: '0.8rem', fontWeight: 600,
                        color: r.response === 'yes' ? '#1B3A2D' : '#c0392b',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>
                        {r.response === 'yes' ? 'Attending' : 'Declining'}
                      </span>
                      {r.response === 'yes' && (
                        <span style={{ fontSize: '0.75rem', color: '#C9A84C', marginLeft: '0.5rem' }}>
                          {r.guest_count} {r.guest_count === 1 ? 'guest' : 'guests'}
                        </span>
                      )}
                      <div style={{ fontSize: '0.68rem', color: '#bbb', marginTop: '0.1rem' }}>
                        {new Date(r.created_at).toLocaleString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                    <button onClick={() => setModal(r)}
                      style={btn('#f0f4f0', '#1B3A2D')}>
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(confirmDelete === r.id ? null : r.id)}
                      style={btn('#fff0f0', '#c0392b')}>
                      Delete
                    </button>
                  </div>
                </div>

                {/* Inline delete confirmation */}
                {confirmDelete === r.id && (
                  <div style={{
                    background: '#fff8f8', border: '1px solid rgba(192,57,43,0.2)',
                    borderTop: 'none', borderRadius: '0 0 6px 6px',
                    padding: '0.6rem 1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: '0.78rem', color: '#c0392b' }}>
                      Remove this entry permanently?
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => setConfirmDelete(null)}
                        style={btn('#f0f0f0', '#555')}>
                        Cancel
                      </button>
                      <button onClick={() => handleDelete(r.id)}
                        style={btn('#c0392b', '#fff')}>
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <EntryModal
          entry={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
