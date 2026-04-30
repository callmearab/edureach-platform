'use client';

import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'UNICEF',       logo: '🇺🇳', color: '#00ADEF' },
  { name: 'UNESCO',       logo: '📚', color: '#4B9CD3' },
  { name: 'World Bank',   logo: '🏦', color: '#009FDA' },
  { name: 'Google.org',   logo: '🔍', color: '#4285F4' },
  { name: 'Gates Foundation', logo: '💊', color: '#00AEEF' },
  { name: 'USAID',        logo: '🇺🇸', color: '#0067B9' },
  { name: 'Mastercard',   logo: '💳', color: '#EB001B' },
  { name: 'Coursera',     logo: '🎓', color: '#0056D2' },
];

export default function PartnerLogosSection() {
  return (
    <section className="section-sm border-t border-[var(--color-border)]">
      <div className="container-xl">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--color-text-faint)] mb-8">
          Trusted by and partnered with
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors cursor-pointer"
            >
              <span className="text-xl">{partner.logo}</span>
              <span>{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
