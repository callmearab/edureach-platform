// ──────────────────────────────────────────────
// CORE TYPES
// ──────────────────────────────────────────────

export type UserRole = 'admin' | 'student' | 'donor' | 'volunteer' | 'mentor';

export interface User {
  id:          string;
  email:       string;
  name:        string;
  avatar?:     string;
  role:        UserRole;
  createdAt:   string;
  updatedAt:   string;
  profile?:    UserProfile;
}

export interface UserProfile {
  bio?:         string;
  location?:    string;
  website?:     string;
  phone?:       string;
  skills?:      string[];
  interests?:   string[];
  linkedin?:    string;
  github?:      string;
}

// ──────────────────────────────────────────────
// LMS TYPES
// ──────────────────────────────────────────────

export type CourseLevel    = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus   = 'draft' | 'published' | 'archived';
export type ContentType    = 'video' | 'document' | 'quiz' | 'assignment';
export type EnrollStatus   = 'active' | 'completed' | 'dropped';

export interface Course {
  id:           string;
  slug:         string;
  title:        string;
  description:  string;
  thumbnail?:   string;
  instructor:   User;
  category:     string;
  tags:         string[];
  level:        CourseLevel;
  status:       CourseStatus;
  duration:     number; // minutes
  modules:      Module[];
  enrollments:  number;
  rating:       number;
  isFree:       boolean;
  price?:       number;
  certificate:  boolean;
  createdAt:    string;
  updatedAt:    string;
}

export interface Module {
  id:       string;
  title:    string;
  order:    number;
  lessons:  Lesson[];
}

export interface Lesson {
  id:          string;
  title:       string;
  type:        ContentType;
  duration?:   number;
  content?:    string;
  videoUrl?:   string;
  fileUrl?:    string;
  quiz?:       Quiz;
  isPreview:   boolean;
  order:       number;
}

export interface Quiz {
  id:         string;
  title:      string;
  questions:  QuizQuestion[];
  passMark:   number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id:       string;
  text:     string;
  options:  QuizOption[];
  type:     'single' | 'multiple';
}

export interface QuizOption {
  id:       string;
  text:     string;
  correct:  boolean;
}

export interface Enrollment {
  id:         string;
  userId:     string;
  courseId:   string;
  course:     Course;
  progress:   number;
  status:     EnrollStatus;
  startedAt:  string;
  completedAt?: string;
}

export interface Certificate {
  id:          string;
  userId:      string;
  courseId:    string;
  courseName:  string;
  userName:    string;
  issuedAt:    string;
  verifyUrl:   string;
}

// ──────────────────────────────────────────────
// OPPORTUNITY TYPES
// ──────────────────────────────────────────────

export type OpportunityType     = 'scholarship' | 'job' | 'internship' | 'grant' | 'fellowship';
export type OpportunityStatus   = 'open' | 'closed' | 'draft';
export type ApplicationStatus   = 'pending' | 'reviewing' | 'accepted' | 'rejected';

export interface Opportunity {
  id:           string;
  slug:         string;
  title:        string;
  description:  string;
  type:         OpportunityType;
  status:       OpportunityStatus;
  organization: string;
  location?:    string;
  isRemote:     boolean;
  stipend?:     string;
  deadline:     string;
  requirements: string[];
  benefits:     string[];
  tags:         string[];
  applications: number;
  createdAt:    string;
}

export interface Application {
  id:              string;
  opportunityId:   string;
  opportunity:     Opportunity;
  userId:          string;
  user:            User;
  status:          ApplicationStatus;
  coverLetter?:    string;
  resume?:         string;
  appliedAt:       string;
  updatedAt:       string;
  notes?:          string;
}

// ──────────────────────────────────────────────
// AID TYPES
// ──────────────────────────────────────────────

export type AidCategory = 'financial' | 'material' | 'medical' | 'educational' | 'emergency';
export type AidStatus   = 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'fulfilled';

export interface AidRequest {
  id:           string;
  userId:       string;
  user:         User;
  category:     AidCategory;
  title:        string;
  description:  string;
  amount?:      number;
  status:       AidStatus;
  priority:     'low' | 'medium' | 'high' | 'urgent';
  documents:    string[];
  adminNotes?:  string;
  createdAt:    string;
  updatedAt:    string;
}

// ──────────────────────────────────────────────
// DONATION TYPES
// ──────────────────────────────────────────────

export type DonationFrequency = 'one-time' | 'monthly' | 'quarterly' | 'annually';
export type DonationStatus    = 'pending' | 'completed' | 'failed' | 'refunded';
export type DonationCampaign  = 'general' | 'education' | 'emergency' | 'scholarship';

export interface Donation {
  id:            string;
  userId?:       string;
  donor?:        User;
  amount:        number;
  currency:      string;
  frequency:     DonationFrequency;
  campaign:      DonationCampaign;
  status:        DonationStatus;
  anonymous:     boolean;
  message?:      string;
  transactionId: string;
  createdAt:     string;
}

export interface DonorStats {
  totalDonated:    number;
  donationCount:   number;
  impactScore:     number;
  beneficiaries:   number;
  level:           'bronze' | 'silver' | 'gold' | 'platinum';
}

// ──────────────────────────────────────────────
// VOLUNTEER TYPES
// ──────────────────────────────────────────────

export type VolunteerStatus = 'active' | 'inactive' | 'pending';
export type TaskStatus      = 'open' | 'assigned' | 'in_progress' | 'completed';

export interface VolunteerProfile {
  id:           string;
  userId:       string;
  user:         User;
  skills:       string[];
  availability: string[];
  hoursLogged:  number;
  status:       VolunteerStatus;
  joinedAt:     string;
}

export interface VolunteerTask {
  id:          string;
  title:       string;
  description: string;
  skills:      string[];
  deadline?:   string;
  hoursNeeded: number;
  status:      TaskStatus;
  assignedTo?: string;
  createdAt:   string;
}

// ──────────────────────────────────────────────
// BLOG / EVENT TYPES
// ──────────────────────────────────────────────

export interface BlogPost {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  content:     string;
  thumbnail?:  string;
  author:      User;
  tags:        string[];
  category:    string;
  published:   boolean;
  views:       number;
  readTime:    number;
  publishedAt: string;
}

export interface Event {
  id:           string;
  slug:         string;
  title:        string;
  description:  string;
  thumbnail?:   string;
  startDate:    string;
  endDate:      string;
  location?:    string;
  isVirtual:    boolean;
  meetingUrl?:  string;
  capacity?:    number;
  registered:   number;
  tags:         string[];
  type:         'workshop' | 'webinar' | 'conference' | 'community';
}

// ──────────────────────────────────────────────
// API RESPONSE TYPES
// ──────────────────────────────────────────────

export interface ApiResponse<T> {
  success:  boolean;
  data:     T;
  message?: string;
  meta?: {
    total:    number;
    page:     number;
    perPage:  number;
    pages:    number;
  };
}

export interface ApiError {
  success:  false;
  error:    string;
  code?:    string;
  details?: Record<string, string[]>;
}

// ──────────────────────────────────────────────
// DASHBOARD / STATS
// ──────────────────────────────────────────────

export interface PlatformStats {
  students:         number;
  courses:          number;
  opportunities:    number;
  donations:        number;
  volunteers:       number;
  aidRequests:      number;
  countriesServed:  number;
  livesImpacted:    number;
}

export interface AdminDashboard {
  stats:       PlatformStats;
  recentUsers: User[];
  recentDonations: Donation[];
  pendingAid:  AidRequest[];
  topCourses:  Course[];
}

export interface StudentDashboard {
  enrollments:     Enrollment[];
  certificates:    Certificate[];
  applications:    Application[];
  recommendations: Course[];
}

export interface DonorDashboard {
  donations:    Donation[];
  stats:        DonorStats;
  campaigns:    { name: string; amount: number; percentage: number }[];
  impact:       { metric: string; value: number }[];
}

// ──────────────────────────────────────────────
// NAV / UI TYPES
// ──────────────────────────────────────────────

export interface NavItem {
  label:    string;
  href:     string;
  icon?:    string;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface Toast {
  id:       string;
  type:     'success' | 'error' | 'warning' | 'info';
  title:    string;
  message?: string;
}

export type Theme = 'light' | 'dark' | 'system';
