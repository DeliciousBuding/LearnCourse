// CS course review page data — extracted from framework components
import type { ExamIndexEntry } from '@learncourse/framework/types';

export const CS_EXAM_TIP = '计算机系统 · 从应用程序到底层实现。题型：简答 + 程序填空 + 栈帧分析 + 链接/ECF综合 + VM+Cache联合大题。';

export const CS_SCORE_HEADERS = ['题型', '2025 期末', '分值'];
export const CS_SCORE_ROWS = [
  ['简答题（浮点数/信息表示）', '第 1 题', '10 分'],
  ['程序填空（C↔汇编）', '第 2-3 题', '25 分'],
  ['栈帧分析', '第 4 题', '15 分'],
  ['综合题（链接+信号+优化）', '第 5 题', '25 分'],
  ['VM + Cache 联合大题', '第 6 题', '25 分'],
];

export const CS_STRATEGY_HEADERS = ['层级', '模块', '策略'];
export const CS_STRATEGY_ROWS = [
  ['必拿分', 'VM 地址翻译 + Cache 地址分解（联合 50 分）', '必须会画流程图、会手算'],
  ['必拿分', '程序机器级表示（栈帧+汇编填空，40 分）', '能手绘栈帧、逐行追踪'],
  ['高频概念', '链接（强弱符号+重定位）+ ECF（fork+信号）', '能标准简答 + 代码分析'],
  ['保底覆盖', '浮点数、安全攻击、性能优化', '掌握公式和概念'],
];

export const CS_SLIDE_PDFS: Record<string, string> = {};

export const CS_EXAM_ENTRIES: ExamIndexEntry[] = [
  { year: '2025', name: '期末 A 卷', questions: '简答(10) + 程序填空(25) + 栈帧(15) + 综合(25) + VM+Cache(25)', notes: '重点：VM地址翻译、Cache分解、栈帧分析' },
  { year: '2025', name: '期中试卷', questions: '选择+填空+简答', notes: '重点：整数/浮点数、汇编基础' },
];

export const CS_COURSEWARE_ROWS = [
  ['01', '计算机系统概论', 'PPTX'],
  ['02', '信息的位与表示', 'PPTX'],
  ['03', '编译工具链', 'PPTX'],
  ['04', '汇编语言基础', 'PPTX'],
  ['05', '整数与浮点数', 'PPTX'],
  ['06', '程序的机器级表示', 'PPTX'],
  ['07', '链接', 'PPTX'],
  ['08', '异常控制流与进程', 'PPTX'],
  ['09', '存储层次与Cache', 'PPTX'],
  ['10', '虚拟内存', 'PPTX'],
  ['11', '性能优化', 'PPTX'],
  ['12', '安全攻击与防御', 'PPTX'],
];

// ── 复习优先级（三个 Tier）──
export const CS_PRIORITIES: PriorityModule[] = [
  {
    tier: 1,
    title: '汇编与栈帧',
    modules: ['s4', 's6'],
    reason: '程序填空25分+栈帧分析15分，能不能及格看这两题。重点练C↔汇编互推和栈帧图手绘。',
  },
  {
    tier: 2,
    title: '整数浮点与链接',
    modules: ['s5', 's7'],
    reason: '简答题10分+分析题10分。补码/IEEE754/ELF/重定位都是套路题，模板背熟就能拿分。',
  },
  {
    tier: 3,
    title: 'Cache/VM/异常/优化',
    modules: ['s9', 's10', 's8', 's11'],
    reason: '联合大题50分+分析题15分。地址翻译全链路是区分高分的关键。必须练到闭眼能画流程图。',
  },
];

// ── 四轮复习计划 ──
export const CS_ROUNDS: ReviewRound[] = [
  {
    round: 1,
    title: '概念速通',
    days: 'Day 1-2',
    tasks: [
      '快速刷 s1-s12 核心概念，完成全部 quiz',
      '画出知识主线图：比特表示→汇编→机器级表示→链接→ECF→Cache→VM',
      '标记薄弱模块，记录到复习笔记',
    ],
    goal: '知道每个模块在讲什么，建立全局框架，识别薄弱环节',
  },
  {
    round: 2,
    title: '计算攻坚',
    days: 'Day 3-5',
    tasks: [
      's5: IEEE 754 手算专项——正数/负数/小数三种情况各练3题',
      's6: 汇编追踪专项——C→汇编填空 + 给定汇编写等价C代码各练5题',
      's9: Cache 地址拆分专项——直接映射/2路/4路组相联各练3题',
      's10: 地址翻译专项——单级页表+多级页表+TLB联合翻译各练2题',
    ],
    goal: '每种计算题能独立做对，不看答案不查公式',
  },
  {
    round: 3,
    title: '真题实战',
    days: 'Day 6-7',
    tasks: [
      '限时 120 分钟完成 2025 期末 A 卷',
      '逐题对照答案分析：哪些是计算错误、哪些是概念不清、哪些是时间不够',
      '重做错题直至正确，总结每类题的固定解题步骤',
      '如果还有 2024 期末卷，限时再练一套，对比两次薄弱点',
    ],
    goal: '找到最适合自己的时间分配策略和薄弱点，确保考场上不慌',
  },
  {
    round: 4,
    title: '考前复盘',
    days: '考试前半天',
    tasks: [
      '过一遍自检清单，逐条确认（不打勾的不进考场）',
      '重点回顾 Tier 1：汇编分块法四模式（序言/循环体/条件分支/收尾）+ 栈帧图四要素',
      '重点回顾 Tier 3：地址翻译全链路流程图（闭眼能画：VA→TLB→页表→PA→Cache 每一步）',
      '浏览知识图谱确认无遗漏，不再做新题',
    ],
    goal: '查漏补缺，巩固核心流程，进入考试状态',
  },
];