import type { ReactNode } from 'react';

type BoxType = 'theorem' | 'definition' | 'proof' | 'example' | 'remark';

const BOX_LABELS: Record<BoxType, string> = {
  theorem: 'Định lý',
  definition: 'Định nghĩa',
  proof: 'Chứng minh',
  example: 'Ví dụ',
  remark: 'Nhận xét',
};

interface MathBoxProps {
  type: BoxType;
  number?: string;
  title?: string;
  children: ReactNode;
  qed?: boolean;
}

export function MathBox({ type, number, title, children, qed = false }: MathBoxProps) {
  const label = BOX_LABELS[type];
  const displayTitle = title ? title : label;
  const displayNumber = number ? `${label} ${number}` : label;

  return (
    <div className={`math-box ${type}`} id={number ? `box-${type}-${number}` : undefined}>

      <div className="math-box-header">
        <span className="math-box-number">{displayNumber}</span>
        {title && <span className="math-box-title">({displayTitle})</span>}
      </div>
      <div className="math-box-content">
        {children}
        {qed && (
          <div className="qed">
            <span className="qed-mark" title="Quod erat demonstrandum" />
          </div>
        )}
      </div>
    </div>
  );
}
