import { useState, useCallback, useEffect, createContext, useContext, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast { id: number; type: ToastType; message: string; }

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
}

const ToastCtx = createContext<ToastContextType>({ toast: () => {} });
export const useToast = () => useContext(ToastCtx);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = nextId++;
    setToasts(prev => [...prev.slice(-4), { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast: addToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 200, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => {
          const Icon = t.type === 'success' ? CheckCircle : t.type === 'error' ? AlertCircle : Info;
          const bg = t.type === 'success' ? 'var(--color-success-soft)' : t.type === 'error' ? 'var(--color-danger-soft)' : 'var(--color-accent-soft)';
          const fg = t.type === 'success' ? 'var(--color-success)' : t.type === 'error' ? 'var(--color-danger)' : 'var(--color-accent)';
          return (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.6rem 1rem', borderRadius: 10,
              background: bg, color: fg, fontSize: '0.85rem', fontWeight: 500,
              boxShadow: 'var(--shadow-lg)', animation: 'toastIn 300ms cubic-bezier(0.4,0,0.2,1)',
              maxWidth: 360, wordBreak: 'break-word',
            }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{t.message}</span>
              <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: fg, padding: 0, flexShrink: 0 }}><X size={14} /></button>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}
