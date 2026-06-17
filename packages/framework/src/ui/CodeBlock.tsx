import { useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import plaintext from 'highlight.js/lib/languages/plaintext';
import asm from 'highlight.js/lib/languages/x86asm';

hljs.registerLanguage('c', c);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('text', plaintext);
hljs.registerLanguage('asm', asm);
hljs.registerLanguage('x86asm', asm);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);

interface CodeBlockProps { language?: string; code: string; }

export function CodeBlock({ language, code }: CodeBlockProps) {
  const html = useMemo(() => {
    const lang = language && hljs.getLanguage(language) ? language : 'plaintext';
    try {
      const result = hljs.highlight(code, { language: lang });
      return result.value;
    } catch {
      return hljs.highlight(code, { language: 'plaintext' }).value;
    }
  }, [code, language]);

  return (
    <pre style={{
      background: 'var(--color-code-bg)',
      color: 'var(--color-code-text)',
      padding: '1rem 1.15rem',
      borderRadius: 10,
      overflowX: 'auto',
      fontSize: '0.85rem',
      lineHeight: 1.65,
      margin: '0.85rem 0',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    }}>
      {language && (
        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {language}
        </div>
      )}
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
