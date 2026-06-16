import { KnowledgeMap } from './KnowledgeMap';

export function KnowledgeMainline() {
  return (
    <section id="s-mainline">
      <h2>整体知识主线</h2>
      <KnowledgeMap />
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
        上图展示了 AI 课程的四大知识维度：感知 → 推理 → 学习 → 行动。建议按从左到右、从上到下的顺序复习。
      </p>
    </section>
  );
}
