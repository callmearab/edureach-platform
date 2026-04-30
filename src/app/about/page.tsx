import type { Metadata } from 'next';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ImpactSection from '@/components/sections/ImpactSection';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';

export const metadata: Metadata = {
  title: 'About EduReach – Our Mission, Vision & Team',
  description: 'Learn about EduReach Global Foundation, our mission to democratize education, our team, and our impact across 47 countries.',
};

const TEAM = [
  { name: 'Dr. Amara Osei', role: 'Executive Director', country: 'Ghana', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop', bio: 'Former UNESCO education advisor with 20+ years in international development.' },
  { name: 'Carlos Reyes',   role: 'Chief Programs Officer', country: 'Mexico', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop', bio: 'EdTech entrepreneur who built and scaled learning platforms in Latin America.' },
  { name: 'Priya Kapoor',   role: 'Head of Technology', country: 'India', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop', bio: 'Full-stack architect previously at Google and Khan Academy.' },
  { name: 'James Okonkwo',  role: 'Director of Aid',  country: 'Nigeria', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop', bio: 'Human rights lawyer and aid distribution specialist with field experience in 15+ countries.' },
  { name: 'Fatima Malik',   role: 'Head of Partnerships', country: 'Pakistan', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop', bio: 'Former UNDP partnerships lead connecting NGOs with governments and funders.' },
  { name: 'Liu Wei',        role: 'Director of Programs', country: 'China', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop', bio: 'Curriculum designer with expertise in competency-based education frameworks.' },
];

const VALUES = [
  { icon: Target,  title: 'Equity First',    desc: 'We believe every person, regardless of background or geography, deserves access to quality education and opportunity.' },
  { icon: Eye,     title: 'Radical Transparency', desc: 'Every dollar donated is tracked and reported publicly. No administrative overhead, no hidden fees.' },
  { icon: Heart,   title: 'Community Driven', desc: 'Our programs are built with—not for—the communities we serve. Learner voices guide every decision.' },
  { icon: Award,   title: 'Excellence Always', desc: 'We hold our programs to global standards while ensuring cultural relevance and local accessibility.' },
  { icon: Globe,   title: 'Think Globally',   desc: 'Local solutions with global knowledge. We bring world-class expertise to every corner of the world.' },
  { icon: Users,   title: 'Collective Impact', desc: 'Lasting change requires collaboration. We build coalitions across sectors, borders, and disciplines.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pt-32 hero-mesh">
        <div className="container-xl">
          <div className="max-w-4xl">
            <span className="badge badge-green mb-4">About EduReach</span>
            <h1 className="section-title text-5xl lg:text-7xl mb-6">
              Education is a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                human right.
              </span>
              <br />Not a privilege.
            </h1>
            <p className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              Founded in 2018, EduReach Global Foundation exists to close the education gap by providing free, high-quality learning programs and direct support to underserved communities across the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-[var(--color-bg-subtle)]">
        <div className="container-xl grid md:grid-cols-2 gap-12">
          <div className="card p-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 flex items-center justify-center mb-5">
              <Target size={22} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-3">Our Mission</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              To democratize access to quality education, skills, and opportunity for every person on earth — regardless of income, location, language, or background. We break down barriers through technology, community, and unwavering commitment to equity.
            </p>
          </div>
          <div className="card p-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary-50 dark:bg-secondary-950 border border-secondary-200 dark:border-secondary-800 flex items-center justify-center mb-5">
              <Eye size={22} className="text-secondary-600 dark:text-secondary-400" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-3">Our Vision</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              A world where every child and adult can access the knowledge, tools, and support they need to lead a dignified, fulfilling life. A world where talent is recognized and nurtured regardless of circumstance, and where education truly levels the playing field.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-xl">
          <SectionHeader badge="Values" title="What We Stand For" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-hover p-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-display font-bold text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section bg-[var(--color-bg-subtle)]">
        <div className="container-xl">
          <SectionHeader badge="Team" title="The People Behind the Mission" subtitle="A diverse global team united by one purpose: education for all." className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, country, avatar, bio }) => (
              <div key={name} className="card-hover p-6 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <img src={avatar} alt={name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--color-border)]" />
                  <div>
                    <h3 className="font-display font-bold text-[var(--color-text)]">{name}</h3>
                    <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold">{role}</p>
                    <p className="text-xs text-[var(--color-text-faint)] mt-0.5">🌍 {country}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <div id="impact"><ImpactSection /></div>
      <PartnerLogosSection />
    </>
  );
}
