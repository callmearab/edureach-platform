'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseCard from '@/components/ui/CourseCard';
import { MOCK_COURSES } from '@/lib/constants/data';

export default function FeaturedCoursesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Courses"
            title="Start Learning Today"
            subtitle="Expert-designed, community-verified. All free."
            align="left"
          />
          <Link href="/programs/courses" className="btn-md btn-outline-primary flex-shrink-0">
            View all 240+ courses <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Technology', 'Business', 'Health', 'Arts', 'Language'].map((cat, i) => (
            <button key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                i === 0
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
