import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  display?: boolean;
}

export function MathFormula({ formula, display = false }: MathFormulaProps) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(formula, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    } catch {
      ref.current.textContent = formula;
    }
  }, [formula, display]);

  if (display) {
    return <div ref={ref as React.RefObject<HTMLDivElement>} className="my-3.5 overflow-x-auto" />;
  }
  return <span ref={ref as React.RefObject<HTMLSpanElement>} className="katex-inline" />;
}
