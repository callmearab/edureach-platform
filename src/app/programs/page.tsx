import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Award, Clock, Star, Zap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseCard from '@/components/ui/CourseCard';
import { MOCK_COURSES } from '@/lib/constants/data';

export const metadata: Metadata = {
  title: 'Programs – Courses, Workshops & Mentorship',
  description: 'Explore 240+ free courses, intensive workshops, and personalized mentorship programs on EduReach.',
};

const PROGRAM_TYPES = [
  {
    icon: BookOpen,  color: 'primary',
    title: 'Online Courses',
    count: '240+ Courses',
    href: '/programs/courses',
    features: ['Self-paced learning', 'Video & text content', 'Quizzes & projects', 'Certificate on completion', 'Lifetime access'],
    cta: 'Browse Courses',
    highlight: true,
  },
  {
    icon: Zap,       color: 'secondary',
    title: 'Intensive Workshops',
    count: '48 Workshops',
    href: '/programs/workshops',
    features: ['Live instructor-led', '8–40 hour intensives', 'Small cohort groups', 'Real project output', 'Industry mentors'],
    cta: 'View Workshops',
  },
  {
    icon: Users,     color: 'accent',
    title: '1:1 Mentorship',
    count: '120+ Mentors',
    href: '/programs/mentorship',
    features: ['Matched by skill & goal', '3–6 month programs', 'Weekly check-ins', 'Career guidance', 'Professional network'],
    cta: 'Find a Mentor',
  },
];

const COLOR_MAP: Record<string, { bg: string; icon: string; btn: string; border: string }> = {
  primary:   { bg: 'bg-primary-50 dark:bg-primary-950', icon: 'text-primary-600 dark:text-primary-400', btn: 'btn-primary', border: 'border-primary-200 dark:border-primary-800' },
  secondary: { bg: 'bg-secondary-50 dark:bg-secondary-950', icon: 'text-secondary-600 dark:text-secondary-400', btn: 'btn-secondary', border: 'border-secondary-200 dark:border-secondary-800' },
  accent:    { bg: 'bg-accent-50 dark:bg-accent-950', icon: 'text-accent-600 dark:text-accent-400', btn: 'btn-accent', border: 'border-accent-200 dark:border-accent-800' },
};

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pt-32 hero-mesh">
        <div className="container-xl text-center">
          <span className="badge badge-green mb-4">Our Programs</span>
          <h1 className="section-title mb-4">Three Pathways to<br />Transform Your Future</h1>
          <p className="section-subtitle mx-auto text-center mb-10">
            Choose the learning format that fits your life. All programs are free, expert-designed, and community-verified.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/programs/courses"    className="btn-lg btn-primary">Start with Courses</Link>
            <Link href="/programs/mentorship" className="btn-lg btn-ghost">Find a Mentor</Link>
          </div>
        </div>
      </section>

      {/* Program cards */}
      <section className="section">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAM_TYPES.map(({ icon: Icon, color, title, count, href, features, cta, highlight }) => {
              const c = COLOR_MAP[color];
              return (
                <div key={title} className={`card flex flex-col p-8 ${highlight ? 'ring-2 ring-primary-500' : ''}`}>
                  {highlight && (
                    <div className="flex justify-center mb-4">
                      <span className="badge badge-green text-xs">Most Popular</span>
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-5`}>
                    <Icon size={24} className={c.icon} />
                  </div>
                  <div className="mb-1">
                    <span className={`text-xs font-bold ${c.icon} uppercase tracking-wider`}>{count}</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-4">{title}</h2>
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
                        <span className={`w-4 h-4 rounded-full ${c.bg} ${c.icon} flex items-center justify-center text-[10px] flex-shrink-0`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={href} className={`btn-md ${c.btn} w-full justify-center`}>
                    {cta} <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="section bg-[var(--color-bg-subtle)]">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHeader badge="Trending" title="Popular Right Now" align="left" />
            <Link href="/programs/courses" className="btn-md btn-outline-primary flex-shrink-0">
              All Courses <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COURSES.slice(0, 6).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-xl">
          <SectionHeader badge="How it Works" title="From Zero to Certified in 4 Steps" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create Free Account',   icon: '👤', desc: 'Sign up in 30 seconds. No credit card required, ever.' },
              { step: '02', title: 'Choose Your Path',      icon: '🗺️',  desc: 'Browse courses, workshops, or apply for mentorship.' },
              { step: '03', title: 'Learn & Practice',      icon: '💻', desc: 'Access video lessons, exercises, and real-world projects.' },
              { step: '04', title: 'Earn Your Certificate', icon: '🏆', desc: 'Complete the course and get a verifiable certificate.' },
            ].map(({ step, title, icon, desc }) => (
              <div key={step} className="relative">
                <div className="card p-6 h-full">
                  <div className="text-xs font-black text-primary-300 dark:text-primary-700 mb-3 font-mono">{step}</div>
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-display font-bold text-[var(--color-text)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
