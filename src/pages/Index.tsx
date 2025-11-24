import { ArrowRight, Shield, Brain, Heart, BookOpen, Sparkles, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Digital Safety Companion</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            HERA <span className="gradient-hero bg-clip-text text-transparent">SafeSpace</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Empowering women and girls with AI-powered protection, survivor support, and digital literacy education
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/learn">
              <Button size="lg" className="gap-2 shadow-glow">
                <BookOpen className="h-5 w-5" />
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/detect">
              <Button size="lg" variant="outline" className="gap-2">
                <Shield className="h-5 w-5" />
                Explore AI Protection
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">AI</div>
            <div className="text-sm text-muted-foreground">Powered Detection</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Safe Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Confidential</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three Pillars of <span className="text-primary">Protection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tools and resources designed to keep you safe in the digital world
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <div className="inline-flex p-4 bg-gradient-hero rounded-2xl mb-6 shadow-glow">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">AI Detector</h3>
            <p className="text-muted-foreground mb-6">
              Real-time protection using advanced AI to detect and warn you about toxic messages, threats, and harmful content before it reaches you.
            </p>
            <Link to="/detect">
              <Button variant="ghost" className="gap-2 group">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </Card>

          <Card className="p-8 shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="inline-flex p-4 bg-accent rounded-2xl mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Support Portal</h3>
            <p className="text-muted-foreground mb-6">
              Confidential space to document incidents with encrypted storage, generate reports, and connect with verified support resources and trained volunteers.
            </p>
            <Link to="/support">
              <Button variant="ghost" className="gap-2 group">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </Card>

          <Card className="p-8 shadow-medium hover:shadow-strong transition-smooth hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="inline-flex p-4 bg-secondary rounded-2xl mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Literacy Hub</h3>
            <p className="text-muted-foreground mb-6">
              Interactive lessons on digital safety, online violence prevention, and protective strategies. Earn badges as you learn and grow your digital resilience.
            </p>
            <Link to="/learn">
              <Button variant="ghost" className="gap-2 group">
                Start Learning
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-8 md:p-12 gradient-card shadow-strong max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-6 bg-primary/10 rounded-3xl">
                <Lock className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Your Privacy, Our Promise</h3>
              <p className="text-muted-foreground mb-4">
                We use military-grade encryption to protect your data. Your information is never shared without your explicit consent. 
                All support resources are verified and confidential.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Survivor-Centered</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Digital Safety?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of women and girls who are building safer online experiences
          </p>
          <Link to="/learn">
            <Button size="lg" className="gap-2 shadow-glow">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
