'use client';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section id="home" className="section" style={{ paddingTop: '7rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="section-inner">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'center',
        }}
          className="hero-grid"
        >
          {/* Text side */}
          <div>
            <ScrollReveal>
              <p className="t-label" style={{ marginBottom: '1.25rem' }}>
                Associate Professor · Mechanical Engineering
              </p>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--steel)',
                marginBottom: '0.5rem',
              }}>
                Hi, I&apos;m
              </p>
              <h1 className="t-hero" style={{ marginBottom: '1.5rem' }}>
                Dr. Dnyaneshwar<br />M. Mate
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="divider" />
              <p className="t-body" style={{ maxWidth: '520px', marginBottom: '2rem' }}>
                Associate Professor in Mechanical Engineering at JSPM&apos;s Rajarshi Shahu College of
                Engineering, Pune. With over 20 years of teaching and academic experience, my work
                spans engineering education, research, innovation and mentoring.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#research" className="btn btn-primary">
                Explore Research
                <span>→</span>
              </a>
              <a href="#academics" className="btn btn-secondary">
                Academic Journey
              </a>
            </ScrollReveal>

            {/* Scroll indicator */}
            <ScrollReveal delay={4} style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 24, height: 40,
                border: '1.5px solid rgba(96,121,132,0.4)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '4px',
              }}>
                <div style={{
                  width: 3, height: 8,
                  background: 'var(--terracotta)',
                  borderRadius: 2,
                  animation: 'scrollDot 1.8s ease-in-out infinite',
                }} />
              </div>
              <span className="t-meta">Scroll to explore</span>
            </ScrollReveal>
          </div>

          {/* Portrait side */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScrollReveal delay={1} direction="scale">
              <div className="hero-portrait-wrap">
                {/* Portrait */}
                <div style={{ position: 'relative', zIndex: 2, width: 'min(400px, 85vw)' }}>
                  <div style={{ width: '100%', height: 413, position: 'relative' }}>
                    <Image
                      src="/assets/images/dr-mate.png"
                      alt="Dr. Dnyaneshwar M. Mate — Associate Professor, Mechanical Engineering"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="hero-portrait-img"
                      priority
                      style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                    />
                  </div>
                </div>
                {/* Caption tag */}
                <div style={{
                  position: 'absolute',
                  bottom: -28,
                  right: 8,
                  background: 'var(--warm-white)',
                  border: '1px solid rgba(96,121,132,0.15)',
                  padding: '0.35rem 0.75rem',
                  boxShadow: '0 2px 8px rgba(38,50,56,0.08)',
                  zIndex: 3,
                }}>
                  <p className="t-meta">JSPM&apos;s RSCE · Pune</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(14px); opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
