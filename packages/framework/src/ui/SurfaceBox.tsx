import { ReactNode } from 'react';

interface SurfaceBoxProps {
  children: ReactNode;
  border?: string;
  borderRadius?: number;
  padding?: string;
  margin?: string;
}

/** Shared surface container — the base box used by Card, TierCard, QuizBlock, etc. */
export function SurfaceBox({ children, border, borderRadius = 10, padding = '1.4rem 1.6rem', margin = '0.85rem 0' }: SurfaceBoxProps) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: border ?? '1px solid var(--color-border)',
      borderRadius,
      padding,
      margin,
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    }}>
      {children}
    </div>
  );
}
