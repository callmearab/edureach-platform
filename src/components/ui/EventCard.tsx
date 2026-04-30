import Link from 'next/link';
import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { type Event } from '@/types';
import { cn, formatDate } from '@/lib/utils';

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  workshop:   { color: 'badge-green',  label: 'Workshop' },
  webinar:    { color: 'badge-blue',   label: 'Webinar' },
  conference: { color: 'badge-yellow', label: 'Conference' },
  community:  { color: 'badge-gray',   label: 'Community' },
};

interface EventCardProps {
  event:     Event;
  className?: string;
}

export default function EventCard({ event, className }: EventCardProps) {
  const typeConf = TYPE_CONFIG[event.type] || TYPE_CONFIG.community;
  const isFull   = event.capacity ? event.registered >= event.capacity : false;
  const pctFull  = event.capacity ? Math.round((event.registered / event.capacity) * 100) : 0;
  const startDate = new Date(event.startDate);

  return (
    <Link href={`/events/${event.slug}`} className={cn('group block', className)}>
      <article className="card-hover overflow-hidden h-full flex flex-col">
        {/* Date banner */}
        <div className="relative overflow-hidden">
          {event.thumbnail ? (
            <img src={event.thumbnail} alt={event.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
              <span className="text-5xl">📅</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={cn('badge', typeConf.color)}>{typeConf.label}</span>
            {event.isVirtual && <span className="badge badge-blue"><Video size={10} /> Virtual</span>}
          </div>
          {/* Date overlay */}
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-xl px-3 py-2 text-center shadow-lg border border-[var(--color-border)]">
            <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">
              {startDate.toLocaleString('default', { month: 'short' })}
            </div>
            <div className="text-2xl font-display font-bold text-[var(--color-text)] leading-none">
              {startDate.getDate()}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <h3 className="font-display font-semibold text-[var(--color-text)] leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 flex-1">{event.description}</p>

          <div className="flex flex-col gap-2 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(event.startDate, { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              {event.isVirtual ? 'Online' : event.location}
            </span>
          </div>

          {/* Registration progress */}
          {event.capacity && (
            <div className="mt-auto pt-3 border-t border-[var(--color-border)]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                  <Users size={11} /> {event.registered.toLocaleString()} registered
                </span>
                <span className={cn('font-semibold', isFull ? 'text-red-600' : 'text-primary-600 dark:text-primary-400')}>
                  {isFull ? 'Full' : `${event.capacity - event.registered} spots left`}
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pctFull}%` }} />
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
