/** Shared math utilities for the review framework */

import katex from 'katex';

/**
 * Common LaTeX commands that may lose their backslash during serialization.
 * Sorted longest-first so partial matches don't interfere (e.g. 'rightarrow' before 'right').
 */
const LATEX_COMMANDS = [
  'rightarrow', 'leftarrow', 'Rightarrow', 'Leftarrow', 'leftrightarrow',
  'varepsilon', 'vartheta', 'varrho', 'varsigma', 'varphi',
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
  'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma',
  'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
  'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega',
  'infty', 'forall', 'exists', 'partial', 'nabla', 'emptyset',
  'approx', 'equiv', 'propto', 'sim', 'simeq', 'cong',
  'lfloor', 'rfloor', 'lceil', 'rceil',
  'exp', 'log', 'ln', 'sum', 'int', 'prod', 'sqrt', 'frac',
  'cdot', 'times', 'pm', 'mp', 'div', 'ast', 'star', 'circ', 'bullet',
  'le', 'ge', 'll', 'gg', 'neq', 'subset', 'supset', 'subseteq', 'supseteq',
  'mid', 'parallel', 'perp', 'angle', 'triangle',
];

/**
 * Fix corrupted LaTeX escape sequences.
 * Only applies when the command name appears WITHOUT a preceding backslash.
 * Already-correct sequences (e.g. "\\alpha") are left untouched.
 */
export function fixLatex(text: string): string {
  if (!text) return '';
  for (const cmd of LATEX_COMMANDS) {
    // Match 'cmd' NOT preceded by backslash (negative lookbehind)
    const re = new RegExp(`(?<!\\\\)${cmd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    text = text.replace(re, `\\\\${cmd}`);
  }
  return text;
}

/** Render $...$ inline math in a plain text string to KaTeX HTML */
export function renderInlineMath(text: string): string {
  if (!text) return '';
  return text.replace(/\$([^$]+)\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { throwOnError: false, strict: false }); }
    catch { return _ as string; }
  });
}

/** Render $$...$$ and $...$ in an HTML string to KaTeX markup */
export function renderKatexInHtml(html: string): string {
  if (!html) return '';
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
