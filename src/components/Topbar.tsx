import { Menu, Sun, Moon } from 'lucide-react';
import { textbookMeta } from '@/data/textbook';

interface TopbarProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Topbar({ onToggleSidebar, searchQuery, onSearchChange, theme, onToggleTheme }: TopbarProps) {
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

      <div className="topbar-search">
        <div className="topbar-search-wrap">
          <svg className="topbar-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search"
          />
        </div>
      </div>

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
