import { Menu, Search } from 'lucide-react';
import { textbookMeta } from '@/data/textbook';

interface TopbarProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Topbar({ onToggleSidebar, searchQuery, onSearchChange }: TopbarProps) {
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
          <Search size={14} className="topbar-search-icon" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search"
          />
        </div>
      </div>
    </header>
  );
}
