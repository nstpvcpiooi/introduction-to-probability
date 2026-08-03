import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MathBox } from './MathBox';
import 'katex/dist/katex.min.css';

interface MarkdownPageProps {
  content: string;
}

export function MarkdownPage({ content }: MarkdownPageProps) {
  return (
    <div className="prose-text">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // We can map custom components here if needed
          h1: ({ node, ...props }) => <h1 className="page-title" {...props} />,
          h2: ({ node, ...props }) => <h2 className="section-title" {...props} />,
          h3: ({ node, ...props }) => <h3 className="subsection-title" {...props} />,
          // For math boxes, we'll recommend users to use HTML divs in markdown, which rehype-raw handles,
          // or we can allow a custom element like <math-box type="definition" title="...">
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
