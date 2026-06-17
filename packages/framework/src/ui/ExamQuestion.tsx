import { useState } from 'react';
import type { ExamQuestion } from '../types';
import { ProseBlock } from './ProseBlock';
import { ChevronRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export function ExamQuestion({ question }: { question: ExamQuestion }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div id={question.id} style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 10, margin: '0.85rem 0', overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)', scrollMarginTop: 80,
    }}>
      {/* Header */}
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%',
        padding: '0.6rem 1.15rem', background: 'var(--color-code-bg)',
        border: 'none', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left',
      }}>
        <ChevronRight size={16} style={{
          color: 'var(--color-accent)', flexShrink: 0,
          transition: 'transform .2s', transform: open ? 'rotate(90deg)' : 'rotate(0)',
        }} />
        <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{question.year}</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {question.position}{question.points > 0 ? ` · ${question.points} 分` : ''}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
          {open ? t('exam.hideAnswer') : t('exam.showAnswer')}
        </span>
      </button>

      {/* Question body — always visible */}
      <div style={{ padding: '0.8rem 1.15rem' }}>
        <ProseBlock html={question.questionText} />
      </div>

      {/* Answer — collapsible */}
      {open && (
        <div style={{
          padding: '0.8rem 1.15rem', borderTop: '1px solid var(--color-border)',
          background: 'var(--color-code-bg)', fontSize: '0.93rem',
        }}>
          <ProseBlock html={question.answerHtml} />
        </div>
      )}
    </div>
  );
}
