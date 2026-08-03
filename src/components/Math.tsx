import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  formula: string;
  display?: boolean;
  className?: string;
}

const KATEX_OPTIONS = {
  throwOnError: false,
  trust: true,
  strict: false,
  macros: {
    "\\R": "\\mathbb{R}",
    "\\N": "\\mathbb{N}",
    "\\Z": "\\mathbb{Z}",
    "\\Q": "\\mathbb{Q}",
    "\\C": "\\mathbb{C}",
    "\\eps": "\\varepsilon",
  },
} as const;

export function Math({ formula, display = false, className = '' }: MathProps) {
  let html = '';
  try {
    html = katex.renderToString(formula, { ...KATEX_OPTIONS, displayMode: display });
  } catch (e) {
    // If KaTeX fails, display formula in monospace as fallback
    html = `<code style="color:var(--accent-gold);font-size:0.85em">${formula}</code>`;
  }

  if (display) {
    return (
      <div
        className={`formula-block ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`formula-inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Helper component for inline math
export function InlineMath({ children }: { children: string }) {
  return <Math formula={children} display={false} />;
}

// Helper component for block/display math
export function BlockMath({ children }: { children: string }) {
  return <Math formula={children} display={true} />;
}
