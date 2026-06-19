import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const calc = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) { setProgress(0); return; }
    setProgress(prev => {
      const next = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
      return prev !== next ? next : prev;
    });
  }, []);

  useEffect(() => {
    calc(); // initial sync

    const throttled = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => { rafRef.current = 0; calc(); });
    };

    window.addEventListener('scroll', throttled, { passive: true });
    window.addEventListener('resize', throttled);
    const obs = new ResizeObserver(throttled);
    obs.observe(document.body);

    return () => {
      window.removeEventListener('scroll', throttled);
      window.removeEventListener('resize', throttled);
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calc]);

  return progress;
}
