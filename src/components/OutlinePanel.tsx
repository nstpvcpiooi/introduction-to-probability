import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface OutlineGroup {
  heading: HeadingItem;
  children: HeadingItem[];
}

interface OutlinePanelProps {
  pageId: string;
}

function groupHeadings(items: HeadingItem[]): OutlineGroup[] {
  const groups: OutlineGroup[] = [];
  for (const item of items) {
    if (item.level === 1 || groups.length === 0) {
      groups.push({ heading: item, children: [] });
    } else {
      groups[groups.length - 1].children.push(item);
    }
  }
  return groups;
}

export function OutlinePanel({ pageId }: OutlinePanelProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Gather headings from the content area after render
    const timer = setTimeout(() => {
      const contentArea = document.querySelector('.content-page');
      if (!contentArea) return;

      const els = contentArea.querySelectorAll('h2, h3');
      const items: HeadingItem[] = [];

      els.forEach((el, index) => {
        // Automatically assign an id if missing
        if (!el.id) {
          const titleToSlugify = el.textContent || `heading-${index}`;
          // Create a simple slug from text
          const slug = titleToSlugify.toLowerCase()
            .replace(/[^a-z0-9A-Z]+/g, '-')
            .replace(/(^-|-$)+/g, '');
          el.id = slug || `heading-${index}`;
        }

        items.push({
          id: el.id,
          text: el.textContent || '',
          level: el.tagName === 'H2' ? 1 : 2,
        });
      });

      setHeadings(items);
      // Default: all groups with sub-headings start collapsed
      const groups = groupHeadings(items);
      setCollapsedIds(new Set(
        groups.filter(g => g.children.length > 0).map(g => g.heading.id)
      ));
    }, 100);

    return () => clearTimeout(timer);
  }, [pageId]);

  useEffect(() => {
    const headingEls = Array.from(
      document.querySelectorAll<HTMLElement>('h2, h3')
    );
    if (headingEls.length === 0) return;

    const visibleIds = new Set<string>();

    const updateActive = () => {
      // Among headings currently in the "active band", the topmost one
      // (in document order) is the one the reader is at.
      const topVisible = headingEls.find(el => visibleIds.has(el.id));
      if (topVisible) {
        setActiveId(topVisible.id);
        return;
      }
      // Nothing intersecting the band (e.g. a long gap after a heading) —
      // fall back to the last heading already scrolled past the top.
      let lastPassed: HTMLElement | null = null;
      for (const el of headingEls) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.2) {
          lastPassed = el;
        } else {
          break;
        }
      }
      if (lastPassed) setActiveId(lastPassed.id);
    };

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        }
        updateActive();
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    headingEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleCollapse = (id: string) => {
    setCollapsedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (headings.length === 0) return null;

  const groups = groupHeadings(headings);

  return (
    <aside className="outline-panel" aria-label="Phác thảo trang">
      <div className="outline-panel-label">Trong trang này</div>
      {groups.map(group => {
        const isCollapsed = collapsedIds.has(group.heading.id);
        const hasChildren = group.children.length > 0;
        // While collapsed, a hidden child heading can be the one in view —
        // promote the highlight to the parent so tracking never goes dark.
        const isActiveGroup = activeId === group.heading.id
          || (isCollapsed && group.children.some(c => c.id === activeId));

        return (
          <div key={group.heading.id} className="outline-group">
            <div className={`outline-item-row ${isActiveGroup ? 'active' : ''}`}>
              {hasChildren ? (
                <button
                  type="button"
                  className="outline-toggle"
                  onClick={() => toggleCollapse(group.heading.id)}
                  aria-label={isCollapsed ? 'Hiện mục con' : 'Ẩn mục con'}
                  aria-expanded={!isCollapsed}
                >
                  {isCollapsed
                    ? <ChevronRight size={13} />
                    : <ChevronDown size={13} />
                  }
                </button>
              ) : (
                <span className="outline-toggle-spacer" />
              )}
              <div
                className={`outline-item ${isActiveGroup ? 'active' : ''}`}
                onClick={() => scrollTo(group.heading.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && scrollTo(group.heading.id)}
              >
                {group.heading.text}
              </div>
            </div>

            {hasChildren && !isCollapsed && (
              <div className="outline-children">
                {group.children.map(child => (
                  <div
                    key={child.id}
                    className={`outline-item level-2 ${activeId === child.id ? 'active' : ''}`}
                    onClick={() => scrollTo(child.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && scrollTo(child.id)}
                  >
                    {child.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
