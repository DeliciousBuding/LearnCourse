import { useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../hooks/useToast';
import type { Quiz } from '../types';
import katex from 'katex';

interface QuizAnswers { [quizId: string]: number }

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

function fixText(s: string): string {
  return s.replace(/lpha/g, '\\alpha').replace(/eta/g, '\\beta');
}

function renderMath(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { throwOnError: false, strict: false }); }
    catch { return _; }
  });
}

export function QuizBlock({ quiz }: { quiz: Quiz }) {
  const { toast } = useToast();
  const [answers, setAnswers] = useLocalStorage<QuizAnswers>('ai-quiz-answers', {});
  const saved = answers[quiz.id];
  const done = saved !== undefined;
  const selectedIdx = done ? saved : null;
  const correctIdx = quiz.options.findIndex(o => o.isCorrect);
  const isCorrect = selectedIdx === correctIdx;

  const undoRef = useRef<{ timer: ReturnType<typeof setTimeout> | null; active: boolean }>({ timer: null, active: false });
  const [undoVisible, setUndoVisible] = useLocalStorage<Record<string, boolean>>('ai-quiz-undo', {});

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (undoRef.current.timer) clearTimeout(undoRef.current.timer);
    };
  }, []);

  const select = (idx: number) => {
    if (done && !undoVisible[quiz.id]) return;
    setAnswers(p => ({ ...p, [quiz.id]: idx }));
    setUndoVisible(p => ({ ...p, [quiz.id]: true }));
    const correct = idx === correctIdx;
    toast(correct ? 'success' : 'error', correct ? '答案已保存' : '答案错误');

    // Start 3s undo timer
    if (undoRef.current.timer) clearTimeout(undoRef.current.timer);
    undoRef.current.active = true;
    undoRef.current.timer = setTimeout(() => {
      setUndoVisible(p => ({ ...p, [quiz.id]: false }));
      undoRef.current.active = false;
    }, 3000);
  };

  const undo = () => {
    if (undoRef.current.timer) clearTimeout(undoRef.current.timer);
    undoRef.current.active = false;
    const next = { ...answers };
    delete next[quiz.id];
    setAnswers(next);
    setUndoVisible(p => ({ ...p, [quiz.id]: false }));
  };

  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 10, margin: '0.85rem 0', overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    }}>
      {/* Question */}
      <div style={{
        padding: '0.7rem 1.15rem', background: 'var(--color-code-bg)',
        fontWeight: 600, fontSize: '0.93rem', lineHeight: 1.6,
        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
      }}>
        <span style={{
          display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', background: done ? (isCorrect ? 'var(--color-success)' : 'var(--color-danger)') : 'var(--color-accent)',
          color: '#fff', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, transition: 'background .2s',
        }}>
          {done ? (isCorrect ? '✓' : '✗') : '?'}
        </span>
        <span dangerouslySetInnerHTML={{ __html: renderMath(fixText(quiz.question)) }} />
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0.7rem 1.15rem' }}>
        {quiz.options.map((opt, idx) => {
          let bg = 'var(--color-surface)';
          let border = '1px solid var(--color-border)';
          let color = 'var(--color-text)';
          if (done) {
            if (idx === correctIdx) { bg = 'var(--color-success-soft)'; border = '1px solid var(--color-success)'; color = 'var(--color-success)'; }
            else if (idx === selectedIdx) { bg = 'var(--color-danger-soft)'; border = '1px solid var(--color-danger)'; color = 'var(--color-danger)'; }
          }
          return (
            <button key={idx} onClick={() => select(idx)} disabled={done && !undoVisible[quiz.id]} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.6rem', width: '100%',
              padding: '0.55rem 0.85rem', borderRadius: 8, fontSize: '0.88rem', lineHeight: 1.5,
              textAlign: 'left', cursor: done ? 'default' : 'pointer',
              background: bg, border, color, transition: 'all 120ms ease',
            }}>
              <span style={{
                display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
                borderRadius: 6, border: `1.5px solid ${done && idx === correctIdx ? 'var(--color-success)' : 'var(--color-border)'}`,
                fontSize: '0.78rem', fontWeight: 600, flexShrink: 0,
                color: done && idx === correctIdx ? 'var(--color-success)' : 'var(--color-text-tertiary)',
                background: done && idx === correctIdx ? 'var(--color-success-soft)' : 'transparent',
              }}>
                {LABELS[idx]}
              </span>
              <span style={{ paddingTop: 1 }} dangerouslySetInnerHTML={{ __html: renderMath(fixText(opt.text)) }} />
            </button>
          );
        })}
      </div>

      {/* Undo */}
      {done && undoVisible[quiz.id] && (
        <div style={{ padding: '0 1.15rem 0.7rem' }}>
          <span onClick={undo} style={{
            color: 'var(--color-text-tertiary)', fontSize: '0.75rem',
            cursor: 'pointer', marginTop: 4, display: 'inline-block',
          }}>
            撤销 (3s)
          </span>
        </div>
      )}

      {/* Feedback */}
      {done && (
        <div style={{
          padding: '0.7rem 1.15rem', fontSize: '0.85rem', lineHeight: 1.65,
          borderTop: '1px solid var(--color-border)',
          background: isCorrect ? 'var(--color-success-soft)' : 'var(--color-danger-soft)',
          color: isCorrect ? 'var(--color-success)' : 'var(--color-danger)',
        }}>
          <strong>{isCorrect ? '✓ 正确' : '✗ 错误'}</strong>
          <span style={{ marginLeft: '0.5rem' }} dangerouslySetInnerHTML={{
            __html: renderMath(fixText(isCorrect ? quiz.feedbackCorrect : quiz.feedbackWrong)),
          }} />
        </div>
      )}
    </div>
  );
}
