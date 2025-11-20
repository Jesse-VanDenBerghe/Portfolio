export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface CVData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  avatar: string;
  about: string;
  email: string;
  socials: SocialLink[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications?: CertificationItem[];
  hobbies: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}