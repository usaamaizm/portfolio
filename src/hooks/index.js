import { useState, useEffect, useRef } from 'react';

// Intersection Observer hook for animations
export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// Scroll hook with throttling
export function useScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 50);
          setScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, scrollY };
}