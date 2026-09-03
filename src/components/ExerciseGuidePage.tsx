import { useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { MarkdownBlock } from './MarkdownBlock';
import { splitExerciseSolution } from '@/lib/exerciseSegments';
import type { ExerciseGuidePayload } from '@/lib/exerciseNav';

interface ExerciseGuidePageProps {
  payload: ExerciseGuidePayload;
  onBack: () => void;
}

export function ExerciseGuidePage({ payload, onBack }: ExerciseGuidePageProps) {
  const { question, solution } = useMemo(() => splitExerciseSolution(payload.raw), [payload.raw]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [payload.raw]);

  return (
    <div className="exercise-guide-page">
      <button type="button" className="exercise-guide-back" onClick={onBack}>
        <ArrowLeft size={15} />
        Quay lại
      </button>
      <div className="prose-text">
        <MarkdownBlock content={question} />
        {solution && <MarkdownBlock content={solution} />}
      </div>
    </div>
  );
}
