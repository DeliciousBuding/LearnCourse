import type { ModuleContent } from 'learncourse/types';

const content: ModuleContent = {
  meta: { id: 's1', number: 1, title: '模块一', icon: 'BookOpen', courseware: '', examRefs: '' },
  calloutText: '这个模块解决什么问题？',
  sections: [
    {
      id: 's1-s1',
      title: '核心概念',
      content: [
        { type: 'prose', html: '<p>在这里写你的教学内容。支持 <strong>Markdown 风格</strong>的 HTML。</p>' },
        { type: 'callout', variant: 'tip', text: '这是一个提示框。variant 可选 info / tip / warning / danger' },
        { type: 'card', title: '概念卡片', body: '<p>卡片适合放重点概念和公式。支持 $KaTeX$ 数学公式。</p>' },
        { type: 'table', headers: ['列1', '列2'], rows: [['数据1', '数据2']] },
        { type: 'code', language: 'python', code: 'print("hello world")' },
        { type: 'details', summary: '点击展开更多', body: '<p>隐藏的详细内容。</p>' },
        { type: 'mermaid', id: 'demo', chart: 'graph TD\n    A[开始] --> B[结束]' },
      ],
    },
    {
      id: 's1-s2',
      title: '章节测验',
      content: [
        { type: 'quiz', ids: [] },
      ],
    },
  ],
};

export default content;
