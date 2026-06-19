import { Component, useState, useCallback, useEffect, memo, type ReactNode } from 'react';
import type { ReviewConfig } from '@learncourse/framework/types';
import { useTheme, useLocalStorage, useTextSelectionQuote, ToastProvider, useKeyboardShortcuts } from '@learncourse/framework';
import { Header, Sidebar, ReadingProgress, ScrollTop, SlidePanel, ChatPanel, SearchDialog } from '@learncourse/framework';
import { ModuleSection, ExamOverview, Checklist, Toolbar, LandingPage, ReviewPriority, ReviewRounds, ExamIndex, KnowledgeMainline } from '@learncourse/framework';
import { COURSES, DEFAULT_COURSE } from './courses/index';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    (window as any).__errorBoundaryDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack
    };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--color-text-tertiary)', fontSize: '1rem' }}>渲染出错，请刷新页面</div>;
    }
    return this.props.children;
  }
}

function App() {
  const [courseSlug, setCourseSlug] = useState<string | null>(() =>
    new URLSearchParams(location.search).get('course')
  );
  const [config, setConfig] = useState<ReviewConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const { effective, toggle: toggleTheme } = useTheme();
  const [studied, setStudied] = useLocalStorage<Record<string, boolean>>(`lc-${courseSlug || 'landing'}-studied`, {});
  const [checklistDone, setChecklistDone] = useState(0);
  const [expandAll, setExpandAll] = useState(false);
  const [slidePanel, setSlidePanel] = useState<{ moduleId: string; courseware: string; page?: number } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [panelWidth] = useLocalStorage('slide-panel-width', 480);

  useTextSelectionQuote();

  useKeyboardShortcuts([{ key: 'k', ctrl: true, handler: () => setShowSearch(prev => !prev) }]);

  const selectCourse = (slug: string) => {
    const url = new URL(location.href);
    url.searchParams.set('course', slug);
    history.pushState({}, '', url);
    setCourseSlug(slug);
  };

  useEffect(() => {
    if (!courseSlug) { setConfig(null); setLoading(false); return; }
    const entry = COURSES.find(c => c.slug === courseSlug) || COURSES.find(c => c.slug === DEFAULT_COURSE)!;
    setConfig(entry.config);
    setLoading(false);
  }, [courseSlug]);

  const modulesStudied = Object.values(studied).filter(Boolean).length;
  const toggleStudied = useCallback((moduleId: string) => (v: boolean) => {
    setStudied(prev => ({ ...prev, [moduleId]: v }));
  }, [setStudied]);
  const hasRightPanel = !!(slidePanel || chatOpen);
  const rightOffset = chatOpen ? 420 : panelWidth;

  if (!courseSlug) return <LandingPage courses={COURSES} onSelectCourse={selectCourse} />;
  if (loading || !config) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--color-text-tertiary)' }}>加载课程...</div>;

  const { reviewData, examOverview, slidePdfs, hasReviewSections } = config;

  return (
    <ErrorBoundary>
    <ToastProvider>
    <>
      <ReadingProgress />
      <Header effective={effective} onThemeToggle={toggleTheme}
        modulesStudied={modulesStudied} checklistDone={checklistDone}
        totalModules={config.modules.length} totalChecklist={config.checklist.length}
        onChatToggle={() => setChatOpen(!chatOpen)}
        onSearchToggle={() => setShowSearch(true)}
        title={config.title} subtitle={config.subtitle} />
      <Sidebar groups={config.navGroups} courses={COURSES} currentCourse={courseSlug} onSwitchCourse={selectCourse} />
      <div id="app-layout">
        <main id="app-main" style={hasRightPanel ? { marginRight: rightOffset } : undefined}>
          <div id="app-main-inner">
            <Toolbar onExpandAll={() => setExpandAll(true)} onCollapseAll={() => setExpandAll(false)} />
            <ExamOverview modulesStudied={modulesStudied} checklistDone={checklistDone}
              totalModules={config.modules.length} totalChecklist={config.checklist.length}
              tipText={examOverview?.tipText}
              scoreHeaders={examOverview?.scoreHeaders}
              scoreRows={examOverview?.scoreRows}
              strategyHeaders={examOverview?.strategyHeaders}
              strategyRows={examOverview?.strategyRows} />
            {hasReviewSections && config.knowledgeNodes && (
              <KnowledgeMainline nodes={config.knowledgeNodes} description="上图展示了课程的四大知识维度：感知 → 推理 → 学习 → 行动。建议按从左到右、从上到下的顺序复习。" />
            )}
            {hasReviewSections && reviewData && (
              <>
                <ReviewPriority priorities={reviewData.priorities} />
                <ReviewRounds rounds={reviewData.rounds} />
                <ExamIndex examEntries={reviewData.examEntries} coursewareRows={reviewData.coursewareRows} />
              </>
            )}
            {config.modules.map(meta => (
              <ModuleSection key={meta.id} meta={meta}
                quizzes={config.quizzes.filter(q => q.moduleId === meta.id)}
                examQuestions={config.examQuestions.filter(eq => eq.moduleId === meta.id)}
                expandAll={expandAll}
                onStudiedToggle={toggleStudied(meta.id)}
                onOpenSlide={(page) => setSlidePanel({ moduleId: meta.id, courseware: meta.courseware, page })}
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
        page={slidePanel.page} pdfFile={slidePdfs?.[slidePanel.moduleId]} onClose={() => setSlidePanel(null)} />}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      <SearchDialog open={showSearch} onClose={() => setShowSearch(false)} />
    </>
    </ToastProvider>
    </ErrorBoundary>
  );
}

export default memo(App);
