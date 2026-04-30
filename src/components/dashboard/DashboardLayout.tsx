'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Award, Briefcase, Heart, Users,
  Settings, LogOut, Menu, X, Bell, ChevronRight, BarChart3,
  FileText, CheckSquare, DollarSign, Shield, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type DashRole = 'student' | 'donor' | 'admin';

const NAV_ITEMS: Record<DashRole, { href: string; label: string; icon: React.ElementType }[]> = {
  student: [
    { href: '/dashboard/student',               label: 'Overview',     icon: LayoutDashboard },
    { href: '/dashboard/student/courses',        label: 'My Courses',   icon: BookOpen },
    { href: '/dashboard/student/certificates',   label: 'Certificates', icon: Award },
    { href: '/dashboard/student/applications',   label: 'Applications', icon: Briefcase },
    { href: '/dashboard/student/settings',       label: 'Settings',     icon: Settings },
  ],
  donor: [
    { href: '/dashboard/donor',                  label: 'Overview',     icon: LayoutDashboard },
    { href: '/dashboard/donor/donations',        label: 'My Donations', icon: Heart },
    { href: '/dashboard/donor/impact',           label: 'Impact',       icon: BarChart3 },
    { href: '/dashboard/donor/receipts',         label: 'Receipts',     icon: FileText },
    { href: '/dashboard/donor/settings',         label: 'Settings',     icon: Settings },
  ],
  admin: [
    { href: '/dashboard/admin',                  label: 'Overview',     icon: LayoutDashboard },
    { href: '/dashboard/admin/users',            label: 'Users',        icon: Users },
    { href: '/dashboard/admin/courses',          label: 'Courses',      icon: BookOpen },
    { href: '/dashboard/admin/opportunities',    label: 'Opportunities',icon: Briefcase },
    { href: '/dashboard/admin/aid',              label: 'Aid Requests', icon: HelpCircle },
    { href: '/dashboard/admin/donations',        label: 'Donations',    icon: DollarSign },
    { href: '/dashboard/admin/volunteers',       label: 'Volunteers',   icon: Users },
    { href: '/dashboard/admin/reports',          label: 'Reports',      icon: BarChart3 },
    { href: '/dashboard/admin/settings',         label: 'Settings',     icon: Settings },
  ],
};

const ROLE_CONFIG: Record<DashRole, { label: string; color: string; bg: string }> = {
  student: { label: 'Student Portal',    color: 'text-primary-600 dark:text-primary-400',   bg: 'bg-primary-50 dark:bg-primary-950' },
  donor:   { label: 'Donor Dashboard',   color: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-50 dark:bg-secondary-950' },
  admin:   { label: 'Admin Console',     color: 'text-accent-600 dark:text-accent-400',     bg: 'bg-accent-50 dark:bg-accent-950' },
};

interface DashboardLayoutProps {
  children:  React.ReactNode;
  role:      DashRole;
  userName?: string;
  userAvatar?: string;
}

export default function DashboardLayout({ children, role, userName = 'User', userAvatar }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname   = usePathname();
  const navItems   = NAV_ITEMS[role];
  const roleConfig = ROLE_CONFIG[role];

  const Sidebar = () => (
    <aside className={cn(
      'flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)]',
    )}>
      {/* Brand */}
      <div className="p-5 border-b border-[var(--color-border)]">
        <Link href="/" className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-[var(--color-text)]">EduReach</span>
        </Link>
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold', roleConfig.bg, roleConfig.color)}>
          <Shield size={10} /> {roleConfig.label}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== `/dashboard/${role}` && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]',
              )}
            >
              <Icon size={16} />
              {label}
              {active && <ChevronRight size={12} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=32&background=22c55e&color=fff`}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--color-text)] truncate">{userName}</p>
            <p className="text-xs text-[var(--color-text-faint)] capitalize">{role}</p>
          </div>
        </div>
        <Link href="/auth/logout" className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-red-500 transition-colors">
          <LogOut size={13} /> Sign Out
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-[var(--color-bg-subtle)] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-64"
            >
              <Sidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-4 gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] transition-all"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1" />

          {/* Notifications */}
          <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] transition-all">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          <Link href="/" className="btn-sm btn-ghost text-xs">← Back to Site</Link>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
