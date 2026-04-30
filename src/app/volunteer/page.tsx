import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Award, Globe } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { VOLUNTEER_SKILLS } from '@/lib/constants/data';

export const metadata: Metadata = {
  title: 'Volunteer – Join Our Global Community',
  description: 'Use your skills to make a difference. Join 840+ volunteers supporting education and aid programs at EduReach.',
};

const ROLES = [
  { icon: '👨‍🏫', title: 'Course Instructor',      skills: ['Subject expertise', 'Communication'], hours: '4–8 hrs/week', impact: 'Teach 100+ students' },
  { icon: '🎨', title: 'UX/UI Designer',          skills: ['Figma', 'User Research'],             hours: '3–6 hrs/week', impact: 'Shape 50k+ experiences' },
  { icon: '💻', title: 'Frontend Developer',      skills: ['React', 'TypeScript'],                hours: '5–10 hrs/week', impact: 'Build learning tools' },
  { icon: '✍️', title: 'Content Writer',           skills: ['Writing', 'Research'],                hours: '2–5 hrs/week', impact: 'Produce learning materials' },
  { icon: '📊', title: 'Data Analyst',             skills: ['Python/R', 'Statistics'],             hours: '3–6 hrs/week', impact: 'Drive data decisions' },
  { icon: '🤝', title: 'Mentor',                  skills: ['Industry experience', 'Patience'],    hours: '2–4 hrs/week', impact: 'Guide 5–10 mentees' },
  { icon: '🌐', title: 'Translator',              skills: ['Bilingual'],                          hours: '2–4 hrs/week', impact: 'Open content to millions' },
  { icon: '📢', title: 'Community Manager',        skills: ['Communication', 'Social Media'],      hours: '5–8 hrs/week', impact: 'Grow our community' },
];

const PERKS = [
  { icon: Award, title: 'Official Recognition',   desc: 'Verifiable volunteer certificate and LinkedIn endorsement.' },
  { icon: Globe, title: 'Global Network',          desc: 'Connect with 840+ volunteers and professionals worldwide.' },
  { icon: Clock, title: 'Flexible Commitment',     desc: 'Work on your own schedule. Remote-first, no location barrier.' },
];

export default function VolunteerPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pt-32 hero-mesh">
        <div className="container-xl">
          <div className="max-w-3xl">
            <span className="badge badge-green mb-4">Volunteer</span>
            <h1 className="section-title mb-4">
              Your Skills Can<br />Change Everything
            </h1>
            <p className="section-subtitle mb-8">
              Join 840+ global volunteers donating their skills and time to empower learners worldwide. No matter what you do — we have a role for you.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/volunteer/apply" className="btn-xl btn-primary">Apply to Volunteer <ArrowRight size={18} /></Link>
              <Link href="/volunteer/tasks"  className="btn-xl btn-ghost">Browse Open Tasks</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm bg-[var(--color-bg-subtle)]">
        <div className="container-xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: '840+',  l: 'Active Volunteers' },
            { v: '47',    l: 'Countries' },
            { v: '12,000',l: 'Hours Logged' },
            { v: '30+',   l: 'Skill Areas' },
          ].map(({ v, l }) => (
            <div key={l} className="card p-5 text-center">
              <div className="text-2xl font-display font-black text-primary-600 dark:text-primary-400">{v}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="section">
        <div className="container-xl">
          <SectionHeader badge="Open Roles" title="Find Your Role" subtitle="Skills-based matching connects you to meaningful work." className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLES.map(({ icon, title, skills, hours, impact }) => (
              <Link key={title} href="/volunteer/apply" className="group card-hover p-5 flex flex-col gap-3">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <h3 className="font-display font-semibold text-[var(--color-text)]">{title}</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => <span key={s} className="badge badge-gray text-[10px]">{s}</span>)}
                </div>
                <div className="flex flex-col gap-1 text-xs text-[var(--color-text-muted)] mt-auto">
                  <span>⏱ {hours}</span>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">✨ {impact}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skill tags */}
      <section className="section-sm bg-[var(--color-bg-subtle)]">
        <div className="container-xl">
          <p className="text-center text-sm font-semibold text-[var(--color-text-muted)] mb-6">Skills we're looking for</p>
          <div className="flex flex-wrap justify-center gap-2">
            {VOLUNTEER_SKILLS.map(skill => (
              <span key={skill} className="badge badge-gray cursor-pointer hover:badge-green transition-all">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section">
        <div className="container-xl">
          <SectionHeader badge="Benefits" title="What You Get" className="mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container-xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-primary-700 p-10 text-center text-white">
            <h2 className="font-display font-black text-3xl mb-3">Ready to make your mark?</h2>
            <p className="text-primary-100 mb-6">Join our next volunteer cohort. Applications take 5 minutes.</p>
            <Link href="/volunteer/apply" className="btn-lg bg-white text-primary-700 hover:bg-primary-50 font-bold">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
