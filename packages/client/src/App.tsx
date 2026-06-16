import { useState, useCallback, useEffect } from 'react';
import type { ReviewConfig } from '@learncourse/framework/types';
import { useTheme, useLocalStorage, useTextSelectionQuote } from '@learncourse/framework';
import { Header, Sidebar, ReadingProgress, ScrollTop, SlidePanel, ChatPanel } from '@learncourse/framework';
import { ModuleSection, ExamOverview, Checklist, Toolbar } from '@learncourse/framework';
import { templateConfig } from '@courses/template/config';

export default function App() {
  const config: ReviewConfig = templateConfig;
  const { effective, toggle: toggleTheme } = useTheme();
  const [studied, setStudied] = useLocalStorage<Record<string, boolean>>('lc-studied', {});
  const [checklistDone, setChecklistDone] = useState(0);
  const [expandAll, setExpandAll] = useState(false);
  const [slidePanel, setSlidePanel] = useState<{ moduleId: string; courseware: string; page?: number } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [panelWidth] = useLocalStorage('slide-panel-width', 480);

  useTextSelectionQuote();

  const modulesStudied = Object.values(studied).filter(Boolean).length;

  const toggleStudied = useCallback((moduleId: string) => (v: boolean) => {
    setStudied(prev => ({ ...prev, [moduleId]: v }));
  }, [setStudied]);

  const hasRightPanel = !!(slidePanel || chatOpen);
  const rightOffset = chatOpen ? 420 : panelWidth;

  return (
    <>
      <ReadingProgress />
      <Header effective={effective} onThemeToggle={toggleTheme}
        modulesStudied={modulesStudied} checklistDone={checklistDone}
        totalModules={config.modules.length} totalChecklist={config.checklist.length}
        onChatToggle={() => setChatOpen(!chatOpen)}
      />
      <Sidebar groups={config.navGroups} />
      <div id="app-layout">
        <main id="app-main" style={hasRightPanel ? { marginRight: rightOffset } : undefined}>
          <div id="app-main-inner">
            <Toolbar onExpandAll={() => setExpandAll(true)} onCollapseAll={() => setExpandAll(false)} />
            <ExamOverview modulesStudied={modulesStudied} checklistDone={checklistDone}
              totalModules={config.modules.length} totalChecklist={config.checklist.length} />
            {config.modules.map(meta => (
              <ModuleSection key={meta.id} meta={meta}
                quizzes={config.quizzes.filter(q => q.moduleId === meta.id)}
                examQuestions={config.examQuestions.filter(eq => eq.moduleId === meta.id)}
                expandAll={expandAll}
                onStudiedToggle={toggleStudied(meta.id)}
                loadModule={config.moduleLoader} />
            ))}
            <section id="s-checklist"><h2>考前自检清单</h2>
              <Checklist items={config.checklist} onCountChange={setChecklistDone} /></section>
            <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              <p>{config.title} · Powered by <a href="https://github.com/DeliciousBuding/LearnCourse">LearnCourse</a></p>
            </footer>
          </div>
        </main>
      </div>
      <ScrollTop />
      {slidePanel && <SlidePanel moduleId={slidePanel.moduleId} courseware={slidePanel.courseware}
        page={slidePanel.page} onClose={() => setSlidePanel(null)} />}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </>
  );
}
