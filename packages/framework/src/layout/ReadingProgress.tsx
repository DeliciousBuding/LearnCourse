import { useScrollProgress } from '../hooks/useScrollProgress';

export function ReadingProgress() {
  const progress = useScrollProgress();
  return (
    <div id="reading-progress" style={{ position: 'relative' }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: 'var(--color-accent)',
        transition: 'width 150ms ease',
      }} />
      <span style={{
        position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
        fontSize: '0.6rem', color: 'var(--color-text-tertiary)',
        fontWeight: 600, fontVariantNumeric: 'tabular-nums',
      }}>
        {progress}%
      </span>
    </div>
  );
}
