'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [active, setActive] = useState('home');

  // Active section tracking with IntersectionObserver & RAF throttling (no layout thrashing, zero memory leak)
  useEffect(() => {
    const sections = ['home', 'academics', 'research', 'achievements', 'contact'];
    const elements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    let ticking = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topId = intersecting[0].target.id;
          setActive(prev => (prev !== topId ? topId : prev));
        }
      },
      {
        rootMargin: '-10% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach(el => observer.observe(el));

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY < 150) {
            setActive(prev => (prev !== 'home' ? 'home' : prev));
          } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            setActive(prev => (prev !== 'contact' ? 'contact' : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
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
          width: 'max-content',
          maxWidth: 'calc(100vw - 2rem)',
        }}
      >
        <nav
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            border: '1px solid rgba(96,121,132,0.15)',
            boxShadow: '0 2px 12px rgba(38, 50, 56, 0.08)',
            height: '3.5rem',
            padding: '0 0.5rem',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Logo / Brand text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1rem',
            paddingRight: '1.25rem',
            flexShrink: 0,
          }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#8892b0',
                whiteSpace: 'nowrap',
              }}
            >
              DR. D. M. MATE
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, paddingRight: '0.25rem' }}>
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
                    padding: '0.5rem 0.9rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    color: isActive ? '#ffffff' : 'var(--graphite)',
                    backgroundColor: isActive ? 'var(--terracotta)' : 'transparent',
                    display: 'inline-block',
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
        @media (max-width: 960px) {
          .nav-desktop-container {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
