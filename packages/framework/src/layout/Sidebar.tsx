import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { ChevronDown, BookOpen } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface NavLink { href: string; label: string; }
interface NavGroup { title: string; links: NavLink[]; }
interface CourseEntryLike { slug: string; title: string; }

interface SidebarProps {
  groups: NavGroup[];
  courses?: CourseEntryLike[];
  currentCourse?: string;
  onSwitchCourse?: (slug: string) => void;
}

const linkStyle = (active: boolean): React.CSSProperties => ({
  display: 'block', padding: '0.28rem 0.5rem', marginBottom: 1,
  borderRadius: 6, textDecoration: 'none', lineHeight: 1.45,
  transition: 'all 120ms ease', fontSize: '0.82rem',
  color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
  background: active ? 'var(--color-accent-soft)' : 'transparent',
  fontWeight: active ? 600 : 400,
});

function Sidebar({ groups, courses, currentCourse, onSwitchCourse }: SidebarProps) {
  const { t } = useI18n();
  const allIds = groups.flatMap(g => g.links.map(l => l.href.replace('#', '')));
  const activeId = useScrollSpy(allIds);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [coursesOpen, setCoursesOpen] = useState(false);
  // Track which groups are expanded. Start with first group expanded.
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(groups.length > 0 ? [groups[0].title] : []));
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build a map from section id → group title
  const idToGroup = useRef<Map<string, string>>(new Map());
  groups.forEach(g => g.links.forEach(l => idToGroup.current.set(l.href.replace('#', ''), g.title)));

  // Auto-expand group containing active section; collapse others after 800ms
  useEffect(() => {
    if (!activeId) return;
    const groupTitle = idToGroup.current.get(activeId);
    if (!groupTitle) return;

    if (collapseTimer.current) clearTimeout(collapseTimer.current);

    setExpanded(prev => {
      if (prev.has(groupTitle)) return prev; // already expanded
      const next = new Set(prev);
      next.add(groupTitle);
      return next;
    });

    // Collapse inactive groups after a delay
    collapseTimer.current = setTimeout(() => {
      setExpanded(prev => {
        const next = new Set<string>();
        next.add(groupTitle); // keep only the active group expanded
        return next;
      });
    }, 1200);
  }, [activeId]);

  // Scroll active link into view within sidebar
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [activeId]);

  const toggleGroup = useCallback((title: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });
  }, []);

  const hasMultiCourse = courses && courses.length > 1;

  return (
    <aside id="app-sidebar">
      <div style={{ padding: '1rem 0.75rem 0.25rem' }}>
        {/* Course switcher */}
        {hasMultiCourse && (
          <div>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, width: '100%',
                padding: '0.35rem 0.5rem', borderRadius: 6, border: '1px solid var(--color-border)',
                background: 'var(--color-surface)', color: 'var(--color-text-secondary)',
                fontSize: '0.78rem', cursor: 'pointer',
              }}
            >
              <BookOpen size={13} />
              <span style={{ flex: 1, textAlign: 'left' }}>{courses?.find(c => c.slug === currentCourse)?.title || t('sidebar.selectCourse')}</span>
              <ChevronDown size={12} style={{ transform: coursesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>
            {coursesOpen && (
              <div style={{ marginTop: 4, paddingLeft: '0.25rem' }}>
                {courses!.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => { onSwitchCourse?.(c.slug); setCoursesOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '0.22rem 0.5rem', borderRadius: 6, border: 'none',
                      background: c.slug === currentCourse ? 'var(--color-accent-soft)' : 'transparent',
                      color: c.slug === currentCourse ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      fontSize: '0.76rem', cursor: 'pointer', fontWeight: c.slug === currentCourse ? 600 : 400,
                    }}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <nav style={{ padding: '0 0.75rem 2rem' }}>
        {groups.map(group => {
          const isExpanded = expanded.has(group.title);
          const anyActiveInGroup = group.links.some(l => l.href.replace('#', '') === activeId);
          return (
            <div key={group.title}>
              <button
                onClick={() => toggleGroup(group.title)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  width: '100%', padding: '0.55rem 0.5rem 0.2rem',
                  border: 'none', background: 'none', cursor: 'pointer',
                  fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: anyActiveInGroup ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                  transition: 'color 150ms',
                }}
              >
                <ChevronDown
                  size={10}
                  style={{
                    transform: isExpanded ? 'none' : 'rotate(-90deg)',
                    transition: 'transform 180ms ease',
                    flexShrink: 0,
                  }}
                />
                {group.title}
              </button>
              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: isExpanded ? `${group.links.length * 32 + 8}px` : '0px',
                  opacity: isExpanded ? 1 : 0,
                  transition: 'max-height 250ms ease, opacity 200ms ease',
                  paddingLeft: '0.3rem',
                }}
              >
                {group.links.map(link => {
                  const id = link.href.replace('#', '');
                  const active = activeId === id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      ref={active ? activeRef : undefined}
                      onClick={e => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={linkStyle(active)}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.background = 'var(--color-code-bg)'; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

const MemoizedSidebar = memo(Sidebar);
export { MemoizedSidebar as Sidebar };
