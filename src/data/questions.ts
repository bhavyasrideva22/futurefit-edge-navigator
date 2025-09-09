import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Psychological Fit Assessment',
    description: 'Understanding your motivation, personality, and cognitive style for edge computing roles',
    timeEstimate: '6-8 minutes',
    questions: [
      {
        id: 'interest_1',
        type: 'scale',
        category: 'psychometric',
        section: 'Interest Scale',
        question: 'How interested are you in working with IoT devices and real-time systems?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Not interested', 'Very interested'],
        weight: 0.8,
        skillArea: 'interest'
      },
      {
        id: 'personality_1',
        type: 'scale',
        category: 'psychometric',
        section: 'Personality',
        question: 'Do you enjoy tackling complex, ambiguous technical problems?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Strongly disagree', 'Strongly agree'],
        weight: 0.9,
        skillArea: 'personality'
      },
      {
        id: 'cognitive_1',
        type: 'single',
        category: 'psychometric',
        section: 'Cognitive Style',
        question: 'When approaching a new technical challenge, you prefer to:',
        options: [
          'Follow established procedures step-by-step',
          'Explore multiple innovative approaches',
          'Combine structured methods with creative solutions',
          'Research extensively before starting'
        ],
        weight: 0.7,
        skillArea: 'cognitive'
      },
      {
        id: 'motivation_1',
        type: 'scale',
        category: 'psychometric',
        section: 'Motivation',
        question: 'How driven are you to solve long-term technical challenges, even when progress is slow?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Not driven', 'Extremely driven'],
        weight: 0.8,
        skillArea: 'motivation'
      },
      {
        id: 'growth_mindset_1',
        type: 'scale',
        category: 'psychometric',
        section: 'Growth Mindset',
        question: 'I believe my technical abilities can be significantly improved through effort and learning',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Strongly disagree', 'Strongly agree'],
        weight: 0.9,
        skillArea: 'growth_mindset'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Aptitude Assessment',
    description: 'Evaluating your logical reasoning, problem-solving, and foundational knowledge',
    timeEstimate: '12-15 minutes',
    questions: [
      {
        id: 'logic_1',
        type: 'single',
        category: 'aptitude',
        section: 'Logical Reasoning',
        question: 'What comes next in this sequence: 2, 6, 18, 54, ?',
        options: ['108', '162', '216', '324'],
        weight: 0.6,
        skillArea: 'logical_reasoning'
      },
      {
        id: 'networking_1',
        type: 'single',
        category: 'technical',
        section: 'Networking Basics',
        question: 'Which protocol is most commonly used for IoT device communication in edge computing?',
        options: ['HTTP/HTTPS', 'MQTT', 'FTP', 'SMTP'],
        weight: 0.9,
        skillArea: 'networking'
      },
      {
        id: 'cloud_1',
        type: 'single',
        category: 'technical',
        section: 'Cloud Computing',
        question: 'What is the primary advantage of edge computing over traditional cloud computing?',
        options: [
          'Lower cost',
          'Better security',
          'Reduced latency and faster response times',
          'Easier management'
        ],
        weight: 1.0,
        skillArea: 'cloud_computing'
      },
      {
        id: 'programming_1',
        type: 'single',
        category: 'technical',
        section: 'Programming',
        question: 'Which programming language is most commonly used for IoT and edge computing applications?',
        options: ['Java', 'Python', 'PHP', 'Ruby'],
        weight: 0.8,
        skillArea: 'programming'
      },
      {
        id: 'iot_1',
        type: 'single',
        category: 'domain',
        section: 'IoT Concepts',
        question: 'In edge computing, what does "fog computing" refer to?',
        options: [
          'Cloud computing in foggy weather',
          'A layer of computing between IoT devices and cloud',
          'Encrypted communication protocols',
          'Machine learning algorithms'
        ],
        weight: 0.7,
        skillArea: 'iot'
      },
      {
        id: 'systems_1',
        type: 'scale',
        category: 'technical',
        section: 'Systems Thinking',
        question: 'How comfortable are you with designing distributed systems that need to handle failures gracefully?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Not comfortable', 'Very comfortable'],
        weight: 0.9,
        skillArea: 'systems_thinking'
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment',
    timeEstimate: '8-10 minutes',
    questions: [
      {
        id: 'will_1',
        type: 'scale',
        category: 'psychometric',
        section: 'Will',
        question: 'How persistent are you when facing technical setbacks or complex debugging scenarios?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Give up easily', 'Extremely persistent'],
        weight: 1.0,
        skillArea: 'will'
      },
      {
        id: 'interest_2',
        type: 'scale',
        category: 'psychometric',
        section: 'Interest',
        question: 'How excited are you about working with cutting-edge distributed systems and emerging technologies?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Not excited', 'Very excited'],
        weight: 1.0,
        skillArea: 'interest'
      },
      {
        id: 'skill_1',
        type: 'scale',
        category: 'technical',
        section: 'Current Skills',
        question: 'Rate your current overall technical skills for edge computing (networking, programming, cloud)',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Beginner', 'Expert'],
        weight: 1.0,
        skillArea: 'skill'
      },
      {
        id: 'cognitive_2',
        type: 'scale',
        category: 'psychometric',
        section: 'Cognitive Readiness',
        question: 'How well do you handle complex system architectures with multiple interconnected components?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Struggle with complexity', 'Thrive on complexity'],
        weight: 1.0,
        skillArea: 'cognitive'
      },
      {
        id: 'ability_learn_1',
        type: 'scale',
        category: 'psychometric',
        section: 'Ability to Learn',
        question: 'How quickly do you adapt to new technologies and frameworks?',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Slow to adapt', 'Very quick to adapt'],
        weight: 1.0,
        skillArea: 'ability_to_learn'
      },
      {
        id: 'real_world_1',
        type: 'single',
        category: 'domain',
        section: 'Real-world Alignment',
        question: 'Which scenario best describes your ideal work environment?',
        options: [
          'Working independently on isolated technical problems',
          'Collaborating on infrastructure that impacts real users',
          'Research and development of new technologies',
          'Managing and optimizing existing systems'
        ],
        weight: 0.8,
        skillArea: 'real_world_alignment'
      }
    ]
  }
];