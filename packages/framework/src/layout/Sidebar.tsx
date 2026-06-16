import { useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { ChevronDown, Home, BookOpen } from 'lucide-react';

interface NavLink { href: string; label: string; }
interface NavGroup { title: string; links: NavLink[]; }
interface CourseEntryLike { slug: string; title: string; }

interface SidebarProps {
  groups: NavGroup[];
  courses?: CourseEntryLike[];
  currentCourse?: string;
  onSwitchCourse?: (slug: string) => void;
}

export function Sidebar({ groups, courses, currentCourse, onSwitchCourse }: SidebarProps) {
  const allIds = groups.flatMap(g => g.links.map(l => l.href.replace('#', '')));
  const activeId = useScrollSpy(allIds);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [coursesOpen, setCoursesOpen] = useState(false);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [activeId]);

  const hasMultiCourse = courses && courses.length > 1;

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: 'block', padding: '0.35rem 0.5rem', marginBottom: 1,
    borderRadius: 8, textDecoration: 'none', lineHeight: 1.5,
    transition: 'all 120ms ease', fontSize: '0.85rem',
    color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
    background: active ? 'var(--color-accent-soft)' : 'transparent',
    fontWeight: active ? 600 : 400,
  });

  return (
    <aside id="app-sidebar">
      <div style={{ padding: '1.5rem 1rem 0.5rem' }}>
        <a href="?" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textDecoration: 'none', marginBottom: '0.75rem' }}>
          <Home size={14} /> 返回首页
        </a>
        <a href="#" style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Georgia, "Noto Serif SC", serif', color: 'var(--color-text)', textDecoration: 'none', lineHeight: 1.3 }}>
          LearnCourse
        </a>

        {/* Course switcher */}
        {hasMultiCourse && (
          <div style={{ marginTop: '0.6rem' }}>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, width: '100%',
                padding: '0.3rem 0.5rem', borderRadius: 6, border: '1px solid var(--color-border)',
                background: 'var(--color-surface)', color: 'var(--color-text-secondary)',
                fontSize: '0.78rem', cursor: 'pointer',
              }}
            >
              <BookOpen size={13} />
              <span style={{ flex: 1, textAlign: 'left' }}>{courses?.find(c => c.slug === currentCourse)?.title || '选择课程'}</span>
              <ChevronDown size={12} style={{ transform: coursesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>
            {coursesOpen && (
              <div style={{ marginTop: 4, paddingLeft: '0.5rem' }}>
                {courses!.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => { onSwitchCourse?.(c.slug); setCoursesOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '0.25rem 0.5rem', borderRadius: 6, border: 'none',
                      background: c.slug === currentCourse ? 'var(--color-accent-soft)' : 'transparent',
                      color: c.slug === currentCourse ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      fontSize: '0.78rem', cursor: 'pointer', fontWeight: c.slug === currentCourse ? 600 : 400,
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

      <nav style={{ padding: '0 1rem 2rem', fontSize: '0.85rem' }}>
        {groups.map(group => (
          <div key={group.title}>
            <div style={{
              fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.07em', color: 'var(--color-text-tertiary)',
              padding: '1.1rem 0.5rem 0.3rem',
            }}>
              {group.title}
            </div>
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
        ))}
      </nav>
    </aside>
  );
}
