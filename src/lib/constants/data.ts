import type { Course, Opportunity, BlogPost, Event, PlatformStats, User, Donation, AidRequest, VolunteerTask } from '@/types';

export const PLATFORM_STATS: PlatformStats = {
  students:         12480,
  courses:          240,
  opportunities:    185,
  donations:        3200000,
  volunteers:       840,
  aidRequests:      1120,
  countriesServed:  47,
  livesImpacted:    28600,
};

export const MOCK_INSTRUCTOR: User = {
  id: 'u1',
  email: 'dr.amara@edureach.org',
  name: 'Dr. Amara Osei',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  role: 'mentor',
  createdAt: '2022-01-01',
  updatedAt: '2024-01-01',
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1', slug: 'web-development-fundamentals',
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, and JavaScript from scratch. Build real projects and launch your career in tech.',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=340&fit=crop',
    instructor: MOCK_INSTRUCTOR, category: 'Technology',
    tags: ['HTML', 'CSS', 'JavaScript'], level: 'beginner', status: 'published',
    duration: 1800, modules: [], enrollments: 3240, rating: 4.8,
    isFree: true, certificate: true, createdAt: '2024-01-01', updatedAt: '2024-03-01',
  },
  {
    id: 'c2', slug: 'data-science-python',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning with Python. Industry-ready skills.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop',
    instructor: MOCK_INSTRUCTOR, category: 'Technology',
    tags: ['Python', 'Data Science', 'ML'], level: 'intermediate', status: 'published',
    duration: 2400, modules: [], enrollments: 2180, rating: 4.9,
    isFree: false, price: 0, certificate: true, createdAt: '2024-01-15', updatedAt: '2024-03-15',
  },
  {
    id: 'c3', slug: 'digital-entrepreneurship',
    title: 'Digital Entrepreneurship',
    description: 'Build and scale your own digital business. From idea validation to product launch.',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=340&fit=crop',
    instructor: MOCK_INSTRUCTOR, category: 'Business',
    tags: ['Business', 'Startup', 'Marketing'], level: 'beginner', status: 'published',
    duration: 1200, modules: [], enrollments: 1890, rating: 4.7,
    isFree: true, certificate: true, createdAt: '2024-02-01', updatedAt: '2024-03-20',
  },
  {
    id: 'c4', slug: 'graphic-design-essentials',
    title: 'Graphic Design Essentials',
    description: 'Master design principles and industry tools. Create stunning visuals for any purpose.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop',
    instructor: MOCK_INSTRUCTOR, category: 'Arts',
    tags: ['Design', 'Figma', 'Branding'], level: 'beginner', status: 'published',
    duration: 900, modules: [], enrollments: 1650, rating: 4.6,
    isFree: true, certificate: true, createdAt: '2024-02-10', updatedAt: '2024-03-25',
  },
  {
    id: 'c5', slug: 'public-health-foundations',
    title: 'Public Health Foundations',
    description: 'Understand global health challenges and evidence-based interventions. Perfect for health advocates.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop',
    instructor: MOCK_INSTRUCTOR, category: 'Health',
    tags: ['Health', 'Policy', 'Community'], level: 'beginner', status: 'published',
    duration: 1500, modules: [], enrollments: 980, rating: 4.8,
    isFree: true, certificate: true, createdAt: '2024-02-20', updatedAt: '2024-04-01',
  },
  {
    id: 'c6', slug: 'financial-literacy-101',
    title: 'Financial Literacy 101',
    description: 'Take control of your finances. Budgeting, investing, and planning for a secure future.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=340&fit=crop',
    instructor: MOCK_INSTRUCTOR, category: 'Business',
    tags: ['Finance', 'Investing', 'Budgeting'], level: 'beginner', status: 'published',
    duration: 720, modules: [], enrollments: 2340, rating: 4.9,
    isFree: true, certificate: true, createdAt: '2024-03-01', updatedAt: '2024-04-05',
  },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'o1', slug: 'fullstack-scholarship-2024',
    title: 'Full-Stack Engineering Scholarship',
    description: 'Fully-funded 6-month intensive bootcamp covering modern web development. Includes stipend and job placement support.',
    type: 'scholarship', status: 'open', organization: 'TechBridge Foundation',
    isRemote: true, stipend: '$800/month', deadline: '2025-08-31',
    requirements: ['Basic computer skills', 'High school graduate', 'Commitment to full program'],
    benefits: ['Full tuition coverage', 'Monthly stipend', 'Mentorship', 'Job placement'],
    tags: ['Tech', 'Web Dev', 'Funded'], applications: 142, createdAt: '2024-04-01',
  },
  {
    id: 'o2', slug: 'community-health-worker',
    title: 'Community Health Worker',
    description: 'Join our team to deliver essential health services to underserved communities across West Africa.',
    type: 'job', status: 'open', organization: 'Global Health Alliance',
    location: 'Accra, Ghana', isRemote: false, stipend: '$1,200/month', deadline: '2025-07-15',
    requirements: ['Health background', 'Community experience', 'Local language skills'],
    benefits: ['Competitive salary', 'Training', 'Health insurance', 'Career growth'],
    tags: ['Health', 'Community', 'Africa'], applications: 89, createdAt: '2024-04-05',
  },
  {
    id: 'o3', slug: 'education-research-fellowship',
    title: 'Education Research Fellowship',
    description: 'Conduct research on educational outcomes in low-income communities. Partner with leading universities.',
    type: 'fellowship', status: 'open', organization: 'EduResearch Institute',
    isRemote: true, stipend: '$2,000/month', deadline: '2025-09-01',
    requirements: ['Masters degree', 'Research experience', 'Statistical analysis skills'],
    benefits: ['$2k/month stipend', 'Publication support', 'Conference travel', 'Mentorship'],
    tags: ['Research', 'Education', 'Fellowship'], applications: 67, createdAt: '2024-04-10',
  },
  {
    id: 'o4', slug: 'startup-grant-young-innovators',
    title: 'Young Innovators Startup Grant',
    description: 'Up to $15,000 in seed funding for young entrepreneurs (18-30) solving social problems.',
    type: 'grant', status: 'open', organization: 'EduReach Innovation Fund',
    isRemote: true, stipend: 'Up to $15,000', deadline: '2025-10-15',
    requirements: ['Age 18-30', 'Social impact idea', 'Business plan', 'EduReach member'],
    benefits: ['$15k grant', 'Business mentorship', 'Network access', 'Media exposure'],
    tags: ['Startup', 'Funding', 'Innovation'], applications: 214, createdAt: '2024-04-15',
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1', slug: 'education-key-breaking-poverty-cycle',
    title: 'How Education Breaks the Cycle of Poverty',
    excerpt: 'Research shows that every year of quality education increases earning potential by 10%. Here\'s how EduReach is making that impact globally.',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=340&fit=crop',
    author: MOCK_INSTRUCTOR, tags: ['Education', 'Impact', 'Development'], category: 'Impact',
    published: true, views: 4820, readTime: 6, publishedAt: '2024-04-10',
  },
  {
    id: 'b2', slug: 'tech-skills-future-work-africa',
    title: 'Tech Skills Are the Future of Work in Africa',
    excerpt: 'With 60% of Africa\'s population under 25, digital skills represent the greatest opportunity for economic transformation in a generation.',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=340&fit=crop',
    author: MOCK_INSTRUCTOR, tags: ['Tech', 'Africa', 'Careers'], category: 'Technology',
    published: true, views: 3140, readTime: 8, publishedAt: '2024-04-05',
  },
  {
    id: 'b3', slug: 'mental-health-students-guide',
    title: 'Supporting Student Mental Health: A Practical Guide',
    excerpt: 'Academic pressure shouldn\'t come at the cost of mental wellbeing. Here are evidence-based strategies for supporting students.',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=340&fit=crop',
    author: MOCK_INSTRUCTOR, tags: ['Mental Health', 'Students', 'Wellness'], category: 'Health',
    published: true, views: 2890, readTime: 5, publishedAt: '2024-03-28',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1', slug: 'edureach-summit-2024',
    title: 'EduReach Global Summit 2024',
    description: 'Three days of inspiring talks, workshops, and networking with leaders in education, technology, and social impact.',
    startDate: '2025-09-15', endDate: '2025-09-17', isVirtual: false, location: 'Nairobi, Kenya',
    capacity: 500, registered: 342, tags: ['Summit', 'Networking', 'Impact'],
    type: 'conference', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=340&fit=crop',
  },
  {
    id: 'e2', slug: 'ai-for-education-webinar',
    title: 'AI for Education: Practical Applications',
    description: 'Learn how artificial intelligence is transforming personalized learning and what it means for educators and students.',
    startDate: '2025-06-20', endDate: '2025-06-20', isVirtual: true, meetingUrl: 'https://meet.edureach.org/ai-edu',
    capacity: 1000, registered: 678, tags: ['AI', 'EdTech', 'Free'], type: 'webinar',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop',
  },
  {
    id: 'e3', slug: 'grant-writing-workshop',
    title: 'Grant Writing Masterclass',
    description: 'Master the art of writing compelling grant proposals. Real examples, templates, and expert feedback.',
    startDate: '2025-07-08', endDate: '2025-07-08', isVirtual: true,
    capacity: 200, registered: 156, tags: ['Grants', 'Funding', 'Workshop'], type: 'workshop',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=340&fit=crop',
  },
];

export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'd1', userId: 'u10', amount: 500, currency: 'USD', frequency: 'monthly',
    campaign: 'education', status: 'completed', anonymous: false,
    message: 'Education is the most powerful weapon. Keep up the amazing work!',
    transactionId: 'TXN_001', createdAt: '2024-04-01',
    donor: { id: 'u10', email: 'sarah@example.com', name: 'Sarah Johnson', role: 'donor', createdAt: '', updatedAt: '' },
  },
  {
    id: 'd2', userId: undefined, amount: 1000, currency: 'USD', frequency: 'one-time',
    campaign: 'scholarship', status: 'completed', anonymous: true,
    transactionId: 'TXN_002', createdAt: '2024-03-28',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1', name: 'Fatima Al-Hassan', role: 'Software Engineer at Google', country: 'Nigeria',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop',
    text: 'EduReach gave me access to world-class education when I had no other options. The web development course changed my life completely. Two years later, I\'m working at my dream company.',
    course: 'Web Development Fundamentals',
  },
  {
    id: 't2', name: 'Carlos Mendez', role: 'Health Officer, WHO', country: 'Colombia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    text: 'The Public Health course and subsequent fellowship opened doors I didn\'t know existed. The mentorship program connected me with professionals who guided my entire career path.',
    course: 'Public Health Foundations',
  },
  {
    id: 't3', name: 'Priya Sharma', role: 'Founder, EduTech Startup', country: 'India',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    text: 'The startup grant from EduReach gave me the seed I needed. The Digital Entrepreneurship course was exactly what I needed to validate my idea and build my first product.',
    course: 'Digital Entrepreneurship',
  },
  {
    id: 't4', name: 'Emmanuel Okafor', role: 'Data Analyst at Deloitte', country: 'Ghana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    text: 'From zero coding knowledge to a data analyst role at a Big 4 firm in 18 months. The Python course and career support made the impossible feel achievable.',
    course: 'Data Science with Python',
  },
];

export const IMPACT_METRICS = [
  { label: 'Students Educated', value: 12480, suffix: '+', icon: '🎓', color: 'primary' },
  { label: 'Countries Served',  value: 47,    suffix: '',  icon: '🌍', color: 'secondary' },
  { label: 'Total Donated',     value: 3.2,   suffix: 'M', icon: '💚', color: 'accent', prefix: '$' },
  { label: 'Lives Impacted',    value: 28600, suffix: '+', icon: '✨', color: 'primary' },
];

export const PROGRAMS = [
  {
    icon: '📚', title: 'Online Courses', count: 240,
    description: 'Self-paced, expert-designed courses across technology, business, health, and the arts.',
    color: 'primary', href: '/programs/courses',
  },
  {
    icon: '🛠️', title: 'Workshops', count: 48,
    description: 'Intensive hands-on workshops led by industry professionals. Limited seats, maximum impact.',
    color: 'secondary', href: '/programs/workshops',
  },
  {
    icon: '🤝', title: 'Mentorship', count: 120,
    description: 'One-on-one mentorship with vetted professionals across 30+ industries worldwide.',
    color: 'accent', href: '/programs/mentorship',
  },
];

export const AID_CATEGORIES = [
  { id: 'financial',    label: 'Financial Aid',    icon: '💰', description: 'Emergency financial support for those in need' },
  { id: 'educational',  label: 'Educational Aid',  icon: '📖', description: 'Textbooks, devices, and learning materials' },
  { id: 'medical',      label: 'Medical Aid',      icon: '🏥', description: 'Healthcare access and medical support' },
  { id: 'material',     label: 'Material Support', icon: '📦', description: 'Essential goods and resources' },
  { id: 'emergency',    label: 'Emergency Relief', icon: '🆘', description: 'Urgent crisis response and support' },
];

export const VOLUNTEER_SKILLS = [
  'Teaching', 'Mentoring', 'Web Development', 'Design', 'Data Analysis',
  'Marketing', 'Content Writing', 'Video Production', 'Healthcare', 'Legal',
  'Finance', 'Project Management', 'Community Outreach', 'Translation', 'Research',
];

export const NAV_LINKS = [
  { label: 'Home',          href: '/' },
  { label: 'About',         href: '/about' },
  { label: 'Programs',      href: '/programs' },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Aid & Support', href: '/aid' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Events',        href: '/events' },
  { label: 'Volunteer',     href: '/volunteer' },
];
