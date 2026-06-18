import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>('');
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset;

      // Build heading list sorted by actual DOM position (top→bottom)
      const headings = idsRef.current
        .map(id => {
          const el = document.getElementById(id);
          return el ? { id, el, top: el.offsetTop } : null;
        })
        .filter((x): x is { id: string; el: HTMLElement; top: number } => x !== null)
        .sort((a, b) => a.top - b.top);

      // Find the last heading that's above or at the scroll position
      let active: string | null = null;
      for (const { id, top } of headings) {
        if (top <= scrollY) active = id;
      }

      if (active !== null) {
        setActiveId(prev => (prev !== active ? active : prev));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]); // sectionIds changes handled via ref — no effect re-run needed

  return activeId;
}
