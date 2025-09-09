export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  category: 'psychometric' | 'technical' | 'aptitude' | 'domain';
  section: string;
  question: string;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: [string, string];
  weight: number;
  skillArea?: string;
}

export interface Answer {
  questionId: string;
  value: string | number | string[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  questions: Question[];
}

export interface DomainKnowledge {
  networking: number;
  programming: number;
  cloud_computing: number;
  iot: number;
  systems_thinking: number;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability_to_learn: number;
  real_world_alignment: number;
}

export interface AssessmentResults {
  psychological_fit: number;
  technical_readiness: number;
  domain_knowledge: DomainKnowledge;
  wiscars: WISCARScores;
  overall_confidence_score: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  next_steps: string[];
  career_roles: string[];
  alternative_roles: string[];
  insights: string[];
  tags: string[];
}

export interface CareerRole {
  title: string;
  description: string;
  keySkills: string[];
  fitScore?: number;
}