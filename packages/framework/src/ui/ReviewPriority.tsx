import type { PriorityModule } from '../types';
import { TierCard } from './TierCard';

interface ReviewPriorityProps {
  priorities?: PriorityModule[];
}

export function ReviewPriority({ priorities }: ReviewPriorityProps) {
  if (!priorities || priorities.length === 0) return null;
  return (
    <section id="s-priority">
      <h2>最终复习优先级</h2>
      {priorities.map(p => (
        <TierCard key={p.tier} tier={p.tier} title={p.title}>
          <p style={{ marginBottom: '0.5rem' }}><strong>涉及模块：</strong>{p.modules.join('、')}</p>
          <p style={{ color: 'var(--color-text-secondary)' }}>{p.reason}</p>
        </TierCard>
      ))}
    </section>
  );
}
