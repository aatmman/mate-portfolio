'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  direction?: 'up' | 'left' | 'scale';
  style?: React.CSSProperties;
}

// Single shared observer instance to prevent spawning dozens of observer instances
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sharedObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }
  return sharedObserver;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getSharedObserver();
    if (!observer) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  const dirClass =
    direction === 'left' ? 'reveal-left' :
    direction === 'scale' ? 'reveal-scale' :
    'reveal';

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <div ref={ref} className={`${dirClass} ${delayClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
