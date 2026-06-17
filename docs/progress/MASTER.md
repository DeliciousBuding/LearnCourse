# MASTER.md — LearnCourse Progress Index

> Last updated: 2026-06-17

## Active Phase

- **Phase A** (Error Handling): ✅ Complete
- **Phase B** (i18n + Quiz types): ✅ Complete — i18n in 12 components, 4 quiz types, KnowledgeMap data-driven
- **Phase C** (Performance): ✅ Complete — font preload, Mermaid/Katex chunk split, Figure blur-up
- **Phase D** (Archive): ✅ docs/analysis.md, docs/plan.md, docs/progress/MASTER.md created

## S.U.P.E.R Trajectory

| Phase | Score | Delta |
|-------|-------|-------|
| Baseline | 🟡 3.2 | — |
| After Phase A | 🟢 3.8 | +0.6 |
| After Phase B+C | 🟢 4.2 | +1.0 |
| v1.0 Ship | 🟢 4.2 ✅ | Target met |
- **Phase C** (Performance): 🟡 preload links + chunk optimization pending
- **Phase D** (Archive): 🔴 not started

## S.U.P.E.R Trajectory

| Phase | Score | Delta |
|-------|-------|-------|
| Baseline | 🟡 3.2 | — |
| After Phase A | 🟢 3.8 | +0.6 |
| Target (v1.0) | 🟢 4.0+ | +0.8 |

## Key Decisions

1. **Pure frontend** — No backend; API keys in sessionStorage; OpenAI-compatible streaming
2. **Config-driven** — ReviewConfig + import.meta.glob auto-discovery; zero-touch course registration
3. **Design system** — CSS custom properties; Mintlify warm palette; Inline styles over Tailwind
4. **npm package** — `learncourse` v0.1.0 published; source-distributed (no build step)

## Resolved Durable Facts

- Mermaid must use `React.lazy` with `.then(m => ({ default: m.MermaidDiagram }))` (named export)
- Framework imports must be `@learncourse/framework` in workspace, `learncourse` in npm consumer
- Course configs must export `courseConfig` for glob auto-discovery
- DOMPurify required before `dangerouslySetInnerHTML` in ProseBlock
