import { useScrollProgress } from '../hooks/useScrollProgress';

export function ReadingProgress() {
  const progress = useScrollProgress();
  return <div id="reading-progress" style={{ width: `${progress}%` }} />;
}
