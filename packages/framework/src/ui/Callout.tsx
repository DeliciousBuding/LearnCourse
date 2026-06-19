import type { CalloutVariant } from '../types';
import { Info, Lightbulb, AlertTriangle, ShieldAlert } from 'lucide-react';
import { fixLatex, renderKatexInHtml } from '../lib/math';

interface CalloutProps { variant: CalloutVariant; children?: React.ReactNode; text?: string; }

const cfg: Record<CalloutVariant, { icon: typeof Info; border: string; bg: string }> = {
  info:    { icon: Info,           border: 'var(--color-accent)',  bg: 'var(--color-accent-soft)' },
  tip:     { icon: Lightbulb,      border: 'var(--color-success)', bg: 'var(--color-success-soft)' },
  warning: { icon: AlertTriangle,  border: 'var(--color-warning)', bg: 'var(--color-warning-soft)' },
  danger:  { icon: ShieldAlert,    border: 'var(--color-danger)',  bg: 'var(--color-danger-soft)' },
};

export function Callout({ variant, children, text }: CalloutProps) {
  const c = cfg[variant] ?? cfg.info; // fallback to 'info' for unknown variants
  return (
    <div style={{
      padding: '0.85rem 1.15rem', borderRadius: 10, margin: '0.85rem 0',
      fontSize: '0.93rem', lineHeight: 1.7,
      border: `1px solid var(--color-border)`,
      background: c.bg,
    }}>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <c.icon size={20} style={{ color: c.border, flexShrink: 0, marginTop: 2 }} />
        <div style={{ minWidth: 0 }}>{children ?? <span dangerouslySetInnerHTML={{ __html: renderKatexInHtml(fixLatex(text || '')) }} />}</div>
      </div>
    </div>
  );
}
