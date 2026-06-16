import { Moon, Sun, MessageCircle, BookOpen } from 'lucide-react';

interface CourseEntryLike { slug: string; title: string; }

interface HeaderProps {
  effective: 'light' | 'dark';
  onThemeToggle: () => void;
  modulesStudied: number;
  checklistDone: number;
  totalModules: number;
  totalChecklist: number;
  onChatToggle?: () => void;
  title?: string;
  subtitle?: string;
  courses?: CourseEntryLike[];
  currentCourse?: string;
  onSwitchCourse?: (slug: string) => void;
}

export function Header({ effective, onThemeToggle, modulesStudied, checklistDone, totalModules, totalChecklist, onChatToggle, title, subtitle, courses, currentCourse, onSwitchCourse }: HeaderProps) {
  const hasMultiple = courses && courses.length > 1;
  return (
    <header id="app-header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <a href="?" style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Georgia, "Noto Serif SC", serif', color: 'var(--color-text)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {title || 'LearnCourse'}
          </a>
          {subtitle && <span style={{ fontSize: '0.7rem', padding: '0.15em 0.6em', borderRadius: '999px', background: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{subtitle}</span>}

          {hasMultiple && (
            <select
              value={currentCourse}
              onChange={e => onSwitchCourse?.(e.target.value)}
              style={{
                fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 6,
                border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', outline: 'none',
              }}
            >
              {courses!.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-accent)' }}>{modulesStudied}</strong>/{totalModules} 模块
            </span>
            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-success)' }}>{checklistDone}</strong>/{totalChecklist} 自检
            </span>
          </div>
          {onChatToggle && (
            <button onClick={onChatToggle} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }} title="AI 助手">
              <MessageCircle size={16} />
            </button>
          )}
          <button onClick={onThemeToggle} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '999px', border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }} title={effective === 'dark' ? '切换到浅色模式' : '切换到深色模式'}>
            {effective === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
