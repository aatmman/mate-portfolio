'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  direction?: 'up' | 'left' | 'scale';
  style?: React.CSSProperties;
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
