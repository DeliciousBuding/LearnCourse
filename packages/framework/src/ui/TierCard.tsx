interface TierCardProps { tier: 1|2|3; title: string; children: React.ReactNode; }

const tc = {
  1: { badgeBg: 'var(--color-danger-soft)', badgeColor: 'var(--color-danger)', border: 'var(--color-danger)', badge: 'T1 · 必考' },
  2: { badgeBg: 'var(--color-warning-soft)', badgeColor: 'var(--color-warning)', border: 'var(--color-warning)', badge: 'T2 · 高频' },
  3: { badgeBg: 'var(--color-success-soft)', badgeColor: 'var(--color-success)', border: 'var(--color-success)', badge: 'T3 · 了解' },
};

export function TierCard({ tier, title, children }: TierCardProps) {
  const c = tc[tier];
  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 12, padding: '1.4rem 1.6rem', margin: '0.85rem 0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    }}>
      <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {title}
        <span style={{ fontSize: '0.75rem', padding: '0.1em 0.55em', borderRadius: 999, background: c.badgeBg, color: c.badgeColor, fontWeight: 700 }}>
          {c.badge}
        </span>
      </h3>
      <div style={{ fontSize: '0.93rem' }}>{children}</div>
    </div>
  );
}
