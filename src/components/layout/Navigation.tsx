'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Navigation as NavIcon } from 'lucide-react';
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
            'flex items-center overflow-hidden rounded-full border shadow-lg h-12',
            'border-[rgba(96,121,132,0.15)]',
            'bg-[rgba(255,253,248,0.88)] backdrop-blur-md'
          )}
        >
          {/* Logo / Brand icon */}
          <div className="flex-shrink-0 flex items-center font-semibold pl-4 pr-2">
            <NavIcon
              className="h-5 w-5"
              style={{ color: 'var(--terracotta)' }}
            />
            <span
              className="ml-2 text-xs font-mono uppercase tracking-widest"
              style={{ color: 'var(--steel)' }}
            >
              Dr. D. M. Mate
            </span>
          </div>

          {/* Separator */}
          <div
            className="h-5 w-px mx-1 flex-shrink-0"
            style={{ background: 'rgba(96,121,132,0.20)' }}
          />

          {/* Nav links */}
          <div className="flex items-center gap-1 pr-3">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(l.id);
                }}
                className={cn(
                  'text-sm font-medium transition-colors px-3 py-1 rounded-full whitespace-nowrap',
                  active === l.id
                    ? 'text-white bg-[var(--terracotta)]'
                    : 'text-[var(--graphite)] hover:text-[var(--terracotta)] hover:bg-[rgba(201,106,69,0.08)]'
                )}
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
