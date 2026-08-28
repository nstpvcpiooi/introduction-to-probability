import { useState } from 'react';
import { chapters } from '@/data/textbook';
import type { PageId } from '@/data/textbook';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (id: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => {
      // Auto-expand the chapter containing current page
      const initial = new Set<string>();
      for (const ch of chapters) {
        if (ch.id === currentPage || ch.sections.some(s => s.id === currentPage)) {
          initial.add(ch.id);
        }
      }
      return initial;
    }
  );

  const toggleChapter = (chId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chId)) next.delete(chId);
      else next.add(chId);
      return next;
    });
  };

  const handleNavigate = (id: PageId) => {
    onNavigate(id);
    // Expand chapter if navigating to a section
    for (const ch of chapters) {
      if (ch.sections.some(s => s.id === id)) {
        setExpandedChapters(prev => new Set([...prev, ch.id]));
      }
    }
    onClose();
  };

  const isChapterActive = (ch: typeof chapters[0]) => {
    return ch.id === currentPage || ch.sections.some(s => s.id === currentPage);
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar ${isOpen ? 'mobile-open' : ''}`} aria-label="Mục lục">
        <div className="sidebar-section">
          <div className="sidebar-section-label">Mục lục</div>

          {chapters.map(ch => {
            const isExpanded = expandedChapters.has(ch.id);
            const isActive = isChapterActive(ch);

            return (
              <div key={ch.id} className="chapter-group">
                <div
                  className={`chapter-header ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    toggleChapter(ch.id);
                    handleNavigate(ch.id);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleNavigate(ch.id)}
                >
                  <span className="chapter-number">{ch.number}</span>
                  <span style={{ flex: 1, lineHeight: 1.3 }}>{ch.title}</span>
                  {isExpanded
                    ? <ChevronDown size={14} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
                    : <ChevronRight size={14} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
                  }
                </div>

                {isExpanded && (
                  <div className="chapter-sections">
                    {ch.sections.map(sec => (
                      <div
                        key={sec.id}
                        className={`section-link ${currentPage === sec.id ? 'active' : ''}`}
                        onClick={() => handleNavigate(sec.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && handleNavigate(sec.id)}
                      >
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          minWidth: '2.25rem',
                        }}>
                          {sec.number}
                        </span>
                        <span>{sec.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
