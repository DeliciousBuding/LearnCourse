import { useEffect } from 'react';

/** Listens for text selection in the main content area and shows a floating "引用" button */
export function useTextSelectionQuote() {
  useEffect(() => {
    let btn: HTMLButtonElement | null = null;

    const onMouseUp = () => {
      btn?.remove();
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 5) return;

      const range = sel!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect || rect.width === 0) return;

      btn = document.createElement('button');
      btn.textContent = '引用';
      btn.style.cssText = `
        position:fixed;z-index:99;padding:4px 10px;border-radius:6px;border:none;
        background:var(--color-accent);color:#fff;font-size:12px;font-weight:600;
        cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.15);
        top:${rect.bottom + 6}px;left:${rect.left + rect.width / 2}px;
        transform:translateX(-50%);
      `;
      btn.onclick = (e) => {
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('lc-quote-text', { detail: { text } }));
        btn?.remove();
        sel?.removeAllRanges();
      };
      document.body.appendChild(btn);

      // Auto-remove after 3s
      setTimeout(() => btn?.remove(), 3000);
      // Remove on next click elsewhere
      const cleanup = () => { btn?.remove(); document.removeEventListener('click', cleanup); };
      setTimeout(() => document.addEventListener('click', cleanup), 10);
    };

    document.addEventListener('mouseup', onMouseUp);
    return () => document.removeEventListener('mouseup', onMouseUp);
  }, []);
}
