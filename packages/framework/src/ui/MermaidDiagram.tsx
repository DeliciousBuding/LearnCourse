import { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid'; /* webpackChunkName: "mermaid" */

interface MermaidDiagramProps { id: string; chart: string; }

let initialized = false;

function currentTheme(): 'dark' | 'neutral' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'neutral';
}

function init() {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: currentTheme(),
    securityLevel: 'loose',
  });
}

function reinitialize() {
  initialized = false;
  init();
}

export function MermaidDiagram({ id, chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [themeKey, setThemeKey] = useState(0); // bump to force re-render
  const renderId = useId(); // unique per mount, survives StrictMode remount

  // Watch for dark mode class changes and re-render
  useEffect(() => {
    const observer = new MutationObserver(() => {
      reinitialize();
      setThemeKey(k => k + 1);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    init();
    let cancelled = false;
    const uniqueId = `m-${id.replace(/[^a-zA-Z0-9-]/g, '-')}-${renderId.slice(1, 8)}`;

    mermaid.render(uniqueId, chart).then(({ svg }) => {
      if (!cancelled) { setSvg(svg); setError(null); }
    }).catch(err => {
      if (!cancelled) { setError(err instanceof Error ? err.message : 'Render error'); setSvg(''); }
    });

    return () => { cancelled = true; };
  }, [id, chart, renderId, themeKey]);

  if (error) {
    return (
      <div style={{ margin: '0.85rem 0', padding: '1rem', border: '1px solid var(--color-danger)', borderRadius: 10, fontSize: '0.85rem', color: 'var(--color-danger)', background: 'var(--color-danger-soft)' }}>
        Mermaid 渲染失败: {error}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ margin: '0.85rem 0', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}
      dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
