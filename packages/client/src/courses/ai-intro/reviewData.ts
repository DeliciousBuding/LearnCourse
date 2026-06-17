import type { PriorityModule, ReviewRound, ExamIndexEntry } from 'learncourse/types';

export const AI_INTRO_PRIORITIES: PriorityModule[] = [
  { tier: 1, title: '必考 · 计算 + 概念', modules: ['搜索 (BFS/DFS/UCS/A*)', 'CSP', '贝叶斯网络', '命题逻辑 & 一阶逻辑'], reason: '每年必出，分值最重。能直接拉开分差的模块。' },
  { tier: 2, title: '高频 · 概念为主', modules: ['Agent & PEAS', '对抗搜索', 'HMM', '机器学习基础'], reason: '出题频率高，但以简答/概念为主，性价比极高。' },
  { tier: 3, title: '了解 · 概念 + 趋势', modules: ['超越经典搜索', '强化学习', '深度学习 & CNN'], reason: '偶尔出概念题，通常不考复杂计算。重点关注关键术语和思想。' },
];

export const AI_INTRO_ROUNDS: ReviewRound[] = [
  { round: 1, title: '概念速通', days: 'Day 1-2', tasks: ['快速浏览所有模块的核心概念', '完成全部 quiz 自测', '标记薄弱模块'], goal: '建立全局框架，识别薄弱环节' },
  { round: 2, title: '计算攻坚', days: 'Day 3-5', tasks: ['A* 搜索手工推演', 'CSP 回溯 + 约束传播', '贝叶斯网络推理计算', '一阶逻辑归结证明'], goal: '确保计算题不丢分' },
  { round: 3, title: '真题实战', days: 'Day 6-7', tasks: ['限时完成 2025 期末 A 卷', '逐题对照答案分析', '重做错题直至正确'], goal: '熟悉题型和答题节奏' },
  { round: 4, title: '考前复盘', days: '考试前半天', tasks: ['过一遍自检清单', '重点回顾 T1 模块核心公式', '浏览知识图谱确认无遗漏'], goal: '查漏补缺，进入考试状态' },
];

export const AI_INTRO_EXAM_ENTRIES: ExamIndexEntry[] = [
  { year: '2025', name: '期中试卷', questions: '选择+填空+简答+计算', notes: '重点：搜索、CSP、逻辑' },
  { year: '2025', name: '期末 A 卷', questions: '选择+判断+简答+计算+综合', notes: '全覆盖，含 BN 推理和 HMM' },
  { year: '2023', name: '期末 A 卷', questions: '类似 2025 题型', notes: '参考价值高' },
];

export const AI_INTRO_COURSEWARE_ROWS: string[][] = [
  ['01', '智能 Agent', 'PPTX'], ['02', '搜索', 'PPTX'], ['03', '有信息搜索', 'PPTX'],
  ['04', '超越经典搜索算法', 'PPTX'], ['05', '对抗搜索', 'PPTX'], ['07', '约束满足问题', 'PPTX'],
  ['08', '逻辑 Agent', 'PPTX'], ['09', '一阶逻辑', 'PPTX'], ['10', '不确定性的量化', 'PDF'],
  ['11', '贝叶斯网络', 'PPTX'], ['12', '时间上的概率推理', 'PPTX'],
  ['13', '从 NLP 到 LLM', 'PPTX'], ['14', '计算机视觉', 'PPTX'],
];
