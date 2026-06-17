/* ═══════════════════════════════════════════
   AI Final Review — Type Definitions
   ═══════════════════════════════════════════ */

// ── Module ──
export interface ModuleMeta {
  id: string;
  number: number;
  title: string;
  icon: string; // lucide icon name
  courseware: string;
  examRefs: string;
}

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'danger';
export type CardVariant = 'accent' | 'danger' | 'warning' | 'success';

export type ContentBlock =
  | { type: 'prose'; html: string }
  | { type: 'callout'; variant: CalloutVariant; text: string }
  | { type: 'card'; variant?: CardVariant; title?: string; body: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; language: string; code: string }
  | { type: 'details'; summary: string; body: string }
  | { type: 'mermaid'; id: string; chart: string }
  | { type: 'math'; formula: string; display: boolean }
  | { type: 'examQuestions'; ids: string[] }
  | { type: 'quiz'; ids: string[] };

export interface ModuleSection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface ModuleContent {
  meta: ModuleMeta;
  calloutText: string;
  sections: ModuleSection[];
}

// ── Quiz ──
export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  moduleId: string;
  question: string;
  options: QuizOption[];
  feedbackCorrect: string;
  feedbackWrong: string;
}

// ── Exam Question ──
export interface ExamQuestion {
  id: string;
  moduleId: string;
  year: string;
  position: string;
  points: number;
  questionText: string;
  answerHtml: string;
}

// ── Checklist ──
export interface ChecklistItem {
  id: string;
  text: string;
}

// ── Review Priority ──
export interface PriorityModule {
  tier: 1 | 2 | 3;
  title: string;
  modules: string[];
  reason: string;
}

// ── Review Round ──
export interface ReviewRound {
  round: number;
  title: string;
  days: string;
  tasks: string[];
  goal: string;
}

// ── Exam Index ──
export interface ExamIndexEntry {
  year: string;
  name: string;
  questions: string;
  notes: string;
}

// ── Knowledge Mainline ──
export interface MainlineNode {
  id: string;
  label: string;
  modules: string[];
  description: string;
}

// ── Review Config (drives the entire app) ──
export interface NavGroup {
  title: string;
  links: { href: string; label: string }[];
}

export interface ReviewConfig {
  title: string;
  subtitle: string;
  badge: string;
  navGroups: NavGroup[];
  modules: ModuleMeta[];
  quizzes: Quiz[];
  examQuestions: ExamQuestion[];
  checklist: ChecklistItem[];
  moduleLoader: (moduleId: string) => Promise<ModuleContent>;
  /** Enable AI-style review helper sections (KnowledgeMainline, ReviewPriority, ReviewRounds, ExamIndex) */
  hasReviewSections?: boolean;
  reviewData?: {
    priorities: PriorityModule[];
    rounds: ReviewRound[];
    examEntries: ExamIndexEntry[];
    coursewareRows: string[][];
  };
  examOverview?: {
    tipText?: string;
    scoreHeaders?: string[];
    scoreRows?: string[][];
    strategyHeaders?: string[];
    strategyRows?: string[][];
  };
  /** Module ID → PDF filename for slide panel */
  slidePdfs?: Record<string, string>;
}
