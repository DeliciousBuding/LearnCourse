import { ReactNode } from 'react';
import { ProseBlock } from './ProseBlock';

interface CardProps { variant?: 'accent' | 'danger' | 'warning' | 'success'; title?: string; children: ReactNode; }

const borderColor: Record<string, string> = {
  accent: 'var(--color-accent)', danger: 'var(--color-danger)',
  warning: 'var(--color-warning)', success: 'var(--color-success)',
};

export function Card({ variant, title, children }: CardProps) {
  // If children is a ProseBlock wrapping body HTML that contains <div class="card">,
  // that inner wrapper is redundant — the Card component IS the card wrapper.
  // We let it pass through since DOMPurify will handle it.
  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 12, padding: '1.4rem 1.6rem', margin: '0.85rem 0',
      boxShadow: 'var(--shadow-sm)',
      ...(variant ? { borderTop: `3px solid ${borderColor[variant]}` } : {}),
    }}>
      {title && <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{title}</h4>}
      {children}
    </div>
  );
}
