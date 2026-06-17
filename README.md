# LearnCourse · 开源交互式学习框架

> 构建结构化期末复习站点，AI 助手陪练，真题 + 测验一应俱全。

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://deliciousbuding.github.io/LearnCourse/)

---

## 特性

- 📚 **模块化课程内容** — TypeScript 驱动的课程数据，支持 prose/callout/card/table/code/mermaid/math/quiz/exam 等 12 种内容块
- 🤖 **AI 聊天侧栏** — 选中正文 → 自动引用 → 流式对话（自带 API Key，浏览器本地存储）
- 📄 **课件 PDF 查看** — 可拖拽宽度的右侧面板，支持页码跳转
- 🎯 **选择题 + 真题演练** — ABCD 交互式 QuizBlock + 可折叠 ExamQuestion
- 🌗 **暗色模式** — 系统感知 + 手动切换，localStorage 持久化
- ⚡ **高性能** — Vite + React 19 + 代码分割 + 虚拟化模块加载，主包 ~165KB gzipped
- 📱 **响应式** — 移动端侧栏折叠适配

## 快速开始

```bash
git clone https://github.com/DeliciousBuding/LearnCourse.git
cd LearnCourse
npm install
npm run dev
```

浏览器打开 `http://localhost:5173` 即可看到 Landing 页和模板课程。

## 架构

```
LearnCourse/
├── packages/
│   ├── framework/src/           # 可复用框架（独立 npm 包）
│   │   ├── layout/              # Header, Sidebar, SlidePanel, ScrollTop, ReadingProgress
│   │   ├── ui/                  # 22 个组件：Callout, Card, QuizBlock, ProseBlock, ChatPanel...
│   │   ├── hooks/               # useTheme, useScrollSpy, useLocalStorage, useTextSelectionQuote
│   │   ├── lib/                 # math.ts（KaTeX + LaTeX 修复工具）
│   │   ├── types.ts             # ModuleContent, ContentBlock, ReviewConfig 等核心类型
│   │   ├── styles.css           # 设计系统（Mintlify 暖色板 + 暗色模式 + 布局）
│   │   └── index.ts             # Barrel export
│   └── client/                  # Vite React SPA（薄壳）
│       └── src/
│           ├── App.tsx           # 纯 config 驱动，零硬编码路由
│           └── courses/         # 课程内容（每个课程一个目录）
│               ├── template/    # 新课程模板
│               └── index.ts     # 课程注册表
├── .github/workflows/           # CI/CD → GitHub Pages
└── README.md
```

## 抽象层级

```
ReviewConfig          ← 课程级配置（标题、导航、模块列表、数据引用）
  ├── ModuleContent    ← 模块级（元数据 + 章节列表）
  │     └── ModuleSection ← 章节级（标题 + 内容块数组）
  │           └── ContentBlock ← 内容块级（12 种类型）
  ├── Quiz[]           ← 题库（题目 + 选项 + 正误反馈）
  ├── ExamQuestion[]   ← 真题库（题目 + 答案 + 分值）
  └── ChecklistItem[]  ← 自检清单
```

每层独立、可替换。框架层不感知任何课程具体内容。

## 创建新课程

1. 复制 `packages/client/src/courses/template/` → `courses/你的课程/`
2. 编辑 `config.ts` — 设置标题、模块元数据、导航分组
3. 编写 `modules/module-s1.ts` 等模块内容文件
4. 在 `index.ts` 注册一行：`{ slug: 'my-course', title: '我的课程', config: myConfig }`
5. `npm run dev` — 自动出现在 Landing 页和课程切换器

## AI 聊天配置

聊天侧栏兼容 OpenAI 兼容 API。点击设置图标输入你的 API Key（仅存储在浏览器 localStorage，不上传任何服务器）。

支持：OpenAI、OpenRouter、litellm 网关，或任何兼容 `/chat/completions` 的端点。

## 技术栈

| 层 | 技术 |
|----|------|
| 构建 | Vite 8 + React 19 |
| 语言 | TypeScript |
| 样式 | CSS 自定义属性（Mintlify 暖色设计系统） |
| 图表 | Mermaid.js（懒加载） |
| 公式 | KaTeX（懒加载） |
| 图标 | Lucide React |
| 部署 | GitHub Pages（纯前端，零后端） |

## License

MIT
