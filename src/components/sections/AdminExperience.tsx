import ScrollReveal from '@/components/ui/ScrollReveal';
import { adminExperience, academicContributions } from '@/data/experience';

export default function AdminExperience() {
  return (
    <div>
      {/* Administrative Experience */}
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Leadership & Administration</p>
        <h2 className="t-section-heading" style={{ marginBottom: '0.75rem' }}>Administrative Experience</h2>
        <div className="divider" />
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
        {adminExperience.map((role, i) => (
          <ScrollReveal key={role.id} delay={(Math.min(i, 4) as 0|1|2|3|4)}>
            <div className="paper paper-lift" style={{ padding: '1.5rem', height: '100%', borderTop: '3px solid var(--brass)' }}>
              <div className="blueprint-corner blueprint-corner--tl" />
              <div className="blueprint-corner blueprint-corner--br" />
              <p className="t-label" style={{ marginBottom: '0.35rem', color: 'var(--brass)' }}>{role.period}</p>
              <p className="t-subsection" style={{ fontSize: '1.05rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{role.role}</p>
              <p className="t-small" style={{ marginBottom: '0.5rem', opacity: 0.8 }}>{role.description}</p>
              {role.institution && (
                <p className="t-meta" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(96,121,132,0.12)', paddingTop: '0.5rem' }}>
                  {role.institution}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Academic Contributions */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Department & Community</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Academic Contributions</h3>
          <div className="divider" />
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
          marginTop: '1.75rem',
        }}>
          {academicContributions.map((c, i) => (
            <ScrollReveal key={c.id} delay={(Math.min(i % 4, 3) as 0|1|2|3)}>
              <div className="journal-card" style={{ height: '100%' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--graphite)', marginBottom: '0.35rem' }}>
                  {c.title}
                </p>
                <p className="t-small">{c.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
