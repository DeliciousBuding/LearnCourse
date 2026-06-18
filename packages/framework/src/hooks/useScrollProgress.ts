import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.round((window.scrollY / scrollHeight) * 100)));
    };

    calc();
    window.addEventListener('scroll', calc, { passive: true });
    window.addEventListener('resize', calc);

    // Recalculate when lazy-loaded modules expand the page
    const obs = new ResizeObserver(calc);
    obs.observe(document.body);

    return () => {
      window.removeEventListener('scroll', calc);
      window.removeEventListener('resize', calc);
      obs.disconnect();
    };
  }, []);

  return progress;
}
