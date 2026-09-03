import { ChevronRight } from 'lucide-react';
import { useExerciseNav } from '@/lib/exerciseNav';

interface ExerciseListItemProps {
  pageId: string;
  tocTitle: string;
  badge: string;
  title?: string;
  raw: string;
}

/** Compact, math-free row standing in for a full exercise block — opening
 * it is what triggers the (comparatively expensive) KaTeX render, so a
 * section with dozens of exercises stays cheap to display. */
export function ExerciseListItem({ pageId, tocTitle, badge, title, raw }: ExerciseListItemProps) {
  const exerciseNav = useExerciseNav();

  return (
    <button
      type="button"
      className="exercise-list-item"
      onClick={() => exerciseNav?.open({ pageId, tocTitle, badge, title, raw })}
    >
      <span className="exercise-list-item-badge">{badge}</span>
      {title && <span className="exercise-list-item-title">{title}</span>}
      <ChevronRight size={16} className="exercise-list-item-arrow" />
    </button>
  );
}
