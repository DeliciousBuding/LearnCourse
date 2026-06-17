import { useLocalStorage } from '../hooks/useLocalStorage';
import { useI18n } from '../hooks/useI18n';
import { Check } from 'lucide-react';

interface StudiedToggleProps { moduleId: string; onToggle?: (studied: boolean) => void; }

export function StudiedToggle({ moduleId, onToggle }: StudiedToggleProps) {
  const { t } = useI18n();
  const [studied, setStudied] = useLocalStorage<Record<string, boolean>>('ai-modules', {});
  const isStudied = !!studied[moduleId];

  const toggle = () => {
    const next = { ...studied, [moduleId]: !isStudied };
    setStudied(next);
    onToggle?.(!isStudied);
  };

  return (
    <button
      onClick={toggle}
      title={isStudied ? t('studied.markUnstudied') : t('studied.markStudied')}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 20, height: 20, border: `2px solid ${isStudied ? 'var(--color-success)' : 'var(--color-border)'}`,
        borderRadius: 4, cursor: 'pointer', verticalAlign: 'middle', marginLeft: '0.5rem',
        background: isStudied ? 'var(--color-success)' : 'transparent',
        transition: 'all 120ms ease',
      }}
    >
      {isStudied && <Check size={12} color="#fff" strokeWidth={3} />}
    </button>
  );
}
