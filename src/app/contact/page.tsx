'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Users, Briefcase } from 'lucide-react';

const TOPICS = [
  { id: 'general',      label: 'General Inquiry',   icon: MessageSquare },
  { id: 'partnership',  label: 'Partnership',        icon: Briefcase },
  { id: 'volunteer',    label: 'Volunteering',       icon: Users },
  { id: 'support',      label: 'Technical Support',  icon: MessageSquare },
];

const OFFICES = [
  { city: 'Nairobi',   country: 'Kenya',       flag: '🇰🇪', role: 'Africa Regional Hub' },
  { city: 'New York',  country: 'USA',         flag: '🇺🇸', role: 'Americas HQ' },
  { city: 'Mumbai',    country: 'India',       flag: '🇮🇳', role: 'Asia Pacific Hub' },
  { city: 'London',    country: 'UK',          flag: '🇬🇧', role: 'Europe Office' },
];

export default function ContactPage() {
  const [topic, setTopic] = useState('general');
  const [sent,  setSent]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="section pt-32 hero-mesh">
        <div className="container-xl text-center">
          <span className="badge badge-green mb-4">Contact</span>
          <h1 className="section-title mb-4">Let's Talk</h1>
          <p className="section-subtitle mx-auto text-center">
            Whether you have a question, want to partner, or need support — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-xl grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="card p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display font-bold text-2xl text-[var(--color-text)] mb-2">Message Received!</h3>
                <p className="text-[var(--color-text-muted)]">We'll get back to you within 24 hours. Thank you for reaching out.</p>
                <button onClick={() => setSent(false)} className="btn-md btn-outline-primary mt-6">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="font-display font-bold text-xl text-[var(--color-text)]">Send us a message</h2>

                {/* Topic selector */}
                <div>
                  <label className="label">Topic</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPICS.map(({ id, label, icon: Icon }) => (
                      <button type="button" key={id} onClick={() => setTopic(id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          topic === id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                            : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-300'
                        }`}
                      >
                        <Icon size={15} /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">First Name</label>
                    <input type="text" className="input" placeholder="Amara" required />
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input type="text" className="input" placeholder="Osei" required />
                  </div>
                </div>

                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="amara@example.com" required />
                </div>

                <div>
                  <label className="label">Organization (optional)</label>
                  <input type="text" className="input" placeholder="Your organization" />
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea className="input min-h-[120px] resize-y" placeholder="Tell us what's on your mind..." required />
                </div>

                <button type="submit" className="btn-lg btn-primary w-full">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            {/* Direct contacts */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-[var(--color-text)] mb-4">Get in Touch</h3>
              {[
                { icon: Mail,  label: 'Email',  value: 'hello@edureach.org',     href: 'mailto:hello@edureach.org' },
                { icon: Mail,  label: 'Press',  value: 'press@edureach.org',     href: 'mailto:press@edureach.org' },
                { icon: Phone, label: 'Phone',  value: '+1 (800) EDU-REACH',    href: 'tel:+18003383224' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-3 py-3 border-b border-[var(--color-border)] last:border-0 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-faint)]">{label}</p>
                    <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-primary-600 dark:group-hover:text-primary-400">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Global offices */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-[var(--color-text)] mb-4">Global Offices</h3>
              <div className="grid grid-cols-2 gap-3">
                {OFFICES.map(({ city, country, flag, role }) => (
                  <div key={city} className="p-3 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{flag}</span>
                      <span className="font-semibold text-sm text-[var(--color-text)]">{city}</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-faint)]">{country}</p>
                    <p className="text-[10px] text-primary-600 dark:text-primary-400 font-medium mt-0.5">{role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="card p-6 flex items-start gap-4">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold text-[var(--color-text)] mb-1">Quick Response Guarantee</h4>
                <p className="text-sm text-[var(--color-text-muted)]">We respond to all inquiries within 24 hours during business days. For urgent aid requests, we aim for same-day response.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
