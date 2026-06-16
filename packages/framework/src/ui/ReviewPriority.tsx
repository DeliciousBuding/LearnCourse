import type { PriorityModule } from '../types';
import { TierCard } from './TierCard';

const ps: PriorityModule[] = [
  { tier: 1, title: '必考 · 计算 + 概念', modules: ['搜索 (BFS/DFS/UCS/A*)', 'CSP', '贝叶斯网络', '命题逻辑 & 一阶逻辑'], reason: '每年必出，分值最重。能直接拉开分差的模块。' },
  { tier: 2, title: '高频 · 概念为主', modules: ['Agent & PEAS', '对抗搜索', 'HMM', '机器学习基础'], reason: '出题频率高，但以简答/概念为主，性价比极高。' },
  { tier: 3, title: '了解 · 概念 + 趋势', modules: ['超越经典搜索', '强化学习', '深度学习 & CNN'], reason: '偶尔出概念题，通常不考复杂计算。重点关注关键术语和思想。' },
];

export function ReviewPriority() {
  return (
    <section id="s-priority">
      <h2>最终复习优先级</h2>
      {ps.map(p => (
        <TierCard key={p.tier} tier={p.tier} title={p.title}>
          <p style={{ marginBottom: '0.5rem' }}><strong>涉及模块：</strong>{p.modules.join('、')}</p>
          <p style={{ color: 'var(--color-text-secondary)' }}>{p.reason}</p>
        </TierCard>
      ))}
    </section>
  );
}
