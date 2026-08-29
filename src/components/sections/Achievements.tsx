import ScrollReveal from '@/components/ui/ScrollReveal';
import { awards, memberships, editorialRoles, conferencesOrganized, extraCurricular } from '@/data/achievements';

export default function Achievements() {
  return (
    <div>
      {/* Awards */}
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Recognition</p>
        <h2 className="t-section-heading" style={{ marginBottom: '0.75rem' }}>Awards &amp; Recognition</h2>
        <div className="divider" />
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
        {awards.map((a, i) => (
          <ScrollReveal key={a.id} delay={(Math.min(i % 4, 3) as 0|1|2|3)}>
            <div className={`cert-card paper-lift ${a.highlight ? 'paper-deep' : 'paper'}`} style={{ height: '100%' }}>
              {a.highlight && (
                <p className="t-label" style={{ marginBottom: '0.5rem', color: 'var(--brass)' }}>Highlight</p>
              )}
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'var(--graphite)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                {a.title}
              </p>
              <p className="t-small" style={{ marginBottom: '0.5rem' }}>{a.description}</p>
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px dashed rgba(180,154,103,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <p className="t-meta">{a.organization}</p>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--terracotta)',
                  fontWeight: 600,
                  background: 'rgba(201,106,69,0.08)',
                  padding: '0.2rem 0.5rem',
                }}>
                  {a.year}
                </span>
              </div>
              {a.location && <p className="t-meta" style={{ marginTop: '0.25rem', opacity: 0.7 }}>{a.location}</p>}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Professional Memberships */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Professional Bodies</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Professional Memberships</h3>
          <div className="divider" />
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.75rem' }}>
          {memberships.map((m, i) => (
            <ScrollReveal key={m.id} delay={(Math.min(i % 4, 3) as 0|1|2|3)}>
              <div className="paper paper-lift" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'var(--blueprint)',
                  border: '1px solid rgba(96,121,132,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--steel)', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.2 }}>
                    {m.abbreviation}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--graphite)', lineHeight: 1.3 }}>{m.organization}</p>
                  <p className="t-meta" style={{ marginTop: '0.25rem' }}>{m.membershipType}</p>
                  {m.membershipNo && <p className="t-meta">No. {m.membershipNo}</p>}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Editorial Roles */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Journal Service</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Editorial &amp; Reviewer Roles</h3>
          <div className="divider" />
        </ScrollReveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.75rem' }}>
          {editorialRoles.map((e, i) => (
            <ScrollReveal key={e.id} delay={(Math.min(i % 4, 3) as 0|1|2|3)}>
              <div className="journal-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--brass)',
                  minWidth: 80,
                }}>
                  {e.abbreviation}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--graphite)', lineHeight: 1.35 }}>{e.journal}</p>
                  {e.issn && <p className="t-meta">ISSN: {e.issn}</p>}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'white',
                  background: 'var(--steel)',
                  padding: '0.2rem 0.6rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {e.role}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Conferences Organized */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Events</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Conferences &amp; Events Organized</h3>
          <div className="divider" />
        </ScrollReveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.75rem' }}>
          {conferencesOrganized.map((c, i) => (
            <ScrollReveal key={c.id} delay={(Math.min(i, 3) as 0|1|2|3)}>
              <div className="paper" style={{ padding: '1.1rem 1.35rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'white',
                  background: 'var(--terracotta)',
                  padding: '0.2rem 0.6rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  alignSelf: 'flex-start',
                  marginTop: '0.1rem',
                }}>
                  {c.role}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9rem', color: 'var(--graphite)', lineHeight: 1.4 }}>{c.title}</p>
                  <p className="t-meta" style={{ marginTop: '0.25rem' }}>
                    {[c.location, c.association].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <p className="t-meta" style={{ whiteSpace: 'nowrap', flexShrink: 0, color: 'var(--terracotta)' }}>{c.date}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Extra Curricular */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Beyond Academics</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Extra-Curricular Activities</h3>
          <div className="divider" />
        </ScrollReveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
          {extraCurricular.map((e, i) => (
            <ScrollReveal key={e.id} delay={(i as 0|1|2)}>
              <div className="paper" style={{ padding: '1rem 1.25rem', maxWidth: 320 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--graphite)', marginBottom: '0.35rem' }}>{e.activity}</p>
                <p className="t-small">{e.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
