'use client';

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = usePlaygroundStore();

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
  }, [theme]);

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="
        p-2.5 rounded-lg bg-surface border border-border
        text-muted hover:text-foreground hover:border-accent/30
        transition-all duration-200 cursor-pointer
      "
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
