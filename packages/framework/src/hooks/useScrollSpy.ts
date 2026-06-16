import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = sectionIds
      .map(id => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter((x): x is { id: string; el: HTMLElement } => x !== null);

    const handleScroll = () => {
      const scrollY = window.scrollY + offset;
      let active: string | null = null;

      for (const { id, el } of headings) {
        if (el.offsetTop <= scrollY) {
          active = id;
        }
      }

      if (active !== null) {
        setActiveId(prev => (prev !== active ? active : prev));
      }
    };

    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
