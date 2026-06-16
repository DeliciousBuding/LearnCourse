/** Course registry — add new courses here */

export interface CourseEntry {
  slug: string;
  title: string;
  loader: () => Promise<{ default: import('@learncourse/framework/types').ReviewConfig }>;
}

export const COURSES: CourseEntry[] = [
  {
    slug: 'template',
    title: 'Template Course',
    loader: () => import('@courses/template/config'),
  },
  // Add more courses here:
  // {
  //   slug: 'ai-intro',
  //   title: '人工智能导论',
  //   loader: () => import('@courses/ai-intro/config'),
  // },
];

export const DEFAULT_COURSE = 'template';

export function getCourseSlug(): string {
  return new URLSearchParams(location.search).get('course') || DEFAULT_COURSE;
}
