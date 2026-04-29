import { useEffect, useState, useRef } from 'react';

const TARGET = new Date('2025-11-22T10:00:00');
function pad(n) { return String(n).padStart(2, '0'); }
function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

const CSS = `
  @keyframes ct-in {
    from { opacity:0; transform: translateY(-12px) scale(0.85); }
    to   { opacity:1; transform: translateY(0)     scale(1); }
  }
  @keyframes ct-label-pulse {
    0%,100% { opacity:.45; letter-spacing:.28em; }
    50%     { opacity:.85; letter-spacing:.32em; }
  }
  .ct-in    { animation: ct-in 0.3s cubic-bezier(.34,1.56,.64,1) both; }
  .ct-label { animation: ct-label-pulse 4s ease-in-out infinite; }
  .ct-label:nth-child(1){ animation-delay:0s; }
  .ct-label:nth-child(2){ animation-delay:1s; }
  .ct-label:nth-child(3){ animation-delay:2s; }
  .ct-label:nth-child(4){ animation-delay:3s; }
`;

/* ─── Canvas: aurora bands + bokeh + embers + pulse rings ─── */
function useAuroraCanvas(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, t = 0;

    /* bokeh orbs */
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      xr: 0.1 + Math.random() * 0.8,
      yr: 0.2 + Math.random() * 0.6,
      r: 55 + Math.random() * 70,
      sp: 0.003 + Math.random() * 0.004,
      ph: Math.random() * Math.PI * 2,
      hue: [38, 42, 48, 32, 50, 44][i],
    }));

    /* embers */
    const embers = Array.from({ length: 70 }, () => newEmber(1, 1, true));
    function newEmber(W, H, scatter = false) {
      return {
        x: Math.random() * W,
        y: scatter ? Math.random() * H : H + 4,
        sz: Math.random() * 1.6 + 0.3,
        vy: -(Math.random() * 0.55 + 0.18),
        vx: (Math.random() - 0.5) * 0.28,
        dr: (Math.random() - 0.5) * 0.009,
        life: scatter ? Math.random() : 1,
        ml: Math.random() * 0.5 + 0.5,
      };
    }

    /* pulse rings emitted each second */
    const rings = [];

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      embers.forEach(e => { e.x = Math.random() * canvas.width; e.y = Math.random() * canvas.height; });
    };
    resize();

    /* public: call from parent to spawn a ring */
    canvas._pulse = (x, y) => rings.push({ x, y, r: 0, alpha: 0.7 });

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      /* ── 1. deep background gradient ── */
      const bg = ctx.createRadialGradient(W * .5, H * .5, 0, W * .5, H * .5, W * .7);
      bg.addColorStop(0, 'rgba(18,32,22,1)');
      bg.addColorStop(1, 'rgba(4,9,6,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── 2. bokeh orbs ── */
      orbs.forEach(o => {
        const ox = W * o.xr + Math.sin(t * o.sp * 1.3 + o.ph) * W * 0.09;
        const oy = H * o.yr + Math.cos(t * o.sp + o.ph + 1) * H * 0.12;
        const pulse = 0.85 + Math.sin(t * o.sp * 4 + o.ph) * 0.15;
        const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r * pulse);
        gr.addColorStop(0, `hsla(${o.hue},70%,68%,0.22)`);
        gr.addColorStop(0.45, `hsla(${o.hue},60%,55%,0.09)`);
        gr.addColorStop(1, 'transparent');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── 3. aurora flowing bands ── */
      for (let b = 0; b < 3; b++) {
        const off = (b / 3) * H * 0.4 + H * 0.25;
        const amp = 18 + b * 8;
        const spd = 0.22 + b * 0.07;
        const alpha = 0.07 + b * 0.025;

        ctx.beginPath();
        ctx.moveTo(0, off + Math.sin(t * spd) * amp);
        for (let x = 0; x <= W; x += W / 60) {
          const y = off
            + Math.sin((x / W) * Math.PI * 2.5 + t * spd) * amp
            + Math.sin((x / W) * Math.PI * 1.2 + t * spd * 0.7 + b) * amp * 0.5;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const lg = ctx.createLinearGradient(0, off - amp, 0, off + amp);
        lg.addColorStop(0, 'transparent');
        lg.addColorStop(0.5, `rgba(210,175,70,${alpha})`);
        lg.addColorStop(1, 'transparent');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 28 + b * 10;
        ctx.stroke();
      }

      /* ── 4. vertical glow columns behind each number ── */
      const slots = 4;
      const slotW = W / slots;
      for (let i = 0; i < slots; i++) {
        const cx = slotW * (i + 0.5);
        const pulse2 = 0.6 + Math.sin(t * 1.1 + i * 1.57) * 0.4;
        const cg = ctx.createRadialGradient(cx, H * 0.42, 0, cx, H * 0.42, slotW * 0.42 * pulse2);
        cg.addColorStop(0, `rgba(201,168,76,${0.18 * pulse2})`);
        cg.addColorStop(0.5, `rgba(201,168,76,${0.06 * pulse2})`);
        cg.addColorStop(1, 'transparent');
        ctx.fillStyle = cg;
        ctx.fillRect(cx - slotW * 0.5, 0, slotW, H);
      }

      /* ── 5. embers ── */
      embers.forEach(e => {
        e.x += e.vx; e.vx += e.dr;
        e.y += e.vy;
        e.life -= 0.004;
        if (e.life <= 0 || e.y < -8) Object.assign(e, newEmber(W, H));

        const a = Math.max(0, e.life / e.ml);
        const gr2 = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.sz * 5);
        gr2.addColorStop(0, `rgba(255,215,80,${a * 0.8})`);
        gr2.addColorStop(0.4, `rgba(201,168,76,${a * 0.3})`);
        gr2.addColorStop(1, 'transparent');
        ctx.fillStyle = gr2;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.sz * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,248,190,${a * 0.95})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.sz * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── 6. expanding pulse rings ── */
      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        rg.r += 3.2;
        rg.alpha -= 0.025;
        if (rg.alpha <= 0) { rings.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(255,210,60,${rg.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* ── 7. horizontal golden shine streak ── */
      const sx = (((t * 0.06) % 1.4) - 0.2) * W;
      const sg = ctx.createLinearGradient(sx - 120, 0, sx + 120, 0);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, 'rgba(255,230,120,0.07)');
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
}

export default function CountdownTimer() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [time, setTime] = useState(getTimeLeft());
  const [tick, setTick] = useState(0);

  useAuroraCanvas(canvasRef);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeLeft());
      setTick(k => k + 1);
      /* fire pulse ring from canvas center */
      const c = canvasRef.current;
      if (c && c._pulse) c._pulse(c.width / 2, c.height * 0.45);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.d, label: 'Days' },
    { value: time.h, label: 'Hours' },
    { value: time.m, label: 'Mins' },
    { value: time.s, label: 'Secs' },
  ];

  return (
    <>
      <style>{CSS}</style>

      <div ref={wrapRef} style={{
        position: 'relative', width: '100%', maxWidth: 500,
        margin: '0 auto', minHeight: 148, borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 8px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.14)',
      }}>

        {/* ── canvas background ── */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          display: 'block',
        }} />

        {/* ── number overlay ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 0,
          padding: '28px 16px 22px',
        }}>
          {units.map(({ value, label }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>

              {/* unit */}
              <div style={{ textAlign: 'center', minWidth: 72 }}>
                <div
                  key={`${label}-${tick}`}
                  className="ct-in"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2.4rem, 7vw, 3.4rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: '#FFE580',
                    textShadow: `
                      0 0 6px  rgba(255,230,100,0.95),
                      0 0 16px rgba(201,168,76,0.85),
                      0 0 36px rgba(201,168,76,0.5),
                      0 0 70px rgba(201,168,76,0.25)
                    `,
                  }}
                >
                  {pad(value)}
                </div>

                <div
                  className="ct-label"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.5rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.65)',
                    fontWeight: 700,
                    marginTop: 10,
                  }}
                >
                  {label}
                </div>
              </div>

              {/* colon separator */}
              {i < units.length - 1 && (
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  gap: 7, paddingBottom: 26, margin: '0 2px', flexShrink: 0,
                }}>
                  {[0, 1].map(j => (
                    <div key={j} style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#C9A84C',
                      boxShadow: '0 0 8px rgba(201,168,76,0.9), 0 0 18px rgba(201,168,76,0.5)',
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
