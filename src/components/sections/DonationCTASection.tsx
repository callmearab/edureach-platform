'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, ArrowRight } from 'lucide-react';

const AMOUNTS = [10, 25, 50, 100, 250];

const IMPACT_MAP: Record<number, string> = {
  10:  'Provides textbooks for 2 students',
  25:  'Funds 1 month of internet access',
  50:  'Sponsors a workshop seat',
  100: 'Covers 3 months of tutoring',
  250: 'Fully funds a scholarship month',
};

export default function DonationCTASection() {
  const [selected, setSelected] = useState(50);
  const [custom, setCustom]     = useState('');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const amount = custom ? parseInt(custom) || 0 : selected;

  return (
    <section className="section">
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden relative"
        >
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800" />
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />

          <div className="relative z-10 p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-white/80 text-xs font-bold uppercase tracking-wider mb-5">
                <Heart size={12} className="text-red-300 fill-red-300" /> Make a Difference
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
                Every Dollar Changes a Life
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                100% of your donation goes directly to educational programs, emergency aid, and scholarships. Zero administrative fees.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">✓ Tax deductible (501c3)</span>
                <span className="flex items-center gap-1.5">✓ Fully transparent</span>
              </div>
            </div>

            {/* Right - Donation widget */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display font-bold text-lg text-[var(--color-text)] mb-4">Choose your impact</h3>

              {/* Amount grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {AMOUNTS.map(a => (
                  <button
                    key={a}
                    onClick={() => { setSelected(a); setCustom(''); }}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                      selected === a && !custom
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-300'
                    }`}
                  >
                    ${a}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom"
                  value={custom}
                  onChange={e => { setCustom(e.target.value); }}
                  className="input py-2.5 text-sm text-center font-bold col-span-1"
                />
              </div>

              {/* Impact indicator */}
              {amount > 0 && (
                <motion.div
                  key={amount}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 mb-4"
                >
                  <span className="text-lg">✨</span>
                  <p className="text-xs text-primary-700 dark:text-primary-400 font-medium">
                    ${amount} → {IMPACT_MAP[amount] || `Provides ${Math.floor(amount / 10)} learning resources`}
                  </p>
                </motion.div>
              )}

              {/* Frequency */}
              <div className="flex gap-2 mb-4">
                {['One-time', 'Monthly', 'Yearly'].map(freq => (
                  <button key={freq}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      freq === 'Monthly'
                        ? 'border-primary-500 bg-primary-600 text-white'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-300'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              <button className="btn-lg btn-primary w-full text-base">
                <Heart size={16} className="fill-white" />
                Donate ${amount || '—'} Now
                <ArrowRight size={16} />
              </button>

              <p className="text-center text-xs text-[var(--color-text-faint)] mt-3">
                🔒 Secure · SSL encrypted · PCI compliant
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
