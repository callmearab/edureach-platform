import type { Metadata } from 'next';
import Link from 'next/link';
import { Play, Clock, Users, Star, Award, CheckCircle, BookOpen, Download, Share2, Heart, ChevronDown } from 'lucide-react';
import { MOCK_COURSES } from '@/lib/constants/data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = MOCK_COURSES.find(c => c.slug === params.slug) || MOCK_COURSES[0];
  return {
    title: `${course.title} – EduReach`,
    description: course.description,
  };
}

const MOCK_CURRICULUM = [
  { title: 'Getting Started',      lessons: ['Welcome & Overview', 'Setting Up Your Environment', 'Your First Project'],           duration: '45 min' },
  { title: 'Core Concepts',        lessons: ['Fundamentals Deep Dive', 'Best Practices', 'Common Patterns', 'Quiz: Module 2'],    duration: '2h 10m' },
  { title: 'Building Real Projects',lessons: ['Project Planning', 'Implementation', 'Testing & Debugging', 'Deployment'],         duration: '3h 20m' },
  { title: 'Advanced Topics',      lessons: ['Performance Optimization', 'Security Essentials', 'Final Project', 'Certificate'],   duration: '1h 50m' },
];

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = MOCK_COURSES.find(c => c.slug === params.slug) || MOCK_COURSES[0];
  const hours = Math.floor(course.duration / 60);

  return (
    <>
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-10">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left — course info */}
            <div className="lg:col-span-2 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge bg-white/15 text-white/80 border-0">{course.category}</span>
                <span className="badge bg-white/15 text-white/80 border-0 capitalize">{course.level}</span>
                {course.isFree && <span className="badge bg-primary-500 text-white border-0">Free</span>}
              </div>

              <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4 text-white">{course.title}</h1>
              <p className="text-white/70 text-lg leading-relaxed mb-5">{course.description}</p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-4 text-sm mb-5">
                <span className="flex items-center gap-1.5 text-accent-400">
                  <Star size={16} className="fill-current" />
                  <strong>{course.rating}</strong>
                  <span className="text-white/50">({(course.enrollments * 0.3).toFixed(0)} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5 text-white/60"><Users size={14} /> {course.enrollments.toLocaleString()} enrolled</span>
                <span className="flex items-center gap-1.5 text-white/60"><Clock size={14} /> {hours}h total</span>
                {course.certificate && <span className="flex items-center gap-1.5 text-white/60"><Award size={14} /> Certificate</span>}
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-9 h-9 rounded-full object-cover border-2 border-white/20" />
                <span className="text-white/70 text-sm">Created by <span className="text-white font-semibold">{course.instructor.name}</span></span>
              </div>
            </div>

            {/* Right — sticky enrollment card (desktop) */}
            <div className="hidden lg:block">
              <EnrollmentCard course={course} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-xl grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Video preview */}
            <div className="rounded-2xl overflow-hidden bg-gray-900 aspect-video relative group cursor-pointer">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={24} className="text-white translate-x-0.5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs font-medium">
                Preview: 5 min intro
              </div>
            </div>

            {/* What you'll learn */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-xl text-[var(--color-text)] mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  'Build real-world projects from scratch',
                  'Master industry-standard best practices',
                  'Debug and optimize confidently',
                  'Collaborate effectively in teams',
                  'Deploy production-ready applications',
                  'Pass technical interviews',
                  'Build a professional portfolio',
                  'Earn a verifiable certificate',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--color-text-muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--color-text)] mb-4">Course Curriculum</h2>
              <div className="flex flex-col gap-2">
                {MOCK_CURRICULUM.map((module, i) => (
                  <details key={i} className="card overflow-hidden group" open={i === 0}>
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[var(--color-bg-subtle)] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">{i + 1}</div>
                        <div>
                          <span className="font-semibold text-[var(--color-text)] text-sm">{module.title}</span>
                          <span className="text-xs text-[var(--color-text-faint)] ml-3">{module.lessons.length} lessons · {module.duration}</span>
                        </div>
                      </div>
                      <ChevronDown size={16} className="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="border-t border-[var(--color-border)]">
                      {module.lessons.map((lesson, j) => (
                        <div key={j} className="flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-subtle)] transition-colors">
                          <Play size={12} className="text-[var(--color-text-faint)] flex-shrink-0" />
                          <span className="text-sm text-[var(--color-text-muted)] flex-1">{lesson}</span>
                          {j === 0 && <span className="text-[10px] badge badge-green">Preview</span>}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-xl text-[var(--color-text)] mb-4">Your Instructor</h2>
              <div className="flex items-start gap-4">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--color-border)] flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-[var(--color-text)]">{course.instructor.name}</h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Senior Instructor, EduReach</p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    With 15+ years in the industry and 8 years of teaching experience, Dr. Osei has helped over 25,000 students worldwide master technical skills and launch meaningful careers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile enrollment card */}
          <div className="lg:hidden">
            <EnrollmentCard course={typeof course === 'object' ? course : MOCK_COURSES[0]} />
          </div>

          {/* Desktop sticky sidebar placeholder */}
          <div className="hidden lg:block" />
        </div>
      </section>
    </>
  );
}

function EnrollmentCard({ course }: { course: (typeof MOCK_COURSES)[0] }) {
  return (
    <div className="card p-6 lg:sticky lg:top-24">
      <div className="text-3xl font-display font-black text-[var(--color-text)] mb-1">
        {course.isFree ? <span className="text-primary-600 dark:text-primary-400">Free</span> : `$${course.price}`}
      </div>
      {course.isFree && <p className="text-xs text-[var(--color-text-muted)] mb-4">Always free. No credit card needed.</p>}

      <button className="btn-lg btn-primary w-full mb-3">
        Enroll Now — Free
      </button>
      <div className="flex gap-2">
        <button className="btn-md btn-ghost flex-1 gap-1.5 text-xs"><Heart size={14} /> Wishlist</button>
        <button className="btn-md btn-ghost flex-1 gap-1.5 text-xs"><Share2 size={14} /> Share</button>
      </div>

      <div className="divider" />

      <h4 className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-3">This course includes</h4>
      <ul className="flex flex-col gap-2">
        {[
          { icon: Clock,     text: `${Math.floor(course.duration / 60)}h on-demand video` },
          { icon: Download,  text: '12 downloadable resources' },
          { icon: BookOpen,  text: 'Full lifetime access' },
          { icon: Award,     text: 'Certificate of completion' },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
            <Icon size={14} className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
            {text}
          </li>
        ))}
      </ul>

      <div className="divider" />
      <div className="flex items-center justify-between text-xs text-[var(--color-text-faint)]">
        <span className="flex items-center gap-1"><Users size={12} /> {course.enrollments.toLocaleString()} students</span>
        <span className="flex items-center gap-1"><Star size={12} className="fill-accent-400 text-accent-400" /> {course.rating} rating</span>
      </div>
    </div>
  );
}
