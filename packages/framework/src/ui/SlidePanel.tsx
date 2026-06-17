import { useEffect, useState, useCallback, useRef } from 'react';
import { X, GripVertical, Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useI18n } from '../hooks/useI18n';

interface SlidePanelProps {
  moduleId: string;
  courseware: string;
  page?: number;
  pdfFile?: string;
  onClose: () => void;
}

export function SlidePanel({ moduleId, courseware, page, pdfFile, onClose }: SlidePanelProps) {
  const { t } = useI18n();
  const [width, setWidth] = useLocalStorage('slide-panel-width', 480);
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);
  const resolvedPdfFile = pdfFile;

  // Drag resize
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = width;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  }, [width]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setWidth(Math.min(900, Math.max(380, startW.current + (startX.current - e.clientX))));
    };
    const onUp = () => { dragging.current = false; document.body.style.cursor = ''; document.body.style.userSelect = ''; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [setWidth]);

  const doClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  // Escape to close
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') doClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [doClose]);

  // Reset loading
  useEffect(() => { setLoading(true); }, [moduleId]);

  return (
    <div style={{
      position: 'fixed', top: 56, right: 0, bottom: 0, zIndex: 25,
      width, display: 'flex', flexDirection: 'column',
      background: 'var(--color-surface)',
      borderLeft: '1px solid var(--color-border)',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.05)',
      transform: closing ? `translateX(${width}px)` : 'none',
      transition: 'transform 250ms cubic-bezier(0.4,0,0.2,1)',
      animation: closing ? 'none' : 'slideInRight 200ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      {/* Drag handle */}
      <div onMouseDown={onMouseDown} style={{
        position: 'absolute', left: -5, top: 0, bottom: 0, width: 10, zIndex: 5,
        cursor: 'ew-resize', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <GripVertical size={14} style={{ color: 'var(--color-text-tertiary)', opacity: 0.3 }} />
      </div>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)',
        flexShrink: 0, fontSize: '0.8rem',
      }}>
        <span style={{ fontWeight: 600, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          📄 {courseware}
        </span>
        <button onClick={doClose} style={{
          width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6, border: 'none', background: 'var(--color-code-bg)',
          cursor: 'pointer', color: 'var(--color-text-secondary)', flexShrink: 0,
        }}><X size={15} /></button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', background: 'var(--color-bg)', position: 'relative' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
            {t('slide.loading')}
          </div>
        )}
        {resolvedPdfFile ? (
          <iframe src={`/slides/${resolvedPdfFile}?toolbar=0&navpanes=0${page ? '#page=' + page : ''}`}
            style={{ width: '100%', height: '100%', border: 'none', opacity: loading ? 0 : 1, transition: 'opacity .2s' }}
            onLoad={() => setLoading(false)} title={courseware} />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
            {t('slide.noSlides')}
          </div>
        )}
      </div>
    </div>
  );
}
