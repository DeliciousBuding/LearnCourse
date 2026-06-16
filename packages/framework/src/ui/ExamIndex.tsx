import type { ExamIndexEntry } from '../types';
import { ComparisonTable } from './ComparisonTable';

const entries: ExamIndexEntry[] = [
  { year: '2025', name: '期中试卷', questions: '选择+填空+简答+计算', notes: '重点：搜索、CSP、逻辑' },
  { year: '2025', name: '期末 A 卷', questions: '选择+判断+简答+计算+综合', notes: '全覆盖，含 BN 推理和 HMM' },
  { year: '2023', name: '期末 A 卷', questions: '类似 2025 题型', notes: '参考价值高' },
];

export function ExamIndex() {
  return (
    <section id="s-index">
      <h2>历年真题 & 课件索引</h2>

      <h3>真题</h3>
      <ComparisonTable
        headers={['年份', '名称', '题型', '备注']}
        rows={entries.map(e => [e.year, e.name, e.questions, e.notes])}
      />

      <h3>课件清单</h3>
      <ComparisonTable
        headers={['序号', '课件名称', '类型']}
        rows={[
          ['01', '智能 Agent', 'PPTX'], ['02', '搜索', 'PPTX'], ['03', '有信息搜索', 'PPTX'],
          ['04', '超越经典搜索算法', 'PPTX'], ['05', '对抗搜索', 'PPTX'], ['07', '约束满足问题', 'PPTX'],
          ['08', '逻辑 Agent', 'PPTX'], ['09', '一阶逻辑', 'PPTX'], ['10', '不确定性的量化', 'PDF'],
          ['11', '贝叶斯网络', 'PPTX'], ['12', '时间上的概率推理', 'PPTX'],
          ['13', '从 NLP 到 LLM', 'PPTX'], ['14', '计算机视觉', 'PPTX'],
        ]}
      />
    </section>
  );
}
