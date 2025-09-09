import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Brain, Zap, CheckCircle } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            FutureFit Readiness Assessment™
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Should I Become an Edge Computing Engineer?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover if you're ready for the future of distributed computing with our comprehensive AI-powered assessment
          </p>
        </div>
      </div>

      {/* What is Edge Computing */}
      <Card className="mb-8 border-2 border-primary/10 bg-gradient-to-r from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            What is Edge Computing?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 leading-relaxed">
            Edge computing brings computation and data storage closer to IoT devices, sensors, and mobile devices, 
            dramatically reducing latency and enabling real-time processing. It's the backbone of autonomous vehicles, 
            smart cities, and next-generation applications.
          </p>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="text-center">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Psychological Fit</CardTitle>
            <CardDescription>6-8 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Assess your motivation, personality traits, and cognitive style for edge computing roles
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
          <CardHeader className="text-center">
            <Target className="h-8 w-8 text-accent mx-auto mb-2" />
            <CardTitle className="text-lg">Technical Aptitude</CardTitle>
            <CardDescription>12-15 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Evaluate logical reasoning, problem-solving, and foundational technical knowledge
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20 hover:border-success/40 transition-colors">
          <CardHeader className="text-center">
            <Clock className="h-8 w-8 text-success mx-auto mb-2" />
            <CardTitle className="text-lg">WISCAR Analysis</CardTitle>
            <CardDescription>8-10 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, and more
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Career Paths */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Typical Career Paths</CardTitle>
          <CardDescription>Roles you could pursue with edge computing expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Edge Computing Engineer',
              'IoT Solutions Architect', 
              'Distributed Systems Developer',
              'Cloud-Edge Integration Specialist',
              'Network Infrastructure Engineer'
            ].map((role) => (
              <div key={role} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">{role}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Traits */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Traits That Succeed in Edge Computing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Analytical problem-solver',
              'Systems thinking',
              'Tech curiosity',
              'Structured approach',
              'Collaborative mindset',
              'Adaptable learner'
            ].map((trait) => (
              <Badge key={trait} variant="outline" className="text-center p-2">
                {trait}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
          <CardContent className="pt-0">
            <h3 className="text-2xl font-bold mb-4">Ready to Discover Your Potential?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI-powered assessment will provide personalized insights, career recommendations, 
              and a clear learning path tailored to your unique profile.
            </p>
            <Button 
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Total time: 25-30 minutes • Free comprehensive report
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}