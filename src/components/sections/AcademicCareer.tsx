import ScrollReveal from '@/components/ui/ScrollReveal';
import { experience } from '@/data/experience';

export default function AcademicCareer() {
  return (
    <div>
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Career Timeline</p>
        <h2 className="t-section-heading" style={{ marginBottom: '0.75rem' }}>Academic Career</h2>
        <div className="divider" />
        <p className="t-small" style={{ marginTop: '1rem', maxWidth: 520 }}>
          Over two decades of progressive academic appointments across premier engineering institutions in Maharashtra.
        </p>
      </ScrollReveal>

      <div className="timeline" style={{ marginTop: '2.5rem' }}>
        {experience.map((pos, i) => (
          <ScrollReveal key={pos.id} delay={(Math.min(i, 4) as 0|1|2|3|4)} direction="left">
            <div className="timeline-item">
              <div className={`timeline-dot ${pos.current ? '' : 'timeline-dot--steel'}`} />
              <div
                className="paper paper-lift"
                style={{
                  padding: pos.current ? '1.75rem' : '1.25rem 1.5rem',
                  borderLeft: pos.current ? '3px solid var(--terracotta)' : '2px solid rgba(96,121,132,0.25)',
                  background: pos.current ? 'var(--warm-white)' : 'rgba(255,253,248,0.75)',
                  transform: pos.current ? 'none' : 'scale(0.98)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    {pos.current && (
                      <span className="t-label" style={{ background: 'var(--terracotta)', color: 'white', padding: '0.15rem 0.6rem', fontSize: '0.6rem', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'inline-block' }}>
                        CURRENT
                      </span>
                    )}
                    <p style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: pos.current ? '1.3rem' : '1.05rem',
                      color: 'var(--graphite)',
                      lineHeight: 1.25,
                      marginTop: pos.current ? '0.25rem' : 0,
                    }}>
                      {pos.designation}
                    </p>
                    <p className="t-small" style={{ marginTop: '0.35rem', color: pos.current ? 'var(--steel)' : 'var(--steel)', fontWeight: pos.current ? 500 : 400 }}>
                      {pos.organization}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p className="t-meta" style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: pos.current ? 'var(--terracotta)' : 'var(--steel)',
                      fontWeight: 500,
                    }}>
                      {pos.from} — {pos.to}
                    </p>
                    <p className="t-meta" style={{ marginTop: '0.2rem', opacity: 0.65 }}>{pos.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
