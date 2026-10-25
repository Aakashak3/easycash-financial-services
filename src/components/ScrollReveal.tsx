import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;       // in milliseconds (stagger offset)
  duration?: number;    // in milliseconds (500–800ms, default: 600)
  distance?: number;    // in pixels to translate (default: 24)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; // default: 'up'
  className?: string;
  as?: React.ElementType;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 600,
  distance = 24,
  direction = 'up',
  className = '',
  as: Component = 'div',
  threshold = 0.08
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    // If reduced motion is requested or IntersectionObserver is unsupported, reveal immediately
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setHasRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Fast check: If element is already in the viewport upon mount, reveal it promptly
    const rect = node.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight - 40 && rect.bottom >= 0) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'none':
      default:
        return 'none';
    }
  };

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: hasRevealed ? 'auto' : 'opacity, transform',
    opacity: hasRevealed ? 1 : 0,
    transform: hasRevealed ? 'none' : getInitialTransform()
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </Component>
  );
};
