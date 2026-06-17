import { useEffect, useRef, useState } from 'react';

export interface MasteryRadarProps {
  topics: { label: string; score: number; color?: string }[];
  size?: number;
}

const DEFAULT_COLOR = 'var(--color-accent)';
const FILL_COLOR = 'rgba(212, 138, 107, 0.15)';
const LABEL_COLOR = 'var(--color-text-secondary)';
const AXIS_COLOR = 'var(--color-accent)';
const FONT_SIZE = 10;

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angle: number,
): { x: number; y: number } {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export function MasteryRadar({ topics, size = 280 }: MasteryRadarProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger mount animation on next frame
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!topics || topics.length === 0) return null;

  const n = topics.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 20; // leave room for labels
  const angleStep = (2 * Math.PI) / n;
  // Start from top (-PI/2)
  const startAngle = -Math.PI / 2;

  // Build polygon points
  const points: string[] = [];
  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep;
    const r = maxR * Math.max(0, Math.min(1, topics[i].score));
    const { x, y } = polarToCartesian(cx, cy, r, angle);
    points.push(`${x},${y}`);
  }
  const polygonPoints = points.join(' ');

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          animation: mounted ? 'radarFill 0.5s ease-out forwards' : undefined,
          opacity: mounted ? undefined : 0,
        }}
      >
        {/* Background grid rings */}
        {[0.25, 0.5, 0.75, 1].map((level) => {
          const r = maxR * level;
          const ringPoints: string[] = [];
          const steps = Math.max(n * 4, 32);
          for (let i = 0; i <= steps; i++) {
            const a = (2 * Math.PI * i) / steps;
            const { x, y } = polarToCartesian(cx, cy, r, a);
            ringPoints.push(`${x},${y}`);
          }
          return (
            <polygon
              key={`ring-${level}`}
              points={ringPoints.join(' ')}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Axes */}
        {topics.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const end = polarToCartesian(cx, cy, maxR, angle);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke={AXIS_COLOR}
              strokeWidth={1}
              opacity={0.6}
            />
          );
        })}

        {/* Filled polygon */}
        <polygon
          points={polygonPoints}
          fill={FILL_COLOR}
          stroke={DEFAULT_COLOR}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* Dots at vertices */}
        {topics.map((topic, i) => {
          const angle = startAngle + i * angleStep;
          const r = maxR * Math.max(0, Math.min(1, topic.score));
          const { x, y } = polarToCartesian(cx, cy, r, angle);
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={3}
              fill={topic.color ?? DEFAULT_COLOR}
            />
          );
        })}

        {/* Labels */}
        {topics.map((topic, i) => {
          const angle = startAngle + i * angleStep;
          const labelR = maxR + 14;
          const { x, y } = polarToCartesian(cx, cy, labelR, angle);
          // Text-anchor based on quadrant
          let textAnchor: 'start' | 'middle' | 'end' = 'middle';
          // Heuristic: left half → end, right half → start, top/bottom → middle
          const deg = ((angle * 180) / Math.PI + 360) % 360;
          if (deg > 10 && deg < 170) textAnchor = 'start';
          else if (deg > 190 && deg < 350) textAnchor = 'end';

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fill={LABEL_COLOR}
              fontSize={FONT_SIZE}
              fontFamily="Inter, system-ui, sans-serif"
            >
              {topic.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
