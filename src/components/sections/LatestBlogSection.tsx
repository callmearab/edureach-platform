'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/ui/BlogCard';
import EventCard from '@/components/ui/EventCard';
import PartnerLogos from '@/components/ui/PartnerLogos';
import { MOCK_BLOG_POSTS, MOCK_EVENTS } from '@/lib/constants/data';

export function LatestBlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section bg-[var(--color-bg-subtle)]">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Blog"
            title="Stories & Insights"
            subtitle="Perspectives on education, technology, and social impact."
            align="left"
          />
          <Link href="/blog" className="btn-md btn-outline-primary flex-shrink-0">
            Read more <ArrowRight size={16} />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-5">
          {/* Featured post - horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BlogCard post={MOCK_BLOG_POSTS[0]} featured />
          </motion.div>

          {/* 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_BLOG_POSTS.slice(1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function UpcomingEventsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Events"
            title="Connect & Collaborate"
            subtitle="Workshops, webinars, and global summits — all free to attend."
            align="left"
          />
          <Link href="/events" className="btn-md btn-outline-primary flex-shrink-0">
            All events <ArrowRight size={16} />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestBlogSection;
