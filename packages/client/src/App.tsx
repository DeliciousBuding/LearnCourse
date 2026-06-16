import { useState, useCallback, useEffect } from 'react';
import type { ReviewConfig } from '@learncourse/framework/types';
import { useTheme, useLocalStorage, useTextSelectionQuote } from '@learncourse/framework';
import { Header, Sidebar, ReadingProgress, ScrollTop, SlidePanel, ChatPanel } from '@learncourse/framework';
import { ModuleSection, ExamOverview, Checklist, Toolbar, LandingPage } from '@learncourse/framework';
import { COURSES, DEFAULT_COURSE, getCourseSlug } from '@courses/index';

export default function App() {
  const [courseSlug, setCourseSlug] = useState<string | null>(() => {
    return new URLSearchParams(location.search).has('course') ? getCourseSlug() : null;
  });
  const [config, setConfig] = useState<ReviewConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const { effective, toggle: toggleTheme } = useTheme();
  const [studied, setStudied] = useLocalStorage<Record<string, boolean>>(`lc-${courseSlug || 'landing'}-studied`, {});
  const [checklistDone, setChecklistDone] = useState(0);
  const [expandAll, setExpandAll] = useState(false);
  const [slidePanel, setSlidePanel] = useState<{ moduleId: string; courseware: string; page?: number } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [panelWidth] = useLocalStorage('slide-panel-width', 480);

  useTextSelectionQuote();

  const selectCourse = (slug: string) => {
    const url = new URL(location.href);
    url.searchParams.set('course', slug);
    history.pushState({}, '', url);
    setCourseSlug(slug);
  };

  // Load course config
  useEffect(() => {
    if (!courseSlug) return;
    setLoading(true);
    setConfig(null);
    const entry = COURSES.find(c => c.slug === courseSlug) || COURSES.find(c => c.slug === DEFAULT_COURSE)!;
    entry.loader().then(m => { setConfig(m.default); setLoading(false); });
  }, [courseSlug]);

  // Landing page
  if (!courseSlug) {
    return <LandingPage courses={COURSES} onSelectCourse={selectCourse} />;
  }

  if (loading || !config) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--color-text-tertiary)' }}>加载课程...</div>;
  }

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
        title={config.title} subtitle={config.subtitle}
        courses={COURSES} currentCourse={courseSlug} onSwitchCourse={selectCourse}
      />
      <Sidebar groups={config.navGroups} courses={COURSES} currentCourse={courseSlug} onSwitchCourse={selectCourse} />
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
