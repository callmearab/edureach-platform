import type { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BookOpen, Award, Briefcase, Clock, ArrowRight, Play, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { MOCK_COURSES } from '@/lib/constants/data';

export const metadata: Metadata = { title: 'Student Dashboard – EduReach' };

const ENROLLED_COURSES = [
  { ...MOCK_COURSES[0], progress: 68, lastActivity: '2h ago' },
  { ...MOCK_COURSES[1], progress: 32, lastActivity: '1d ago' },
  { ...MOCK_COURSES[3], progress: 91, lastActivity: '3d ago' },
];

const STATS = [
  { label: 'Courses Enrolled', value: '6',   icon: BookOpen,  color: 'text-primary-600 dark:text-primary-400',   bg: 'bg-primary-50 dark:bg-primary-950' },
  { label: 'Hours Learned',    value: '47',  icon: Clock,     color: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-50 dark:bg-secondary-950' },
  { label: 'Certificates',     value: '2',   icon: Award,     color: 'text-accent-600 dark:text-accent-400',     bg: 'bg-accent-50 dark:bg-accent-950' },
  { label: 'Applications',     value: '3',   icon: Briefcase, color: 'text-primary-600 dark:text-primary-400',   bg: 'bg-primary-50 dark:bg-primary-950' },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student" userName="Fatima Al-Hassan" userAvatar="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=64&h=64&fit=crop">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-[var(--color-text)] mb-1">
          Welcome back, Fatima 👋
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">You have 3 courses in progress. Keep it up!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={17} className={color} />
            </div>
            <div className="text-2xl font-display font-black text-[var(--color-text)] mb-0.5">{value}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Courses in progress */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-[var(--color-text)]">Continue Learning</h2>
            <Link href="/dashboard/student/courses" className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {ENROLLED_COURSES.map(course => (
              <div key={course.id} className="card p-4 flex items-center gap-4">
                <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-[var(--color-text)] truncate mb-1">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="progress-bar flex-1">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 w-8 text-right">{course.progress}%</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-faint)]">Last activity: {course.lastActivity}</p>
                </div>
                <Link href={`/programs/courses/${course.slug}`}
                  className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors flex-shrink-0"
                >
                  <Play size={14} className="translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Streak */}
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">🔥</div>
              <div>
                <p className="font-bold text-[var(--color-text)]">7-Day Streak!</p>
                <p className="text-xs text-[var(--color-text-muted)]">Keep learning daily</p>
              </div>
            </div>
            <div className="flex gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className={`flex-1 flex flex-col items-center gap-1`}>
                  <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs ${i < 7 ? 'bg-primary-500 text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-faint)]'}`}>
                    {i < 7 ? '✓' : ''}
                  </div>
                  <span className="text-[9px] text-[var(--color-text-faint)]">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent certificates */}
          <div className="card p-5">
            <h3 className="font-semibold text-sm text-[var(--color-text)] mb-3">Certificates Earned</h3>
            {[
              { course: 'Web Dev Fundamentals', date: 'Mar 2024', icon: '🏆' },
              { course: 'Digital Marketing',    date: 'Jan 2024', icon: '🥇' },
            ].map(({ course, date, icon }) => (
              <div key={course} className="flex items-center gap-3 py-2.5 border-b border-[var(--color-border)] last:border-0">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text)]">{course}</p>
                  <p className="text-[10px] text-[var(--color-text-faint)]">{date}</p>
                </div>
              </div>
            ))}
            <Link href="/dashboard/student/certificates" className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 mt-3">
              View all <ArrowRight size={11} />
            </Link>
          </div>

          {/* Recommended */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={15} className="text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-sm text-[var(--color-text)]">Recommended Next</h3>
            </div>
            <div className="flex items-start gap-3">
              <img src={MOCK_COURSES[2].thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text)] line-clamp-2">{MOCK_COURSES[2].title}</p>
                <Link href={`/programs/courses/${MOCK_COURSES[2].slug}`} className="text-[11px] text-primary-600 dark:text-primary-400 font-medium mt-1 block">
                  Enroll free →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
