'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS } from '@/lib/constants/data';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[current];

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: -d * 60 }),
  };

  return (
    <section className="section bg-[var(--color-bg-subtle)]">
      <div className="container-xl">
        <SectionHeader
          badge="Stories"
          title="Lives Changed, Dreams Realized"
          subtitle="Real stories from real learners. This is why we do what we do."
          className="mb-14"
        />

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="card p-8 md:p-12">
                  <Quote size={40} className="text-primary-200 dark:text-primary-800 mb-6" />

                  <p className="text-lg md:text-xl text-[var(--color-text)] leading-relaxed font-medium mb-8 italic">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary-200 dark:border-primary-800"
                    />
                    <div>
                      <div className="font-display font-bold text-[var(--color-text)]">{t.name}</div>
                      <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">{t.role}</div>
                      <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        🌍 {t.country} · via <span className="font-medium">{t.course}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 bg-primary-600 dark:bg-primary-400'
                      : 'w-2 bg-[var(--color-border-2)] hover:bg-[var(--color-text-faint)]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Avatars preview */}
        <div className="flex justify-center mt-10 -space-x-2">
          {TESTIMONIALS.map((t, i) => (
            <img
              key={t.id}
              src={t.avatar}
              alt={t.name}
              className={`w-10 h-10 rounded-full border-2 object-cover transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'border-primary-500 scale-125 z-10'
                  : 'border-[var(--color-surface)] opacity-60 hover:opacity-100'
              }`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center text-xs font-bold text-[var(--color-text-muted)]">
            +12k
          </div>
        </div>
      </div>
    </section>
  );
}
