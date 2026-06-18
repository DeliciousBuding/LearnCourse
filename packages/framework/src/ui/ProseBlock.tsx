import { memo, useEffect, useMemo, useRef } from 'react';
import DOMPurify from 'dompurify';
import { fixLatex, renderKatexInHtml } from '../lib/math';

interface ProseBlockProps { html: string; }

const ALLOWED_TAGS = ['p', 'strong', 'em', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'br', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'blockquote', 'hr', 'sup', 'sub', 'details', 'summary'];
const ALLOWED_ATTR = ['href', 'target', 'rel', 'src', 'alt', 'class', 'style', 'id', 'data-page'];

function sanitize(html: string): string {
  html = html
    .replace(/border-left\s*:\s*[^;"]+/gi, 'border-left:none')
    .replace(/var\(--text-sm\)/g, '0.875rem')
    .replace(/var\(--text-xs\)/g, '0.75rem')
    .replace(/var\(--space-\d+\)/g, '0.5rem')
    .replace(/var\(--radius-\w+\)/g, '10px');
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}

function ProseBlock({ html }: ProseBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const processed = useMemo(() => renderKatexInHtml(fixLatex(sanitize(html))), [html]);

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

const MemoizedProseBlock = memo(ProseBlock);
export { MemoizedProseBlock as ProseBlock };
