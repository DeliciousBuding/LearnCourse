// Barrel export for the review framework
export type { ModuleMeta, ModuleContent, ContentBlock, CalloutVariant, CardVariant, Quiz, QuizOption, ExamQuestion as ExamQuestionType, ChecklistItem, PriorityModule, ReviewRound, ExamIndexEntry, MainlineNode, NavGroup, ReviewConfig } from './types';

// Hooks
export { useLocalStorage } from './hooks/useLocalStorage';
export { useScrollProgress } from './hooks/useScrollProgress';
export { useScrollSpy } from './hooks/useScrollSpy';
export { useTheme } from './hooks/useTheme';
export { ToastProvider, useToast } from './hooks/useToast';
export { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
export { useI18n } from './hooks/useI18n';
export { useTextSelectionQuote } from './hooks/useTextSelectionQuote';

// Layout components
export { Header } from './layout/Header';
export { Sidebar } from './layout/Sidebar';
export { ReadingProgress } from './layout/ReadingProgress';
export { ScrollTop } from './layout/ScrollTop';
export { SlidePanel } from './layout/SlidePanel';

// UI components
export { Callout } from './ui/Callout';
export { Card } from './ui/Card';
export { ChatPanel } from './ui/ChatPanel';
export { CodeBlock } from './ui/CodeBlock';
export { Figure } from './ui/Figure';
export { CourseSwitcher } from './ui/CourseSwitcher';
export { Checklist } from './ui/Checklist';
export { ComparisonTable } from './ui/ComparisonTable';
export { DetailBlock } from './ui/DetailBlock';
export { ExamIndex } from './ui/ExamIndex';
export { ExamOverview } from './ui/ExamOverview';
export { ExamQuestion } from './ui/ExamQuestion';
export { KnowledgeMainline } from './ui/KnowledgeMainline';
export { KnowledgeMap } from './ui/KnowledgeMap';
export { LandingPage } from './ui/LandingPage';
export { MathFormula } from './ui/MathFormula';
export { MermaidDiagram } from './ui/MermaidDiagram';
export { ModuleSection } from './ui/ModuleSection';
export { ProseBlock } from './ui/ProseBlock';
export { QuizBlock } from './ui/QuizBlock';
export { ReviewPriority } from './ui/ReviewPriority';
export { ReviewRounds } from './ui/ReviewRounds';
export { SlideRef } from './ui/SlideRef';
export { StatCard } from './ui/StatCard';
export { StudiedToggle } from './ui/StudiedToggle';
export { SurfaceBox } from './ui/SurfaceBox';
export { ThemeToggle } from './ui/ThemeToggle';
export { TierCard } from './ui/TierCard';
export { Toolbar } from './ui/Toolbar';
export { Badge } from './ui/Badge';
