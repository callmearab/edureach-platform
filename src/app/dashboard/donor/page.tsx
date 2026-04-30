import type { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Heart, TrendingUp, Users, BookOpen, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Donor Dashboard – EduReach' };

const DONATION_HISTORY = [
  { id: 'd1', date: 'Apr 1, 2024',  amount: 500,  type: 'Monthly', campaign: 'Education Programs', status: 'Completed' },
  { id: 'd2', date: 'Mar 1, 2024',  amount: 500,  type: 'Monthly', campaign: 'Education Programs', status: 'Completed' },
  { id: 'd3', date: 'Feb 1, 2024',  amount: 500,  type: 'Monthly', campaign: 'General Fund',       status: 'Completed' },
  { id: 'd4', date: 'Dec 25, 2023', amount: 1000, type: 'One-time', campaign: 'Scholarship Fund',  status: 'Completed' },
  { id: 'd5', date: 'Jan 1, 2024',  amount: 500,  type: 'Monthly', campaign: 'Emergency Aid',      status: 'Completed' },
];

const IMPACT_BREAKDOWN = [
  { label: 'Students Supported',   value: 24,    icon: '🎓', color: 'primary' },
  { label: 'Courses Funded',       value: 8,     icon: '📚', color: 'secondary' },
  { label: 'Aid Packages',         value: 3,     icon: '🆘', color: 'accent' },
  { label: 'Countries Reached',    value: 7,     icon: '🌍', color: 'primary' },
];

const MONTHLY_DATA = [
  { month: 'Nov', amount: 500 },
  { month: 'Dec', amount: 1500 },
  { month: 'Jan', amount: 500 },
  { month: 'Feb', amount: 500 },
  { month: 'Mar', amount: 500 },
  { month: 'Apr', amount: 500 },
];

const maxAmount = Math.max(...MONTHLY_DATA.map(d => d.amount));

export default function DonorDashboard() {
  const totalDonated = DONATION_HISTORY.reduce((s, d) => s + d.amount, 0);

  return (
    <DashboardLayout role="donor" userName="Sarah Johnson" userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl text-[var(--color-text)] mb-1">
              Donor Dashboard 💚
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">Thank you for your continued generosity, Sarah.</p>
          </div>
          <div className="ml-auto">
            <span className="badge bg-accent-100 dark:bg-accent-950 text-accent-700 dark:text-accent-400 text-sm px-3 py-1.5">
              🥇 Gold Donor
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Donated',   value: `$${totalDonated.toLocaleString()}`, icon: Heart,      color: 'text-primary-600',   bg: 'bg-primary-50 dark:bg-primary-950' },
          { label: 'Donations Made',  value: '14',                                icon: TrendingUp,  color: 'text-secondary-600', bg: 'bg-secondary-50 dark:bg-secondary-950' },
          { label: 'Students Helped', value: '24',                                icon: Users,       color: 'text-accent-600',    bg: 'bg-accent-50 dark:bg-accent-950' },
          { label: 'Courses Funded',  value: '8',                                 icon: BookOpen,    color: 'text-primary-600',   bg: 'bg-primary-50 dark:bg-primary-950' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={16} className={color} />
            </div>
            <div className="text-2xl font-display font-black text-[var(--color-text)] mb-0.5">{value}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left + center */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Giving chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-[var(--color-text)]">Giving History</h2>
              <span className="text-xs text-[var(--color-text-muted)]">Last 6 months</span>
            </div>
            <div className="flex items-end gap-3 h-32">
              {MONTHLY_DATA.map(({ month, amount }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400">${amount >= 1000 ? (amount/1000)+'k' : amount}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400 transition-all"
                    style={{ height: `${(amount / maxAmount) * 100}%` }}
                  />
                  <span className="text-[10px] text-[var(--color-text-faint)]">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donation history table */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <h2 className="font-display font-bold text-[var(--color-text)]">Donation History</h2>
              <button className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-semibold">
                <Download size={12} /> Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {['Date', 'Amount', 'Type', 'Campaign', 'Receipt'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-[var(--color-text-faint)] uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DONATION_HISTORY.map(d => (
                    <tr key={d.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-subtle)] transition-colors">
                      <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{d.date}</td>
                      <td className="px-4 py-3 font-bold text-primary-600 dark:text-primary-400">${d.amount}</td>
                      <td className="px-4 py-3"><span className="badge badge-gray">{d.type}</span></td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{d.campaign}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-secondary-600 dark:text-secondary-400 font-semibold flex items-center gap-1">
                          <Download size={11} /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-5">
          {/* Impact metrics */}
          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-text)] mb-4">Your Impact</h3>
            <div className="grid grid-cols-2 gap-3">
              {IMPACT_BREAKDOWN.map(({ label, value, icon }) => (
                <div key={label} className="p-3 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="font-display font-black text-xl text-[var(--color-text)]">{value}</div>
                  <div className="text-[10px] text-[var(--color-text-faint)] leading-tight mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring donation */}
          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-text)] mb-3">Monthly Giving</h3>
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-primary-700 dark:text-primary-400 font-medium">Active Subscription</span>
                <span className="badge badge-green">Active</span>
              </div>
              <div className="text-2xl font-display font-black text-primary-700 dark:text-primary-300">$500<span className="text-sm font-normal">/mo</span></div>
              <div className="text-xs text-primary-600/70 dark:text-primary-400/70">Education Programs · Renews May 1</div>
            </div>
            <div className="flex gap-2">
              <button className="btn-sm btn-ghost flex-1 text-xs">Pause</button>
              <button className="btn-sm btn-primary flex-1 text-xs">Increase</button>
            </div>
          </div>

          {/* Tax receipt */}
          <div className="card p-5">
            <h3 className="font-semibold text-[var(--color-text)] mb-3">2024 Tax Year</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--color-text-muted)]">Total deductible</span>
              <span className="font-bold text-[var(--color-text)]">${totalDonated.toLocaleString()}</span>
            </div>
            <button className="btn-sm btn-outline-primary w-full text-xs">
              <Download size={13} /> Download Annual Receipt
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
