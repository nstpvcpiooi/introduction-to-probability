import { useEffect, useState } from 'react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface OutlinePanelProps {
  pageId: string;
}

export function OutlinePanel({ pageId }: OutlinePanelProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Gather headings from the content area after render
    const timer = setTimeout(() => {
      const contentArea = document.querySelector('.content-page');
      if (!contentArea) return;

      const els = contentArea.querySelectorAll('h2, h3, [data-toc-title]');
      const items: HeadingItem[] = [];
      
      els.forEach((el, index) => {
        // Automatically assign an id if missing
        if (!el.id) {
          const titleToSlugify = el.getAttribute('data-toc-title') || el.textContent || `heading-${index}`;
          // Create a simple slug from text
          const slug = titleToSlugify.toLowerCase()
            .replace(/[^a-z0-9A-Z]+/g, '-')
            .replace(/(^-|-$)+/g, '');
          el.id = slug || `heading-${index}`;
        }
        
        items.push({
          id: el.id,
          text: el.getAttribute('data-toc-title') || el.textContent || '',
          level: el.tagName === 'H2' ? 1 : 2,
        });
      });
      
      setHeadings(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [pageId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    const els = document.querySelectorAll('h2, h3, [data-toc-title]');
    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (headings.length === 0) return null;

  return (
    <aside className="outline-panel" aria-label="Phác thảo trang">
      <div className="outline-panel-label">Trong trang này</div>
      {headings.map(h => (
        <div
          key={h.id}
          className={`outline-item ${h.level === 2 ? 'level-2' : ''} ${activeId === h.id ? 'active' : ''}`}
          onClick={() => scrollTo(h.id)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && scrollTo(h.id)}
        >
          {h.text}
        </div>
      ))}
    </aside>
  );
}
