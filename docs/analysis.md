# Phase 1 — Deep Architecture Analysis

> LearnCourse · Spec-Driven Development · 2026-06-17

## Architecture Health Summary (S.U.P.E.R)

| Principle | Score | Key Findings |
|-----------|-------|---------------|
| **S**ingle Responsibility | 🟡 3/5 | Components well-separated; App.tsx still mixes routing + data; some components (Header) have too many props |
| **U**nified Interface | 🟡 3/5 | ContentBlock union type strong; ReviewConfig well-defined; but ~44 hardcoded Chinese strings remain; no i18n layer |
| **P**erformance | 🟢 4/5 | Virtualization + code-split + lazy-load; main bundle 62KB gzip; but Mermaid/KaTeX loading could be more aggressive |
| **E**rror Handling | 🔴 2/5 | No global error boundary; silent catch blocks; no retry UX; ToastProvider exists but not wired; no CourseLoadError workflow |
| **R**eusability | 🟡 3/5 | Framework/core separation clear; npm package published; but `courseSlug` conditionals remain in App.tsx; KnowledgeMap hardcoded SVG |

## Module Inventory

### Framework Layer (`packages/framework/src/`)

| Module | S | U | P | E | R | Notes |
|--------|---|---|---|---|---|------|
| `types.ts` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Core contract — clean, extensible |
| `styles.css` | 🟡 | 🟢 | 🟢 | 🟢 | 🟢 | Print mode + animation tokens added; some legacy inline vars remain |
| `index.ts` barrel | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Complete; needs ChatPanel export |
| **Hooks** | | | | | | |
| `useLocalStorage` | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | Silent quota-exceeded error |
| `useScrollSpy` | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | No null-guard on offsetTop |
| `useScrollProgress` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Simple, clean |
| `useTheme` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Mature |
| `useTextSelectionQuote` | 🟢 | 🟢 | 🟢 | 🟡 | 🟡 | Desktop-only pattern; broken on touch |
| `useToast` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | New, solid |
| `useKeyboardShortcuts` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | New, solid |
| **Layout** | | | | | | |
| `Header.tsx` | 🟡 | 🟡 | 🟢 | 🟡 | 🟡 | 10+ props; hardcoded fallback text |
| `Sidebar.tsx` | 🟡 | 🟢 | 🟢 | 🟡 | 🟡 | Hardcoded brand name "LearnCourse" |
| `SlidePanel.tsx` | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | Exit animation added; PDF dl fail silent |
| `ScrollTop.tsx` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Simple |
| `ReadingProgress.tsx` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Simple |
| **UI Components** | | | | | | |
| `Callout` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `Card` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `ChatPanel` | 🟡 | 🟡 | 🟢 | 🟡 | 🟡 | Quick Actions added; closing animation done; error states improved |
| `Checklist` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Proper ARIA |
| `CodeBlock` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | New; syntax highlighting |
| `ComparisonTable` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `CourseSwitcher` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | New; clean |
| `DetailBlock` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Open/close fixed |
| `ExamIndex` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Now data-driven |
| `ExamOverview` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Now data-driven |
| `ExamQuestion` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Collapse/expand done |
| `Figure` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | New |
| `KnowledgeMainline` | 🟡 | 🟡 | 🟢 | 🟢 | 🔴 | Hardcoded SVG in KnowledgeMap child |
| `LandingPage` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `MathFormula` | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | No mhchem/amscd extension |
| `MermaidDiagram` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | Dark mode sync gap; no zoom/export |
| `ModuleSection` | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | Virtualization works; catch silent |
| `ProseBlock` | 🟡 | 🟢 | 🟢 | 🟡 | 🟢 | dangerInnerHTML without sanitizer |
| `QuizBlock` | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | No undo; only single-choice |
| `ReviewPriority` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Now data-driven |
| `ReviewRounds` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Now data-driven |
| `SlideRef` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `StatCard` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `StudiedToggle` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `SurfaceBox` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `ThemeToggle` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `TierCard` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |
| `Toolbar` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Clean |

### Content Layer (`packages/client/src/`)

| Module | S | U | P | E | R | Notes |
|--------|---|---|---|---|---|------|
| `App.tsx` | 🟡 | 🟡 | 🟢 | 🔴 | 🟡 | CourseSlug conditionals remain; no error boundary |
| `courses/index.ts` | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Auto-discovery via glob |
| `courses/*/config.ts` (×3) | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Each exports courseConfig |
| `courses/*/modules/*.ts` (×23) | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | Content data |

## Violation Hotspots (Top 5)

1. 🔴 **App.tsx** — No error boundary; courseSlug conditionals not fully eliminated; toast system not wired
2. 🔴 **Error handling gaps** — ProseBlock XSS risk (no DOMPurify); MermaidDiagram dark mode sync broken; SlidePanel PDF load silent fail
3. 🟡 **KnowledgeMap.tsx** — Entirely hardcoded SVG; blocks AI-specific content reuse
4. 🟡 **I18n absent** — ~44 hardcoded Chinese strings; framework not localizable
5. 🟡 **QuizBlock** — No multi-select/fill-blank/true-false; no undo mechanism

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| XSS via ProseBlock | Low | High | Add DOMPurify sanitization |
| Dark mode Mermaid breakage | Medium | Medium | Add MutationObserver re-render |
| Course data scale (100+ modules) | Low | Medium | Already virtualized; add pagination |
| Browser API key exposure | Medium | High | Already sessionStorage; add passphrase encryption |

## Phase 1 Summary

**Overall S.U.P.E.R Health: 🟡 3.2/5**
- 43 modules scored
- 6 violations at 🔴 level, 15 at 🟡 level
- Strong foundations; error handling and i18n are the main gaps
