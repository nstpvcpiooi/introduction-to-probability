export interface MarkdownSegment {
  type: 'markdown';
  text: string;
}

export interface ExerciseSegment {
  type: 'exercise';
  tocTitle: string;
  badge: string;
  title?: string;
  preview: string;
  raw: string;
}

export type ContentSegment = MarkdownSegment | ExerciseSegment;

const BLOCK_OPEN_RE = /<div class="exercise-block"[^>]*data-toc-title="([^"]*)"[^>]*>/g;
const BADGE_RE = /<span class="exercise-badge">([^<]*)<\/span>/;
const TITLE_RE = /<span class="exercise-title">([\s\S]*?)<\/span>/;
const DIV_TAG_RE = /<div\b[^>]*>|<\/div>/g;
const BODY_OPEN_RE = /<div class="exercise-body">/;
// A whitelist, not a blanket `<[^>]+>` — math source inside an exercise body
// routinely uses bare `<`/`>` as comparison operators (e.g. "0<x<1"), which a
// blanket tag regex would misread as the start of a tag.
const KNOWN_TAG_RE = /<\/?(?:ol|li|img|div|table|tr|td|th)\b[^>]*>/g;
const FIGURE_BLOCK_RE = /<div[^>]*>\s*<img\b[^>]*\/?>\s*<\/div>/g;
const LI_LABEL_RE = /<li data-label="([^"]*)">/g;

// Target visible-character budget for a preview snippet — long enough to
// read as a real excerpt, short enough that -webkit-line-clamp (3 lines)
// never has to guess: a preview well under the clamp trims itself instead
// of overflowing and getting cut off mid-word by CSS.
const PREVIEW_CHAR_BUDGET = 200;

/**
 * Truncates markdown/math source to roughly `maxLen` visible characters
 * without ever cutting inside a `$...$` / `$$...$$` math span — KaTeX needs
 * its delimiters balanced, and a half-formula reads worse than a shorter
 * preview. A span already in progress when the budget is reached is kept
 * whole; a span that would start after the budget is dropped entirely.
 */
function truncateMathAware(text: string, maxLen: number): string {
  let i = 0;
  let visible = 0;
  let cut = text.length;
  let didCut = false;
  // Only a space outside a math span is a safe place to break the line —
  // trimming to the last space in the raw result could otherwise land
  // inside a formula that was deliberately kept whole (e.g. the space in
  // "\frac{1}{2}f(-x) + \frac{1}{2}f(x)"), severing it.
  let lastSafeSpace = -1;

  while (i < text.length) {
    if (text[i] === '\\' && text[i + 1] === '$') {
      // escaped dollar sign (e.g. "\$100") — a literal '$', not a math delimiter
      if (visible >= maxLen) { cut = i; didCut = true; break; }
      visible += 2;
      i += 2;
      continue;
    }
    if (text[i] === '$') {
      const isDisplay = text[i + 1] === '$';
      const delim = isDisplay ? '$$' : '$';
      const closeIdx = text.indexOf(delim, i + delim.length);
      if (closeIdx === -1) {
        if (visible >= maxLen) { cut = i; didCut = true; break; }
        visible++;
        i++;
        continue;
      }
      if (visible >= maxLen) { cut = i; didCut = true; break; }
      const spanEnd = closeIdx + delim.length;
      visible += spanEnd - i;
      i = spanEnd;
      continue;
    }
    if (visible >= maxLen) { cut = i; didCut = true; break; }
    if (text[i] === ' ') lastSafeSpace = i;
    visible++;
    i++;
  }

  if (!didCut) return text;

  let result = text.slice(0, cut);
  if (lastSafeSpace > maxLen * 0.5) result = text.slice(0, lastSafeSpace);
  return result.trimEnd() + '…';
}

/**
 * Pulls a truncated markdown/math snippet out of an exercise block's body —
 * HTML tags stripped, part labels ("(a)") kept as text — so the collapsed
 * list row can render a short, real excerpt of the question (same KaTeX
 * renderer as the full exercise) instead of a plain-text approximation.
 */
function extractExercisePreview(raw: string): string {
  const openMatch = BODY_OPEN_RE.exec(raw);
  if (!openMatch) return '';

  const bodyTagRe = /<div\b[^>]*>|<\/div>/g;
  bodyTagRe.lastIndex = openMatch.index + openMatch[0].length;
  let depth = 1;
  let end = raw.length;
  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = bodyTagRe.exec(raw)) !== null) {
    depth += tagMatch[0] === '</div>' ? -1 : 1;
    if (depth === 0) {
      end = tagMatch.index;
      break;
    }
  }

  const body = raw.slice(openMatch.index + openMatch[0].length, end);

  const cleaned = body
    .replace(FIGURE_BLOCK_RE, ' ')
    .replace(LI_LABEL_RE, ' $1 ')
    .replace(KNOWN_TAG_RE, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // A display-math ($$...$$) span kept by the truncation still needs to
  // render inline in a one-line-tall list row — collapse it to $...$.
  return truncateMathAware(cleaned, PREVIEW_CHAR_BUDGET).replace(/\$\$/g, '$');
}

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
      preview: extractExercisePreview(raw),
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
