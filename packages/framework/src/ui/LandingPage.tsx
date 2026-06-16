import { BookOpen, ArrowRight } from 'lucide-react';
import type { CourseEntry } from '@courses/index';

interface LandingPageProps {
  courses: CourseEntry[];
  onSelectCourse: (slug: string) => void;
}

export function LandingPage({ courses, onSelectCourse }: LandingPageProps) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: 'var(--color-bg)', color: 'var(--color-text)',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '5rem 2rem 3rem' }}>
        <h1 style={{
          fontFamily: 'Georgia, "Noto Serif SC", serif', fontSize: '2.8rem',
          fontWeight: 700, margin: 0, letterSpacing: '-0.02em',
          color: 'var(--color-text)',
        }}>
          LearnCourse
        </h1>
        <p style={{
          fontSize: '1.15rem', color: 'var(--color-text-secondary)',
          margin: '1rem 0 0', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.7,
        }}>
          开源交互式学习框架。构建结构化复习站点，AI 助手陪练，真题+测验一应俱全。
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/DeliciousBuding/LearnCourse" target="_blank" rel="noopener"
            style={{ padding: '0.6rem 1.5rem', borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
            GitHub →
          </a>
          {courses.length > 0 && (
            <button onClick={() => onSelectCourse(courses[0].slug)}
              style={{ padding: '0.6rem 1.5rem', borderRadius: 10, border: 'none', background: 'var(--color-accent)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
              进入课程 <ArrowRight size={14} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
            </button>
          )}
        </div>
      </div>

      {/* Course cards */}
      <div style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '0 2rem 4rem', width: '100%' }}>
        <h2 style={{ fontFamily: 'Georgia, "Noto Serif SC", serif', fontSize: '1.3rem', margin: '0 0 1.5rem', color: 'var(--color-text-secondary)' }}>
          课程列表
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {courses.map(course => (
            <div
              key={course.slug}
              onClick={() => onSelectCourse(course.slug)}
              style={{
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: 12, padding: '1.5rem', cursor: 'pointer',
                transition: 'all 120ms ease', boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <BookOpen size={20} style={{ color: 'var(--color-accent)' }} />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>{course.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
                点击进入课程 →
              </p>
            </div>
          ))}
          {courses.length === 0 && (
            <p style={{ color: 'var(--color-text-tertiary)', gridColumn: '1/-1' }}>
              暂无课程。在 <code>courses/index.ts</code> 中注册课程。
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
        LearnCourse · Open-source learning framework · MIT License
      </footer>
    </div>
  );
}
