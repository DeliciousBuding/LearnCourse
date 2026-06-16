import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface DetailBlockProps { summary: string; children: React.ReactNode; open?: boolean; }

export function DetailBlock({ summary, children, open: controlledOpen }: DetailBlockProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  useEffect(() => {
    if (controlledOpen !== undefined) setInternalOpen(controlledOpen);
  }, [controlledOpen]);

  return (
    <details open={isOpen} style={{
      margin: '0.85rem 0', border: '1px solid var(--color-border)',
      borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
    }} onToggle={e => {
      if (controlledOpen === undefined) setInternalOpen(e.currentTarget.open);
    }}>
      <summary style={{
        padding: '0.7rem 1.15rem', cursor: 'pointer', fontWeight: 600,
        background: 'var(--color-surface)', userSelect: 'none', fontSize: '0.93rem',
        listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <ChevronRight size={16} style={{
          color: 'var(--color-accent)', flexShrink: 0, transition: 'transform .2s',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
        }} />
        {summary}
      </summary>
      <div style={{ padding: '1rem 1.15rem', borderTop: '1px solid var(--color-border)' }}>
        {children}
      </div>
    </details>
  );
}
