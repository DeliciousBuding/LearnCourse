import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getEffectiveTheme(mode: ThemeMode): 'light' | 'dark' {
  return mode === 'auto' ? getSystemTheme() : mode;
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('html-theme');
    return (saved === 'light' || saved === 'dark' || saved === 'auto') ? saved : 'auto';
  });

  const effective = getEffectiveTheme(mode);

  useEffect(() => {
    const root = document.documentElement;
    if (effective === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('html-theme', mode);
  }, [effective, mode]);

  // Listen for system preference changes when in auto mode
  useEffect(() => {
    if (mode !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const sys = getSystemTheme();
      const root = document.documentElement;
      if (sys === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode(prev => {
      if (prev === 'auto') {
        return getSystemTheme() === 'dark' ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, []);

  return { mode, effective, toggle, setMode };
}
