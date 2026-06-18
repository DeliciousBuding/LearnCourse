import type { ReviewConfig, KnowledgeNode, PriorityModule, ReviewRound, ExamIndexEntry } from '@learncourse/framework/types';

const TEMPLATE_NODES: KnowledgeNode[] = [
  { id: 'concept',  label: '基础概念',   row: 0, color: 'accent' },
  { id: 'method',   label: '方法技能',   row: 1, color: 'success' },
  { id: 'apply',    label: '综合应用',   row: 2, color: 'warning' },
];

const TEMPLATE_PRIORITIES: PriorityModule[] = [
  { tier: 1, title: '核心必考', modules: ['s1'], reason: '覆盖考试主要分值，优先掌握' },
  { tier: 2, title: '高频考点', modules: [],  reason: '常出现在简答和分析题中' },
  { tier: 3, title: '保底覆盖', modules: [],  reason: '概念题为主，考前速成' },
];

const TEMPLATE_ROUNDS: ReviewRound[] = [
  { round: 1, title: '概念速通',  days: '1-2天', tasks: ['通读所有模块', '完成 quiz 自测', '标记薄弱环节'], goal: '建立全局框架' },
  { round: 2, title: '计算攻坚',  days: '2-3天', tasks: ['重做标记模块的例题', '练习真题中的计算题'], goal: '独立做对每类计算题' },
  { round: 3, title: '真题实战',  days: '1-2天', tasks: ['限时完成往年试卷', '分析错题并重做'], goal: '适应考试节奏' },
  { round: 4, title: '考前复盘',  days: '半天',   tasks: ['过自检清单', '回顾优先级 Tier 1 内容'], goal: '查漏补缺' },
];

const TEMPLATE_EXAM_ENTRIES: ExamIndexEntry[] = [
  { year: '2025', name: '期末试卷',  questions: '题型分布', notes: '重点：核心计算题' },
  { year: '2025', name: '期中试卷',  questions: '题型分布', notes: '重点：基础概念' },
];

const TEMPLATE_COURSEWARE_ROWS = [
  ['01', '模块一', 'PPTX'],
];

export const templateConfig: ReviewConfig = {
  title: '课程名称',
  subtitle: '期末复习大纲',
  badge: '2026 春',

  // ── 侧边栏导航（顺序匹配页面从上到下）──
  navGroups: [
    {
      title: '考试概览',
      links: [
        { href: '#s0', label: '考试画像 & 分值分布' },
        { href: '#s-mainline', label: '整体知识主线' },
      ],
    },
    {
      title: '复习指南',
      links: [
        { href: '#s-index', label: '真题 & 课件索引' },
        { href: '#s-priority', label: '最终复习优先级' },
        { href: '#s-rounds', label: '四轮复习顺序' },
        { href: '#s-checklist', label: '考前自检清单' },
      ],
    },
    {
      title: '模块详解',
      links: [
        { href: '#s1', label: '1. 模块一' },
      ],
    },
  ],

  modules: [
    { id: 's1', number: 1, title: '模块一', icon: 'BookOpen', courseware: '课件.pptx', examRefs: '概念题 ~10分' },
  ],

  // ── 测验与真题 ──
  quizzes: [],
  examQuestions: [],

  // ── 自检清单 ──
  checklist: [
    { id: '1', text: '理解核心概念，能用自己的话解释' },
    { id: '2', text: '能独立完成课后计算题' },
    { id: '3', text: '能画出知识体系图' },
  ],

  // ── 复习板块（优先级 + 轮次 + 真题索引）──
  hasReviewSections: true,
  knowledgeNodes: TEMPLATE_NODES,
  reviewData: {
    priorities: TEMPLATE_PRIORITIES,
    rounds: TEMPLATE_ROUNDS,
    examEntries: TEMPLATE_EXAM_ENTRIES,
    coursewareRows: TEMPLATE_COURSEWARE_ROWS,
  },

  // ── 考试概览（分值 + 策略表）──
  examOverview: {
    tipText: '题型：选择题 + 简答题 + 计算题，闭卷 120 分钟',
    scoreHeaders: ['题型', '分值', '说明'],
    scoreRows: [
      ['选择题', '~30分', '基础概念'],
      ['简答题', '~30分', '概念解释 + 分析'],
      ['计算题', '~40分', '手算 + 推导'],
    ],
    strategyHeaders: ['优先级', '模块', '策略'],
    strategyRows: [
      ['必拿分', '计算题', '练熟公式和解题模板'],
      ['高频', '简答题', '背核心概念定义'],
      ['保底', '选择题', '考前刷一遍概念'],
    ],
  },

  // ── 课件 PDF（可选）──
  slideSourceDir: '',   // 填写 PDF 目录路径
  slidePdfs: {},        // { s1: '课件.pdf' }

  moduleLoader: (moduleId: string) => import(`./modules/module-${moduleId}.ts`).then(m => m.default),
};
export const courseConfig = templateConfig;
