import { useRef, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../hooks/useToast';
import { useI18n } from '../hooks/useI18n';
import type { Quiz, QuizType } from '../types';
import katex from 'katex';
import { fixLatex } from '../lib/math';

interface QuizAnswers { [quizId: string]: number }

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

function renderMath(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { throwOnError: false, strict: false }); }
    catch { return _; }
  });
}

export function QuizBlock({ quiz }: { quiz: Quiz }) {
  const { t } = useI18n();
  const { toast } = useToast();
  const quizType: QuizType = quiz.type || 'single';

  // ── single state ──
  const [answers, setAnswers] = useLocalStorage<QuizAnswers>('ai-quiz-answers', {});
  // ── multiple state ──
  const [multiAnswers, setMultiAnswers] = useLocalStorage<Record<string, number[]>>('ai-quiz-multi-answers', {});
  // ── trueFalse state ──
  const [tfAnswers, setTfAnswers] = useLocalStorage<Record<string, boolean>>('ai-quiz-tf-answers', {});
  // ── fillBlank state ──
  const [blankAnswers, setBlankAnswers] = useLocalStorage<Record<string, string>>('ai-quiz-blank-answers', {});
  // ── fillBlank draft ──
  const [blankDraft, setBlankDraft] = useState('');

  const undoRef = useRef<{ timer: ReturnType<typeof setTimeout> | null }>({ timer: null });
  const [undoVisible, setUndoVisible] = useLocalStorage<Record<string, boolean>>('ai-quiz-undo', {});

  useEffect(() => {
    return () => {
      if (undoRef.current.timer) clearTimeout(undoRef.current.timer);
    };
  }, []);

  // ── Determine done / correct ──
  const isDone = (): boolean => {
    switch (quizType) {
      case 'single': return answers[quiz.id] !== undefined;
      case 'multiple': return multiAnswers[quiz.id] !== undefined;
      case 'trueFalse': return tfAnswers[quiz.id] !== undefined;
      case 'fillBlank': return blankAnswers[quiz.id] !== undefined;
    }
  };

  const checkCorrect = (): boolean => {
    switch (quizType) {
      case 'single': {
        const idx = answers[quiz.id];
        if (idx === undefined) return false;
        return idx === quiz.options.findIndex(o => o.isCorrect);
      }
      case 'multiple': {
        const sel = multiAnswers[quiz.id];
        if (!sel || sel.length === 0) return false;
        const correct = quiz.correctAnswers || [];
        const sorted = [...sel].sort((a, b) => a - b);
        const sortedCorrect = [...correct].sort((a, b) => a - b);
        return sorted.length === sortedCorrect.length && sorted.every((v, i) => v === sortedCorrect[i]);
      }
      case 'trueFalse': {
        const v = tfAnswers[quiz.id];
        if (v === undefined) return false;
        return v === (quiz.correctBool ?? false);
      }
      case 'fillBlank': {
        const v = blankAnswers[quiz.id];
        if (v === undefined) return false;
        return v.trim().toLowerCase() === (quiz.blankAnswer || '').trim().toLowerCase();
      }
    }
  };

  const done = isDone();
  const isCorrect = checkCorrect();

  const commit = (correct: boolean) => {
    setUndoVisible(p => ({ ...p, [quiz.id]: true }));
    toast(correct ? 'success' : 'error', correct ? t('quiz.saved') : t('quiz.incorrect'));
    if (undoRef.current.timer) clearTimeout(undoRef.current.timer);
    undoRef.current.timer = setTimeout(() => {
      setUndoVisible(p => ({ ...p, [quiz.id]: false }));
    }, 3000);
  };

  const undo = () => {
    if (undoRef.current.timer) clearTimeout(undoRef.current.timer);
    switch (quizType) {
      case 'single': {
        const next = { ...answers };
        delete next[quiz.id];
        setAnswers(next);
        break;
      }
      case 'multiple': {
        const next = { ...multiAnswers };
        delete next[quiz.id];
        setMultiAnswers(next);
        break;
      }
      case 'trueFalse': {
        const next = { ...tfAnswers };
        delete next[quiz.id];
        setTfAnswers(next);
        break;
      }
      case 'fillBlank': {
        const next = { ...blankAnswers };
        delete next[quiz.id];
        setBlankAnswers(next);
        setBlankDraft('');
        break;
      }
    }
    setUndoVisible(p => ({ ...p, [quiz.id]: false }));
  };

  // ── Handlers ──

  const selectSingle = (idx: number) => {
    if (done && !undoVisible[quiz.id]) return;
    setAnswers(p => ({ ...p, [quiz.id]: idx }));
    commit(idx === quiz.options.findIndex(o => o.isCorrect));
  };

  const toggleMultiple = (idx: number) => {
    if (done && !undoVisible[quiz.id]) return;
    const current = multiAnswers[quiz.id] || [];
    const next = current.includes(idx) ? current.filter(i => i !== idx) : [...current, idx];
    setMultiAnswers(p => ({ ...p, [quiz.id]: next }));
  };

  const submitMultiple = () => {
    if (done && !undoVisible[quiz.id]) return;
    const sel = multiAnswers[quiz.id] || [];
    if (sel.length === 0) return;
    const correct = quiz.correctAnswers || [];
    const sorted = [...sel].sort((a, b) => a - b);
    const sortedCorrect = [...correct].sort((a, b) => a - b);
    commit(sorted.length === sortedCorrect.length && sorted.every((v, i) => v === sortedCorrect[i]));
  };

  const selectTrueFalse = (value: boolean) => {
    if (done && !undoVisible[quiz.id]) return;
    setTfAnswers(p => ({ ...p, [quiz.id]: value }));
    commit(value === (quiz.correctBool ?? false));
  };

  const submitBlank = () => {
    if (done && !undoVisible[quiz.id]) return;
    const v = blankDraft.trim();
    if (!v) return;
    setBlankAnswers(p => ({ ...p, [quiz.id]: v }));
    commit(v.toLowerCase() === (quiz.blankAnswer || '').trim().toLowerCase());
  };

  // ── Render helpers ──

  const renderStatusIcon = () => (
    <span style={{
      display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%', background: done ? (isCorrect ? 'var(--color-success)' : 'var(--color-danger)') : 'var(--color-accent)',
      color: '#fff', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, transition: 'background .2s',
    }}>
      {done ? (isCorrect ? '✓' : '✗') : '?'}
    </span>
  );

  const renderOptions = () => {
    switch (quizType) {
      case 'single': {
        const correctIdx = quiz.options.findIndex(o => o.isCorrect);
        return quiz.options.map((opt, idx) => {
          let bg = 'var(--color-surface)';
          let border = '1px solid var(--color-border)';
          let color = 'var(--color-text)';
          if (done) {
            if (idx === correctIdx) { bg = 'var(--color-success-soft)'; border = '1px solid var(--color-success)'; color = 'var(--color-success)'; }
            else if (idx === answers[quiz.id]) { bg = 'var(--color-danger-soft)'; border = '1px solid var(--color-danger)'; color = 'var(--color-danger)'; }
          }
          return (
            <button key={idx} onClick={() => selectSingle(idx)} disabled={done && !undoVisible[quiz.id]} style={{
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
              <span style={{ paddingTop: 1 }} dangerouslySetInnerHTML={{ __html: renderMath(fixLatex(opt.text)) }} />
            </button>
          );
        });
      }

      case 'multiple': {
        const selected = multiAnswers[quiz.id] || [];
        const correct = quiz.correctAnswers || [];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {quiz.options.map((opt, idx) => {
              const checked = selected.includes(idx);
              let bg = 'var(--color-surface)';
              let border = '1px solid var(--color-border)';
              let color = 'var(--color-text)';
              if (done) {
                if (correct.includes(idx) && checked) { bg = 'var(--color-success-soft)'; border = '1px solid var(--color-success)'; color = 'var(--color-success)'; }
                else if (correct.includes(idx) && !checked) { bg = 'var(--color-warning-soft)'; border = '1px solid var(--color-warning)'; color = 'var(--color-warning)'; }
                else if (!correct.includes(idx) && checked) { bg = 'var(--color-danger-soft)'; border = '1px solid var(--color-danger)'; color = 'var(--color-danger)'; }
              }
              return (
                <button key={idx} onClick={() => toggleMultiple(idx)} disabled={done && !undoVisible[quiz.id]} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem', width: '100%',
                  padding: '0.55rem 0.85rem', borderRadius: 8, fontSize: '0.88rem', lineHeight: 1.5,
                  textAlign: 'left', cursor: done ? 'default' : 'pointer',
                  background: bg, border, color, transition: 'all 120ms ease',
                }}>
                  <span style={{
                    display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
                    borderRadius: 6, border: `1.5px solid ${checked ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    fontSize: '0.78rem', fontWeight: 600, flexShrink: 0,
                    color: checked ? '#fff' : 'var(--color-text-tertiary)',
                    background: checked ? 'var(--color-accent)' : 'transparent',
                  }}>
                    {checked ? '✓' : LABELS[idx]}
                  </span>
                  <span style={{ paddingTop: 1 }} dangerouslySetInnerHTML={{ __html: renderMath(fixLatex(opt.text)) }} />
                </button>
              );
            })}
            {!done && (
              <button onClick={submitMultiple} disabled={selected.length === 0} style={{
                marginTop: 4, padding: '0.45rem 1rem', borderRadius: 8,
                background: 'var(--color-accent)', color: '#fff', border: 'none',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                opacity: selected.length === 0 ? 0.5 : 1,
              }}>
                提交答案
              </button>
            )}
          </div>
        );
      }

      case 'trueFalse':
        return (
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { value: true, label: `✓ ${'True'}` },
              { value: false, label: `✗ ${'False'}` },
            ].map(({ value, label }) => {
              const selected = done && tfAnswers[quiz.id] === value;
              const isRightAnswer = quiz.correctBool === value;
              let bg = 'var(--color-surface)';
              let bd = '1px solid var(--color-border)';
              let c = 'var(--color-text)';
              if (done) {
                if (isRightAnswer) { bg = 'var(--color-success-soft)'; bd = '1px solid var(--color-success)'; c = 'var(--color-success)'; }
                else if (selected && !isRightAnswer) { bg = 'var(--color-danger-soft)'; bd = '1px solid var(--color-danger)'; c = 'var(--color-danger)'; }
              }
              return (
                <button key={String(value)} onClick={() => selectTrueFalse(value)} disabled={done && !undoVisible[quiz.id]}
                  style={{
                    flex: 1, padding: '0.55rem 0.85rem', borderRadius: 8, fontSize: '0.95rem', fontWeight: 600,
                    cursor: done ? 'default' : 'pointer', background: bg, border: bd, color: c, transition: 'all 120ms ease',
                  }}>
                  {label}
                </button>
              );
            })}
          </div>
        );

      case 'fillBlank': {
        const saved = blankAnswers[quiz.id];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {!done ? (
              <>
                <input
                  type="text"
                  value={blankDraft}
                  onChange={e => setBlankDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') submitBlank(); }}
                  placeholder="输入你的答案..."
                  style={{
                    width: '100%', padding: '0.55rem 0.85rem', borderRadius: 8,
                    border: '1px solid var(--color-border)', fontSize: '0.9rem',
                    background: 'var(--color-surface)', color: 'var(--color-text)',
                    outline: 'none',
                  }}
                />
                <button onClick={submitBlank} disabled={!blankDraft.trim()} style={{
                  alignSelf: 'flex-start', padding: '0.45rem 1rem', borderRadius: 8,
                  background: 'var(--color-accent)', color: '#fff', border: 'none',
                  fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  opacity: blankDraft.trim() ? 1 : 0.5,
                }}>
                  提交答案
                </button>
              </>
            ) : (
              <div style={{
                padding: '0.55rem 0.85rem', borderRadius: 8,
                background: isCorrect ? 'var(--color-success-soft)' : 'var(--color-danger-soft)',
                border: isCorrect ? '1px solid var(--color-success)' : '1px solid var(--color-danger)',
              }}>
                <span style={{ fontWeight: 600, color: isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  你的答案：{saved}
                </span>
                {!isCorrect && (
                  <span style={{ marginLeft: '0.75rem', color: 'var(--color-success)' }}>
                    正确答案：{quiz.blankAnswer}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }
    }
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
        {renderStatusIcon()}
        <span dangerouslySetInnerHTML={{ __html: renderMath(fixLatex(quiz.question)) }} />
      </div>

      {/* Options / Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0.7rem 1.15rem' }}>
        {renderOptions()}
      </div>

      {/* Undo */}
      {done && undoVisible[quiz.id] && (
        <div style={{ padding: '0 1.15rem 0.7rem' }}>
          <span onClick={undo} style={{
            color: 'var(--color-text-tertiary)', fontSize: '0.75rem',
            cursor: 'pointer', marginTop: 4, display: 'inline-block',
          }}>
            {t('quiz.undoTimer')}
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
          <strong>{isCorrect ? `✓ ${t('quiz.correct')}` : `✗ ${t('quiz.wrong')}`}</strong>
          <span style={{ marginLeft: '0.5rem' }} dangerouslySetInnerHTML={{
            __html: renderMath(fixLatex(isCorrect ? quiz.feedbackCorrect : quiz.feedbackWrong)),
          }} />
        </div>
      )}
    </div>
  );
}
