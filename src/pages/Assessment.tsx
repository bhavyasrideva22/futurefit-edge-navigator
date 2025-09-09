import { useState } from 'react';
import { assessmentSections } from '@/data/questions';
import { Answer } from '@/types/assessment';
import { AssessmentIntro } from '@/components/assessment/AssessmentIntro';
import { QuestionFlow } from '@/components/assessment/QuestionFlow';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { calculateAssessmentResults } from '@/utils/scoring';

type AssessmentStep = 'intro' | 'questions' | 'results';

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleStartAssessment = () => {
    setCurrentStep('questions');
  };

  const handleAnswerSubmit = (answer: Answer) => {
    const updatedAnswers = [...answers.filter(a => a.questionId !== answer.questionId), answer];
    setAnswers(updatedAnswers);
    
    const currentSection = assessmentSections[currentSectionIndex];
    
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      // Next question in current section
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      // Next section
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      setCurrentStep('results');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(assessmentSections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const results = currentStep === 'results' ? calculateAssessmentResults(answers) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      {currentStep === 'intro' && (
        <AssessmentIntro onStart={handleStartAssessment} />
      )}
      
      {currentStep === 'questions' && (
        <QuestionFlow
          sections={assessmentSections}
          currentSectionIndex={currentSectionIndex}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onAnswerSubmit={handleAnswerSubmit}
          onPrevious={handlePreviousQuestion}
        />
      )}
      
      {currentStep === 'results' && results && (
        <AssessmentResults 
          results={results}
          onRetakeAssessment={() => {
            setCurrentStep('intro');
            setAnswers([]);
            setCurrentSectionIndex(0);
            setCurrentQuestionIndex(0);
          }}
        />
      )}
    </div>
  );
};

export default Assessment;