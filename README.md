# LearnCourse

> Open-source interactive learning framework. Build beautiful course review sites with AI-powered sidebar chat.

## Features

- 📚 **Modular course content** — Write Markdown/JSON, render interactive review pages
- 🤖 **AI chat sidebar** — Select text → auto-quote → chat with AI (bring your own API key)  
- 📄 **PDF slide viewer** — PPT/PDF in resizable right panel, page-level jump
- 🎯 **Quiz & exam practice** — Interactive ABCD quizzes and collapsible exam questions
- 🔍 **Full-text search** — Cmd/Ctrl+K across all modules
- 🌗 **Dark mode** — System-aware with manual toggle, persisted
- 📱 **Responsive** — Mobile-friendly with slide-out navigation
- ⚡ **Fast** — Vite + React + code-split modules, 165KB gzipped main bundle

## Quick Start

```bash
git clone https://github.com/DeliciousBuding/LearnCourse.git
cd LearnCourse
npm install
npm run dev
```

## Architecture

```
LearnCourse/
├── packages/
│   ├── framework/          # Reusable UI components, hooks, types, design system
│   └── client/             # Vite React SPA — thin shell wired to content config
├── courses/                # Course content packages (framework-agnostic)
│   └── template/           # Starter template for new courses
├── docs/                   # Documentation site
└── public/                 # Static assets (PDFs, images)
```

## Creating a New Course

1. Copy `courses/template/` → `courses/your-course/`
2. Edit `config.ts` — set title, modules, navigation
3. Fill `modules/` with your content
4. `npm run dev` — it just works

## AI Chat Configuration

The chat sidebar uses the OpenAI-compatible API. Set your key in the UI settings panel (stored locally in your browser, never sent anywhere).

Supported providers: OpenAI, Anthropic, OpenRouter, litellm gateway, or any OpenAI-compatible endpoint.

## License

MIT
