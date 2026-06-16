import { useLocalStorage } from '../hooks/useLocalStorage';
import { Check } from 'lucide-react';

interface StudiedToggleProps { moduleId: string; onToggle?: (studied: boolean) => void; }

export function StudiedToggle({ moduleId, onToggle }: StudiedToggleProps) {
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
      title={isStudied ? '标记为未复习' : '标记为已复习'}
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
