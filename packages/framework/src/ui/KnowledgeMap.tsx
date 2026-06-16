export function KnowledgeMap() {
  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1rem 1.5rem', margin: '0.85rem 0 1.5rem', overflowX: 'auto' }}>
      <svg viewBox="0 0 900 180" style={{ width: '100%', maxWidth: 900, minWidth: 700, height: 'auto' }}>
        <text x="20" y="32" fontSize="10" fill="var(--color-text-tertiary)">感知</text>
        <text x="20" y="70" fontSize="10" fill="var(--color-text-tertiary)">推理</text>
        <text x="20" y="108" fontSize="10" fill="var(--color-text-tertiary)">学习</text>
        <text x="20" y="146" fontSize="10" fill="var(--color-text-tertiary)">行动</text>

        <rect x="50" y="18" width="100" height="28" rx="14" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.2" />
        <text x="100" y="36" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-accent)">CV & CNN</text>

        <rect x="50" y="54" width="120" height="28" rx="14" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.2" />
        <text x="110" y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-accent)">逻辑 & FOL</text>
        <line x1="100" y1="46" x2="110" y2="54" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="190" y="54" width="100" height="28" rx="14" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.2" />
        <text x="240" y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-accent)">不确定 & BN</text>
        <line x1="170" y1="68" x2="190" y2="68" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="310" y="54" width="80" height="28" rx="14" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.2" />
        <text x="350" y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-accent)">HMM</text>
        <line x1="290" y1="68" x2="310" y2="68" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="50" y="92" width="110" height="28" rx="14" fill="var(--color-success-soft)" stroke="var(--color-success)" strokeWidth="1.2" />
        <text x="105" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-success)">机器学习</text>
        <line x1="105" y1="82" x2="105" y2="92" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="180" y="92" width="100" height="28" rx="14" fill="var(--color-success-soft)" stroke="var(--color-success)" strokeWidth="1.2" />
        <text x="230" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-success)">强化学习</text>
        <line x1="160" y1="106" x2="180" y2="106" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="310" y="92" width="110" height="28" rx="14" fill="var(--color-success-soft)" stroke="var(--color-success)" strokeWidth="1.2" />
        <text x="365" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-success)">深度学习CNN</text>
        <line x1="280" y1="106" x2="310" y2="106" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="50" y="130" width="130" height="28" rx="14" fill="var(--color-warning-soft)" stroke="var(--color-warning)" strokeWidth="1.2" />
        <text x="115" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-warning)">Agent & PEAS</text>
        <line x1="115" y1="120" x2="115" y2="130" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="200" y="130" width="110" height="28" rx="14" fill="var(--color-warning-soft)" stroke="var(--color-warning)" strokeWidth="1.2" />
        <text x="255" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-warning)">搜索 & CSP</text>
        <line x1="180" y1="144" x2="200" y2="144" stroke="var(--color-border)" strokeWidth="1" />

        <rect x="330" y="130" width="90" height="28" rx="14" fill="var(--color-warning-soft)" stroke="var(--color-warning)" strokeWidth="1.2" />
        <text x="375" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-warning)">对抗搜索</text>
        <line x1="310" y1="144" x2="330" y2="144" stroke="var(--color-border)" strokeWidth="1" />
      </svg>
    </div>
  );
}
