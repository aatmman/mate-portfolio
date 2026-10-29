'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Mail, Phone, Copy, Check } from '@/components/ui/Icons';
import { profile as defaultProfile } from '@/data/profile';

export default function Contact({ profileData }: { profileData?: typeof defaultProfile } = {}) {
  const p = profileData || defaultProfile;
  const [copied, setCopied] = useState(false);

  const subject = encodeURIComponent(`Academic Inquiry — Dr. Dnyaneshwar M. Mate`);
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(p.email)}&su=${subject}`;
  const desktopMailtoUrl = `mailto:${p.email}?subject=${subject}`;
  const outlookWebUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(p.email)}&subject=${subject}`;
  const yahooWebUrl = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(p.email)}&subject=${subject}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(p.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
                  {p.name}
                </p>
                <p className="t-eyebrow" style={{ marginTop: '0.5rem' }}>{p.title}</p>
                <p className="t-small" style={{ marginTop: '0.25rem' }}>{p.department}</p>
                <p className="t-small">{p.institution}</p>
                <p className="t-meta" style={{ marginTop: '0.15rem' }}>{p.location}</p>
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
                    <Mail className="w-5 h-5 text-terracotta" />
                  </div>
                  <p className="t-meta" style={{ color: 'var(--brass)', marginBottom: '0.25rem' }}>Email</p>
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in Gmail (Browser)"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--terracotta)',
                      textDecoration: 'none',
                      borderBottom: '1px dashed rgba(201,106,69,0.4)',
                      paddingBottom: '0.1rem',
                    }}
                  >
                    {p.email}
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
                    <Phone className="w-5 h-5 text-steel" />
                  </div>
                  <p className="t-meta" style={{ color: 'var(--brass)', marginBottom: '0.25rem' }}>Phone</p>
                  <a
                    href={`tel:${p.phone.replace(/\s/g, '')}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--graphite)',
                      textDecoration: 'none',
                    }}
                  >
                    {p.phone}
                  </a>
                </div>
              </div>

              {/* Email Action Area */}
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px dashed rgba(180,154,103,0.3)', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: 540, width: '100%', margin: '0 auto' }}>
                  {/* Primary Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.85rem 1.75rem',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                      }}
                      title="Open Gmail directly in your browser tab (no desktop app required)"
                    >
                      <Mail className="w-4 h-4" />
                      Send an Email
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="btn btn-secondary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.85rem 1.4rem',
                        fontSize: '0.9rem',
                      }}
                      title="Copy email address to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied to Clipboard!' : 'Copy Address'}
                    </button>
                  </div>

                  {/* Desktop App & Alternative Webmail Box */}
                  <div style={{
                    background: 'rgba(96,121,132,0.06)',
                    border: '1px solid rgba(96,121,132,0.18)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.78rem',
                    color: 'var(--steel)',
                    lineHeight: 1.6,
                    width: '100%',
                    textAlign: 'center',
                  }}>
                    <div>
                      <span style={{ color: 'var(--graphite)', fontWeight: 600 }}>Default:</span> Opens in <strong>Chrome / Browser (Gmail)</strong> where you are logged in.
                    </div>
                    <div style={{ marginTop: '0.35rem', paddingTop: '0.35rem', borderTop: '1px dashed rgba(96,121,132,0.15)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.5rem 1rem' }}>
                      <span>
                        Prefer your desktop app?{' '}
                        <a
                          href={desktopMailtoUrl}
                          style={{ color: 'var(--terracotta)', fontWeight: 600, textDecoration: 'underline' }}
                          title="Open in your default desktop email app (Outlook / Apple Mail)"
                        >
                          Open in Desktop Client (Outlook / Mail)
                        </a>
                      </span>
                      <span style={{ opacity: 0.4 }}>•</span>
                      <span>
                        Other webmail:{' '}
                        <a href={outlookWebUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--graphite)', textDecoration: 'underline', marginRight: '0.5rem' }}>Outlook.com</a>
                        <a href={yahooWebUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--graphite)', textDecoration: 'underline' }}>Yahoo Mail</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
