'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, ChevronDown, BookOpen, Briefcase, Heart, GraduationCap, Users, Calendar, Rss, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants/data';

const NAV_ITEMS = [
  { label: 'About',     href: '/about' },
  {
    label: 'Programs', href: '/programs',
    children: [
      { label: 'Courses',    href: '/programs/courses',    icon: BookOpen,     desc: 'Self-paced online learning' },
      { label: 'Workshops',  href: '/programs/workshops',  icon: Briefcase,    desc: 'Intensive skill sessions' },
      { label: 'Mentorship', href: '/programs/mentorship', icon: GraduationCap,desc: '1:1 expert guidance' },
    ],
  },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Aid & Support', href: '/aid' },
  {
    label: 'Community', href: '#',
    children: [
      { label: 'Blog',      href: '/blog',      icon: Rss,      desc: 'Stories & insights' },
      { label: 'Events',    href: '/events',    icon: Calendar, desc: 'Workshops & summits' },
      { label: 'Volunteer', href: '/volunteer', icon: Users,    desc: 'Join our mission' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname   = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleMouseEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--color-surface)]/95 backdrop-blur-xl shadow-[var(--shadow-md)] border-b border-[var(--color-border)]'
          : 'bg-transparent',
      )}>
        <div className="container-xl">
          <nav className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm group-hover:shadow-glow-green transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-[var(--color-text)] tracking-tight leading-none block">
                  EduReach
                </span>
                <span className="text-[10px] text-primary-600 dark:text-primary-400 font-semibold tracking-widest uppercase leading-none">
                  Global Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  {item.children ? (
                    <button className={cn(
                      'nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[var(--color-surface-2)]',
                      activeDropdown === item.label && 'text-[var(--color-text)]',
                    )}>
                      {item.label}
                      <ChevronDown size={14} className={cn('transition-transform duration-200', activeDropdown === item.label && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link href={item.href} className={cn(
                      'nav-link flex items-center px-3 py-2 rounded-lg hover:bg-[var(--color-surface-2)]',
                      isActive(item.href) && 'nav-link-active',
                    )}>
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-lg)] overflow-hidden p-2"
                      >
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-2)] transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                              <child.icon size={15} className="text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[var(--color-text)]">{child.label}</div>
                              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{child.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Auth buttons - desktop */}
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="btn-sm btn-ghost text-sm">Sign In</Link>
                <Link href="/donate" className="btn-sm btn-primary text-sm">
                  <Heart size={14} /> Donate
                </Link>
              </div>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute top-0 right-0 bottom-0 w-80 bg-[var(--color-surface)] shadow-2xl overflow-y-auto">
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <>
                          <div className="px-3 py-2 text-xs font-bold text-[var(--color-text-faint)] uppercase tracking-widest mt-4 mb-1">
                            {item.label}
                          </div>
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-2)] transition-colors"
                            >
                              <child.icon size={16} className="text-primary-600 dark:text-primary-400" />
                              <span className="text-sm font-medium text-[var(--color-text)]">{child.label}</span>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <Link href={item.href}
                          className={cn(
                            'px-3 py-2.5 rounded-xl text-sm font-medium transition-colors block',
                            isActive(item.href)
                              ? 'bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400'
                              : 'text-[var(--color-text)] hover:bg-[var(--color-surface-2)]',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-2">
                  <Link href="/auth/login" className="btn-md btn-ghost w-full justify-center">Sign In</Link>
                  <Link href="/donate" className="btn-md btn-primary w-full justify-center">
                    <Heart size={15} /> Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
