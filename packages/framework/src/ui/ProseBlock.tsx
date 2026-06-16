import { useEffect, useRef } from 'react';
import { fixLatex, renderKatexInHtml } from '../lib/math';

interface ProseBlockProps { html: string; }

function sanitize(html: string): string {
  return html
    .replace(/border-left\s*:\s*[^;"]+/gi, 'border-left:none')
    .replace(/var\(--text-sm\)/g, '0.875rem')
    .replace(/var\(--text-xs\)/g, '0.75rem')
    .replace(/var\(--space-\d+\)/g, '0.5rem')
    .replace(/var\(--radius-\w+\)/g, '10px');
}

export function ProseBlock({ html }: ProseBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const processed = renderKatexInHtml(fixLatex(sanitize(html)));

  // Wire up slide-ref click handlers only — no runtime KaTeX scan needed
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>('.slide-ref');
    const pairs: Array<[HTMLElement, () => void]> = [];
    els.forEach(el => {
      const page = parseInt(el.dataset.page || '1', 10);
      el.style.cssText = 'cursor:pointer;color:var(--color-accent);text-decoration:underline;text-underline-offset:2px;font-weight:500';
      const h = (e: Event) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-slide', { detail: { page } })); };
      el.addEventListener('click', h);
      pairs.push([el, h]);
    });
    return () => pairs.forEach(([el, h]) => el.removeEventListener('click', h));
  }, [processed]);

  // Memo: skip re-render if html unchanged
  if (!html) return null;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: processed }} />;
}
