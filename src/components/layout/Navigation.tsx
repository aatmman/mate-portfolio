'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
        <nav
          className={cn(
            'flex items-center rounded-full border shadow-sm px-2 h-14',
            'border-[rgba(96,121,132,0.15)]',
            'bg-[rgba(255,255,255,0.95)] backdrop-blur-md'
          )}
        >
          {/* Logo / Brand text */}
          <div className="flex-shrink-0 flex items-center font-semibold pl-4 pr-6">
            <span
              className="text-xs font-mono uppercase tracking-[0.2em]"
              style={{ color: '#8892b0' }}
            >
              DR. D. M. MATE
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-2 pr-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(l.id);
                }}
                className={cn(
                  'text-[13px] font-medium transition-all px-4 py-2 rounded-full whitespace-nowrap',
                  active === l.id
                    ? 'text-white'
                    : 'text-[var(--graphite)] hover:text-[var(--terracotta)] hover:bg-[rgba(201,106,69,0.05)]'
                )}
                style={
                  active === l.id
                    ? { backgroundColor: 'var(--terracotta)' }
                    : {}
                }
              >
                {l.label}
              </a>
            ))}
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
    </>
  );
}
