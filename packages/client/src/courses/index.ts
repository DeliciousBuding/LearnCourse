/** Auto-discovery course registry — drop a directory in courses/ and it works */
import type { ReviewConfig } from '@learncourse/framework/types';

export interface CourseEntry {
  slug: string;
  title: string;
  config: ReviewConfig;
}

// Auto-discover all course configs. Add a course by creating courses/<slug>/config.ts
const modules = import.meta.glob<{ courseConfig: ReviewConfig }>('./*/config.ts', { eager: true });

export const COURSES: CourseEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/')[1]; // './my-course/config.ts' → 'my-course'
    const config = mod.courseConfig;
    return { slug, title: config.title, config };
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'zh'));

export const DEFAULT_COURSE = COURSES[0]?.slug ?? 'template';

export function getCourseSlug(): string {
  return new URLSearchParams(location.search).get('course') || DEFAULT_COURSE;
}
