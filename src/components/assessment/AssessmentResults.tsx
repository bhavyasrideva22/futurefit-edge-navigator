import { AssessmentResults as Results, CareerRole } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  Brain,
  Target,
  Star,
  BookOpen,
  Users,
  Lightbulb
} from 'lucide-react';

interface AssessmentResultsProps {
  results: Results;
  onRetakeAssessment: () => void;
}

export function AssessmentResults({ results, onRetakeAssessment }: AssessmentResultsProps) {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="h-6 w-6 text-success" />;
      case 'Maybe': return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'No': return <XCircle className="h-6 w-6 text-destructive" />;
      default: return <AlertTriangle className="h-6 w-6" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'border-success/30 bg-success/5';
      case 'Maybe': return 'border-warning/30 bg-warning/5';
      case 'No': return 'border-destructive/30 bg-destructive/5';
      default: return 'border-muted';
    }
  };

  const careerRoles: CareerRole[] = [
    {
      title: "Edge Computing Engineer",
      description: "Architect & implement edge data processing systems",
      keySkills: ["Networking", "IoT", "Cloud", "Programming"],
      fitScore: results.overall_confidence_score
    },
    {
      title: "IoT Solutions Architect", 
      description: "Design IoT ecosystems integrating edge & cloud computing",
      keySkills: ["Systems design", "API", "Device integration"],
      fitScore: Math.max(0, results.overall_confidence_score - 5)
    },
    {
      title: "Distributed Systems Developer",
      description: "Create fault-tolerant, low-latency distributed applications", 
      keySkills: ["Systems programming", "Concurrency", "Databases"],
      fitScore: Math.max(0, results.overall_confidence_score - 10)
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          Your FutureFit Assessment Results
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive analysis of your Edge Computing readiness
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className={`mb-8 border-2 ${getRecommendationColor(results.recommendation)}`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {getRecommendationIcon(results.recommendation)}
            <div>
              <CardTitle className="text-2xl">
                {results.recommendation === 'Yes' && 'Highly Recommended!'}
                {results.recommendation === 'Maybe' && 'Proceed with Preparation'}
                {results.recommendation === 'No' && 'Consider Alternative Paths'}
              </CardTitle>
              <CardDescription className="text-lg">
                Overall Confidence Score: {results.overall_confidence_score}%
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.insights.map((insight, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed">
                {insight}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core Scores Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Psychological Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <span className="font-bold text-lg">{results.psychological_fit}%</span>
              </div>
              <Progress value={results.psychological_fit} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <span className="font-bold text-lg">{results.technical_readiness}%</span>
              </div>
              <Progress value={results.technical_readiness} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Framework */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            WISCAR Framework Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive evaluation across six key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(results.wiscars).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {key.replace('_', ' ')}
                  </span>
                  <span className="text-sm font-bold">{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Domain Knowledge Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Technical Skills Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(results.domain_knowledge).map(([skill, score]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {skill.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{score}%</span>
                    <Badge variant={score >= 70 ? "default" : score >= 50 ? "secondary" : "destructive"}>
                      {score >= 70 ? "Strong" : score >= 50 ? "Developing" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Roles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{role.title}</h4>
                  <Badge variant="outline">{role.fitScore}% fit</Badge>
                </div>
                <p className="text-muted-foreground mb-3">{role.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {role.keySkills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.next_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-foreground/90">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Paths */}
      {results.alternative_roles.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              Alternative Career Paths
            </CardTitle>
            <CardDescription>
              Consider these related roles if edge computing isn't the perfect fit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {results.alternative_roles.map((role, index) => (
                <Badge key={index} variant="outline" className="p-2">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <div className="text-center">
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
          <CardContent className="pt-0">
            <h3 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use these insights to guide your learning journey and career decisions. 
              Remember, this assessment is a starting point - your potential grows with dedication and learning.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={onRetakeAssessment}
                variant="outline"
                size="lg"
              >
                Retake Assessment
              </Button>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}