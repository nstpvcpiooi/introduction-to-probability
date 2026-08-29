import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MathBox } from './MathBox';
import { ExerciseAIGuide } from './ExerciseAIGuide';
import { parseExercises } from '@/lib/exerciseParser';
import 'katex/dist/katex.min.css';

interface MarkdownPageProps {
  content: string;
  pageId: string;
}

interface GuideMount {
  tocTitle: string;
  question: string;
  el: HTMLDivElement;
}

export function MarkdownPage({ content, pageId }: MarkdownPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const exercises = useMemo(() => parseExercises(content), [content]);
  const [mounts, setMounts] = useState<GuideMount[]>([]);

  // Inject one AI-guide mount point per exercise block after render, the
  // same DOM-scan-after-render approach OutlinePanel already uses for
  // data-toc-title elements — avoids touching the 95 hand-authored .md files.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || exercises.length === 0) {
      setMounts([]);
      return;
    }

    const questionByTitle = new Map(exercises.map(e => [e.tocTitle, e.question]));
    const blocks = container.querySelectorAll<HTMLElement>('.exercise-block[data-toc-title]');
    const next: GuideMount[] = [];

    blocks.forEach(block => {
      const tocTitle = block.getAttribute('data-toc-title') || '';
      const question = questionByTitle.get(tocTitle);
      if (!question) return;

      let mount = block.querySelector<HTMLDivElement>(':scope > .ai-guide-mount');
      if (!mount) {
        mount = document.createElement('div');
        mount.className = 'ai-guide-mount';
        block.appendChild(mount);
      }
      next.push({ tocTitle, question, el: mount });
    });

    setMounts(next);
  }, [content, exercises]);

  return (
    <div className="prose-text" ref={containerRef}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          pre: ({ children, ...props }) => {
            let language = '';
            if (React.isValidElement(children) && (children.props as any).className) {
              const match = /language-(\w+)/.exec((children.props as any).className || '');
              if (match) {
                language = match[1];
              }
            }

            return (
              <div
                className="my-6 relative rounded-lg border shadow-sm"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                {language && (
                  <div
                    className="absolute top-0 right-0 px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase select-none"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {language}
                  </div>
                )}
                <pre {...props} className="p-5 pt-7 overflow-x-auto text-[13.5px] leading-relaxed font-mono" style={{ color: 'var(--text-body)' }}>
                  {children}
                </pre>
              </div>
            );
          },
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !match ? (
              <code
                className="px-1.5 py-0.5 mx-0.5 rounded border shadow-sm font-mono text-[0.9em]"
                style={{
                  backgroundColor: 'var(--surface-raised)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--accent-gold)'
                }}
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none', color: 'inherit' }} {...props}>{children}</code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>

      {mounts.map(m =>
        createPortal(
          <ExerciseAIGuide exerciseId={`${pageId}::${m.tocTitle}`} question={m.question} />,
          m.el,
          `${pageId}::${m.tocTitle}`
        )
      )}
    </div>
  );
}
