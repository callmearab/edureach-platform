import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import ImpactSection from '@/components/sections/ImpactSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import DonationCTASection from '@/components/sections/DonationCTASection';
import FeaturedCoursesSection from '@/components/sections/FeaturedCoursesSection';
import LatestOpportunitiesSection from '@/components/sections/LatestOpportunitiesSection';
import LatestBlogSection from '@/components/sections/LatestBlogSection';
import UpcomingEventsSection from '@/components/sections/UpcomingEventsSection';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';

export const metadata: Metadata = {
  title: 'EduReach – Free Education, Scholarships & Aid for All',
  description: 'Join 12,000+ learners across 47 countries. Access free courses, scholarships, mentorship, emergency aid, and career opportunities at EduReach.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <FeaturedCoursesSection />
      <ImpactSection />
      <LatestOpportunitiesSection />
      <TestimonialsSection />
      <UpcomingEventsSection />
      <LatestBlogSection />
      <DonationCTASection />
      <PartnerLogosSection />
    </>
  );
}
