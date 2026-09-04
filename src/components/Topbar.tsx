import { Menu, Sun, Moon } from 'lucide-react';
import { textbookMeta } from '@/data/textbook';
import { SearchBox } from './SearchBox';
import type { SearchPageData } from '@/lib/search';

interface TopbarProps {
  onToggleSidebar: () => void;
  searchPages: SearchPageData[];
  onNavigate: (pageId: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Topbar({ onToggleSidebar, searchPages, onNavigate, theme, onToggleTheme }: TopbarProps) {
  return (
    <header className="topbar">
      <button
        className="sidebar-toggle"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={18} />
      </button>

      <span className="topbar-brand">{textbookMeta.title}</span>

      <SearchBox pages={searchPages} onNavigate={onNavigate} />

      <div className="topbar-actions">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
