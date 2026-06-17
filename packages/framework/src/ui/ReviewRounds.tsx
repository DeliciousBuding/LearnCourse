import type { ReviewRound } from '../types';
import { Card } from './Card';

interface ReviewRoundsProps {
  rounds?: ReviewRound[];
}

export function ReviewRounds({ rounds }: ReviewRoundsProps) {
  if (!rounds || rounds.length === 0) return null;
  return (
    <section id="s-rounds">
      <h2>四轮复习顺序</h2>
      {rounds.map(r => (
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
