import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useI18n } from '../hooks/useI18n';
import type { ChecklistItem } from '../types';

interface ChecklistProps { items: ChecklistItem[]; onCountChange?: (count: number) => void; }

export function Checklist({ items, onCountChange }: ChecklistProps) {
  const { t } = useI18n();
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>('ai-checklist', {});
  const doneCount = Object.values(checked).filter(Boolean).length;

  useEffect(() => { onCountChange?.(doneCount); }, [doneCount, onCountChange]);

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div role="group" aria-label="考前自检清单">
      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.6rem' }}>
        {t('checklist.done')}<strong style={{ color: 'var(--color-accent)' }}>{doneCount}</strong> / {items.length}
      </div>
      {items.map(item => {
        const isDone = !!checked[item.id];
        return (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            role="checkbox"
            aria-checked={isDone}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
              padding: '0.6rem 1rem', marginBottom: '0.35rem',
              background: 'var(--color-surface)',
              border: isDone ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
              borderRadius: 10, cursor: 'pointer', textAlign: 'left',
              transition: 'all 120ms ease', fontSize: '0.9rem', color: 'var(--color-text)',
            }}
          >
            <span style={{
              width: 20, height: 20, flexShrink: 0,
              border: `2px solid ${isDone ? 'var(--color-success)' : 'var(--color-border)'}`,
              borderRadius: 5, background: isDone ? 'var(--color-success)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {isDone && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
            </span>
            <span style={{ color: isDone ? 'var(--color-text-secondary)' : 'var(--color-text)' }}>
              {item.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
