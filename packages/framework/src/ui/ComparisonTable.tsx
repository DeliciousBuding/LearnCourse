import { renderInlineMath } from '../lib/math';

interface ComparisonTableProps { headers: string[]; rows: string[][]; }

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div style={{ overflowX: 'auto', margin: '0.85rem 0' }}>
      <table>
        <thead><tr>{headers.map((h, i) => <th key={i} dangerouslySetInnerHTML={{ __html: renderInlineMath(h) }} />)}</tr></thead>
        <tbody>{rows.map((row, ri) => (
          <tr key={ri}>{row.map((cell, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: renderInlineMath(cell) }} />)}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}
