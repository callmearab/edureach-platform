import Link from 'next/link';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { type BlogPost } from '@/types';
import { cn, formatDate, formatNumber } from '@/lib/utils';

interface BlogCardProps {
  post:      BlogPost;
  featured?: boolean;
  className?: string;
}

export default function BlogCard({ post, featured, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn('group block', className)}>
      <article className={cn(
        'card-hover overflow-hidden h-full flex',
        featured ? 'flex-row' : 'flex-col',
      )}>
        {/* Thumbnail */}
        <div className={cn(
          'overflow-hidden bg-[var(--color-surface-2)] flex-shrink-0',
          featured ? 'w-2/5 aspect-auto' : 'aspect-video w-full',
        )}>
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
          )}
        </div>

        {/* Body */}
        <div className={cn('flex flex-col p-5 flex-1', featured && 'justify-center')}>
          <div className="flex items-center gap-2 mb-3">
            <span className="badge badge-green">{post.category}</span>
            <span className="text-xs text-[var(--color-text-faint)]">
              {formatDate(post.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h3 className={cn(
            'font-display font-semibold text-[var(--color-text)] leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
            featured ? 'text-xl' : 'text-base line-clamp-2',
          )}>
            {post.title}
          </h3>

          <p className={cn(
            'text-sm text-[var(--color-text-muted)] leading-relaxed mb-4',
            featured ? 'line-clamp-3' : 'line-clamp-2',
          )}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-faint)]">
              <div className="flex items-center gap-1.5">
                <img
                  src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&size=20`}
                  alt={post.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}m</span>
              <span className="flex items-center gap-1"><Eye size={11} /> {formatNumber(post.views)}</span>
            </div>

            <span className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
