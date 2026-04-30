'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { IMPACT_METRICS } from '@/lib/constants/data';

const EXTENDED_METRICS = [
  { label: 'Students Educated',  value: 12480,  suffix: '+', prefix: '',  icon: '🎓', desc: 'Active learners worldwide' },
  { label: 'Countries Served',   value: 47,     suffix: '',  prefix: '',  icon: '🌍', desc: 'Across 6 continents' },
  { label: 'Courses Available',  value: 240,    suffix: '+', prefix: '',  icon: '📚', desc: 'Free & certified programs' },
  { label: 'Total Donated',      value: 3.2,    suffix: 'M', prefix: '$', icon: '💚', desc: 'Transparent fund usage', decimals: 1 },
  { label: 'Opportunities Posted',value: 185,   suffix: '+', prefix: '',  icon: '💼', desc: 'Jobs, grants & fellowships' },
  { label: 'Volunteers',         value: 840,    suffix: '+', prefix: '',  icon: '🤝', desc: 'Dedicated community members' },
  { label: 'Aid Requests Fulfilled', value: 1120, suffix: '+', prefix: '', icon: '🆘', desc: 'Lives supported in crisis' },
  { label: 'Lives Impacted',     value: 28600,  suffix: '+', prefix: '',  icon: '✨', desc: 'Direct & indirect impact' },
];

export default function ImpactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-900" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute inset-0 bg-gradient-mesh-dark" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white/80 border border-white/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Our Impact
          </span>
          <h2 className="section-title text-white mb-4">Numbers That Tell a Story</h2>
          <p className="section-subtitle text-white/70 mx-auto text-center">
            Every statistic represents a real person whose life has been touched by education and opportunity.
          </p>
        </div>

        {/* Metrics grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {EXTENDED_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center hover:bg-white/12 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-display font-black text-white mb-1.5">
                  <AnimatedCounter
                    end={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </div>
                <div className="text-sm font-semibold text-white/90 mb-1">{metric.label}</div>
                <div className="text-xs text-white/50">{metric.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-12 p-6 rounded-2xl bg-white/8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-white mb-1">Help us reach 50,000 students by 2026</h3>
            <p className="text-sm text-white/60">Your donation goes directly to education programs, scholarships, and emergency aid.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="/donate" className="btn-lg bg-white text-primary-700 hover:bg-primary-50 font-bold shadow-lg hover:shadow-xl transition-all">
              Donate Now
            </a>
            <a href="/about#impact" className="btn-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all">
              View Report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
