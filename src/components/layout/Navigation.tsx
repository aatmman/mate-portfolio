'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Navigation, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: 'auto',
    transition: {
      y: { type: 'spring', damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: 'spring',
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: '3rem',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring', damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 300, delay: 0.15 },
  },
};

export default function Navigation() {
  const [isExpanded, setExpanded] = useState(true);
  const [active, setActive] = useState('home');

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

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

  // Framer Motion scroll collapse/expand
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }
    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

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
      {/* Desktop — animated pill nav */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.1 } : {}}
          whileTap={!isExpanded ? { scale: 0.95 } : {}}
          onClick={handleNavClick}
          className={cn(
            'flex items-center overflow-hidden rounded-full border shadow-lg h-12',
            'border-[rgba(96,121,132,0.15)]',
            'bg-[rgba(255,253,248,0.88)] backdrop-blur-md',
            !isExpanded && 'cursor-pointer justify-center',
          )}
        >
          {/* Logo / Brand icon */}
          <motion.div
            variants={logoVariants}
            className="flex-shrink-0 flex items-center font-semibold pl-4 pr-2"
          >
            <Navigation
              className="h-5 w-5"
              style={{ color: 'var(--terracotta)' }}
            />
            <span
              className="ml-2 text-xs font-mono uppercase tracking-widest"
              style={{ color: 'var(--steel)' }}
            >
              Dr. D. M. Mate
            </span>
          </motion.div>

          {/* Separator */}
          <motion.div
            variants={itemVariants}
            className="h-5 w-px mx-1 flex-shrink-0"
            style={{ background: 'rgba(96,121,132,0.20)' }}
          />

          {/* Nav links */}
          <motion.div
            className={cn(
              'flex items-center gap-1 pr-3',
              !isExpanded && 'pointer-events-none',
            )}
          >
            {links.map((l) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                variants={itemVariants}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(l.id);
                }}
                className={cn(
                  'text-sm font-medium transition-colors px-3 py-1 rounded-full whitespace-nowrap',
                  active === l.id
                    ? 'text-white'
                    : 'text-[var(--graphite)] hover:text-[var(--terracotta)] hover:bg-[rgba(201,106,69,0.08)]',
                )}
                style={
                  active === l.id
                    ? { background: 'var(--terracotta)' }
                    : {}
                }
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Collapsed menu icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              variants={collapsedIconVariants}
              animate={isExpanded ? 'expanded' : 'collapsed'}
            >
              <Menu className="h-5 w-5" style={{ color: 'var(--steel)' }} />
            </motion.div>
          </div>
        </motion.nav>
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
