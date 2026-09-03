export interface MarkdownSegment {
  type: 'markdown';
  text: string;
}

export interface ExerciseSegment {
  type: 'exercise';
  tocTitle: string;
  badge: string;
  title?: string;
  raw: string;
}

export type ContentSegment = MarkdownSegment | ExerciseSegment;

const BLOCK_OPEN_RE = /<div class="exercise-block"[^>]*data-toc-title="([^"]*)"[^>]*>/g;
const BADGE_RE = /<span class="exercise-badge">([^<]*)<\/span>/;
const TITLE_RE = /<span class="exercise-title">([\s\S]*?)<\/span>/;
const DIV_TAG_RE = /<div\b[^>]*>|<\/div>/g;

/**
 * Splits a section's raw markdown into alternating prose and exercise
 * segments so exercise bodies (heavy on KaTeX) can be rendered lazily —
 * only when a reader opens that exercise — instead of all at once.
 */
export function splitExerciseSegments(content: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  let cursor = 0;
  BLOCK_OPEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = BLOCK_OPEN_RE.exec(content)) !== null) {
    const blockStart = match.index;
    if (blockStart > cursor) {
      const text = content.slice(cursor, blockStart);
      if (text.trim()) segments.push({ type: 'markdown', text });
    }

    // The opening tag itself is depth 1 — walk forward counting nested
    // <div>/</div> pairs (header, body, divider, solution details all live
    // inside) until the block's own closing tag is found.
    DIV_TAG_RE.lastIndex = match.index + match[0].length;
    let depth = 1;
    let blockEnd = -1;
    let tagMatch: RegExpExecArray | null;
    while ((tagMatch = DIV_TAG_RE.exec(content)) !== null) {
      depth += tagMatch[0] === '</div>' ? -1 : 1;
      if (depth === 0) {
        blockEnd = tagMatch.index + tagMatch[0].length;
        break;
      }
    }

    if (blockEnd === -1) {
      // Unbalanced markup — bail out and keep the remainder as plain prose
      // rather than losing content.
      segments.push({ type: 'markdown', text: content.slice(blockStart) });
      cursor = content.length;
      break;
    }

    const raw = content.slice(blockStart, blockEnd);
    const tocTitle = match[1];
    const badgeMatch = BADGE_RE.exec(raw);
    const titleMatch = TITLE_RE.exec(raw);
    segments.push({
      type: 'exercise',
      tocTitle,
      badge: badgeMatch ? badgeMatch[1].trim() : tocTitle,
      title: titleMatch ? titleMatch[1].trim() : undefined,
      raw,
    });

    cursor = blockEnd;
    BLOCK_OPEN_RE.lastIndex = blockEnd;
  }

  if (cursor < content.length) {
    const text = content.slice(cursor);
    if (text.trim()) segments.push({ type: 'markdown', text });
  }

  return segments;
}

export interface ExerciseSplit {
  question: string;
  solution: string | null;
}

const SOLUTION_OPEN_RE = /<details class="exercise-solution"[^>]*>/;
const DETAILS_TAG_RE = /<details\b[^>]*>|<\/details>/g;
const DIVIDER_RE = /<div class="exercise-divider"><\/div>\s*/;

/**
 * Pulls the <details class="exercise-solution"> chunk out of a captured
 * exercise block's raw markup so it can be rendered as its own standalone
 * box on the guide page, instead of nested inside the question's card.
 */
export function splitExerciseSolution(raw: string): ExerciseSplit {
  const openMatch = SOLUTION_OPEN_RE.exec(raw);
  if (!openMatch) {
    return { question: raw, solution: null };
  }

  DETAILS_TAG_RE.lastIndex = openMatch.index + openMatch[0].length;
  let depth = 1;
  let end = -1;
  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = DETAILS_TAG_RE.exec(raw)) !== null) {
    depth += tagMatch[0] === '</details>' ? -1 : 1;
    if (depth === 0) {
      end = tagMatch.index + tagMatch[0].length;
      break;
    }
  }

  if (end === -1) {
    return { question: raw, solution: null };
  }

  const solution = raw.slice(openMatch.index, end);
  const question = (raw.slice(0, openMatch.index) + raw.slice(end)).replace(DIVIDER_RE, '');
  return { question, solution };
}
