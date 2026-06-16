import type { ReviewConfig } from '@learncourse/framework/types';

export const templateConfig: ReviewConfig = {
  title: '课程名称',
  subtitle: '复习大纲',
  badge: '2026',

  navGroups: [
    {
      title: '概览',
      links: [
        { href: '#s0', label: '课程画像' },
        { href: '#s-mainline', label: '知识主线' },
      ],
    },
    {
      title: '模块',
      links: [
        { href: '#s1', label: '1. 模块一' },
      ],
    },
    {
      title: '指南',
      links: [
        { href: '#s-checklist', label: '自检清单' },
      ],
    },
  ],

  modules: [
    { id: 's1', number: 1, title: '模块一', icon: 'BookOpen', courseware: '', examRefs: '' },
  ],

  quizzes: [],
  examQuestions: [],
  checklist: [
    { id: '1', text: '理解核心概念' },
    { id: '2', text: '能完成课后练习' },
  ],

  moduleLoader: (moduleId: string) => import(`./modules/module-${moduleId}.ts`).then(m => m.default),
};
