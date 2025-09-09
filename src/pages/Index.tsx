import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Star, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            AI-Powered Career Assessment Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            FutureFit Readiness Assessment™
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Discover if you're ready for the future of technology with our comprehensive Edge Computing Engineer assessment
          </p>
          <Button 
            onClick={() => navigate('/assessment')}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Assessment
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl">Psychological Assessment</CardTitle>
              <CardDescription>6-8 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Evaluate your motivation, personality traits, and cognitive style for edge computing roles
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="text-xl">Technical Aptitude</CardTitle>
              <CardDescription>12-15 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Test logical reasoning, problem-solving, and foundational technical knowledge
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-success/20 hover:border-success/40 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <Star className="h-12 w-12 text-success mx-auto mb-4" />
              <CardTitle className="text-xl">WISCAR Framework</CardTitle>
              <CardDescription>8-10 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, and more
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You Get Section */}
        <Card className="mb-16 border-2 border-primary/10 bg-gradient-to-r from-card to-secondary/30">
          <CardHeader className="text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl">What You'll Discover</CardTitle>
            <CardDescription className="text-lg">
              Comprehensive insights tailored to your unique profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  'Psychological fit score for edge computing',
                  'Technical readiness assessment',
                  'WISCAR framework analysis',
                  'Personalized learning path'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  'Career role recommendations',
                  'Skills gap analysis',
                  'Next steps guidance',
                  'Alternative career paths'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '25-30', label: 'Minutes Total', desc: 'Complete assessment' },
            { number: '6', label: 'Key Dimensions', desc: 'WISCAR framework' },
            { number: '5+', label: 'Career Paths', desc: 'Recommended roles' },
            { number: '100%', label: 'Personalized', desc: 'Tailored insights' }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-6 border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.desc}</div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="p-12 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
          <CardContent className="pt-0">
            <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Ready to Shape Your Future?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands who have discovered their potential in edge computing. 
              Get personalized insights, clear next steps, and confidence in your career direction.
            </p>
            <Button 
              onClick={() => navigate('/assessment')}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Begin Assessment Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free • No registration required • Instant results
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
