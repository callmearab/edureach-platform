import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, Award } from 'lucide-react';
import { type Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course:    Course;
  featured?: boolean;
  className?: string;
}

const LEVEL_COLOR: Record<string, string> = {
  beginner:     'badge-green',
  intermediate: 'badge-yellow',
  advanced:     'badge-blue',
};

export default function CourseCard({ course, featured, className }: CourseCardProps) {
  const hours = Math.floor(course.duration / 60);
  const mins  = course.duration % 60;

  return (
    <Link href={`/programs/courses/${course.slug}`} className={cn('group block', className)}>
      <article className={cn(
        'card-hover h-full flex flex-col overflow-hidden',
        featured && 'ring-2 ring-primary-500',
      )}>
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-[var(--color-surface-2)]">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">📚</span>
            </div>
          )}

          {/* Overlays */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={cn('badge', LEVEL_COLOR[course.level] || 'badge-gray')}>
              {course.level}
            </span>
            {course.isFree && (
              <span className="badge badge-green">Free</span>
            )}
          </div>
          {course.certificate && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-yellow"><Award size={10} /> Certificate</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category */}
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">
            {course.category}
          </span>

          {/* Title */}
          <h3 className="font-display font-semibold text-[var(--color-text)] text-base leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 flex-1 mb-4">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[var(--color-border)]">
            <img
              src={course.instructor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor.name)}&size=24`}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-[var(--color-text-muted)]">{course.instructor.name}</span>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} />
                {course.enrollments.toLocaleString()}
              </span>
            </div>
            <span className="flex items-center gap-1 text-accent-500">
              <Star size={12} className="fill-current" />
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
