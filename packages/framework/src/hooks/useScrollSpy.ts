import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>('');
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;
  const rafRef = useRef<number>(0);

  const calc = useCallback(() => {
    const scrollY = window.scrollY + offset;
    const headings = idsRef.current
      .map(id => { const el = document.getElementById(id); return el ? { id, top: el.offsetTop } : null; })
      .filter((x): x is { id: string; top: number } => x !== null)
      .sort((a, b) => a.top - b.top);

    let active: string | null = null;
    for (const { id, top } of headings) {
      if (top <= scrollY) active = id;
    }
    if (active !== null) {
      setActiveId(prev => (prev !== active ? active : prev));
    }
  }, [offset]);

  useEffect(() => {
    const throttled = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        calc();
      });
    };

    calc(); // initial sync call — needed for first paint
    window.addEventListener('scroll', throttled, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttled);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calc]);

  return activeId;
}
