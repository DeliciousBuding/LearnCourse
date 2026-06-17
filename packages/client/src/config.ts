import type { ReviewConfig, KnowledgeNode } from '@learncourse/framework/types';
import { QUIZZES } from './quizzes';
import { EXAM_QUESTIONS } from './examQuestions';
import { CHECKLIST } from './checklist';
import { AI_INTRO_PRIORITIES, AI_INTRO_ROUNDS, AI_INTRO_EXAM_ENTRIES, AI_INTRO_COURSEWARE_ROWS } from './reviewData';

const AI_INTRO_NODES: KnowledgeNode[] = [
  { id: 'cv',       label: 'CV & CNN',       row: 0, color: 'accent' },
  { id: 'logic',    label: '逻辑 & FOL',       row: 1, color: 'accent' },
  { id: 'uncertain',label: '不确定 & BN',      row: 1, color: 'accent' },
  { id: 'hmm',      label: 'HMM',             row: 1, color: 'accent' },
  { id: 'ml',       label: '机器学习',         row: 2, color: 'success' },
  { id: 'rl',       label: '强化学习',         row: 2, color: 'success' },
  { id: 'dl',       label: '深度学习CNN',      row: 2, color: 'success' },
  { id: 'agent',    label: 'Agent & PEAS',    row: 3, color: 'warning' },
  { id: 'search',   label: '搜索 & CSP',       row: 3, color: 'warning' },
  { id: 'advsearch',label: '对抗搜索',         row: 3, color: 'warning' },
];

export const aiIntroConfig: ReviewConfig = {
  title: '人工智能导论',
  subtitle: '期末复习大纲',
  badge: '2026 春 · 闭卷 120min',

  navGroups: [
    {
      title: '考试概览',
      links: [
        { href: '#s0', label: '考试画像 & 分值分布' },
        { href: '#s-mainline', label: '整体知识主线' },
      ],
    },
    {
      title: '模块详解',
      links: [
        { href: '#s1', label: '1. 基本概念与 Agent' },
        { href: '#s2', label: '2. 搜索算法' },
        { href: '#s3', label: '3. 超越经典搜索' },
        { href: '#s4', label: '4. 对抗搜索' },
        { href: '#s5', label: '5. 约束满足问题 CSP' },
        { href: '#s6', label: '6. 命题逻辑与一阶逻辑' },
        { href: '#s7', label: '7. 不确定性 & 贝叶斯网络' },
        { href: '#s8', label: '8. HMM 时间概率推理' },
        { href: '#s9', label: '9. 机器学习' },
        { href: '#s10', label: '10. 强化学习' },
        { href: '#s11', label: '11. 深度学习 & CNN' },
      ],
    },
    {
      title: '复习指南',
      links: [
        { href: '#s-priority', label: '最终复习优先级' },
        { href: '#s-rounds', label: '四轮复习顺序' },
        { href: '#s-checklist', label: '考前自检清单' },
        { href: '#s-index', label: '真题 & 课件索引' },
      ],
    },
  ],

  modules: [
    { id: 's1', number: 1, title: '基本概念与 Agent', icon: 'Bot', courseware: '01 智能 Agent.pptx', examRefs: '2025 期中一(1)' },
    { id: 's2', number: 2, title: '搜索算法', icon: 'Search', courseware: '02 搜索.pptx', examRefs: '2025 期中二, 2025 期末一(3)' },
    { id: 's3', number: 3, title: '超越经典搜索', icon: 'Mountain', courseware: '04 超越经典搜索算法.pptx', examRefs: '2025 期中三(2)' },
    { id: 's4', number: 4, title: '对抗搜索', icon: 'Swords', courseware: '05 对抗搜索.pptx', examRefs: '2025 期中三(3), 2025 期末一(1)(2)' },
    { id: 's5', number: 5, title: '约束满足问题 CSP', icon: 'Grid3x3', courseware: '07 约束满足问题.pptx', examRefs: '2025 期中一(3), 2025 期末一(4)(5)' },
    { id: 's6', number: 6, title: '命题逻辑与一阶逻辑', icon: 'Sigma', courseware: '08 逻辑 Agent.pptx', examRefs: '2025 期中一(4)(5), 2025 期末一(6)' },
    { id: 's7', number: 7, title: '不确定性 & 贝叶斯网络', icon: 'Dice5', courseware: '11 贝叶斯网络.pptx', examRefs: '2025 期末一(7)(8)' },
    { id: 's8', number: 8, title: '时间概率推理 (HMM)', icon: 'Timeline', courseware: '12 时间上的概率推理.pptx', examRefs: '2025 期末计算' },
    { id: 's9', number: 9, title: '机器学习', icon: 'Cpu', courseware: '13 从 NLP 到 LLM.pptx', examRefs: '2025 期末简答' },
    { id: 's10', number: 10, title: '强化学习', icon: 'RefreshCw', courseware: '课程补充', examRefs: '概念题为主' },
    { id: 's11', number: 11, title: '深度学习 & CNN', icon: 'Layers', courseware: '14 计算机视觉.pptx', examRefs: '概念题为主' },
  ],

  quizzes: QUIZZES,
  examQuestions: EXAM_QUESTIONS,
  checklist: CHECKLIST,

  hasReviewSections: true,
  knowledgeNodes: AI_INTRO_NODES,
  reviewData: { priorities: AI_INTRO_PRIORITIES, rounds: AI_INTRO_ROUNDS, examEntries: AI_INTRO_EXAM_ENTRIES, coursewareRows: AI_INTRO_COURSEWARE_ROWS },
  slidePdfs: { s1:'01智能AGENT.pdf',s2:'02搜索.pdf',s3:'04超越经典搜索算法.pdf',s4:'05对抗搜索.pdf',s5:'07约束满足问题.pdf',s6:'08逻辑Agent.pdf',s7:'11贝叶斯网络.pdf',s8:'12时间上的概率推理.pdf',s9:'13从自然语言处理到大语言模型.pdf',s10:'13从自然语言处理到大语言模型.pdf',s11:'14计算机视觉.pdf' },
  moduleLoader: (moduleId: string) => import(`./modules/module-${moduleId}.ts`).then(m => m.default),
};
export const courseConfig = aiIntroConfig as ReviewConfig;
