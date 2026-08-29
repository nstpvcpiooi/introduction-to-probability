export interface ParsedExercise {
  tocTitle: string;
  question: string;
}

const BLOCK_OPEN_RE = /<div class="exercise-block" data-toc-title="([^"]*)">/g;
const BODY_OPEN_TAG = '<div class="exercise-body">';

/**
 * Extracts the raw question text (with original LaTeX source, not
 * KaTeX-rendered markup) for every exercise on a section page. Exercise
 * bodies never contain nested <div>s (see the format-exercise-page skill),
 * so the first </div> after the body's opening tag is reliably its close.
 */
export function parseExercises(content: string): ParsedExercise[] {
  const results: ParsedExercise[] = [];
  let match: RegExpExecArray | null;
  BLOCK_OPEN_RE.lastIndex = 0;

  while ((match = BLOCK_OPEN_RE.exec(content)) !== null) {
    const tocTitle = match[1];
    const bodyOpenIdx = content.indexOf(BODY_OPEN_TAG, match.index);
    if (bodyOpenIdx === -1) continue;

    const bodyContentStart = bodyOpenIdx + BODY_OPEN_TAG.length;
    const bodyCloseIdx = content.indexOf('</div>', bodyContentStart);
    if (bodyCloseIdx === -1) continue;

    const question = cleanExerciseHtml(content.slice(bodyContentStart, bodyCloseIdx));
    if (question) results.push({ tocTitle, question });
  }

  return results;
}

function cleanExerciseHtml(html: string): string {
  return html
    .replace(/<li\s+data-label="([^"]*)"\s*>/g, '\n$1 ')
    .replace(/<\/(li|ol)>/g, '\n')
    .replace(/<ol>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
