'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import OpportunityCard from '@/components/ui/OpportunityCard';
import { MOCK_OPPORTUNITIES } from '@/lib/constants/data';

export default function LatestOpportunitiesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section bg-[var(--color-bg-subtle)]">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Opportunities"
            title="Your Next Big Break"
            subtitle="Scholarships, jobs, fellowships, and grants — curated for EduReach members."
            align="left"
          />
          <Link href="/opportunities" className="btn-md btn-outline-primary flex-shrink-0">
            Browse all <ArrowRight size={16} />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_OPPORTUNITIES.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </div>

        {/* Post opportunity CTA */}
        <div className="mt-8 p-6 rounded-2xl border-2 border-dashed border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-[var(--color-text)] mb-1">Have an opportunity to share?</h4>
            <p className="text-sm text-[var(--color-text-muted)]">Partner organizations can post scholarships, jobs, and more for free.</p>
          </div>
          <Link href="/opportunities/post" className="btn-md btn-secondary flex-shrink-0">
            Post an Opportunity <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
