import type { KnowledgeNode } from '../types';
import { KnowledgeMap } from './KnowledgeMap';

interface KnowledgeMainlineProps {
  nodes?: KnowledgeNode[];
  description?: string;
}

export function KnowledgeMainline({ nodes, description }: KnowledgeMainlineProps) {
  return (
    <section id="s-mainline">
      <h2>整体知识主线</h2>
      {nodes && nodes.length > 0 && <KnowledgeMap nodes={nodes} />}
      {description && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
          {description}
        </p>
      )}
    </section>
  );
}
