import type { ReviewRound } from '../types';
import { Card } from './Card';

const rs: ReviewRound[] = [
  { round: 1, title: '概念速通', days: 'Day 1-2', tasks: ['快速浏览所有模块的核心概念', '完成全部 quiz 自测', '标记薄弱模块'], goal: '建立全局框架，识别薄弱环节' },
  { round: 2, title: '计算攻坚', days: 'Day 3-5', tasks: ['A* 搜索手工推演', 'CSP 回溯 + 约束传播', '贝叶斯网络推理计算', '一阶逻辑归结证明'], goal: '确保计算题不丢分' },
  { round: 3, title: '真题实战', days: 'Day 6-7', tasks: ['限时完成 2025 期末 A 卷', '逐题对照答案分析', '重做错题直至正确'], goal: '熟悉题型和答题节奏' },
  { round: 4, title: '考前复盘', days: '考试前半天', tasks: ['过一遍自检清单', '重点回顾 T1 模块核心公式', '浏览知识图谱确认无遗漏'], goal: '查漏补缺，进入考试状态' },
];

export function ReviewRounds() {
  return (
    <section id="s-rounds">
      <h2>四轮复习顺序</h2>
      {rs.map(r => (
        <Card key={r.round} variant="accent">
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            第 {r.round} 轮：{r.title}
            <span style={{ fontSize: '0.75rem', fontWeight: 400, padding: '0.15em 0.55em', borderRadius: 999, background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
              {r.days}
            </span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            目标：{r.goal}
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {r.tasks.map((t, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{t}</li>)}
          </ul>
        </Card>
      ))}
    </section>
  );
}
