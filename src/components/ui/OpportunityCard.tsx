import Link from 'next/link';
import { MapPin, Clock, Users, ExternalLink, Bookmark } from 'lucide-react';
import { type Opportunity } from '@/types';
import { cn, formatDate, getDaysUntil } from '@/lib/utils';

const TYPE_COLOR: Record<string, string> = {
  scholarship: 'badge-green',
  job:         'badge-blue',
  fellowship:  'badge-yellow',
  grant:       'badge-yellow',
  internship:  'badge-blue',
};

const TYPE_ICON: Record<string, string> = {
  scholarship: '🎓',
  job:         '💼',
  fellowship:  '🔬',
  grant:       '💰',
  internship:  '📋',
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  className?:  string;
}

export default function OpportunityCard({ opportunity, className }: OpportunityCardProps) {
  const daysLeft = getDaysUntil(opportunity.deadline);
  const isUrgent = daysLeft <= 7 && daysLeft > 0;
  const isClosed = daysLeft <= 0;

  return (
    <article className={cn('card-hover p-5 flex flex-col gap-4', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-[var(--color-surface-2)] flex items-center justify-center text-xl flex-shrink-0">
            {TYPE_ICON[opportunity.type] || '📌'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('badge', TYPE_COLOR[opportunity.type] || 'badge-gray')}>
                {opportunity.type}
              </span>
              {isUrgent && <span className="badge bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">Closing soon</span>}
            </div>
            <h3 className="font-display font-semibold text-[var(--color-text)] text-sm leading-tight line-clamp-2">
              {opportunity.title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{opportunity.organization}</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all flex-shrink-0" aria-label="Save opportunity">
          <Bookmark size={14} />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
        {opportunity.description}
      </p>

      {/* Details */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {(opportunity.location || opportunity.isRemote) && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <MapPin size={11} />
            {opportunity.isRemote ? 'Remote' : opportunity.location}
          </span>
        )}
        {opportunity.stipend && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400">
            💰 {opportunity.stipend}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Users size={11} />
          {opportunity.applications} applied
        </span>
      </div>

      {/* Tags */}
      {opportunity.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {opportunity.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge badge-gray text-xs">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-[var(--color-border)]">
        <span className={cn(
          'flex items-center gap-1.5 text-xs font-medium',
          isClosed  ? 'text-[var(--color-text-faint)]' :
          isUrgent  ? 'text-red-600 dark:text-red-400' :
                      'text-[var(--color-text-muted)]',
        )}>
          <Clock size={11} />
          {isClosed  ? 'Closed' :
           isUrgent  ? `${daysLeft}d left` :
                       `Deadline: ${formatDate(opportunity.deadline, { month: 'short', day: 'numeric' })}`}
        </span>

        <Link href={`/opportunities/${opportunity.slug}`}
          className="btn-sm btn-primary text-xs px-3 py-1.5"
        >
          Apply <ExternalLink size={11} />
        </Link>
      </div>
    </article>
  );
}
