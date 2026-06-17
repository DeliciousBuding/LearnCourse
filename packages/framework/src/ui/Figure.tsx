import { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: string | number;
}

export function Figure({ src, alt = '', caption, width }: FigureProps) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <figure style={{
        margin: '1rem 0', textAlign: 'center',
        position: 'relative', display: 'inline-block', maxWidth: '100%',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onClick={() => setLightbox(true)}
            style={{
              maxWidth: '100%', height: 'auto', display: 'block',
              width: width || undefined, cursor: 'zoom-in',
            }}
          />
          <button
            onClick={() => setLightbox(true)}
            style={{
              position: 'absolute', top: 6, right: 6,
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 6, border: 'none', background: 'rgba(0,0,0,0.4)', color: '#fff',
              cursor: 'pointer', opacity: 0, transition: 'opacity .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0'}
          >
            <Maximize2 size={14} />
          </button>
        </div>
        {caption && (
          <figcaption style={{
            marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
          }}>
            {caption}
          </figcaption>
        )}
      </figure>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.85)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '2rem',
          }}
        >
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff',
              cursor: 'pointer', fontSize: 18,
            }}
          >
            <X size={22} />
          </button>
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }}
          />
        </div>
      )}
    </>
  );
}
