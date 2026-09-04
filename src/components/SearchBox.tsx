import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { buildSearchEntries, searchPages, type SearchEntry, type SearchPageData, type SearchResult } from '@/lib/search';

interface SearchBoxProps {
  pages: SearchPageData[];
  onNavigate: (pageId: string) => void;
}

/** Topbar search: matches page titles and page content (diacritic-insensitive),
 * shown as a dropdown of results with a breadcrumb and a matching snippet.
 * The content index is built lazily on first focus, not at app start —
 * folding/stripping ~100 pages of markdown isn't free, so it's deferred
 * until the reader actually opens the search box. */
export function SearchBox({ pages, onNavigate }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const entriesRef = useRef<SearchEntry[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ensureIndex = (): SearchEntry[] => {
    if (!entriesRef.current) {
      entriesRef.current = buildSearchEntries(pages);
    }
    return entriesRef.current;
  };

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    return searchPages(query, ensureIndex());
    // entriesRef is a stable lazily-built cache, not reactive state — the
    // query is what should trigger recomputation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const go = (pageId: string) => {
    onNavigate(pageId);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const close = () => {
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (!isOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = results[activeIndex];
      if (chosen) go(chosen.pageId);
    }
  };

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div className="topbar-search" ref={containerRef}>
      <div className="topbar-search-wrap">
        <Search size={14} className="topbar-search-icon" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            ensureIndex();
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Tìm kiếm nội dung sách"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-results-listbox"
          autoComplete="off"
        />

        {showDropdown && (
          <div className="search-results" id="search-results-listbox" role="listbox">
            {results.length === 0 ? (
              <div className="search-results-empty">Không tìm thấy kết quả cho "{query.trim()}"</div>
            ) : (
              results.map((r, i) => (
                <button
                  key={r.pageId}
                  type="button"
                  className={`search-result-item${i === activeIndex ? ' active' : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => go(r.pageId)}
                  role="option"
                  aria-selected={i === activeIndex}
                >
                  <FileText size={14} className="search-result-icon" />
                  <span className="search-result-body">
                    {r.breadcrumb && <span className="search-result-breadcrumb">{r.breadcrumb}</span>}
                    <span className="search-result-title">{r.title}</span>
                    {r.snippet && <span className="search-result-snippet">{r.snippet}</span>}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
