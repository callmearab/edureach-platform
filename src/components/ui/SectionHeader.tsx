'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?:      string;
  title:       string;
  subtitle?:   string;
  align?:      'left' | 'center' | 'right';
  className?:  string;
  light?:      boolean;
}

export default function SectionHeader({ badge, title, subtitle, align = 'center', className, light }: SectionHeaderProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const alignClass = {
    left:   'text-left items-start',
    center: 'text-center items-center',
    right:  'text-right items-end',
  }[align];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex flex-col gap-4', alignClass, className)}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-slow" />
          {badge}
        </span>
      )}
      <h2 className={cn(
        'section-title',
        light && 'text-white',
        align === 'center' && 'max-w-2xl',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'section-subtitle',
          light ? 'text-white/70' : '',
          align === 'center' && 'text-center',
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
