import ScrollReveal from '@/components/ui/ScrollReveal';
import { education } from '@/data/education';

export default function Education() {
  return (
    <div>
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Academic Credentials</p>
        <h2 className="t-section-heading" style={{ marginBottom: '0.75rem' }}>Education</h2>
        <div className="divider" />
      </ScrollReveal>

      <div className="timeline" style={{ marginTop: '2.5rem' }}>
        {education.map((deg, i) => (
          <ScrollReveal key={deg.id} delay={(Math.min(i, 4) as 0|1|2|3|4)} direction="left">
            <div className="timeline-item">
              <div className={`timeline-dot ${deg.highlight ? '' : 'timeline-dot--steel'}`} />
              <div
                className={`paper paper-lift`}
                style={{
                  padding: '1.5rem',
                  borderLeft: deg.highlight ? '3px solid var(--terracotta)' : '3px solid var(--steel)',
                  opacity: deg.highlight ? 1 : 0.92,
                  background: deg.highlight ? 'var(--warm-white)' : 'rgba(255,253,248,0.8)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    {deg.highlight && (
                      <p className="t-label" style={{ marginBottom: '0.35rem' }}>Doctoral Degree</p>
                    )}
                    <p className="t-subsection">{deg.degree}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--steel)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{deg.field}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="t-meta" style={{ background: deg.highlight ? 'var(--terracotta)' : 'var(--blueprint)', color: deg.highlight ? 'white' : 'var(--graphite)', padding: '0.25rem 0.75rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                      {deg.year}
                    </span>
                    {deg.percentage && (
                      <p className="t-meta" style={{ marginTop: '0.35rem' }}>{deg.percentage}% — {deg.division}</p>
                    )}
                  </div>
                </div>
                <p className="t-small" style={{ marginBottom: deg.thesis ? '0.5rem' : 0 }}>
                  {deg.institution}
                </p>
                <p className="t-meta">{deg.university}</p>
                {deg.thesis && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(220,235,240,0.35)', borderLeft: '2px solid rgba(96,121,132,0.25)' }}>
                    <p className="t-meta" style={{ marginBottom: '0.25rem', color: 'var(--terracotta)' }}>THESIS</p>
                    <p className="t-small" style={{ fontStyle: 'italic', color: 'var(--graphite)' }}>&ldquo;{deg.thesis}&rdquo;</p>
                    {deg.advisor && <p className="t-meta" style={{ marginTop: '0.35rem' }}>Advisor: {deg.advisor}</p>}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
