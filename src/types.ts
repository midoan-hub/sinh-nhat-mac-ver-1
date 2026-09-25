export type TraitId = 'SANG_TAO' | 'KET_NOI' | 'CHIEN_LUOC' | 'HANH_DONG' | 'GAN_KET' | 'TAN_TAM';

export interface TeamInfo {
  id: TraitId;
  name: string;
  shortName: string;
  color: string;
  accentColor: string;
  badgeBg: string;
  lightBg: string;
  borderColor: string;
  textColor: string;
  icon: string;
  motto: string;
  description: string;
  superpower: string;
  strengths: string[];
}

export type Department = 
  | 'Creative & Design'
  | 'Account & Client Service'
  | 'Media & Planning'
  | 'Production & Video'
  | 'Tech & Digital'
  | 'HR, Admin & Finance'
  | 'Ban Giám Đốc (BOD)';

export interface Member {
  id: string;
  name: string;
  department: Department;
  avatar: string;
  assignedTeam: TraitId;
  primaryTrait: TraitId;
  secondaryTrait?: TraitId;
  scores: Record<TraitId, number>;
  rankUsed: number; // 1 = top trait, 2 = fallback secondary trait, etc.
  joinedAt: string;
  notes?: string;
}

export interface QuizOption {
  text: string;
  detail: string;
  trait: TraitId;
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  situation: string;
  options: QuizOption[];
}
