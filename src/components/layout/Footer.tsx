"use client";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p className="t-label" style={{ color: 'rgba(201,106,69,0.85)', marginBottom: '0.75rem' }}>Associate Professor</p>
            <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.3rem', color: 'rgba(255,253,248,0.92)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
              Dr. Dnyaneshwar M. Mate
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,253,248,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Mechanical Engineering
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,253,248,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
              JSPM's Rajarshi Shahu College of Engineering, Pune
            </p>
          </div>
          <div>
            <p className="t-label" style={{ color: 'rgba(201,106,69,0.85)', marginBottom: '0.75rem' }}>Navigation</p>
            {['Home', 'Academics & Experience', 'Research & Publications', 'Achievements', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().split(' ')[0]}`} style={{ display: 'block', color: 'rgba(255,253,248,0.55)', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '0.35rem', transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,106,69,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,253,248,0.55)')}>
                {l}
              </a>
            ))}
          </div>
          <div>
            <p className="t-label" style={{ color: 'rgba(201,106,69,0.85)', marginBottom: '0.75rem' }}>Contact</p>
            <p style={{ color: 'rgba(255,253,248,0.55)', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
              <a href="mailto:dmmatepatil@gmail.com" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>dmmatepatil@gmail.com</a>
            </p>
            <p style={{ color: 'rgba(255,253,248,0.55)', fontSize: '0.875rem' }}>+91 98234 48609</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,253,248,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,253,248,0.3)', letterSpacing: '0.06em' }}>
            © 2024 Dr. Dnyaneshwar M. Mate — All Rights Reserved
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,253,248,0.3)', letterSpacing: '0.06em' }}>
            Department of Mechanical Engineering · JSPM's RSCE · Pune
          </p>
        </div>
      </div>
    </footer>
  );
}
