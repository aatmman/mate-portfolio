export interface Profile {
  name: string;
  title: string;
  department: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
  shortBio: string;
  fullBio: string;
  heroHeading: string;
  heroSubheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
  profileImage: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export interface Education {
  id: string;
  degree: string;
  discipline: string;
  institution: string;
  university?: string;
  year: string;
  percentage?: string;
  class?: string;
  thesis?: string;
  advisor?: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  description: string;
  responsibilities: string[];
  order: number;
  isActive: boolean;
}

export interface AdministrativeRole {
  id: string;
  role: string;
  institution: string;
  period?: string;
  responsibilities: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export interface AcademicContribution {
  id: string;
  title: string;
  description: string;
  year?: string;
  type: 'workshop' | 'program' | 'forum' | 'conference' | 'other';
  order: number;
  isActive: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: 'ATAL FDP' | 'FDP' | 'STTP' | 'Workshop' | 'Coursera' | 'Online Course' | 'Other';
  institution?: string;
  organizer?: string;
  date: string;
  duration?: string;
  description?: string;
  certificateUrl?: string;
  externalLink?: string;
  tags: string[];
  order: number;
  isActive: boolean;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface Patent {
  id: string;
  title: string;
  patentNumber?: string;
  applicationType?: string;
  diaryNumber?: string;
  status: 'Filed' | 'Published' | 'Approved' | 'Granted';
  filingYear: string;
  approvalYear?: string;
  description: string;
  documentUrl?: string;
  externalLink?: string;
  order: number;
  isActive: boolean;
}

export interface ResearchGrant {
  id: string;
  title: string;
  fundingOrganization: string;
  amount: string;
  referenceNumber?: string;
  date: string;
  description: string;
  documentUrl?: string;
  status: string;
  order: number;
  isActive: boolean;
}

export interface Consultancy {
  id: string;
  projectTitle: string;
  client: string;
  description: string;
  year: string;
  amount: string;
  industry?: string;
  outcome?: string;
  documentUrl?: string;
  order: number;
  isActive: boolean;
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  isbn?: string;
  publisher?: string;
  publicationYear: string;
  description?: string;
  coverImage?: string;
  externalLink?: string;
  order: number;
  isActive: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  publicationType: 'Journal' | 'International Conference' | 'National Conference' | 'Book Chapter' | 'Other';
  year: string;
  volume?: string;
  issue?: string;
  pages?: string;
  issn?: string;
  doi?: string;
  url?: string;
  abstract?: string;
  researchArea?: string;
  keywords: string[];
  indexing?: string;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
}

export interface ConferencePresentation {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  location: string;
  date: string;
  pages?: string;
  description?: string;
  presentationUrl?: string;
  externalLink?: string;
  order: number;
  isActive: boolean;
}

export interface StudentProject {
  id: string;
  studentName: string;
  projectTitle: string;
  level: 'UG' | 'PG';
  department?: string;
  year: string;
  guide?: string;
  description?: string;
  researchArea?: string;
  documentUrl?: string;
  order: number;
  isActive: boolean;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  location?: string;
  description: string;
  certificateUrl?: string;
  externalLink?: string;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
}

export interface Membership {
  id: string;
  organization: string;
  membershipType: string;
  membershipNumber?: string;
  displayNumber: boolean;
  description?: string;
  logoUrl?: string;
  website?: string;
  order: number;
  isActive: boolean;
}

export interface EditorialRole {
  id: string;
  journal: string;
  role: string;
  period?: string;
  description?: string;
  website?: string;
  order: number;
  isActive: boolean;
}

export interface Event {
  id: string;
  name: string;
  eventType: string;
  organization: string;
  role: string;
  date: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  documentUrl?: string;
  order: number;
  isActive: boolean;
}

export interface ExtraCurricular {
  id: string;
  activity: string;
  organization: string;
  period: string;
  description?: string;
  imageUrl?: string;
  documentUrl?: string;
  order: number;
  isActive: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  heroHeading: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    orcid?: string;
    googleScholar?: string;
  };
  footerText: string;
  ctaLabels: {
    primary: string;
    secondary: string;
  };
  backgroundVideo?: string;
  favicon?: string;
  seoTitle: string;
  seoDescription: string;
  enabledSections: {
    profile: boolean;
    professionalSnapshot: boolean;
    currentPosition: boolean;
    education: boolean;
    academicCareer: boolean;
    administrativeExperience: boolean;
    academicContributions: boolean;
    courses: boolean;
    researchProfile: boolean;
    patents: boolean;
    researchGrants: boolean;
    consultancy: boolean;
    books: boolean;
    publications: boolean;
    conferencePresentations: boolean;
    studentProjects: boolean;
    awards: boolean;
    memberships: boolean;
    editorialRoles: boolean;
    events: boolean;
    extraCurricular: boolean;
  };
}

export interface ContentData {
  profile: Profile;
  statistics: Statistic[];
  education: Education[];
  experience: Experience[];
  administrativeRoles: AdministrativeRole[];
  academicContributions: AcademicContribution[];
  courses: Course[];
  researchAreas: ResearchArea[];
  patents: Patent[];
  researchGrants: ResearchGrant[];
  consultancy: Consultancy[];
  books: Book[];
  publications: Publication[];
  conferencePresentations: ConferencePresentation[];
  studentProjects: StudentProject[];
  awards: Award[];
  memberships: Membership[];
  editorialRoles: EditorialRole[];
  events: Event[];
  extraCurricular: ExtraCurricular[];
  siteSettings: SiteSettings;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}