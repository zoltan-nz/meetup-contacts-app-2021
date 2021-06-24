import { useEffect, useRef } from 'react';

// Source: https://kentcdodds.com/blog/how-to-optimize-your-context-value
export function useRenderCounter() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (null !== spanRef.current) {
      spanRef.current.textContent = (Number(spanRef.current.textContent || '0') + 1).toString();
    }
  });

  return <span ref={spanRef} />;
}
