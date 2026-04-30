'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, BookOpen, Hammer, Users } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { PROGRAMS } from '@/lib/constants/data';

const ICON_MAP: Record<string, React.ElementType> = {
  '📚': BookOpen,
  '🛠️': Hammer,
  '🤝': Users,
};

const COLOR_MAP: Record<string, { bg: string; icon: string; border: string; glow: string }> = {
  primary:   { bg: 'bg-primary-50 dark:bg-primary-950',   icon: 'text-primary-600 dark:text-primary-400',   border: 'border-primary-200 dark:border-primary-800',   glow: 'hover:shadow-glow-green' },
  secondary: { bg: 'bg-secondary-50 dark:bg-secondary-950', icon: 'text-secondary-600 dark:text-secondary-400', border: 'border-secondary-200 dark:border-secondary-800', glow: 'hover:shadow-glow-blue' },
  accent:    { bg: 'bg-accent-50 dark:bg-accent-950',     icon: 'text-accent-600 dark:text-accent-400',     border: 'border-accent-200 dark:border-accent-800',     glow: 'hover:shadow-glow-yellow' },
};

export default function ProgramsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section bg-[var(--color-bg-subtle)]">
      <div className="container-xl">
        <SectionHeader
          badge="Programs"
          title="Learn, Grow, Achieve"
          subtitle="Three pathways to transform your future. Choose the learning format that works for you."
          className="mb-14"
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMS.map((program, i) => {
            const colors = COLOR_MAP[program.color] || COLOR_MAP.primary;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={program.href} className="group block h-full">
                  <div className={`card h-full p-8 flex flex-col gap-5 border-2 ${colors.border} ${colors.glow} transition-all duration-300 hover:-translate-y-1`}>
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center text-2xl border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
                      {program.icon}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-bold text-xl text-[var(--color-text)]">{program.title}</h3>
                        <span className={`text-sm font-bold ${colors.icon}`}>{program.count}+</span>
                      </div>
                      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{program.description}</p>
                    </div>

                    <div className={`flex items-center gap-2 text-sm font-semibold ${colors.icon} mt-auto group-hover:gap-3 transition-all`}>
                      Explore <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick feature list */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🆓', text: 'Always Free Access' },
            { emoji: '🏆', text: 'Verified Certificates' },
            { emoji: '🌍', text: '47 Countries Served' },
            { emoji: '🤖', text: 'AI-Personalized Learning' },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span className="text-xl">{emoji}</span>
              <span className="text-sm font-medium text-[var(--color-text)]">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
