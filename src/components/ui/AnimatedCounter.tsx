'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface CounterProps {
  end:       number;
  duration?: number;
  prefix?:   string;
  suffix?:   string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0, className }: CounterProps) {
  const [count, setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number>();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) { frameRef.current = requestAnimationFrame(animate); }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [inView, started, end, duration]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default AnimatedCounter;
