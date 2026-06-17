import type { ExamIndexEntry } from '../types';
import { ComparisonTable } from './ComparisonTable';

interface ExamIndexProps {
  examEntries?: ExamIndexEntry[];
  coursewareRows?: string[][];
}

export function ExamIndex({ examEntries, coursewareRows }: ExamIndexProps) {
  const hasExamEntries = examEntries && examEntries.length > 0;
  const hasCourseware = coursewareRows && coursewareRows.length > 0;
  if (!hasExamEntries && !hasCourseware) return null;

  return (
    <section id="s-index">
      <h2>历年真题 & 课件索引</h2>

      {hasExamEntries && (
        <>
          <h3>真题</h3>
          <ComparisonTable
            headers={['年份', '名称', '题型', '备注']}
            rows={examEntries!.map(e => [e.year, e.name, e.questions, e.notes])}
          />
        </>
      )}

      {hasCourseware && (
        <>
          <h3>课件清单</h3>
          <ComparisonTable
            headers={['序号', '课件名称', '类型']}
            rows={coursewareRows}
          />
        </>
      )}
    </section>
  );
}
