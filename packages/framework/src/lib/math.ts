/** Shared math utilities for the review framework */

import katex from 'katex';

/**
 * Fix corrupted LaTeX escape sequences from JSON serialization.
 * Uses negative lookbehind to avoid double-escaping already-correct
 * sequences (e.g. "\alpha" must NOT become "\\alpha").
 * These only fix pre-corrupted data — they are a safety net, not a
 * general-purpose LaTeX corrector.
 */
export function fixLatex(text: string): string {
  return text
    .replace(/(?<!\\a)lpha/g, '\\alpha')
    .replace(/(?<!\\\\b)eta/g, '\\\\beta');
}

/** Render $...$ inline math in a plain text string to KaTeX HTML */
export function renderInlineMath(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { throwOnError: false, strict: false }); }
    catch { return _ as string; }
  });
}

/** Render $$...$$ and $...$ in an HTML string to KaTeX markup */
export function renderKatexInHtml(html: string): string {
  let r = html.replace(/\$\$([^$]+)\$\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { displayMode: true, throwOnError: false, strict: false }); }
    catch { return _ as string; }
  });
  r = r.replace(/\$([^$]+)\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { displayMode: false, throwOnError: false, strict: false }); }
    catch { return _ as string; }
  });
  return r;
}
