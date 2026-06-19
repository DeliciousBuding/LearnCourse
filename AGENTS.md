# AGENTS.md

## Project: LearnCourse

Open-source learning framework + 2 course sites (AI, Computer Systems).

- Remote: `github.com/DeliciousBuding/LearnCourse`

## Framework vs Content

**Never modify framework packages (`packages/client`, `packages/server`) when only course content changes.** Course content lives under course-specific directories (`人工智能/`, `计算机系统/`).

## Adding a New Course

1. Copy `课程模板/` to a new directory named after the course.
2. Edit `config.ts` (course metadata, slide paths, module order).
3. Add module directories under `modules/` with markdown content.

## Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (port 5299) |
| `npm run build` | Production build |
| `python tests/test_suite.py` | Run test suite |

## Known Gotchas

- **fixLatex**: Double-escape risk — may add extra backslashes on re-run. Verify output.
- **Mermaid**: Use `flowchart` not `graph` (rendering differences).
- **Table cells**: Use `type: 'table'` not raw HTML.
- **Card/details body**: String values must not have inner wrapper elements.

## Governance

- This file is the authority for this project directory.
- Changes to framework-wide rules require review before commit.
