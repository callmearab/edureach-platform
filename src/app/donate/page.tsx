'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, BarChart3, ArrowRight, Check } from 'lucide-react';

const AMOUNTS = [10, 25, 50, 100, 250, 500];

const CAMPAIGNS = [
  { id: 'general',     label: 'Where Needed Most',  icon: '💚', desc: 'We allocate to highest-impact programs' },
  { id: 'education',   label: 'Education Programs',  icon: '📚', desc: 'Fund free courses and workshops' },
  { id: 'scholarship', label: 'Scholarship Fund',    icon: '🎓', desc: 'Direct student financial support' },
  { id: 'emergency',   label: 'Emergency Aid',       icon: '🆘', desc: 'Crisis response and relief' },
];

const IMPACT_MAP: Record<number, string[]> = {
  10:  ['Textbooks for 2 students', 'One month of internet access'],
  25:  ['Fund 5 course completions', '1 month of tutoring support'],
  50:  ['Sponsor a workshop seat', 'School supplies for 3 kids'],
  100: ['3 months of mentorship', 'Emergency aid package'],
  250: ['Full scholarship month', 'One complete course development'],
  500: ['5 full scholarships', 'Fund an entire cohort workshop'],
};

const TRANSPARENCY = [
  { pct: 78, label: 'Programs & Learning', color: 'bg-primary-500' },
  { pct: 14, label: 'Aid Distribution',    color: 'bg-secondary-500' },
  { pct: 5,  label: 'Operations',          color: 'bg-accent-500' },
  { pct: 3,  label: 'Fundraising',         color: 'bg-gray-400' },
];

export default function DonatePage() {
  const [amount,    setAmount]    = useState(50);
  const [custom,    setCustom]    = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [campaign,  setCampaign]  = useState('general');
  const [anonymous, setAnonymous] = useState(false);

  const finalAmount = custom ? parseInt(custom) || 0 : amount;

  return (
    <>
      {/* Hero */}
      <section className="section pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container-xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-5">
            <Heart size={12} className="text-red-300 fill-red-300" /> Support Our Mission
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Every Dollar<br />Educates Someone
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            100% of your donation reaches programs directly. We run on volunteer power and institutional grants — your gift goes entirely to impact.
          </p>
        </div>
      </section>

      {/* Main donation form + info */}
      <section className="section">
        <div className="container-xl grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="card p-8">
            <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-6">Make a Donation</h2>

            {/* Frequency toggle */}
            <div className="flex gap-2 p-1 bg-[var(--color-surface-2)] rounded-xl mb-6">
              {(['monthly', 'one-time'] as const).map(f => (
                <button key={f}
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    frequency === f
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {f === 'monthly' ? '♻️ Monthly' : '💛 One-time'}
                </button>
              ))}
            </div>

            {/* Amount grid */}
            <label className="label">Select Amount</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {AMOUNTS.map(a => (
                <button key={a}
                  onClick={() => { setAmount(a); setCustom(''); }}
                  className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                    amount === a && !custom
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-300'
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-bold">$</span>
              <input
                type="number" placeholder="Custom amount"
                value={custom}
                onChange={e => setCustom(e.target.value)}
                className="input pl-8"
              />
            </div>

            {/* Impact preview */}
            {finalAmount > 0 && IMPACT_MAP[finalAmount as keyof typeof IMPACT_MAP] && (
              <motion.div
                key={finalAmount}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 mb-6"
              >
                <p className="text-xs font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wider mb-2">Your impact at ${finalAmount}</p>
                {(IMPACT_MAP[finalAmount] || IMPACT_MAP[50]).map(impact => (
                  <div key={impact} className="flex items-center gap-2 text-sm text-primary-800 dark:text-primary-300">
                    <Check size={14} /> {impact}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Campaign */}
            <label className="label">Designate Your Gift</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {CAMPAIGNS.map(c => (
                <button key={c.id}
                  onClick={() => setCampaign(c.id)}
                  className={`p-3 rounded-xl text-left border-2 transition-all ${
                    campaign === c.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                      : 'border-[var(--color-border)] hover:border-primary-300'
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <p className="text-xs font-bold text-[var(--color-text)] mt-1">{c.label}</p>
                  <p className="text-[10px] text-[var(--color-text-faint)]">{c.desc}</p>
                </button>
              ))}
            </div>

            {/* Anonymous */}
            <label className="flex items-center gap-3 cursor-pointer mb-6">
              <div
                onClick={() => setAnonymous(!anonymous)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  anonymous ? 'border-primary-500 bg-primary-500' : 'border-[var(--color-border)]'
                }`}
              >
                {anonymous && <Check size={12} className="text-white" />}
              </div>
              <span className="text-sm text-[var(--color-text-muted)]">Make this donation anonymous</span>
            </label>

            <button className="btn-xl btn-primary w-full">
              <Heart size={18} className="fill-white" />
              Donate ${finalAmount || '—'} {frequency === 'monthly' ? '/ month' : 'Now'}
              <ArrowRight size={18} />
            </button>
            <p className="text-center text-xs text-[var(--color-text-faint)] mt-3">
              🔒 Secured by Stripe · PCI DSS Level 1 · 501(c)(3) Tax Deductible
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Transparency */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 size={20} className="text-primary-600 dark:text-primary-400" />
                <h3 className="font-display font-bold text-[var(--color-text)]">Where Your Money Goes</h3>
              </div>
              <div className="flex flex-col gap-3">
                {TRANSPARENCY.map(({ pct, label, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[var(--color-text)]">{label}</span>
                      <span className="font-bold text-[var(--color-text)]">{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full rounded-full ${color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-[var(--color-text)] mb-4">Why Trust EduReach?</h3>
              {[
                { icon: '🏛️', title: 'Registered 501(c)(3)',      desc: 'All donations are tax-deductible in the USA.' },
                { icon: '🔍', title: 'Charity Navigator 4-Star',  desc: 'Top-rated for transparency and accountability.' },
                { icon: '📊', title: 'Annual Reports Published',  desc: 'Full financial breakdowns available publicly.' },
                { icon: '🔒', title: 'Bank-Level Security',       desc: 'PCI DSS compliant payment processing.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent donors */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-[var(--color-text)] mb-4">Recent Supporters</h3>
              {[
                { name: 'Sarah J.',    amount: '$500/mo', time: '2h ago',   msg: 'Keep changing lives!' },
                { name: 'Anonymous',  amount: '$1,000',  time: '5h ago',   msg: '' },
                { name: 'Carlos M.',  amount: '$25/mo',  time: '1d ago',   msg: 'Education is freedom.' },
                { name: 'TechCorp',   amount: '$5,000',  time: '2d ago',   msg: 'Proud to support this mission.' },
              ].map(({ name, amount, time, msg }) => (
                <div key={`${name}-${time}`} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-300 flex-shrink-0">
                    {name === 'Anonymous' ? '?' : name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-[var(--color-text)]">{name}</span>
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{amount}</span>
                    </div>
                    {msg && <p className="text-xs text-[var(--color-text-muted)] truncate">"{msg}"</p>}
                    <p className="text-[10px] text-[var(--color-text-faint)]">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
