import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'accent' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md';
}

const colors: Record<string, { bg: string; fg: string }> = {
  accent:  { bg: 'var(--color-accent-soft)',  fg: 'var(--color-accent)' },
  success: { bg: 'var(--color-success-soft)', fg: 'var(--color-success)' },
  danger:  { bg: 'var(--color-danger-soft)',  fg: 'var(--color-danger)' },
  warning: { bg: 'var(--color-warning-soft)', fg: 'var(--color-warning)' },
};

export function Badge({ children, variant = 'accent', size = 'sm' }: BadgeProps) {
  const c = colors[variant];
  return (
    <span style={{
      display: 'inline-block',
      padding: size === 'sm' ? '0.1em 0.55em' : '0.15em 0.65em',
      borderRadius: '999px',
      fontSize: size === 'sm' ? '0.75rem' : '0.8rem',
      fontWeight: 700,
      background: c.bg,
      color: c.fg,
    }}>
      {children}
    </span>
  );
}
