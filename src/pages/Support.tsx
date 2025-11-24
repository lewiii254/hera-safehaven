import { Heart, Lock, FileText, Users, Phone, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-4">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Survivor Support <span className="text-accent">Portal</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe, confidential space for survivors. Document incidents, access resources, and connect with support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Encrypted Storage</h3>
            <p className="text-sm text-muted-foreground">
              Your evidence is protected with military-grade AES encryption
            </p>
          </Card>

          <Card className="p-6 text-center shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-xl mb-4">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Digital Reports</h3>
            <p className="text-sm text-muted-foreground">
              Generate structured reports for legal or support purposes
            </p>
          </Card>

          <Card className="p-6 text-center shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-xl mb-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Connect with Help</h3>
            <p className="text-sm text-muted-foreground">
              Access verified resources and trained support volunteers
            </p>
          </Card>
        </div>

        <Card className="p-8 md:p-12 text-center shadow-strong animate-in fade-in slide-in-from-bottom duration-700 delay-400">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Secure Portal Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6">
              We're building a comprehensive survivor support system with end-to-end encryption, 
              evidence documentation, and connections to verified resources and support networks.
            </p>
            <Button size="lg" className="gap-2" disabled>
              <Shield className="h-5 w-5" />
              Access Portal
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Currently in development with security and privacy as top priorities.
            </p>
          </div>
        </Card>

        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-semibold text-center mb-8">Emergency Resources</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-medium hover:shadow-strong transition-smooth animate-in fade-in slide-in-from-left duration-700 delay-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-destructive/10 rounded-xl">
                  <Phone className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Crisis Hotlines</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    24/7 support for immediate help
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>National Domestic Violence Hotline:</strong>
                      <p className="text-primary">1-800-799-7233</p>
                    </div>
                    <div>
                      <strong>Crisis Text Line:</strong>
                      <p className="text-primary">Text HOME to 741741</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-medium hover:shadow-strong transition-smooth animate-in fade-in slide-in-from-right duration-700 delay-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mental Health Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional counseling services
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>RAINN (Sexual Assault Hotline):</strong>
                      <p className="text-primary">1-800-656-4673</p>
                    </div>
                    <div>
                      <strong>National Suicide Prevention:</strong>
                      <p className="text-primary">988</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-muted/50 border-2 border-primary/20">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Your Safety Is Our Priority</h4>
                <p className="text-sm text-muted-foreground">
                  All resources listed are verified organizations. If you're in immediate danger, 
                  please call emergency services (911 in the US) or your local emergency number.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Support;
