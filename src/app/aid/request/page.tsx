'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, Upload, Shield } from 'lucide-react';
import { AID_CATEGORIES } from '@/lib/constants/data';

const STEPS = ['Category', 'Details', 'Documents', 'Review'];

export default function AidRequestPage() {
  const [step,     setStep]     = useState(0);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-mesh pt-20 px-4">
        <div className="card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-2">Request Submitted</h2>
          <p className="text-[var(--color-text-muted)] mb-2">Your aid request has been received. Our team will review it within 24–48 hours.</p>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-6">Reference: #AID-2024-0892</p>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/student" className="btn-md btn-primary w-full justify-center">Go to Dashboard</Link>
            <Link href="/aid" className="btn-md btn-ghost w-full justify-center">Back to Aid</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-mesh pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/aid" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Aid
        </Link>

        <div className="card p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
              <Shield size={18} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-[var(--color-text)]">Aid Request Form</h1>
              <p className="text-xs text-[var(--color-text-muted)]">Confidential · Reviewed within 48 hours</p>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-0 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step  ? 'bg-primary-600 text-white' :
                    i === step ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500 text-primary-700 dark:text-primary-300' :
                    'bg-[var(--color-surface-2)] text-[var(--color-text-faint)]'
                  }`}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium ${i === step ? 'text-primary-600 dark:text-primary-400' : 'text-[var(--color-text-faint)]'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${i < step ? 'bg-primary-500' : 'bg-[var(--color-border)]'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display font-semibold text-[var(--color-text)]">What kind of support do you need?</h2>
              <div className="grid grid-cols-2 gap-3">
                {AID_CATEGORIES.map(cat => (
                  <button key={cat.id} type="button" onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      category === cat.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                        : 'border-[var(--color-border)] hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="text-sm font-bold text-[var(--color-text)]">{cat.label}</div>
                    <div className="text-xs text-[var(--color-text-faint)] mt-0.5">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
              <h2 className="font-display font-semibold text-[var(--color-text)]">Tell us about your situation</h2>
              <div>
                <label className="label">Request Title</label>
                <input type="text" className="input" placeholder="Brief title for your request" required />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input min-h-[120px] resize-y" placeholder="Please describe your situation in detail. The more context you provide, the better we can help." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Amount Needed (if applicable)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">$</span>
                    <input type="number" className="input pl-8" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="label">Priority Level</label>
                  <select className="input" value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="low">Low – Within 1 week</option>
                    <option value="medium">Medium – Within 3 days</option>
                    <option value="high">High – Within 24 hours</option>
                    <option value="urgent">Urgent – Immediate</option>
                  </select>
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display font-semibold text-[var(--color-text)]">Supporting Documents (Optional)</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Providing documentation helps us process your request faster. All files are kept strictly confidential.</p>
              <div className="border-2 border-dashed border-[var(--color-border)] rounded-2xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                <Upload size={24} className="text-[var(--color-text-faint)] mx-auto mb-3" />
                <p className="text-sm font-medium text-[var(--color-text)]">Click to upload or drag & drop</p>
                <p className="text-xs text-[var(--color-text-faint)] mt-1">PDF, JPG, PNG up to 10MB each</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text)]">Your privacy is protected.</strong> Documents are encrypted, accessible only to our aid team, and deleted after review.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display font-semibold text-[var(--color-text)]">Review Your Request</h2>
              <div className="card p-5 flex flex-col gap-3">
                {[
                  { label: 'Category',  value: AID_CATEGORIES.find(c => c.id === category)?.label || '—' },
                  { label: 'Priority',  value: priority },
                  { label: 'Documents', value: 'None uploaded' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">{label}</span>
                    <span className="font-medium text-[var(--color-text)] capitalize">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                By submitting, you confirm the information is accurate to the best of your knowledge. False requests may affect future eligibility.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="btn-md btn-ghost">
                <ArrowLeft size={15} /> Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < STEPS.length - 1) setStep(s => s + 1);
                else setSubmitted(true);
              }}
              disabled={step === 0 && !category}
              className="btn-md btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === STEPS.length - 1 ? 'Submit Request' : 'Continue'}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
