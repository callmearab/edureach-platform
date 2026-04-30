'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Github, Check } from 'lucide-react';

const ROLES = [
  { id: 'student',   emoji: '🎓', label: 'Student',   desc: 'I want to learn' },
  { id: 'volunteer', emoji: '🤝', label: 'Volunteer',  desc: 'I want to help' },
  { id: 'donor',     emoji: '💚', label: 'Donor',      desc: 'I want to give' },
];

export default function RegisterPage() {
  const [role, setRole] = useState('student');
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center hero-mesh py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-bold text-2xl text-[var(--color-text)]">EduReach</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-[var(--color-text)] mb-2">Create free account</h1>
          <p className="text-[var(--color-text-muted)]">Join 12,000+ learners across 47 countries</p>
        </div>

        <div className="card p-8">
          {/* OAuth */}
          <div className="flex flex-col gap-2 mb-6">
            <button className="btn-md btn-ghost w-full justify-center gap-3">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Sign up with Google
            </button>
            <button className="btn-md btn-ghost w-full justify-center gap-3">
              <Github size={18} /> Sign up with GitHub
            </button>
          </div>

          <div className="relative flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-text-faint)] font-medium">or with email</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <label className="label">I am joining as a…</label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(({ id, emoji, label, desc }) => (
                <button type="button" key={id} onClick={() => setRole(id)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    role === id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                      : 'border-[var(--color-border)] hover:border-primary-300'
                  }`}
                >
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-xs font-bold text-[var(--color-text)]">{label}</div>
                  <div className="text-[10px] text-[var(--color-text-faint)]">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">First Name</label>
                <input type="text" className="input" placeholder="Fatima" required />
              </div>
              <div>
                <label className="label">Last Name</label>
                <input type="text" className="input" placeholder="Osei" required />
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" required />
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} className="input pr-10" placeholder="Min. 8 characters" required minLength={8} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded border-2 border-primary-500 bg-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className="btn-lg btn-primary w-full mt-1">
              Create Free Account <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-[var(--color-text-muted)] mt-5">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
