# Phase 3 — Task Decomposition Plan

> LearnCourse v1.0 · 2026-06-17

## Execution Order

### Phase A: Fix 🔴 Violations (Error Handling) · Priority: CRITICAL

| # | Task | Driver | Est. | Parallel? |
|---|------|--------|------|-----------|
| A1 | Wire `ToastProvider` in App.tsx; add error boundary component | E🔴 | 15min | — |
| A2 | Add DOMPurify to ProseBlock sanitize pipe | E🔴 | 15min | A1 |
| A3 | Fix MermaidDiagram dark mode: MutationObserver re-render | E🔴 | 20min | A1 |
| A4 | Wire QuizBlock to useToast for answer feedback + undo (10s window) | E🟡 | 20min | A1 |
| A5 | Add ModuleSection load-failure error state with retry button | E🔴 | 15min | A1 |

### Phase B: Fix 🟡 Violations (Unified Interface + Reusability) · Priority: HIGH

| # | Task | Driver | Est. | Parallel? |
|---|------|--------|------|-----------|
| B1 | Create i18n foundation: `hooks/useI18n.ts` + `locales/zh.ts` + replace 10 most-used hardcoded strings | U🟡 | 45min | — |
| B2 | Replace remaining ~34 hardcoded Chinese strings with i18n calls | U🟡 | 30min | B1 |
| B3 | Rewrite KnowledgeMap to accept data props (nodes/edges array) | R🔴 | 30min | B1 |
| B4 | Add Quiz types: multiple-choice (checkbox), true-false, fill-blank | P🟡 | 45min | B1 |

### Phase C: Performance Polish · Priority: MEDIUM

| # | Task | Driver | Est. | Parallel? |
|---|------|--------|------|-----------|
| C1 | Add `<link rel="preload">` for critical fonts in index.html | P🟢 | 5min | — |
| C2 | Convert MermaidDiagram to named-chunk lazy import (not just React.lazy) | P🟢 | 10min | C1 |
| C3 | Add image lazy loading + blur placeholder to Figure component | P🟢 | 15min | C1 |

### Phase D: Governance + Archive · Priority: LOW

| # | Task | Driver | Est. | Parallel? |
|---|------|--------|------|-----------|
| D1 | Update README.md with Chinese README + architecture diagram | U🟢 | 15min | — |
| D2 | Create `docs/progress/MASTER.md` with cross-conversation index | S🟢 | 10min | — |
| D3 | Validate with `npm run build` + `npx vite preview` smoke test | E🟢 | 5min | D2 |

## Parallel Lanes

```
Phase A: A1 → [A2, A3, A4, A5]  (4 parallel)
Phase B: B1 → [B2, B3, B4]      (3 parallel)
Phase C: C1 → [C2, C3]           (2 parallel)
Phase D: D1 → D2 → D3
```

## Success Criteria

- [ ] All 🔴 violations resolved (App.tsx error boundary + ProseBlock sanitizer + Mermaid dark mode)
- [ ] All 🟡 violations have mitigation plan or fix
- [ ] `npm run build` passes with 0 errors
- [ ] Both courses load without console errors
- [ ] i18n foundation in place (≥10 keys translated)
- [ ] S.U.P.E.R score improves from 🟡 3.2 → 🟢 4.0+
