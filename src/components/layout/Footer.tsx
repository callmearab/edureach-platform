import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  Programs: [
    { label: 'Online Courses',  href: '/programs/courses' },
    { label: 'Workshops',       href: '/programs/workshops' },
    { label: 'Mentorship',      href: '/programs/mentorship' },
    { label: 'Certificates',    href: '/programs/certificates' },
  ],
  Opportunities: [
    { label: 'Scholarships',    href: '/opportunities?type=scholarship' },
    { label: 'Jobs',            href: '/opportunities?type=job' },
    { label: 'Fellowships',     href: '/opportunities?type=fellowship' },
    { label: 'Grants',          href: '/opportunities?type=grant' },
  ],
  Organization: [
    { label: 'About Us',        href: '/about' },
    { label: 'Our Team',        href: '/about#team' },
    { label: 'Impact Report',   href: '/about#impact' },
    { label: 'Annual Report',   href: '/docs/annual-report' },
    { label: 'Press',           href: '/press' },
  ],
  Support: [
    { label: 'Aid & Support',   href: '/aid' },
    { label: 'Donate',          href: '/donate' },
    { label: 'Volunteer',       href: '/volunteer' },
    { label: 'Partner With Us', href: '/partner' },
    { label: 'Contact',         href: '/contact' },
  ],
};

const SOCIALS = [
  { icon: Twitter,   href: 'https://twitter.com/edureach',   label: 'Twitter' },
  { icon: Linkedin,  href: 'https://linkedin.com/edureach',  label: 'LinkedIn' },
  { icon: Facebook,  href: 'https://facebook.com/edureach',  label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/edureach', label: 'Instagram' },
  { icon: Youtube,   href: 'https://youtube.com/edureach',   label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
      {/* Main Footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-[var(--color-text)]">EduReach</span>
            </Link>

            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 max-w-xs">
              Democratizing education and opportunity for underserved communities worldwide. Every learner deserves a chance to thrive.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2 mb-6">
              {[
                { icon: Mail,    text: 'hello@edureach.org' },
                { icon: Phone,   text: '+1 (800) EDU-REACH' },
                { icon: MapPin,  text: 'Global – 47 Countries' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
                  <Icon size={14} className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-[var(--color-text)] uppercase tracking-widest mb-4">{category}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href}
                        className="text-sm text-[var(--color-text-muted)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-[var(--color-text)] mb-1">Stay connected</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Impact stories, opportunities, and events in your inbox.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email" placeholder="your@email.com"
                className="input w-full sm:w-64"
              />
              <button type="submit" className="btn-md btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="container-xl py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-faint)]">
            © {new Date().getFullYear()} EduReach Global Foundation. All rights reserved. 501(c)(3) non-profit.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
