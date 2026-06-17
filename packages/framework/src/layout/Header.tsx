import { Moon, Sun, MessageCircle, Search } from 'lucide-react';
import { CourseSwitcher } from '../ui/CourseSwitcher';
import { useI18n } from '../hooks/useI18n';

interface CourseEntryLike { slug: string; title: string; }

interface HeaderProps {
  effective: 'light' | 'dark';
  onThemeToggle: () => void;
  modulesStudied: number;
  checklistDone: number;
  totalModules: number;
  totalChecklist: number;
  onChatToggle?: () => void;
  onSearchToggle?: () => void;
  title?: string;
  subtitle?: string;
  courses?: CourseEntryLike[];
  currentCourse?: string;
  onSwitchCourse?: (slug: string) => void;
}

export function Header({ effective, onThemeToggle, modulesStudied, checklistDone, totalModules, totalChecklist, onChatToggle, onSearchToggle, title, subtitle, courses, currentCourse, onSwitchCourse }: HeaderProps) {
  const { t } = useI18n();
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
            <CourseSwitcher courses={courses!} current={currentCourse!} onSwitch={onSwitchCourse!} />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-accent)' }}>{modulesStudied}</strong>/{totalModules} {t('header.modules')}
            </span>
            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-success)' }}>{checklistDone}</strong>/{totalChecklist} {t('header.checklist')}
            </span>
          </div>
          {onSearchToggle && (
            <button onClick={onSearchToggle} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }} title="搜索 (Ctrl+K)">
              <Search size={16} />
            </button>
          )}
          {onChatToggle && (
            <button onClick={onChatToggle} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }} title={t('header.aiChat')}>
              <MessageCircle size={16} />
            </button>
          )}
          <button onClick={onThemeToggle} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '999px', border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }} title={effective === 'dark' ? t('header.switchLight') : t('header.switchDark')}>
            {effective === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
