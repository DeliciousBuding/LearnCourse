/** Course registry — add new courses here */
import type { ReviewConfig } from '@learncourse/framework/types';

// Static imports — add your course configs here
import { templateConfig } from './template/config';
// import { aiIntroConfig } from './ai-intro/config';

export interface CourseEntry {
  slug: string;
  title: string;
  config: ReviewConfig;
}

export const COURSES: CourseEntry[] = [
  { slug: 'template', title: 'Template Course', config: templateConfig },
  // { slug: 'ai-intro', title: '人工智能导论', config: aiIntroConfig },
];

export const DEFAULT_COURSE = 'template';

export function getCourseSlug(): string {
  return new URLSearchParams(location.search).get('course') || DEFAULT_COURSE;
}
