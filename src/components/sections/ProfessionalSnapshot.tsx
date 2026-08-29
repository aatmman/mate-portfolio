'use client';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = target;
    const step = Math.ceil(num / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

function StatItem({ number, label, delay }: { number: string; label: string; delay: number }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rawNum = parseInt(number.replace(/\D/g, ''), 10) || 0;
  const count = useCountUp(rawNum, 1600, started);
  const suffix = number.replace(/[0-9]/g, '');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${started ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay * 0.1}s`, textAlign: 'center', padding: '1.5rem 1rem', position: 'relative' }}
    >
      <div className="stat-num" style={{ color: 'var(--terracotta)' }}>
        {started ? `${count}${suffix}` : '0'}
      </div>
      <div className="stat-label" style={{ marginTop: '0.5rem' }}>{label}</div>
    </div>
  );
}

export default function ProfessionalSnapshot() {
  return (
    <section className="section" style={{ padding: '3.5rem 0' }}>
      <div className="section-inner">
        <div
          className="paper"
          style={{
            padding: '0.5rem 1rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Blueprint watermark */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
            backgroundImage: 'repeating-linear-gradient(0deg, var(--steel) 0, var(--steel) 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, var(--steel) 0, var(--steel) 1px, transparent 0, transparent 40px)',
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 0 }}>
            {profile.stats.map((s, i) => (
              <div key={i} style={{ borderRight: i < profile.stats.length - 1 ? '1px solid rgba(96,121,132,0.10)' : 'none' }}>
                <StatItem number={s.number} label={s.label} delay={i} />
              </div>
            ))}
          </div>
          <p className="t-meta" style={{ textAlign: 'center', padding: '0.5rem 1rem 1rem', opacity: 0.7 }}>
            * {profile.statsNote}
          </p>
        </div>
      </div>
    </section>
  );
}
