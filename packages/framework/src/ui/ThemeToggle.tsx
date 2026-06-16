import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  effective: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ effective, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-code-bg)] transition-colors text-[var(--color-text-secondary)]"
      title={effective === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
    >
      {effective === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
