import { useEffect, useRef } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface NavLink { href: string; label: string; }
interface NavGroup { title: string; links: NavLink[]; }

export function Sidebar({ groups }: { groups: NavGroup[] }) {
  const allIds = groups.flatMap(g => g.links.map(l => l.href.replace('#', '')));
  const activeId = useScrollSpy(allIds);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [activeId]);

  return (
    <aside id="app-sidebar">
      <div style={{ padding: '1.5rem 1rem 1rem' }}>
        <a href="#" style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Georgia, "Noto Serif SC", serif', color: 'var(--color-text)', textDecoration: 'none', lineHeight: 1.3 }}>
          人工智能导论<br />期末复习大纲
        </a>
        <span style={{ display: 'inline-block', fontSize: '0.7rem', marginTop: '0.4rem', padding: '0.15em 0.6em', borderRadius: '999px', background: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 600 }}>
          2026 春 · 闭卷 120min
        </span>
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
                  style={{
                    display: 'block', padding: '0.35rem 0.5rem', marginBottom: 1,
                    borderRadius: 8, textDecoration: 'none', lineHeight: 1.5,
                    transition: 'all 120ms ease',
                    color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    background: active ? 'var(--color-accent-soft)' : 'transparent',
                    fontWeight: active ? 600 : 400,
                  }}
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
