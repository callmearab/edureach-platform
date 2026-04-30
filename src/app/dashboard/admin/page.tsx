import type { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Users, BookOpen, DollarSign, AlertCircle, TrendingUp, CheckCircle, XCircle, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';
import { MOCK_COURSES, PLATFORM_STATS } from '@/lib/constants/data';

export const metadata: Metadata = { title: 'Admin Console – EduReach' };

const PENDING_AID = [
  { id: 'a1', name: 'James O.',  type: 'Financial',   amount: '$200',  priority: 'urgent', submitted: '2h ago' },
  { id: 'a2', name: 'Priya K.',  type: 'Educational', amount: 'Laptop',priority: 'high',   submitted: '5h ago' },
  { id: 'a3', name: 'Carlos M.', type: 'Medical',     amount: '$150',  priority: 'medium', submitted: '1d ago' },
  { id: 'a4', name: 'Fatima A.', type: 'Emergency',   amount: '$500',  priority: 'urgent', submitted: '30m ago' },
];

const RECENT_USERS = [
  { name: 'Amina Diallo',  role: 'student', joined: '2h ago',  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=32&h=32&fit=crop' },
  { name: 'Wei Zhang',     role: 'student', joined: '4h ago',  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop' },
  { name: 'Marcus Rivera', role: 'mentor',  joined: '6h ago',  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop' },
  { name: 'Sarah Johnson', role: 'donor',   joined: '8h ago',  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop' },
];

const PRIORITY_COLOR: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  high:   'badge-yellow',
  medium: 'badge-blue',
  low:    'badge-gray',
};

const STATS = [
  { label: 'Total Users',    value: PLATFORM_STATS.students.toLocaleString(), change: '+124 today', icon: Users,       color: 'text-primary-600',   bg: 'bg-primary-50 dark:bg-primary-950' },
  { label: 'Total Donated',  value: '$3.2M',                                  change: '+$4.2k today',icon: DollarSign, color: 'text-secondary-600', bg: 'bg-secondary-50 dark:bg-secondary-950' },
  { label: 'Pending Aid',    value: '18',                                     change: '4 urgent',   icon: AlertCircle, color: 'text-red-600',       bg: 'bg-red-50 dark:bg-red-950' },
  { label: 'Active Courses', value: PLATFORM_STATS.courses.toString(),        change: '+3 this week',icon: BookOpen,   color: 'text-accent-600',    bg: 'bg-accent-50 dark:bg-accent-950' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" userName="Dr. Amara Osei" userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--color-text)] mb-1">Admin Console</h1>
          <p className="text-sm text-[var(--color-text-muted)]">All systems operational ✅</p>
        </div>
        <Link href="/dashboard/admin/reports" className="btn-sm btn-primary">
          <TrendingUp size={14} /> Reports
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map(({ label, value, change, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon size={16} className={color} />
              </div>
              <span className="text-[10px] text-[var(--color-text-faint)] text-right leading-tight">{change}</span>
            </div>
            <div className="text-2xl font-display font-black text-[var(--color-text)] mb-0.5">{value}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Pending Aid */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" />
                <h2 className="font-display font-bold text-[var(--color-text)]">Pending Aid Requests</h2>
                <span className="badge bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400">18</span>
              </div>
              <Link href="/dashboard/admin/aid" className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1">View all <ArrowRight size={11} /></Link>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {PENDING_AID.map(({ id, name, type, amount, priority, submitted }) => (
                <div key={id} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--color-bg-subtle)] transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-[var(--color-text)]">{name}</span>
                      <span className={`badge text-[10px] ${PRIORITY_COLOR[priority]}`}>{priority}</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{type} · {amount} · {submitted}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[
                      { icon: CheckCircle, title: 'Approve', cls: 'text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900' },
                      { icon: XCircle,    title: 'Reject',  cls: 'text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950' },
                      { icon: Eye,        title: 'Review',  cls: 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]' },
                    ].map(({ icon: Icon, title, cls }) => (
                      <button key={title} title={title}
                        className={`w-7 h-7 rounded-lg bg-[var(--color-surface-2)] flex items-center justify-center transition-colors ${cls}`}>
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top courses */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <h2 className="font-display font-bold text-[var(--color-text)]">Top Courses</h2>
              <Link href="/dashboard/admin/courses" className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1">Manage <ArrowRight size={11} /></Link>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {MOCK_COURSES.slice(0, 4).map(course => (
                <div key={course.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--color-bg-subtle)] transition-colors">
                  <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{course.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{course.enrollments.toLocaleString()} enrolled · ⭐ {course.rating}</p>
                  </div>
                  <span className="badge badge-green text-xs flex-shrink-0">Live</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-5">
          {/* Recent users */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--color-text)]">New Users Today</h3>
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">+124</span>
            </div>
            {RECENT_USERS.map(({ name, role, joined, avatar }) => (
              <div key={name} className="flex items-center gap-3 py-2.5 border-b border-[var(--color-border)] last:border-0">
                <img src={avatar} alt={name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--color-text)] truncate">{name}</p>
                  <p className="text-[10px] text-[var(--color-text-faint)]">{role} · {joined}</p>
                </div>
              </div>
            ))}
            <Link href="/dashboard/admin/users" className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 mt-3">All users <ArrowRight size={11} /></Link>
          </div>

          {/* System health */}
          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-text)] mb-4">System Health</h3>
            {[
              { label: 'API',         value: '42ms',  ok: true },
              { label: 'Database',    value: '99.9%', ok: true },
              { label: 'CDN',         value: '100%',  ok: true },
              { label: 'Email',       value: 'OK',    ok: true },
              { label: 'Storage',     value: '67%',   ok: false },
            ].map(({ label, value, ok }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-primary-500' : 'bg-accent-500'}`} />
                  <span className="text-xs font-bold text-[var(--color-text)]">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-text)] mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Add New Course',   href: '/dashboard/admin/courses/new', cls: 'btn-primary' },
                { label: 'Post Opportunity', href: '/opportunities/post',          cls: 'btn-secondary' },
                { label: 'Send Newsletter',  href: '/dashboard/admin/email',       cls: 'btn-ghost' },
              ].map(({ label, href, cls }) => (
                <Link key={label} href={href} className={`btn-sm ${cls} justify-center text-xs`}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
