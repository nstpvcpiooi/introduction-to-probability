import { ChevronRight } from 'lucide-react';
import { useExerciseNav } from '@/lib/exerciseNav';
import { MarkdownBlock } from './MarkdownBlock';

interface ExerciseListItemProps {
  pageId: string;
  tocTitle: string;
  badge: string;
  title?: string;
  preview: string;
  raw: string;
}

/** Compact row standing in for a full exercise block — opening it is what
 * triggers the full KaTeX render of the solution, so a section with dozens
 * of exercises stays cheap to display. Shows a short excerpt of the question
 * (clamped to a few lines, rendered through the same KaTeX pipeline as the
 * full exercise) so a section with many exercises stays easy to scan. */
export function ExerciseListItem({ pageId, tocTitle, badge, title, preview, raw }: ExerciseListItemProps) {
  const exerciseNav = useExerciseNav();

  return (
    <button
      type="button"
      className="exercise-list-item"
      onClick={() => exerciseNav?.open({ pageId, tocTitle, badge, title, raw })}
    >
      <span className="exercise-list-item-header">
        <span className="exercise-list-item-badge">{badge}</span>
        {title && <span className="exercise-list-item-title">{title}</span>}
        <ChevronRight size={16} className="exercise-list-item-arrow" />
      </span>
      {preview && (
        <div className="exercise-list-item-preview">
          <MarkdownBlock content={preview} inline />
        </div>
      )}
    </button>
  );
}
