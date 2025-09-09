import { useState } from 'react';
import { AssessmentSection, Question, Answer } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionFlowProps {
  sections: AssessmentSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: Answer[];
  onAnswerSubmit: (answer: Answer) => void;
  onPrevious: () => void;
}

export function QuestionFlow({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onAnswerSubmit,
  onPrevious
}: QuestionFlowProps) {
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [sliderValue, setSliderValue] = useState<number[]>([3]);

  // Calculate total progress
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const completedQuestions = sections.slice(0, currentSectionIndex).reduce((sum, section) => sum + section.questions.length, 0) + currentQuestionIndex;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  // Get current answer if exists
  const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleAnswerChange = (value: string | number) => {
    setSelectedAnswer(value);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setSelectedAnswer(value[0]);
  };

  const handleNext = () => {
    const answerValue = currentQuestion.type === 'scale' ? sliderValue[0] : selectedAnswer;
    
    if (answerValue !== '' && answerValue !== undefined) {
      onAnswerSubmit({
        questionId: currentQuestion.id,
        value: answerValue
      });
    }
  };

  const canGoNext = () => {
    if (currentQuestion.type === 'scale') {
      return sliderValue[0] !== undefined;
    }
    return selectedAnswer !== '';
  };

  const showPrevious = currentSectionIndex > 0 || currentQuestionIndex > 0;

  // Initialize with existing answer
  useState(() => {
    if (existingAnswer) {
      if (currentQuestion.type === 'scale') {
        setSliderValue([Number(existingAnswer.value)]);
      } else {
        setSelectedAnswer(existingAnswer.value as string);
      }
    } else {
      setSelectedAnswer('');
      setSliderValue([3]);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{currentSection.title}</h2>
            <p className="text-muted-foreground">{currentSection.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Question {completedQuestions + 1} of {totalQuestions}
            </p>
            <p className="text-sm font-medium text-primary">
              Section {currentSectionIndex + 1} of {sections.length}
            </p>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </div>

      {/* Question Card */}
      <Card className="mb-8 border-2 border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
              {currentQuestion.section && (
                <p className="text-sm text-muted-foreground mt-2">
                  {currentQuestion.section}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Single Choice Questions */}
          {currentQuestion.type === 'single' && currentQuestion.options && (
            <RadioGroup 
              value={selectedAnswer as string} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="border-2 border-primary/30"
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="text-base leading-relaxed cursor-pointer flex-1 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Scale Questions */}
          {currentQuestion.type === 'scale' && (
            <div className="space-y-6">
              <div className="px-4">
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  max={currentQuestion.scaleMax || 5}
                  min={currentQuestion.scaleMin || 1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currentQuestion.scaleLabels?.[0] || 'Strongly Disagree'}</span>
                <span className="font-medium text-primary text-lg">
                  {sliderValue[0]}
                </span>
                <span>{currentQuestion.scaleLabels?.[1] || 'Strongly Agree'}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!showPrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {currentSection.timeEstimate} remaining in this section
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext()}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}