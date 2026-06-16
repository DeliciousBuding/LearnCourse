import { FileText } from 'lucide-react';

interface SlideRefProps {
  courseware: string;
  page?: number;
  label?: string;
  onOpen: (page?: number) => void;
}

/** Clickable PPT/PDF reference — opens slide panel to specific page */
export function SlideRef({ courseware, page, label, onOpen }: SlideRefProps) {
  return (
    <span
      onClick={() => onOpen(page)}
      title={page ? `打开 ${courseware} 第 ${page} 页` : `打开 ${courseware}`}
      style={{
        cursor: 'pointer',
        color: 'var(--color-accent)',
        textDecoration: 'underline',
        textUnderlineOffset: 2,
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <FileText size={13} style={{ opacity: 0.6 }} />
      {label || courseware}
      {page != null && <span style={{ fontSize: '0.7em', opacity: 0.5, marginLeft: 1 }}>p.{page}</span>}
    </span>
  );
}
