export interface SearchPageData {
  pageId: string;
  title: string;
  breadcrumb: string;
  raw: string;
}

export interface SearchEntry {
  pageId: string;
  title: string;
  breadcrumb: string;
  plainText: string;
  foldedTitle: string;
  foldedText: string;
}

export interface SearchResult {
  pageId: string;
  title: string;
  breadcrumb: string;
  matchType: 'title' | 'content';
  snippet?: string;
}

/** Strips markdown/HTML/math markup down to plain prose, for indexing and snippet display. */
export function stripToPlainText(md: string): string {
  return md
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*?\$/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/&[a-zA-Z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Lowercases and strips Vietnamese diacritics so search works whether or not
 * the reader types tone marks. NFD-decomposing an accented letter and
 * dropping the combining marks reduces it to its bare base letter — one
 * character in, one character out — so a match index found in the folded
 * string lines up with the same index in the original, letting a snippet be
 * sliced from the original text without re-mapping positions.
 */
export function foldDiacritics(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

export function buildSearchEntries(pages: SearchPageData[]): SearchEntry[] {
  return pages.map(({ pageId, title, breadcrumb, raw }) => {
    const plainText = stripToPlainText(raw);
    return {
      pageId,
      title,
      breadcrumb,
      plainText,
      foldedTitle: foldDiacritics(title),
      foldedText: foldDiacritics(plainText),
    };
  });
}

const SNIPPET_RADIUS = 60;

function extractSnippet(plainText: string, matchIndex: number, matchLen: number): string {
  const start = Math.max(0, matchIndex - SNIPPET_RADIUS);
  const end = Math.min(plainText.length, matchIndex + matchLen + SNIPPET_RADIUS);
  let snippet = plainText.slice(start, end).trim();
  if (start > 0) snippet = '…' + snippet;
  if (end < plainText.length) snippet = snippet + '…';
  return snippet;
}

/** Title matches rank above content matches; within each group, original page order is kept. */
export function searchPages(query: string, entries: SearchEntry[], limit = 8): SearchResult[] {
  const q = foldDiacritics(query.trim());
  if (!q) return [];

  const titleMatches: SearchResult[] = [];
  const contentMatches: SearchResult[] = [];

  for (const entry of entries) {
    if (entry.foldedTitle.includes(q)) {
      titleMatches.push({ pageId: entry.pageId, title: entry.title, breadcrumb: entry.breadcrumb, matchType: 'title' });
      continue;
    }
    const idx = entry.foldedText.indexOf(q);
    if (idx !== -1) {
      contentMatches.push({
        pageId: entry.pageId,
        title: entry.title,
        breadcrumb: entry.breadcrumb,
        matchType: 'content',
        snippet: extractSnippet(entry.plainText, idx, q.length),
      });
    }
    if (titleMatches.length + contentMatches.length >= limit * 3) break;
  }

  return [...titleMatches, ...contentMatches].slice(0, limit);
}
