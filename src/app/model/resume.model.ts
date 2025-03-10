// 📂 src/app/models/resume.model.ts

export interface Education {
  institutionName: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  skillName: string;
}

export interface Experience {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;
  educations: Education[];
  skills: Skill[];
  experiences: Experience[];
  attachment: File | null;
}
