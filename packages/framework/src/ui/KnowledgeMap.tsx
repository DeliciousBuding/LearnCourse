import type { KnowledgeNode } from '../types';

const ROW_LABELS = ['感知', '推理', '学习', '行动'];
const ROW_Y = [18, 54, 92, 130];
const ROW_HEIGHT = 28;

function nodeColor(node: KnowledgeNode): { soft: string; solid: string } {
  switch (node.color) {
    case 'success': return { soft: 'var(--color-success-soft)', solid: 'var(--color-success)' };
    case 'warning': return { soft: 'var(--color-warning-soft)', solid: 'var(--color-warning)' };
    default: return { soft: 'var(--color-accent-soft)', solid: 'var(--color-accent)' };
  }
}

export function KnowledgeMap({ nodes }: { nodes?: KnowledgeNode[] }) {
  if (!nodes || nodes.length === 0) return null;

  const CELL_W = 110;
  const GAP = 20;
  const SVG_W = Math.max(900, nodes.length * (CELL_W + GAP) + 70);
  const SVG_H = 180;

  // Group nodes by row, then assign x positions
  const rows: KnowledgeNode[][] = [[], [], [], []];
  for (const n of nodes) {
    const r = n.row >= 0 && n.row < 4 ? n.row : 0;
    rows[r].push(n);
  }

  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1rem 1.5rem', margin: '0.85rem 0 1.5rem', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: '100%', maxWidth: SVG_W, minWidth: 700, height: 'auto' }}>
        {ROW_LABELS.map((label, ri) => (
          <text key={label} x="20" y={ROW_Y[ri] + ROW_HEIGHT / 2 + 4} fontSize="10" fill="var(--color-text-tertiary)">
            {label}
          </text>
        ))}
        {rows.map((rowNodes, ri) => {
          return rowNodes.map((node, ci) => {
            const x = 50 + ci * (CELL_W + GAP);
            const y = ROW_Y[ri];
            const colors = nodeColor(node);
            // Estimate text width: CJK ~14px per char, Latin ~7px
            const textLen = [...node.label].reduce((w, c) => w + (c.charCodeAt(0) > 255 ? 14 : 7), 0);
            const rectW = Math.max(textLen + 30, 60);
            return (
              <g key={node.id}>
                <rect x={x} y={y} width={rectW} height={ROW_HEIGHT} rx="14" fill={colors.soft} stroke={colors.solid} strokeWidth="1.2" />
                <text x={x + rectW / 2} y={y + ROW_HEIGHT / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={colors.solid}>
                  {node.label}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
