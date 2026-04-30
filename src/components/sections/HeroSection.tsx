'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Play, ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const STATS = [
  { label: 'Students',    value: 12480, suffix: '+' },
  { label: 'Countries',   value: 47,    suffix: '' },
  { label: 'Free Courses',value: 240,   suffix: '+' },
  { label: 'Donated',     value: 3.2,   suffix: 'M', prefix: '$', decimals: 1 },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-mesh pt-[72px]">

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Large orb - top right */}
        <motion.div
          style={{ y }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)' }}
        />
        {/* Blue orb - bottom left */}
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)' }}
        />
        {/* Yellow orb - center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.8) 0%, transparent 60%)' }}
        />

        {/* Floating cards */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-[8%] hidden xl:block"
        >
          <div className="glass rounded-2xl p-3.5 shadow-xl flex items-center gap-3 w-52">
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white text-lg flex-shrink-0">🎓</div>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">New Certificate</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Web Development</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-48 right-[7%] hidden xl:block"
        >
          <div className="glass rounded-2xl p-3.5 shadow-xl flex items-center gap-3 w-56">
            <div className="w-10 h-10 rounded-xl bg-secondary-500 flex items-center justify-center text-white text-lg flex-shrink-0">💼</div>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">Scholarship Open</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">$800/mo stipend</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-36 left-[10%] hidden xl:block"
        >
          <div className="glass rounded-2xl p-3.5 shadow-xl flex items-center gap-3 w-48">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white text-lg flex-shrink-0">✅</div>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">Aid Approved</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Emergency relief</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="container-lg text-center relative z-10 py-16"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={12} className="text-accent-500" />
            Education Without Borders
            <Sparkles size={12} className="text-accent-500" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-[var(--color-text)] leading-[1.05] mb-6 tracking-tight">
          Unlock Your{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500">
              Potential
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden>
              <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="url(#grad)" strokeWidth="3.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#22c55e"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          {' '}
          <br className="hidden sm:block" />
          Change Your World.
        </motion.h1>

        <motion.p variants={item} className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed mb-10">
          Free courses, scholarships, mentorship, and emergency aid for underserved communities worldwide. Join 12,000+ learners building their future with EduReach.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/programs/courses"
            className="btn-xl btn-primary group w-full sm:w-auto"
          >
            Start Learning Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/donate"
            className="btn-xl btn-ghost w-full sm:w-auto"
          >
            <Heart size={18} className="text-primary-500" /> Make an Impact
          </Link>
          <button
            className="flex items-center gap-2.5 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors group"
          >
            <span className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-all">
              <Play size={14} className="translate-x-0.5" />
            </span>
            Watch our story
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map(({ label, value, suffix, prefix, decimals }) => (
            <div key={label} className="glass rounded-2xl px-4 py-5 border border-[var(--color-border)]">
              <div className="text-3xl font-display font-black text-[var(--color-text)] mb-1">
                <AnimatedCounter
                  end={value}
                  prefix={prefix}
                  suffix={suffix}
                  decimals={decimals}
                />
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-faint)]"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
