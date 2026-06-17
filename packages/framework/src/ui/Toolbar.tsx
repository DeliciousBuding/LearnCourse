import { useI18n } from '../hooks/useI18n';

interface ToolbarProps { onExpandAll: () => void; onCollapseAll: () => void; }

export function Toolbar({ onExpandAll, onCollapseAll }: ToolbarProps) {
  const { t } = useI18n();
  const btnStyle: React.CSSProperties = {
    padding: '0.3rem 0.85rem', borderRadius: 999, fontSize: '0.8rem',
    border: '1px solid var(--color-border)', background: 'var(--color-surface)',
    color: 'var(--color-text-secondary)', cursor: 'pointer', transition: 'all 120ms ease',
  };
  return (
    <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0 0.85rem', flexWrap: 'wrap' }}>
      <button style={btnStyle} onClick={onExpandAll}>{t('toolbar.expandAll')}</button>
      <button style={btnStyle} onClick={onCollapseAll}>{t('toolbar.collapseAll')}</button>
    </div>
  );
}
