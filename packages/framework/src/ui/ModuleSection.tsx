import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import type { ModuleMeta, ModuleContent, Quiz, ExamQuestion } from '../types';
import { Callout } from './Callout';
import { Card } from './Card';
import { DetailBlock } from './DetailBlock';
import { ComparisonTable } from './ComparisonTable';
import { QuizBlock } from './QuizBlock';
import { ExamQuestion as ExamQuestionCard } from './ExamQuestion';
import { ProseBlock } from './ProseBlock';
import { SlideRef } from './SlideRef';
import { StudiedToggle } from './StudiedToggle';

const MermaidDiagram = lazy(() => import('./MermaidDiagram').then(m => ({ default: m.MermaidDiagram })));
const MathFormula = lazy(() => import('./MathFormula').then(m => ({ default: m.MathFormula })));
const Fallback = () => <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>…</div>;

interface ModuleSectionProps {
  meta: ModuleMeta;
  quizzes: Quiz[];
  examQuestions: ExamQuestion[];
  expandAll?: boolean;
  onStudiedToggle?: (studied: boolean) => void;
  onOpenSlide?: (page?: number) => void;
  loadModule: (moduleId: string) => Promise<ModuleContent>;
}

export function ModuleSection({ meta, quizzes, examQuestions, expandAll = false, onStudiedToggle, onOpenSlide, loadModule }: ModuleSectionProps) {
  const [module, setModule] = useState<ModuleContent | null>(null);
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Virtualize: only render full content when near viewport
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { rootMargin: '800px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Load module data when near viewport
  useEffect(() => {
    if (!visible || module) return;
    let cancelled = false;
    loadModule(meta.id).then(mod => { if (!cancelled) setModule(mod); }).catch(() => {});
    return () => { cancelled = true; };
  }, [visible, module, meta.id, loadModule]);

  const quizMap = new Map(quizzes.map(q => [q.id, q]));
  const examMap = new Map(examQuestions.map(eq => [eq.id, eq]));

  // Render shell only if not yet visible
  if (!visible) {
    return (
      <section id={meta.id}>
        <div ref={sentinelRef}>
          <h2>{meta.title}<StudiedToggle moduleId={meta.id} onToggle={onStudiedToggle} /></h2>
        </div>
      </section>
    );
  }

  return (
    <section id={meta.id}>
      <h2>{meta.title}<StudiedToggle moduleId={meta.id} onToggle={onStudiedToggle} /></h2>

      {!module ? (
        <div style={{ padding: '2rem 0', color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>加载中...</div>
      ) : (
        <>
          <Callout variant="info" text={module.calloutText} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: '1rem' }}>
            {onOpenSlide && <SlideRef courseware={meta.courseware} onOpen={onOpenSlide} />}
            <span
              onClick={() => {
                // Find first exam question in this module and scroll to it
                const eqs = examQuestions.filter(eq => eq.moduleId === meta.id);
                if (eqs.length > 0) {
                  const el = document.getElementById(eqs[0].id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.transition = 'box-shadow .5s';
                    el.style.boxShadow = '0 0 0 3px var(--color-accent)';
                    setTimeout(() => { el.style.boxShadow = 'var(--shadow-sm)'; }, 1500);
                  }
                } else {
                  // Fallback: scroll to nearest "真题" section
                  const h3s = document.querySelectorAll<HTMLElement>(`#${meta.id} h3`);
                  for (const h3 of h3s) {
                    if (h3.textContent?.includes('真题') || h3.textContent?.includes('考试')) {
                      h3.scrollIntoView({ behavior: 'smooth' }); break;
                    }
                  }
                }
              }}
              style={{ cursor: 'pointer', color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 2, fontWeight: 500 }}>
              📝 真题：{meta.examRefs}
            </span>
          </div>

          {module.sections.map(section => (
            <div key={section.id} id={section.id} className="study-content">
              <h3>{section.title}</h3>
              {section.content.map((block, bi) => {
                switch (block.type) {
                  case 'prose':
                    return <ProseBlock key={bi} html={block.html} />;
                  case 'callout':
                    return <Callout key={bi} variant={block.variant} text={block.text} />;
                  case 'card':
                    return <Card key={bi} variant={block.variant} title={block.title}><ProseBlock html={block.body} /></Card>;
                  case 'table':
                    return <ComparisonTable key={bi} headers={block.headers} rows={block.rows} />;
                  case 'code':
                    return <pre key={bi}><code>{block.code}</code></pre>;
                  case 'details':
                    return <DetailBlock key={bi} summary={block.summary} open={expandAll}><ProseBlock html={block.body} /></DetailBlock>;
                  case 'mermaid':
                    return <Suspense key={bi} fallback={<Fallback />}><MermaidDiagram id={block.id} chart={block.chart} /></Suspense>;
                  case 'math':
                    return <Suspense key={bi} fallback={<Fallback />}><MathFormula formula={block.formula} display={block.display} /></Suspense>;
                  case 'examQuestions':
                    return <div key={bi}>{block.ids.map(id => { const eq = examMap.get(id); return eq ? <ExamQuestionCard key={id} question={eq} /> : null; })}</div>;
                  case 'quiz':
                    return <div key={bi}>{block.ids.map(id => { const q = quizMap.get(id); return q ? <QuizBlock key={id} quiz={q} /> : null; })}</div>;
                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </>
      )}
    </section>
  );
}
