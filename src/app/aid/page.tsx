import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { AID_CATEGORIES } from '@/lib/constants/data';

export const metadata: Metadata = {
  title: 'Aid & Support – Emergency Assistance & Resources',
  description: 'Request financial, educational, medical, or emergency aid from EduReach. We connect community members with the support they need.',
};

const PROCESS_STEPS = [
  { step: 1, title: 'Submit Request',    icon: '📝', desc: 'Fill out our confidential aid form with your situation and needs.',     time: '5 minutes' },
  { step: 2, title: 'Review',            icon: '🔍', desc: 'Our team reviews and verifies your request with care and urgency.',      time: '24–48 hours' },
  { step: 3, title: 'Assessment',        icon: '📋', desc: 'We assess the best form of support and match you with available aid.',   time: '1–3 days' },
  { step: 4, title: 'Support Delivered', icon: '✅', desc: 'Aid is delivered directly — financial transfer, goods, or services.',    time: 'ASAP' },
];

const STATS = [
  { value: '1,120+', label: 'Requests fulfilled',    icon: '✅' },
  { value: '48h',    label: 'Average response time', icon: '⚡' },
  { value: '97%',    label: 'Satisfaction rate',     icon: '❤️' },
  { value: '$2.1M',  label: 'Direct aid distributed',icon: '💚' },
];

export default function AidPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30" />
        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <span className="badge badge-green mb-4">Aid & Support</span>
            <h1 className="section-title mb-4">
              You Don't Have to<br />Face This Alone
            </h1>
            <p className="section-subtitle mb-10">
              Whether you need financial help, educational resources, medical access, or emergency relief — EduReach is here. All requests are treated with complete confidentiality and dignity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/aid/request" className="btn-xl btn-primary">
                Request Aid <ArrowRight size={18} />
              </Link>
              <Link href="/donate" className="btn-xl btn-ghost">
                Support Others
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm bg-[var(--color-bg-subtle)]">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label, icon }) => (
              <div key={label} className="card p-5 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-2xl font-display font-black text-[var(--color-text)]">{value}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aid Categories */}
      <section className="section">
        <div className="container-xl">
          <SectionHeader badge="Categories" title="What Kind of Help Do You Need?" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AID_CATEGORIES.map(({ id, label, icon, description }) => (
              <Link key={id} href={`/aid/request?category=${id}`}
                className="group card-hover p-6 flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[var(--color-text)] mb-1">{label}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 mt-auto group-hover:gap-2 transition-all">
                  Request <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-[var(--color-bg-subtle)]">
        <div className="container-xl">
          <SectionHeader badge="Process" title="How Aid Works" subtitle="Simple, transparent, dignified. We're here to help, not to judge." className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-primary-100 dark:bg-primary-900 hidden md:block" />

            {PROCESS_STEPS.map(({ step, title, icon, desc, time }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-2xl shadow-glow-green mb-5 relative z-10">
                  {icon}
                </div>
                <div className="badge badge-green mb-2 text-xs">{time}</div>
                <h3 className="font-display font-bold text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & safety */}
      <section className="section">
        <div className="container-xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield,       title: 'Completely Confidential', desc: 'Your identity and situation are protected. We never share your data.' },
              { icon: CheckCircle,  title: 'No Judgment',             desc: 'We meet you where you are. Every request is treated with respect and dignity.' },
              { icon: AlertCircle,  title: 'Emergency Priority',      desc: 'Urgent cases are escalated immediately for same-day response when possible.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text)] mb-1">{title}</h3>
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
