import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, CornerDownLeft, ChevronRight } from 'lucide-react';

interface SearchResult {
  moduleId: string;
  moduleTitle: string;
  sectionId: string;
  sectionTitle: string;
  context: string;
  matchStart: number;
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/** Build a search index by walking the rendered DOM */
function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];
  const sections = document.querySelectorAll<HTMLElement>('section[id^="s"]');

  for (const section of sections) {
    // Skip non-module sections like s-checklist
    const sectionId = section.id;
    if (sectionId === 's-checklist') continue;

    const h2 = section.querySelector('h2');
    const moduleTitle = h2?.childNodes[0]?.textContent?.trim() || sectionId;
    const subs = section.querySelectorAll<HTMLElement>('[id^="s"][id*="-s"]');

    for (const sub of subs) {
      const h3 = sub.querySelector('h3');
      const sectionTitle = h3?.textContent?.trim() || '';
      // Get all prose text within this subsection
      let fullText = '';
      const proseElements = sub.querySelectorAll('p, li, td, th, blockquote, details');
      for (const el of proseElements) {
        fullText += el.textContent + ' ';
      }
      // Also include h3 title for matching
      fullText = sectionTitle + ' ' + fullText;

      // Create a search result for each chunk of text, with position tracking
      results.push({
        moduleId: sectionId,
        moduleTitle,
        sectionId: sub.id,
        sectionTitle,
        context: fullText.trim().slice(0, 2000),
        matchStart: 0,
      });
    }
  }

  return results;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Build search index on open
  const index = useMemo(() => {
    if (!open) return [];
    // Small delay to allow DOM to render
    return buildIndex();
  }, [open]);

  // Filter results by query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matched: SearchResult[] = [];

    for (const entry of index) {
      const lower = entry.context.toLowerCase();
      const idx = lower.indexOf(q);
      if (idx !== -1) {
        // Create a result with context window around match
        const contextStart = Math.max(0, idx - 50);
        const contextEnd = Math.min(entry.context.length, idx + q.length + 50);
        let ctx = entry.context.slice(contextStart, contextEnd);
        if (contextStart > 0) ctx = '...' + ctx;
        if (contextEnd < entry.context.length) ctx = ctx + '...';

        matched.push({
          ...entry,
          context: ctx,
          matchStart: idx - contextStart + (contextStart > 0 ? 3 : 0),
        });
      }
    }

    return matched;
  }, [index, query]);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setClosing(false);
      // Auto-focus input after animation frame
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keyboard navigation and escape
  useEffect(() => {
    if (!open || closing) return;

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            navigateToResult(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          doClose();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, closing, results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    const el = itemRefs.current[selectedIndex];
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const doClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const navigateToResult = useCallback((result: SearchResult) => {
    doClose();
    // Slightly delay scroll to allow dialog close animation
    setTimeout(() => {
      const el = document.getElementById(result.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Flash highlight
        el.style.transition = 'box-shadow .3s';
        el.style.boxShadow = '0 0 0 3px var(--color-accent)';
        el.style.borderRadius = '8px';
        setTimeout(() => {
          el.style.boxShadow = '';
          el.style.borderRadius = '';
        }, 2000);
      }
    }, 220);
  }, [doClose]);

  if (!open && !closing) return null;

  // Group results by module
  const grouped = useMemo(() => {
    const map = new Map<string, { moduleId: string; moduleTitle: string; items: SearchResult[] }>();
    for (const r of results) {
      const key = r.moduleId;
      if (!map.has(key)) {
        map.set(key, { moduleId: r.moduleId, moduleTitle: r.moduleTitle, items: [] });
      }
      map.get(key)!.items.push(r);
    }
    return Array.from(map.values());
  }, [results]);

  // Flatten for keyboard index
  const flatIndex = useMemo(() => results, [results]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        background: closing ? 'transparent' : 'rgba(0,0,0,0.35)',
        transition: 'background 200ms ease',
      }}
      onClick={doClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 560,
          maxHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-surface)',
          borderRadius: 12,
          border: '1px solid var(--color-border)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
          opacity: closing ? 0 : 1,
          transform: closing ? 'translateY(-8px) scale(0.98)' : 'translateY(0) scale(1)',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}>
          <Search size={16} style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="输入关键词搜索课程内容"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text)',
              fontSize: '0.9rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setSelectedIndex(0); inputRef.current?.focus(); }}
              style={iconBtnStyle}
              title="清空"
            >
              <X size={14} />
            </button>
          )}
          <button onClick={doClose} style={iconBtnStyle} title="关闭 (Esc)">
            <CornerDownLeft size={14} />
          </button>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem 0',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-border) transparent',
          }}
        >
          {!query.trim() ? (
            <div style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              color: 'var(--color-text-tertiary)',
              fontSize: '0.85rem',
            }}>
              输入关键词搜索课程内容
            </div>
          ) : results.length === 0 ? (
            <div style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              color: 'var(--color-text-tertiary)',
              fontSize: '0.85rem',
            }}>
              未找到匹配的内容
            </div>
          ) : (
            grouped.map(group => {
              const groupStartIdx = flatIndex.findIndex(r => r.moduleId === group.moduleId);
              return (
                <div key={group.moduleId}>
                  {/* Module group header */}
                  <div style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-accent)',
                  }}>
                    {group.moduleTitle}
                  </div>
                  {group.items.map(item => {
                    const flatIdx = flatIndex.indexOf(item);
                    const isSelected = flatIdx === selectedIndex;
                    return (
                      <a
                        key={`${item.moduleId}-${item.sectionId}`}
                        ref={el => { itemRefs.current[flatIdx] = el; }}
                        href={`#${item.sectionId}`}
                        onClick={e => {
                          e.preventDefault();
                          navigateToResult(item);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          padding: '0.55rem 1rem',
                          textDecoration: 'none',
                          color: 'var(--color-text)',
                          background: isSelected ? 'var(--color-accent-soft)' : 'transparent',
                          borderLeft: isSelected ? '3px solid var(--color-accent)' : '3px solid transparent',
                          transition: 'background 80ms ease, border-color 80ms ease',
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) {
                            e.currentTarget.style.background = 'var(--color-surface-hover)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <ChevronRight size={14} style={{
                          color: 'var(--color-text-tertiary)',
                          flexShrink: 0,
                          marginTop: 2,
                        }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            marginBottom: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            {item.sectionTitle}
                          </div>
                          <HighlightMatch text={item.context} matchStart={item.matchStart} matchLength={query.length} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer with keyboard hints */}
        {results.length > 0 && (
          <div style={{
            display: 'flex',
            gap: 12,
            padding: '0.5rem 1rem',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.68rem',
            color: 'var(--color-text-tertiary)',
            flexShrink: 0,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <kbd style={kbdStyle}>↑↓</kbd> 导航
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <kbd style={kbdStyle}>Enter</kbd> 跳转
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <kbd style={kbdStyle}>Esc</kbd> 关闭
            </span>
            <span style={{ marginLeft: 'auto' }}>
              {results.length} 条结果
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Renders text with the matched portion highlighted */
function HighlightMatch({ text, matchStart, matchLength }: { text: string; matchStart: number; matchLength: number }) {
  if (matchLength <= 0) {
    return (
      <div style={{
        fontSize: '0.72rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.45,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>
        {text}
      </div>
    );
  }

  const before = text.slice(0, matchStart);
  const match = text.slice(matchStart, matchStart + matchLength);
  const after = text.slice(matchStart + matchLength);

  return (
    <div style={{
      fontSize: '0.72rem',
      color: 'var(--color-text-secondary)',
      lineHeight: 1.45,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    }}>
      {before}
      <mark style={{
        background: 'var(--color-accent-soft)',
        color: 'var(--color-accent)',
        borderRadius: 2,
        padding: '0 1px',
        fontWeight: 600,
      }}>
        {match}
      </mark>
      {after}
    </div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  border: 'none',
  background: 'var(--color-code-bg)',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  flexShrink: 0,
};

const kbdStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 20,
  padding: '0 4px',
  height: 18,
  borderRadius: 4,
  border: '1px solid var(--color-border)',
  background: 'var(--color-code-bg)',
  fontSize: '0.65rem',
  fontFamily: 'inherit',
  lineHeight: 1,
};
