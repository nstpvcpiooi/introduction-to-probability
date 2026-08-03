import { useState, useCallback } from 'react';
import { Topbar } from '@/components/Topbar';
import { Sidebar } from '@/components/Sidebar';
import { OutlinePanel } from '@/components/OutlinePanel';
import { chapters, getAdjacentPages, getPageTitle } from '@/data/textbook';
import type { PageId } from '@/data/textbook';
import {
  PageIntro,
  PageSets,
  PageRealNumbers,
  PageLimits,
  PageDerivative,
  PageIntegral,
  PageTaylor,
  PageChapterOverview,
  PagePlaceholder,
} from '@/pages/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PageRenderer({ pageId }: { pageId: PageId }) {
  switch (pageId) {
    case 'ch0': return <PageIntro />;
    case 'ch0-s1': return <PageSets />;
    case 'ch0-s2': return <PageRealNumbers />;
    case 'ch1-s1': return <PageLimits />;
    case 'ch2-s1': return <PageDerivative />;
    case 'ch4-s2': return <PageIntegral />;
    case 'ch5-s4': return <PageTaylor />;
    default: {
      // Check if it's a chapter overview
      const ch = chapters.find(c => c.id === pageId);
      if (ch) return <PageChapterOverview chapterId={pageId} />;
      return <PagePlaceholder pageId={pageId} />;
    }
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('ch0');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useCallback((id: PageId) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { prev, next } = getAdjacentPages(currentPage);

  return (
    <div className="app-layout">
      <Topbar
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className={`main-content`}>
        <article className="content-page">
          <PageRenderer key={currentPage} pageId={currentPage} />

          {/* Bottom navigation */}
          <nav className="page-nav" aria-label="Điều hướng trang">
            {prev ? (
              <button className="nav-btn" onClick={() => navigate(prev)}>
                <span className="nav-btn-label">
                  <ChevronLeft size={12} style={{ display: 'inline' }} /> Trước
                </span>
                <span className="nav-btn-title">{getPageTitle(prev)}</span>
              </button>
            ) : <div style={{ flex: 1 }} />}

            {next && (
              <button className="nav-btn next" onClick={() => navigate(next)}>
                <span className="nav-btn-label">
                  Tiếp theo <ChevronRight size={12} style={{ display: 'inline' }} />
                </span>
                <span className="nav-btn-title">{getPageTitle(next)}</span>
              </button>
            )}
          </nav>
        </article>
      </main>

      <OutlinePanel pageId={currentPage} />
    </div>
  );
}
