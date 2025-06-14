import type { Theme } from './types';

export const getDefaultTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
};

export const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.warn('Failed to save theme preference', e);
  }
};