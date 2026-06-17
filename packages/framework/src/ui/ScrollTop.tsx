import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export function ScrollTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <button
      id="scroll-top"
      className={visible ? 'visible' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title={t('scrollTop.title')}
    >
      <ArrowUp size={18} />
    </button>
  );
}
