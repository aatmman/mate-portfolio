import ScrollReveal from '@/components/ui/ScrollReveal';
import { profile } from '@/data/profile';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <ScrollReveal>
            <p className="t-label" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>Get In Touch</p>
            <h2 className="t-section-heading" style={{ textAlign: 'center', marginBottom: '1rem' }}>Let&apos;s Connect</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="cert-card" style={{ marginTop: '2.5rem', padding: '3rem' }}>
              {/* Blueprint corners */}
              <div style={{ position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderTop: '1.5px solid rgba(96,121,132,0.25)', borderLeft: '1.5px solid rgba(96,121,132,0.25)' }} />
              <div style={{ position: 'absolute', bottom: 16, right: 16, width: 36, height: 36, borderBottom: '1.5px solid rgba(96,121,132,0.25)', borderRight: '1.5px solid rgba(96,121,132,0.25)' }} />

              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.8rem', color: 'var(--graphite)', lineHeight: 1.2 }}>
                  {profile.name}
                </p>
                <p className="t-eyebrow" style={{ marginTop: '0.5rem' }}>{profile.title}</p>
                <p className="t-small" style={{ marginTop: '0.25rem' }}>{profile.department}</p>
                <p className="t-small">{profile.institution}</p>
                <p className="t-meta" style={{ marginTop: '0.15rem' }}>{profile.location}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 48, height: 48,
                    background: 'rgba(201,106,69,0.08)',
                    border: '1px solid rgba(201,106,69,0.2)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>✉</span>
                  </div>
                  <p className="t-meta" style={{ color: 'var(--brass)', marginBottom: '0.25rem' }}>Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--terracotta)',
                      textDecoration: 'none',
                      borderBottom: '1px dashed rgba(201,106,69,0.4)',
                      paddingBottom: '0.1rem',
                    }}
                  >
                    {profile.email}
                  </a>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 48, height: 48,
                    background: 'rgba(96,121,132,0.08)',
                    border: '1px solid rgba(96,121,132,0.2)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>☎</span>
                  </div>
                  <p className="t-meta" style={{ color: 'var(--brass)', marginBottom: '0.25rem' }}>Phone</p>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--graphite)',
                      textDecoration: 'none',
                    }}
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(180,154,103,0.25)', textAlign: 'center' }}>
                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  Send an Email
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
