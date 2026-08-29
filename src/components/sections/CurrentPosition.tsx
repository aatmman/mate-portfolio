import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CurrentPosition() {
  return (
    <section className="section section-blueprint" style={{ padding: '4rem 0' }}>
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          <ScrollReveal>
            <p className="t-label" style={{ marginBottom: '0.75rem' }}>Currently Serving</p>
            <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--graphite)', lineHeight: 1.2, marginBottom: '0.35rem' }}>
              Associate Professor
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--steel)', fontSize: '1rem', marginBottom: '0.25rem' }}>
              Department of Mechanical Engineering
            </p>
            <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', color: 'var(--graphite)', marginBottom: '0.25rem' }}>
              JSPM&apos;s Rajarshi Shahu College of Engineering
            </p>
            <p className="t-small">Tathawade, Pune — 411033, Maharashtra, India</p>
          </ScrollReveal>

          {/* Subtle engineering graphic */}
          <ScrollReveal direction="scale" delay={1}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true" style={{ opacity: 0.18 }}>
              <circle cx="60" cy="60" r="55" stroke="var(--graphite)" strokeWidth="1" />
              <circle cx="60" cy="60" r="40" stroke="var(--terracotta)" strokeWidth="1" strokeDasharray="4 3" />
              <circle cx="60" cy="60" r="8" fill="var(--terracotta)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 60 + 12 * Math.cos(rad);
                const y1 = 60 + 12 * Math.sin(rad);
                const x2 = 60 + 55 * Math.cos(rad);
                const y2 = 60 + 55 * Math.sin(rad);
                return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--steel)" strokeWidth="0.5" />;
              })}
              {[30, 45, 55].map((r) => (
                <circle key={r} cx="60" cy="60" r={r} stroke="var(--steel)" strokeWidth="0.3" strokeDasharray="2 4" />
              ))}
            </svg>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
