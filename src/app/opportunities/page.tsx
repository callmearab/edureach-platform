import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Filter, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import OpportunityCard from '@/components/ui/OpportunityCard';
import { MOCK_OPPORTUNITIES } from '@/lib/constants/data';

export const metadata: Metadata = {
  title: 'Opportunities – Scholarships, Jobs, Fellowships & Grants',
  description: 'Browse curated scholarships, jobs, internships, fellowships, and grants for EduReach community members.',
};

const TYPES = ['All', 'Scholarship', 'Job', 'Fellowship', 'Grant', 'Internship'];

export default function OpportunitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pt-32 hero-mesh">
        <div className="container-xl">
          <div className="max-w-3xl">
            <span className="badge badge-green mb-4">Opportunities</span>
            <h1 className="section-title mb-4">Your Next Big Break Starts Here</h1>
            <p className="section-subtitle mb-8">
              Scholarships, jobs, fellowships, and grants — curated and verified for our community. New opportunities added daily.
            </p>

            {/* Search bar */}
            <div className="flex gap-3 p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-md)] max-w-2xl">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={18} className="text-[var(--color-text-faint)]" />
                <input type="text" placeholder="Search opportunities, organizations..." className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none" />
              </div>
              <button className="btn-md btn-primary px-6">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & List */}
      <section className="section">
        <div className="container-xl">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TYPES.map((t, i) => (
              <button key={t}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  i === 0
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-400 hover:text-primary-600'
                }`}
              >
                {t}
              </button>
            ))}
            <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-2)] transition-all">
              <Filter size={14} /> Filters
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...MOCK_OPPORTUNITIES, ...MOCK_OPPORTUNITIES].slice(0, 8).map((opp, i) => (
              <OpportunityCard key={`${opp.id}-${i}`} opportunity={{ ...opp, id: `${opp.id}-${i}` }} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center mt-10">
            <button className="btn-lg btn-ghost">Load more opportunities</button>
          </div>
        </div>
      </section>

      {/* Post opportunity CTA */}
      <section className="section-sm bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-secondary-600 to-secondary-700 text-white">
            <div>
              <h3 className="font-display font-bold text-2xl mb-2">Have an opportunity to share?</h3>
              <p className="text-secondary-200">Reach 12,000+ motivated learners. Post scholarships, jobs, and more for free.</p>
            </div>
            <Link href="/opportunities/post" className="btn-lg bg-white text-secondary-700 hover:bg-secondary-50 font-bold flex-shrink-0">
              Post an Opportunity <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
