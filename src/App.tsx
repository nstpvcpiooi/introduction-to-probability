import { useState, useCallback, useEffect } from 'react';
import { Topbar } from '@/components/Topbar';
import { Sidebar } from '@/components/Sidebar';
import { OutlinePanel } from '@/components/OutlinePanel';
import { chapters, getAdjacentPages, getPageTitle } from '@/data/textbook';
import type { PageId } from '@/data/textbook';
import {
  PageIntro,
  PageSets,
  PageRealNumbers,
  PageTaylor,
  PageChapterOverview,
  PagePlaceholder,
} from '@/pages/content';
import { MarkdownPage } from '@/components/MarkdownPage';
import introRaw from '@/content/intro.md?raw';
import ch0s1Raw from '@/content/ch0/s1.md?raw';
import ch1OverviewRaw from '@/content/ch1/overview.md?raw';
import ch1s1Raw from '@/content/ch1/s1.md?raw';
import ch1s2Raw from '@/content/ch1/s2.md?raw';
import ch1s3Raw from '@/content/ch1/s3.md?raw';
import ch1s4Raw from '@/content/ch1/s4.md?raw';
import ch1s5Raw from '@/content/ch1/s5.md?raw';
import ch1s6Raw from '@/content/ch1/s6.md?raw';
import ch1s7Raw from '@/content/ch1/s7.md?raw';
import ch1s8Raw from '@/content/ch1/s8.md?raw';
import ch1s9Raw from '@/content/ch1/s9.md?raw';
import ch2s1Raw from '@/content/ch2/s1.md?raw';
import ch2s2Raw from '@/content/ch2/s2.md?raw';
import ch2s3Raw from '@/content/ch2/s3.md?raw';
import ch2s5Raw from '@/content/ch2/s5.md?raw';
import ch2s7Raw from '@/content/ch2/s7.md?raw';
import ch2s8Raw from '@/content/ch2/s8.md?raw';
import ch2s9Raw from '@/content/ch2/s9.md?raw';
import ch2s10Raw from '@/content/ch2/s10.md?raw';
import ch2s11Raw from '@/content/ch2/s11.md?raw';
import ch3s1Raw from '@/content/ch3/s1.md?raw';
import ch3s2Raw from '@/content/ch3/s2.md?raw';
import ch3s4Raw from '@/content/ch3/s4.md?raw';
import ch3s5Raw from '@/content/ch3/s5.md?raw';
import ch3s6Raw from '@/content/ch3/s6.md?raw';
import ch3s7Raw from '@/content/ch3/s7.md?raw';
import ch3s9Raw from '@/content/ch3/s9.md?raw';
import ch3s10Raw from '@/content/ch3/s10.md?raw';
import ch3s11Raw from '@/content/ch3/s11.md?raw';
import ch3s12Raw from '@/content/ch3/s12.md?raw';
import ch4s1Raw from '@/content/ch4/s1.md?raw';
import ch4s2Raw from '@/content/ch4/s2.md?raw';
import ch4s3Raw from '@/content/ch4/s3.md?raw';
import ch4s5Raw from '@/content/ch4/s5.md?raw';
import ch4s6Raw from '@/content/ch4/s6.md?raw';
import ch4s7Raw from '@/content/ch4/s7.md?raw';
import ch4s8Raw from '@/content/ch4/s8.md?raw';
import ch4s9Raw from '@/content/ch4/s9.md?raw';
import ch4s10Raw from '@/content/ch4/s10.md?raw';
import ch4s11Raw from '@/content/ch4/s11.md?raw';
import ch4s12Raw from '@/content/ch4/s12.md?raw';
import ch5s1Raw from '@/content/ch5/s1.md?raw';
import ch5s2Raw from '@/content/ch5/s2.md?raw';
import ch5s3Raw from '@/content/ch5/s3.md?raw';
import ch5s4Raw from '@/content/ch5/s4.md?raw';
import ch5s5Raw from '@/content/ch5/s5.md?raw';
import ch5s6Raw from '@/content/ch5/s6.md?raw';
import ch5s8Raw from '@/content/ch5/s8.md?raw';
import ch5s10Raw from '@/content/ch5/s10.md?raw';
import ch6s1Raw from '@/content/ch6/s1.md?raw';
import ch6s2Raw from '@/content/ch6/s2.md?raw';
import ch6s3Raw from '@/content/ch6/s3.md?raw';
import ch6s4Raw from '@/content/ch6/s4.md?raw';
import ch6s5Raw from '@/content/ch6/s5.md?raw';
import ch6s7Raw from '@/content/ch6/s7.md?raw';
import ch6s8Raw from '@/content/ch6/s8.md?raw';
import ch6s9Raw from '@/content/ch6/s9.md?raw';
import ch6s10Raw from '@/content/ch6/s10.md?raw';
import ch7s1Raw from '@/content/ch7/s1.md?raw';
import ch7s2Raw from '@/content/ch7/s2.md?raw';
import ch7s3Raw from '@/content/ch7/s3.md?raw';
import ch7s4Raw from '@/content/ch7/s4.md?raw';
import ch7s5Raw from '@/content/ch7/s5.md?raw';
import ch7s6Raw from '@/content/ch7/s6.md?raw';
import ch7s7Raw from '@/content/ch7/s7.md?raw';
import ch7s8Raw from '@/content/ch7/s8.md?raw';
import ch8s1Raw from '@/content/ch8/s1.md?raw';
import ch8s2Raw from '@/content/ch8/s2.md?raw';
import ch8s3Raw from '@/content/ch8/s3.md?raw';
import ch8s4Raw from '@/content/ch8/s4.md?raw';
import ch8s5Raw from '@/content/ch8/s5.md?raw';
import ch8s6Raw from '@/content/ch8/s6.md?raw';
import ch8s7Raw from '@/content/ch8/s7.md?raw';
import ch8s8Raw from '@/content/ch8/s8.md?raw';
import ch8s9Raw from '@/content/ch8/s9.md?raw';
import ch9s1Raw from '@/content/ch9/s1.md?raw';
import ch9s3Raw from '@/content/ch9/s3.md?raw';
import ch9s4Raw from '@/content/ch9/s4.md?raw';
import ch9s5Raw from '@/content/ch9/s5.md?raw';
import ch9s7Raw from '@/content/ch9/s7.md?raw';
import ch9s8Raw from '@/content/ch9/s8.md?raw';
import ch9s9Raw from '@/content/ch9/s9.md?raw';
import ch10s1Raw from '@/content/ch10/s1.md?raw';
import ch10s2Raw from '@/content/ch10/s2.md?raw';
import ch10s3Raw from '@/content/ch10/s3.md?raw';
import ch10s5Raw from '@/content/ch10/s5.md?raw';
import ch10s6Raw from '@/content/ch10/s6.md?raw';
import ch10s7Raw from '@/content/ch10/s7.md?raw';
import ch11s1Raw from '@/content/ch11/s1.md?raw';
import ch11s2Raw from '@/content/ch11/s2.md?raw';
import ch11s3Raw from '@/content/ch11/s3.md?raw';
import ch11s4Raw from '@/content/ch11/s4.md?raw';
import ch11s5Raw from '@/content/ch11/s5.md?raw';
import ch11s6Raw from '@/content/ch11/s6.md?raw';
import ch11s7Raw from '@/content/ch11/s7.md?raw';
import ch12s1Raw from '@/content/ch12/s1.md?raw';
import ch12s2Raw from '@/content/ch12/s2.md?raw';
import ch12s3Raw from '@/content/ch12/s3.md?raw';
import ch12s4Raw from '@/content/ch12/s4.md?raw';
import ch12s5Raw from '@/content/ch12/s5.md?raw';
import ch13s1Raw from '@/content/ch13/s1.md?raw';
import ch13s2Raw from '@/content/ch13/s2.md?raw';
import ch13s3Raw from '@/content/ch13/s3.md?raw';
import ch13s4Raw from '@/content/ch13/s4.md?raw';
import ch13s5Raw from '@/content/ch13/s5.md?raw';
import ch13s6Raw from '@/content/ch13/s6.md?raw';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function PageRenderer({ pageId }: { pageId: PageId }) {

  switch (pageId) {
    case 'ch0': return (
      <>
        <div className="page-header">
          <div className="page-eyebrow">Chương 0</div>
          <h1 className="page-title">Mở đầu</h1>
        </div>
        <MarkdownPage content={introRaw} />
      </>
    );
    case 'ch1': return (
      <PageChapterOverview chapterId={pageId}>
        <MarkdownPage content={ch1OverviewRaw} />
      </PageChapterOverview>
    );
    case 'ch0-s1': return <SectionPage pageId={pageId} content={ch0s1Raw} />;
    case 'ch0-s2': return <PageRealNumbers />;

    case 'ch1-s1': return <SectionPage pageId={pageId} content={ch1s1Raw} />;

    case 'ch1-s2': return <SectionPage pageId={pageId} content={ch1s2Raw} />;

    case 'ch1-s3': return <SectionPage pageId={pageId} content={ch1s3Raw} />;

    case 'ch1-s4': return <SectionPage pageId={pageId} content={ch1s4Raw} />;

    case 'ch1-s5': return <SectionPage pageId={pageId} content={ch1s5Raw} />;

    case 'ch1-s6': return <SectionPage pageId={pageId} content={ch1s6Raw} />;

    case 'ch1-s7': return <SectionPage pageId={pageId} content={ch1s7Raw} />;

    case 'ch1-s8': return <SectionPage pageId={pageId} content={ch1s8Raw} />;

    case 'ch1-s9': return <SectionPage pageId={pageId} content={ch1s9Raw} />;

    case 'ch2-s1': return <SectionPage pageId={pageId} content={ch2s1Raw} />;

    case 'ch2-s2': return <SectionPage pageId={pageId} content={ch2s2Raw} />;

    case 'ch2-s3': return <SectionPage pageId={pageId} content={ch2s3Raw} />;

    case 'ch2-s5': return <SectionPage pageId={pageId} content={ch2s5Raw} />;

    case 'ch2-s7': return <SectionPage pageId={pageId} content={ch2s7Raw} />;

    case 'ch2-s8': return <SectionPage pageId={pageId} content={ch2s8Raw} />;

    case 'ch2-s9': return <SectionPage pageId={pageId} content={ch2s9Raw} />;

    case 'ch2-s10': return <SectionPage pageId={pageId} content={ch2s10Raw} />;

    case 'ch2-s11': return <SectionPage pageId={pageId} content={ch2s11Raw} />;

    case 'ch3-s1': return <SectionPage pageId={pageId} content={ch3s1Raw} />;

    case 'ch3-s2': return <SectionPage pageId={pageId} content={ch3s2Raw} />;

    case 'ch3-s4': return <SectionPage pageId={pageId} content={ch3s4Raw} />;

    case 'ch3-s5': return <SectionPage pageId={pageId} content={ch3s5Raw} />;

    case 'ch3-s6': return <SectionPage pageId={pageId} content={ch3s6Raw} />;

    case 'ch3-s7': return <SectionPage pageId={pageId} content={ch3s7Raw} />;

    case 'ch3-s9': return <SectionPage pageId={pageId} content={ch3s9Raw} />;

    case 'ch3-s10': return <SectionPage pageId={pageId} content={ch3s10Raw} />;

    case 'ch3-s11': return <SectionPage pageId={pageId} content={ch3s11Raw} />;

    case 'ch3-s12': return <SectionPage pageId={pageId} content={ch3s12Raw} />;

    case 'ch4-s1': return <SectionPage pageId={pageId} content={ch4s1Raw} />;

    case 'ch4-s2': return <SectionPage pageId={pageId} content={ch4s2Raw} />;

    case 'ch4-s3': return <SectionPage pageId={pageId} content={ch4s3Raw} />;

    case 'ch4-s5': return <SectionPage pageId={pageId} content={ch4s5Raw} />;

    case 'ch4-s6': return <SectionPage pageId={pageId} content={ch4s6Raw} />;

    case 'ch4-s7': return <SectionPage pageId={pageId} content={ch4s7Raw} />;

    case 'ch4-s8': return <SectionPage pageId={pageId} content={ch4s8Raw} />;

    case 'ch4-s9': return <SectionPage pageId={pageId} content={ch4s9Raw} />;

    case 'ch4-s10': return <SectionPage pageId={pageId} content={ch4s10Raw} />;

    case 'ch4-s11': return <SectionPage pageId={pageId} content={ch4s11Raw} />;

    case 'ch4-s12': return <SectionPage pageId={pageId} content={ch4s12Raw} />;

    case 'ch5-s1': return <SectionPage pageId={pageId} content={ch5s1Raw} />;

    case 'ch5-s2': return <SectionPage pageId={pageId} content={ch5s2Raw} />;

    case 'ch5-s3': return <SectionPage pageId={pageId} content={ch5s3Raw} />;

    case 'ch5-s4': return <SectionPage pageId={pageId} content={ch5s4Raw} />;

    case 'ch5-s5': return <SectionPage pageId={pageId} content={ch5s5Raw} />;

    case 'ch5-s6': return <SectionPage pageId={pageId} content={ch5s6Raw} />;

    case 'ch5-s8': return <SectionPage pageId={pageId} content={ch5s8Raw} />;

    case 'ch5-s10': return <SectionPage pageId={pageId} content={ch5s10Raw} />;

    case 'ch6-s1': return <SectionPage pageId={pageId} content={ch6s1Raw} />;

    case 'ch6-s2': return <SectionPage pageId={pageId} content={ch6s2Raw} />;

    case 'ch6-s3': return <SectionPage pageId={pageId} content={ch6s3Raw} />;

    case 'ch6-s4': return <SectionPage pageId={pageId} content={ch6s4Raw} />;

    case 'ch6-s5': return <SectionPage pageId={pageId} content={ch6s5Raw} />;

    case 'ch6-s7': return <SectionPage pageId={pageId} content={ch6s7Raw} />;

    case 'ch6-s8': return <SectionPage pageId={pageId} content={ch6s8Raw} />;

    case 'ch6-s9': return <SectionPage pageId={pageId} content={ch6s9Raw} />;

    case 'ch6-s10': return <SectionPage pageId={pageId} content={ch6s10Raw} />;

    case 'ch7-s1': return <SectionPage pageId={pageId} content={ch7s1Raw} />;

    case 'ch7-s2': return <SectionPage pageId={pageId} content={ch7s2Raw} />;

    case 'ch7-s3': return <SectionPage pageId={pageId} content={ch7s3Raw} />;

    case 'ch7-s4': return <SectionPage pageId={pageId} content={ch7s4Raw} />;

    case 'ch7-s5': return <SectionPage pageId={pageId} content={ch7s5Raw} />;

    case 'ch7-s6': return <SectionPage pageId={pageId} content={ch7s6Raw} />;

    case 'ch7-s7': return <SectionPage pageId={pageId} content={ch7s7Raw} />;

    case 'ch7-s8': return <SectionPage pageId={pageId} content={ch7s8Raw} />;

    case 'ch8-s1': return <SectionPage pageId={pageId} content={ch8s1Raw} />;

    case 'ch8-s2': return <SectionPage pageId={pageId} content={ch8s2Raw} />;

    case 'ch8-s3': return <SectionPage pageId={pageId} content={ch8s3Raw} />;

    case 'ch8-s4': return <SectionPage pageId={pageId} content={ch8s4Raw} />;

    case 'ch8-s5': return <SectionPage pageId={pageId} content={ch8s5Raw} />;

    case 'ch8-s6': return <SectionPage pageId={pageId} content={ch8s6Raw} />;

    case 'ch8-s7': return <SectionPage pageId={pageId} content={ch8s7Raw} />;

    case 'ch8-s8': return <SectionPage pageId={pageId} content={ch8s8Raw} />;

    case 'ch8-s9': return <SectionPage pageId={pageId} content={ch8s9Raw} />;

    case 'ch9-s1': return <SectionPage pageId={pageId} content={ch9s1Raw} />;

    case 'ch9-s3': return <SectionPage pageId={pageId} content={ch9s3Raw} />;

    case 'ch9-s4': return <SectionPage pageId={pageId} content={ch9s4Raw} />;

    case 'ch9-s5': return <SectionPage pageId={pageId} content={ch9s5Raw} />;

    case 'ch9-s7': return <SectionPage pageId={pageId} content={ch9s7Raw} />;

    case 'ch9-s8': return <SectionPage pageId={pageId} content={ch9s8Raw} />;

    case 'ch9-s9': return <SectionPage pageId={pageId} content={ch9s9Raw} />;

    case 'ch10-s1': return <SectionPage pageId={pageId} content={ch10s1Raw} />;

    case 'ch10-s2': return <SectionPage pageId={pageId} content={ch10s2Raw} />;

    case 'ch10-s3': return <SectionPage pageId={pageId} content={ch10s3Raw} />;

    case 'ch10-s5': return <SectionPage pageId={pageId} content={ch10s5Raw} />;

    case 'ch10-s6': return <SectionPage pageId={pageId} content={ch10s6Raw} />;

    case 'ch10-s7': return <SectionPage pageId={pageId} content={ch10s7Raw} />;

    case 'ch11-s1': return <SectionPage pageId={pageId} content={ch11s1Raw} />;

    case 'ch11-s2': return <SectionPage pageId={pageId} content={ch11s2Raw} />;

    case 'ch11-s3': return <SectionPage pageId={pageId} content={ch11s3Raw} />;

    case 'ch11-s4': return <SectionPage pageId={pageId} content={ch11s4Raw} />;

    case 'ch11-s5': return <SectionPage pageId={pageId} content={ch11s5Raw} />;

    case 'ch11-s6': return <SectionPage pageId={pageId} content={ch11s6Raw} />;

    case 'ch11-s7': return <SectionPage pageId={pageId} content={ch11s7Raw} />;

    case 'ch12-s1': return <SectionPage pageId={pageId} content={ch12s1Raw} />;

    case 'ch12-s2': return <SectionPage pageId={pageId} content={ch12s2Raw} />;

    case 'ch12-s3': return <SectionPage pageId={pageId} content={ch12s3Raw} />;

    case 'ch12-s4': return <SectionPage pageId={pageId} content={ch12s4Raw} />;

    case 'ch12-s5': return <SectionPage pageId={pageId} content={ch12s5Raw} />;

    case 'ch13-s1': return <SectionPage pageId={pageId} content={ch13s1Raw} />;

    case 'ch13-s2': return <SectionPage pageId={pageId} content={ch13s2Raw} />;

    case 'ch13-s3': return <SectionPage pageId={pageId} content={ch13s3Raw} />;

    case 'ch13-s4': return <SectionPage pageId={pageId} content={ch13s4Raw} />;

    case 'ch13-s5': return <SectionPage pageId={pageId} content={ch13s5Raw} />;

    case 'ch13-s6': return <SectionPage pageId={pageId} content={ch13s6Raw} />;


    case 'ch5-s4': return <PageTaylor />;
    default: {
      // Check if it's a chapter overview
      const ch = chapters.find(c => c.id === pageId);
      if (ch) return <PageChapterOverview chapterId={pageId} />;
      return <PagePlaceholder pageId={pageId} />;
    }
  }
}


function SectionPage({ pageId, content }: { pageId: string; content: string }) {
  const chapter = chapters.find(c => c.sections.some(s => s.id === pageId));
  const section = chapter?.sections.find(s => s.id === pageId);

  return (
    <>
      {section && (
        <div className="page-header">
          <div className="page-eyebrow">Mục {section.number}</div>
          <h1 className="page-title">{section.title}</h1>
        </div>
      )}
      <MarkdownPage content={content} />
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.slice(1);
    return (hash as PageId) || 'ch0';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync state to URL hash
  useEffect(() => {
    if (currentPage) {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentPage(hash as PageId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

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
        theme={theme}
        onToggleTheme={toggleTheme}
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
