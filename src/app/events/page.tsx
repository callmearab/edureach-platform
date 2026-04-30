import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Video, MapPin, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import EventCard from '@/components/ui/EventCard';
import { MOCK_EVENTS } from '@/lib/constants/data';

export const metadata: Metadata = {
  title: 'Events – Workshops, Webinars & Summits',
  description: 'Join free workshops, webinars, and global summits hosted by EduReach. Connect with learners and experts worldwide.',
};

const ALL_EVENTS = [...MOCK_EVENTS, ...MOCK_EVENTS.map(e => ({ ...e, id: e.id + '_2', slug: e.slug + '-2' }))];

export default function EventsPage() {
  return (
    <>
      <section className="section pt-32 hero-mesh">
        <div className="container-xl">
          <div className="max-w-3xl">
            <span className="badge badge-green mb-4">Events</span>
            <h1 className="section-title mb-4">Connect, Learn & Collaborate</h1>
            <p className="section-subtitle mb-8">
              Workshops, webinars, and global summits — all free to attend. Grow your network while advancing your skills.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="btn-lg btn-primary">Upcoming Events</button>
              <button className="btn-lg btn-ghost">Past Recordings</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="section-sm bg-[var(--color-bg-subtle)]">
        <div className="container-xl flex flex-wrap gap-4 justify-center">
          {[
            { icon: Calendar, label: '6 events this month',  color: 'text-primary-600 dark:text-primary-400' },
            { icon: Video,    label: '40+ recorded sessions', color: 'text-secondary-600 dark:text-secondary-400' },
            { icon: MapPin,   label: '12 countries hosting',  color: 'text-accent-600 dark:text-accent-400' },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)]">
              <Icon size={16} className={color} /> {label}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-xl">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Webinar', 'Workshop', 'Conference', 'Community'].map((t, i) => (
              <button key={t}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  i === 0
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-400 hover:text-primary-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="btn-lg btn-ghost">Load more events</button>
          </div>
        </div>
      </section>

      {/* Host an event CTA */}
      <section className="section-sm">
        <div className="container-xl">
          <div className="card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-[var(--color-text)] mb-1">Want to host an event with us?</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Partner with EduReach to reach thousands of eager learners globally.</p>
            </div>
            <Link href="/contact" className="btn-md btn-primary flex-shrink-0">
              Become a Host <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
