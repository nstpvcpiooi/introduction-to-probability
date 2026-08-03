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
          // For math boxes, we'll recommend users to use HTML divs in markdown, which rehype-raw handles,
          // or we can allow a custom element like <math-box type="definition" title="...">
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
