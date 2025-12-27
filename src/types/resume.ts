export type Contact = {
  icon: string;
  text: string;
  link: string;
};

export type Profile = {
  name: string;
  title: string;
  avatar: string;
  contacts: Contact[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type SkillTag = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  category: string;
  summary?: string;
  icon?: string;
  tags?: Array<SkillTag | string>;
};

export type Skills = {
  categories?: SkillCategory[];
  toolsDescription?: string;
  tools?: SkillTag[];
};

export type WorkItem = {
  icon?: string;
  iconColor?: string;
  text: string;
};

export type WorkExperience = {
  company: string;
  role: string;
  period: string;
  periodClass?: string;
  items: WorkItem[];
};

export type ProjectHighlight = {
  title: string;
  text: string;
  icon: string;
  iconColor?: string;
};

export type Project = {
  name: string;
  role: string;
  period: string;
  periodClass?: string;
  description: string;
  techStack: string;
  highlights: ProjectHighlight[];
};

export type OpenSourceProfile = {
  title: string;
  link: string;
  description: string;
  icon: string;
};

export type OpenSourceFeatured = {
  title: string;
  link: string;
  repo: string;
  description: string;
  image?: string;
  itemIcon?: string;
  itemIconColor?: string;
};

export type OpenSourceOther = {
  title: string;
  link: string;
  repo: string;
  description: string;
  icon: string;
  iconColor?: string;
};

export type OpenSource = {
  profile: OpenSourceProfile;
  featured: OpenSourceFeatured[];
  others: OpenSourceOther[];
};

export type LanguageData = {
  profile: Profile;
  education: Education;
  skills: Skills;
  workExperience: WorkExperience[];
  projects: Project[];
  openSource: OpenSource;
};

export type ResumeData = {
  common?: any;
  zh: LanguageData;
  en: LanguageData;
};
