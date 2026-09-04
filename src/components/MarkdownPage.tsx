import { useMemo } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { ExerciseListItem } from './ExerciseListItem';
import { splitExerciseSegments } from '@/lib/exerciseSegments';

interface MarkdownPageProps {
  content: string;
  pageId: string;
}

export function MarkdownPage({ content, pageId }: MarkdownPageProps) {
  // Exercise bodies are the expensive part of a page (dozens of KaTeX
  // formulas each) — splitting them out lets each render as a lightweight
  // list row instead, deferring the actual markdown/KaTeX render to the
  // moment a reader opens that one exercise.
  const segments = useMemo(() => splitExerciseSegments(content), [content]);

  return (
    <div className="prose-text">
      {segments.map((segment, i) =>
        segment.type === 'exercise' ? (
          <ExerciseListItem
            key={`${segment.tocTitle}-${i}`}
            pageId={pageId}
            tocTitle={segment.tocTitle}
            badge={segment.badge}
            title={segment.title}
            preview={segment.preview}
            raw={segment.raw}
          />
        ) : (
          <MarkdownBlock key={i} content={segment.text} />
        )
      )}
    </div>
  );
}
