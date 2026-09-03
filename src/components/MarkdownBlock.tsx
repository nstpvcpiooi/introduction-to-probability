import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

const markdownComponents = {
  pre: ({ children, ...props }: any) => {
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
};

interface MarkdownBlockProps {
  content: string;
}

/** Shared markdown+KaTeX renderer used by both full section pages and the
 * standalone exercise-guide page, so both stay visually identical. */
export function MarkdownBlock({ content }: MarkdownBlockProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
