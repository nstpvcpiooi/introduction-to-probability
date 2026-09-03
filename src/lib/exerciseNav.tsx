import { createContext, useContext } from 'react';

export interface ExerciseGuidePayload {
  pageId: string;
  tocTitle: string;
  badge: string;
  title?: string;
  raw: string;
}

interface ExerciseNavValue {
  open: (payload: ExerciseGuidePayload) => void;
}

export const ExerciseNavContext = createContext<ExerciseNavValue | null>(null);

export function useExerciseNav(): ExerciseNavValue | null {
  return useContext(ExerciseNavContext);
}
