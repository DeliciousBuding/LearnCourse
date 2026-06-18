import type { ModuleContent } from '@learncourse/framework/types';

const content: ModuleContent = {
  meta: { id: 's1', number: 1, title: '模块一', icon: 'BookOpen', courseware: '课件.pptx', examRefs: '概念题 ~10分' },
  calloutText: '这个模块解决什么问题？一句话概括本模块的核心问题和学习目标。',
  sections: [
    {
      id: 's1-s1',
      title: '1.1 先理解直觉',
      content: [
        { type: 'prose', html: '<p>用生活化的例子引入核心概念，帮助建立直觉。不需要太学术——先让学生"感觉"到这个概念在说什么。</p>' },
      ],
    },
    {
      id: 's1-s2',
      title: '1.2 核心概念',
      content: [
        { type: 'card', title: '概念名称', body: '<div class="card">\n<p><strong>定义：</strong>精确定义。</p>\n<p><strong>公式：</strong>$E = mc^2$</p>\n<p><strong>一句话：</strong>通俗解释。</p>\n</div>' },
        { type: 'table', headers: ['<strong>概念</strong>', '<strong>解释</strong>', '<strong>例子</strong>'], rows: [['概念 A', '一句话解释', '具体例子'], ['概念 B', '一句话解释', '具体例子']] },
        { type: 'callout', variant: 'danger', text: '⚠️ 易错点：这里是常见的理解误区，考试常常考这个。$注意公式中的符号定义$。' },
        { type: 'prose', html: '<p>正文中可以用 $KaTeX$ 写行内公式，比如 $f(x) = x^2$。</p>' },
      ],
    },
    {
      id: 's1-s3',
      title: '1.3 动手试试',
      content: [
        { type: 'details', summary: '点击查看答案', body: '<div class="details-body">\n<p><strong>解题步骤：</strong></p>\n<ol>\n<li>第一步</li>\n<li>第二步</li>\n<li>第三步</li>\n</ol>\n</div>' },
        { type: 'code', language: 'python', code: '# 示例代码\ndef solve(x):\n    return x * 2' },
        { type: 'mermaid', id: 'demo-flow', chart: 'graph LR\n    A["输入"] --> B["处理"]\n    B --> C["输出"]' },
      ],
    },
    {
      id: 's1-s4',
      title: '1.4 考试怎么考',
      content: [
        { type: 'prose', html: '<h4>题型与分值</h4>' },
        { type: 'table', headers: ['题型', '分值', '考查内容'], rows: [['<strong>概念题</strong>', '<strong>~5分</strong>', '定义和基本理解'], ['<strong>计算题</strong>', '<strong>~10分</strong>', '手算和公式应用']] },
        { type: 'callout', variant: 'warning', text: '常考题型：给场景，要求用学过的概念分析问题。重点：理解概念的实际含义而非死记硬背。' },
      ],
    },
    {
      id: 's1-s5',
      title: '真题演练',
      content: [
        { type: 'examQuestions', ids: [] },
      ],
    },
    {
      id: 's1-s6',
      title: '小测验',
      content: [
        { type: 'quiz', ids: [] },
      ],
    },
  ],
};

export default content;
