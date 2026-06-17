import { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

interface CourseSwitcherProps {
  courses: { slug: string; title: string }[];
  current: string;
  onSwitch: (slug: string) => void;
}

export function CourseSwitcher({ courses, current, onSwitch }: CourseSwitcherProps) {
  const [open, setOpen] = useState(false);
  if (courses.length <= 1) return null;

  const currentTitle = courses.find(c => c.slug === current)?.title || current;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '0.25rem 0.6rem', borderRadius: 8,
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontSize: '0.8rem', fontWeight: 500,
          cursor: 'pointer', outline: 'none',
        }}
      >
        <BookOpen size={13} style={{ color: 'var(--color-accent)', opacity: 0.7 }} />
        <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentTitle}
        </span>
        <ChevronDown size={12} style={{
          color: 'var(--color-text-tertiary)',
          transition: 'transform .2s',
          transform: open ? 'rotate(180deg)' : 'none',
        }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          minWidth: 160, background: 'var(--color-surface)',
          border: '1px solid var(--color-border)', borderRadius: 10,
          boxShadow: 'var(--shadow-lg)', zIndex: 50, overflow: 'hidden',
          animation: 'fadeIn 120ms ease',
        }}>
          {courses.map(c => (
            <button
              key={c.slug}
              onClick={() => { onSwitch(c.slug); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.45rem 0.8rem', border: 'none',
                background: c.slug === current ? 'var(--color-accent-soft)' : 'transparent',
                color: c.slug === current ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                fontSize: '0.8rem', cursor: 'pointer',
                fontWeight: c.slug === current ? 600 : 400,
              }}
              onMouseEnter={e => { if (c.slug !== current) e.currentTarget.style.background = 'var(--color-code-bg)'; }}
              onMouseLeave={e => { if (c.slug !== current) e.currentTarget.style.background = 'transparent'; }}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
