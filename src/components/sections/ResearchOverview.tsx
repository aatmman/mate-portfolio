import ScrollReveal from '@/components/ui/ScrollReveal';
import { profile } from '@/data/profile';
import { patents, researchGrant, consultancy } from '@/data/patents';
import { books } from '@/data/achievements';

export default function ResearchOverview() {
  return (
    <div>
      {/* Research Profile Header */}
      <ScrollReveal>
        <p className="t-label" style={{ marginBottom: '0.5rem' }}>Research Identity</p>
        <h2 className="t-section-heading" style={{ marginBottom: '0.5rem' }}>
          Research at the Intersection of
        </h2>
        <h2 className="t-section-heading" style={{ color: 'var(--terracotta)', marginBottom: '1rem' }}>
          Engineering &amp; Innovation
        </h2>
        <div className="divider" />
        <p className="t-body" style={{ maxWidth: 620, marginTop: '1rem' }}>
          With a primary focus on surface engineering and manufacturing processes, the research portfolio spans multiple disciplines within mechanical engineering — from CFD simulation and heat transfer to renewable energy and material science.
        </p>
      </ScrollReveal>

      {/* Research theme tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1.75rem' }}>
        {profile.researchThemes.map((theme, i) => (
          <ScrollReveal key={theme} delay={(Math.min(i, 5) as 0|1|2|3|4|5)}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.45rem 1rem',
              border: '1px solid rgba(96,121,132,0.25)',
              color: 'var(--steel)',
              background: 'rgba(220,235,240,0.35)',
            }}>
              {theme}
            </span>
          </ScrollReveal>
        ))}
      </div>

      {/* Patents */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Intellectual Property</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Patents</h3>
          <div className="divider" />
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {patents.map((p, i) => (
            <ScrollReveal key={p.id} delay={(i as 0|1)}>
              <div className="patent-card" style={{ height: '100%', position: 'relative' }}>
                <div className="blueprint-corner blueprint-corner--tl" />
                <div className="blueprint-corner blueprint-corner--br" />
                <p className="t-label" style={{ marginBottom: '0.75rem' }}>Patent</p>
                <p className="t-subsection" style={{ lineHeight: 1.35, marginBottom: '1.25rem' }}>{p.title}</p>
                <p className="t-small" style={{ marginBottom: '0.25rem' }}>{p.description}</p>
                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                    <p className="t-meta" style={{ color: 'var(--brass)', minWidth: 120 }}>Reference No.</p>
                    <p className="t-small" style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{p.referenceNumber}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                    <p className="t-meta" style={{ color: 'var(--brass)', minWidth: 120 }}>Type</p>
                    <p className="t-small">{p.applicationType}</p>
                  </div>
                </div>
                {p.approved && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <span className="stamp">✓ Approved</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Research Grant */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Funding</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Research Grant</h3>
          <div className="divider" />
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="cert-card" style={{ marginTop: '2rem', maxWidth: 680 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p className="t-label" style={{ marginBottom: '0.5rem' }}>AICTE Research Grant</p>
                <p className="t-subsection" style={{ marginBottom: '0.5rem' }}>{researchGrant.title}</p>
                <p className="t-body" style={{ maxWidth: 450 }}>{researchGrant.description}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '2.5rem', color: 'var(--terracotta)', lineHeight: 1 }}>
                  {researchGrant.amountFormatted}
                </p>
                <p className="t-meta">Research Grant</p>
              </div>
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(180,154,103,0.3)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <p className="t-meta" style={{ color: 'var(--brass)' }}>Sponsor</p>
                <p className="t-small" style={{ fontWeight: 500 }}>{researchGrant.sponsor}</p>
              </div>
              <div>
                <p className="t-meta" style={{ color: 'var(--brass)' }}>File No.</p>
                <p className="t-small" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{researchGrant.fileNo}</p>
              </div>
              <div>
                <p className="t-meta" style={{ color: 'var(--brass)' }}>Date</p>
                <p className="t-small">{researchGrant.date}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Industrial Consultancy */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Industry Engagement</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Industrial Consultancy</h3>
          <div className="divider" />
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
          {consultancy.map((c, i) => (
            <ScrollReveal key={c.id} delay={(i as 0|1|2)}>
              <div className="paper paper-lift" style={{ padding: '1.5rem', height: '100%', borderTop: '3px solid var(--steel)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <p className="t-meta" style={{ color: 'var(--terracotta)' }}>{c.year}</p>
                  <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', color: 'var(--terracotta)' }}>{c.amount}</p>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--graphite)', marginBottom: '0.35rem', lineHeight: 1.35 }}>{c.title}</p>
                <p className="t-small" style={{ marginBottom: '0.75rem' }}>{c.subtitle}</p>
                <p className="t-meta">{c.description.slice(0, 100)}…</p>
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(96,121,132,0.10)' }}>
                  <p className="t-meta" style={{ color: 'var(--brass)' }}>Client</p>
                  <p className="t-small" style={{ fontWeight: 500 }}>{c.client}</p>
                  <p className="t-meta">{c.clientLocation}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Books */}
      <div style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <p className="t-label" style={{ marginBottom: '0.5rem' }}>Authored Works</p>
          <h3 className="t-subsection" style={{ marginBottom: '0.75rem' }}>Books Published</h3>
          <div className="divider" />
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {books.map((b, i) => (
            <ScrollReveal key={b.id} delay={(i as 0|1|2|3)}>
              <div
                className="book-spine"
                style={{
                  background: `linear-gradient(135deg, ${b.colorLight} 0%, ${b.color}22 100%)`,
                  borderLeft: `6px solid ${b.color}`,
                }}
              >
                {/* Book texture lines */}
                {[...Array(8)].map((_, li) => (
                  <div key={li} style={{ position: 'absolute', top: `${10 + li * 10}%`, left: 12, right: 12, height: '1px', background: `${b.color}18` }} />
                ))}
                <p style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '0.85rem',
                  color: b.color,
                  lineHeight: 1.35,
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {b.title}
                </p>
                <p className="t-meta" style={{ marginTop: '0.35rem', color: `${b.color}99`, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', position: 'relative', zIndex: 1 }}>
                  ISBN: {b.isbn}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
