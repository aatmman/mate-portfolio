'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [active, setActive] = useState('home');

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'academics', 'research', 'achievements', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home',         label: 'Home' },
    { id: 'academics',    label: 'Academics & Experience' },
    { id: 'research',     label: 'Research & Publications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact',      label: 'Contact' },
  ];

  const mobileIcons = ['⌂', '◎', '◈', '★', '✉'];

  return (
    <>
      {/* Desktop — static pill nav */}
      <div 
        className="nav-desktop-container"
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            border: '1px solid rgba(96,121,132,0.15)',
            boxShadow: '0 1px 3px rgba(38, 50, 56, 0.1)',
            height: '3.5rem',
            padding: '0 0.5rem',
          }}
        >
          {/* Logo / Brand text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1rem',
            paddingRight: '1.5rem',
            flexShrink: 0
          }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#8892b0'
              }}
            >
              DR. D. M. MATE
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(l.id);
                  }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    color: isActive ? '#ffffff' : 'var(--graphite)',
                    backgroundColor: isActive ? 'var(--terracotta)' : 'transparent',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--terracotta)';
                      e.currentTarget.style.backgroundColor = 'rgba(201,106,69,0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--graphite)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`mobile-nav__link ${active === l.id ? 'mobile-nav__link--active' : ''}`}
            onClick={() => setActive(l.id)}
          >
            <span style={{ fontSize: '1rem' }}>{mobileIcons[i]}</span>
            <span>{l.label.split(' ')[0]}</span>
          </a>
        ))}
      </nav>

      <style jsx>{`
        @media (max-width: 900px) {
          .nav-desktop-container {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
