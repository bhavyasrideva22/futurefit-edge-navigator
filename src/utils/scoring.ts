import { Answer, AssessmentResults, DomainKnowledge, WISCARScores } from '@/types/assessment';

// Scoring weights for different aspects
const SCORING_WEIGHTS = {
  psychological_fit: 0.3,
  technical_readiness: 0.4,
  wiscar_overall: 0.3
};

// Correct answers for technical questions
const CORRECT_ANSWERS: Record<string, string | number> = {
  'logic_1': '162', // 2*3=6, 6*3=18, 18*3=54, 54*3=162
  'networking_1': 'MQTT',
  'cloud_1': 'Reduced latency and faster response times',
  'programming_1': 'Python',
  'iot_1': 'A layer of computing between IoT devices and cloud'
};

export function calculateAssessmentResults(answers: Answer[]): AssessmentResults {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  
  // Calculate psychological fit (0-100)
  const psychologicalFit = calculatePsychologicalFit(answerMap);
  
  // Calculate technical readiness (0-100)
  const technicalReadiness = calculateTechnicalReadiness(answerMap);
  
  // Calculate domain knowledge breakdown
  const domainKnowledge = calculateDomainKnowledge(answerMap);
  
  // Calculate WISCAR scores
  const wiscars = calculateWISCARScores(answerMap);
  
  // Calculate overall confidence score
  const overallConfidenceScore = Math.round(
    psychologicalFit * SCORING_WEIGHTS.psychological_fit +
    technicalReadiness * SCORING_WEIGHTS.technical_readiness +
    ((wiscars.will + wiscars.interest + wiscars.skill + wiscars.cognitive + wiscars.ability_to_learn + wiscars.real_world_alignment) / 6) * SCORING_WEIGHTS.wiscar_overall
  );
  
  // Generate recommendation
  const recommendation = generateRecommendation(overallConfidenceScore, technicalReadiness, psychologicalFit);
  
  // Generate insights and next steps
  const insights = generateInsights(overallConfidenceScore, technicalReadiness, psychologicalFit, domainKnowledge);
  const nextSteps = generateNextSteps(technicalReadiness, domainKnowledge);
  
  return {
    psychological_fit: psychologicalFit,
    technical_readiness: technicalReadiness,
    domain_knowledge: domainKnowledge,
    wiscars,
    overall_confidence_score: overallConfidenceScore,
    recommendation,
    next_steps: nextSteps,
    career_roles: getCareerRoles(overallConfidenceScore),
    alternative_roles: getAlternativeRoles(overallConfidenceScore),
    insights,
    tags: generateTags(answerMap, overallConfidenceScore)
  };
}

function calculatePsychologicalFit(answerMap: Map<string, string | number | string[]>): number {
  const psychScores: number[] = [];
  
  // Interest scale questions
  const interest1 = Number(answerMap.get('interest_1')) || 1;
  psychScores.push((interest1 / 5) * 100);
  
  // Personality questions
  const personality1 = Number(answerMap.get('personality_1')) || 1;
  psychScores.push((personality1 / 5) * 100);
  
  // Growth mindset
  const growthMindset = Number(answerMap.get('growth_mindset_1')) || 1;
  psychScores.push((growthMindset / 5) * 100);
  
  // Motivation
  const motivation = Number(answerMap.get('motivation_1')) || 1;
  psychScores.push((motivation / 5) * 100);
  
  return Math.round(psychScores.reduce((sum, score) => sum + score, 0) / psychScores.length);
}

function calculateTechnicalReadiness(answerMap: Map<string, string | number | string[]>): number {
  let correctAnswers = 0;
  let totalTechnicalQuestions = 0;
  
  // Check technical questions
  Object.entries(CORRECT_ANSWERS).forEach(([questionId, correctAnswer]) => {
    const userAnswer = answerMap.get(questionId);
    totalTechnicalQuestions++;
    if (userAnswer === correctAnswer) {
      correctAnswers++;
    }
  });
  
  // Add systems thinking scale question
  const systemsThinking = Number(answerMap.get('systems_1')) || 1;
  const systemsScore = (systemsThinking / 5) * 100;
  
  const technicalScore = totalTechnicalQuestions > 0 ? (correctAnswers / totalTechnicalQuestions) * 100 : 0;
  
  return Math.round((technicalScore * 0.7 + systemsScore * 0.3));
}

function calculateDomainKnowledge(answerMap: Map<string, string | number | string[]>): DomainKnowledge {
  return {
    networking: answerMap.get('networking_1') === CORRECT_ANSWERS['networking_1'] ? 75 : 45,
    programming: answerMap.get('programming_1') === CORRECT_ANSWERS['programming_1'] ? 70 : 40,
    cloud_computing: answerMap.get('cloud_1') === CORRECT_ANSWERS['cloud_1'] ? 80 : 50,
    iot: answerMap.get('iot_1') === CORRECT_ANSWERS['iot_1'] ? 75 : 45,
    systems_thinking: Math.round(((Number(answerMap.get('systems_1')) || 1) / 5) * 100)
  };
}

function calculateWISCARScores(answerMap: Map<string, string | number | string[]>): WISCARScores {
  return {
    will: Math.round(((Number(answerMap.get('will_1')) || 1) / 5) * 100),
    interest: Math.round(((Number(answerMap.get('interest_2')) || 1) / 5) * 100),
    skill: Math.round(((Number(answerMap.get('skill_1')) || 1) / 5) * 100),
    cognitive: Math.round(((Number(answerMap.get('cognitive_2')) || 1) / 5) * 100),
    ability_to_learn: Math.round(((Number(answerMap.get('ability_learn_1')) || 1) / 5) * 100),
    real_world_alignment: calculateRealWorldAlignment(answerMap.get('real_world_1') as string)
  };
}

function calculateRealWorldAlignment(answer: string): number {
  const alignmentScores: Record<string, number> = {
    'Working independently on isolated technical problems': 60,
    'Collaborating on infrastructure that impacts real users': 90,
    'Research and development of new technologies': 75,
    'Managing and optimizing existing systems': 80
  };
  return alignmentScores[answer] || 50;
}

function generateRecommendation(overall: number, technical: number, psychological: number): 'Yes' | 'Maybe' | 'No' {
  if (overall >= 75 && technical >= 60 && psychological >= 70) return 'Yes';
  if (overall >= 60 && (technical >= 50 || psychological >= 60)) return 'Maybe';
  return 'No';
}

function generateInsights(overall: number, technical: number, psychological: number, domain: DomainKnowledge): string[] {
  const insights: string[] = [];
  
  if (psychological >= 80) {
    insights.push("You have strong motivation and analytical skills, ideal for edge computing roles.");
  } else if (psychological >= 60) {
    insights.push("You show good aptitude for technical challenges with room for growth.");
  }
  
  if (technical >= 70) {
    insights.push("Your technical foundation is solid and ready for edge computing.");
  } else if (technical >= 50) {
    insights.push("Strengthen core technical skills for greater success in edge computing.");
  } else {
    insights.push("Focus on building fundamental networking and programming knowledge.");
  }
  
  if (domain.systems_thinking >= 80) {
    insights.push("Excellent systems thinking ability - perfect for distributed architectures.");
  }
  
  return insights;
}

function generateNextSteps(technical: number, domain: DomainKnowledge): string[] {
  const steps: string[] = [];
  
  if (domain.networking < 70) {
    steps.push("Learn networking fundamentals (TCP/IP, protocols, network security)");
  }
  
  if (domain.programming < 70) {
    steps.push("Strengthen programming skills, particularly Python for IoT applications");
  }
  
  if (domain.cloud_computing < 70) {
    steps.push("Explore cloud platforms (AWS IoT, Azure IoT Edge, Google Cloud IoT)");
  }
  
  if (domain.iot < 70) {
    steps.push("Get hands-on experience with IoT devices and edge computing platforms");
  }
  
  if (technical >= 70) {
    steps.push("Work on real-world edge computing projects and case studies");
    steps.push("Consider edge computing certifications from major cloud providers");
  }
  
  return steps;
}

function getCareerRoles(score: number): string[] {
  const allRoles = [
    "Edge Computing Engineer",
    "IoT Solutions Architect", 
    "Cloud-Edge Integration Specialist",
    "Distributed Systems Developer",
    "Network Infrastructure Engineer"
  ];
  
  if (score >= 75) return allRoles;
  if (score >= 60) return allRoles.slice(0, 3);
  return allRoles.slice(0, 2);
}

function getAlternativeRoles(score: number): string[] {
  if (score >= 60) return ["Cloud Engineer", "DevOps Engineer", "Network Administrator"];
  return ["Network Administrator", "Systems Administrator", "Cloud Support Engineer", "IoT Application Developer"];
}

function generateTags(answerMap: Map<string, string | number | string[]>, score: number): string[] {
  const tags: string[] = [];
  
  if (Number(answerMap.get('personality_1')) >= 4) tags.push("analytical");
  if (Number(answerMap.get('growth_mindset_1')) >= 4) tags.push("growth-mindset");
  if (Number(answerMap.get('systems_1')) >= 4) tags.push("systems-oriented");
  if (score >= 75) tags.push("high-potential");
  if (Number(answerMap.get('motivation_1')) >= 4) tags.push("highly-motivated");
  
  return tags;
}