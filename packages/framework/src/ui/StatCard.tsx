interface StatCardProps { value: string | number; label: string; variant?: 'accent' | 'success' | 'warning'; }

const colors = { accent: 'var(--color-accent)', success: 'var(--color-success)', warning: 'var(--color-warning)' };

export function StatCard({ value, label, variant = 'accent' }: StatCardProps) {
  return (
    <div style={{ flex: 1, minWidth: 130, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
      <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'Georgia, serif', lineHeight: 1.2, color: colors[variant] }}>
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>{label}</div>
    </div>
  );
}
