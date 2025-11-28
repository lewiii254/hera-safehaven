import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Lock, FileText, Users, Phone, Shield, Globe, MapPin, MessageCircle, Bot, BookOpen, AlertTriangle, ClipboardList, UserCheck, AlertCircle, Building } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import SafetyPlanCreator from "@/components/SafetyPlanCreator";
import AIChatAssistant from "@/components/AIChatAssistant";
import IncidentReportForm from "@/components/IncidentReportForm";
import TrustedContacts from "@/components/TrustedContacts";
import RiskAssessment from "@/components/RiskAssessment";
import ResourceDirectory from "@/components/ResourceDirectory";

const Support = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resources");

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
            A safe, confidential space for survivors across Africa. Access resources, create safety plans, and connect with support.
          </p>
        </div>

        {/* African Context Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-[hsl(140,60%,35%)]/10 to-[hsl(0,75%,45%)]/10 border-[hsl(45,100%,50%)]/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[hsl(45,100%,50%)]/20 rounded-xl">
              <Globe className="h-6 w-6 text-[hsl(45,100%,50%)]" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Supporting Communities Across Africa</h3>
              <p className="text-sm text-muted-foreground">
                Built with understanding of African contexts, cultures, and community values. Your safety and dignity are our priority.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-lg transition-all hover:border-primary"
            onClick={() => navigate("/evidence")}
          >
            <Lock className="h-6 w-6 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-sm">Evidence Locker</h3>
            <p className="text-xs text-muted-foreground">Secure storage</p>
          </Card>
          
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-lg transition-all hover:border-secondary"
            onClick={() => navigate("/forum")}
          >
            <MessageCircle className="h-6 w-6 mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold text-sm">Community Forum</h3>
            <p className="text-xs text-muted-foreground">Share & connect</p>
          </Card>
          
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-lg transition-all hover:border-accent"
            onClick={() => navigate("/messages")}
          >
            <Users className="h-6 w-6 mx-auto mb-2 text-accent" />
            <h3 className="font-semibold text-sm">Private Messages</h3>
            <p className="text-xs text-muted-foreground">Safe conversations</p>
          </Card>
          
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-lg transition-all hover:border-destructive"
            onClick={() => setActiveTab("report")}
          >
            <ClipboardList className="h-6 w-6 mx-auto mb-2 text-destructive" />
            <h3 className="font-semibold text-sm">Report Incident</h3>
            <p className="text-xs text-muted-foreground">Document safely</p>
          </Card>

          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-lg transition-all hover:border-orange-500"
            onClick={() => setActiveTab("risk")}
          >
            <AlertCircle className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <h3 className="font-semibold text-sm">Risk Assessment</h3>
            <p className="text-xs text-muted-foreground">Check your safety</p>
          </Card>
          
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-lg transition-all hover:border-green-500"
            onClick={() => navigate("/learn")}
          >
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold text-sm">Learn</h3>
            <p className="text-xs text-muted-foreground">Safety education</p>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="contacts">Trusted Contacts</TabsTrigger>
            <TabsTrigger value="risk">Risk Check</TabsTrigger>
            <TabsTrigger value="directory" className="hidden lg:flex">Directory</TabsTrigger>
            <TabsTrigger value="safety-plan" className="hidden lg:flex">Safety Plan</TabsTrigger>
            <TabsTrigger value="ai-support" className="hidden lg:flex">AI Support</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center shadow-medium">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Encrypted Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Your evidence is protected with military-grade AES encryption
                </p>
              </Card>

              <Card className="p-6 text-center shadow-medium">
                <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-xl mb-4">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Digital Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Generate structured reports for legal or support purposes
                </p>
              </Card>

              <Card className="p-6 text-center shadow-medium">
                <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-xl mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Connect with Help</h3>
                <p className="text-sm text-muted-foreground">
                  Access verified resources and trained support volunteers
                </p>
              </Card>
            </div>

            <h3 className="text-2xl font-semibold text-center mb-6">Emergency Resources</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Kenya Resources */}
              <Card className="p-6 shadow-medium hover:shadow-strong transition-smooth border-[hsl(140,60%,35%)]/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[hsl(140,60%,35%)]/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-[hsl(140,60%,35%)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      Kenya Resources
                      <span className="text-xs bg-[hsl(140,60%,35%)]/20 px-2 py-1 rounded">🇰🇪</span>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      24/7 support services in Kenya
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Gender Violence Recovery Centre:</strong>
                        <p className="text-primary">+254 709 400 200</p>
                      </div>
                      <div>
                        <strong>COVAW (Coalition on Violence Against Women):</strong>
                        <p className="text-primary">+254 800 720 553</p>
                      </div>
                      <div>
                        <strong>FIDA Kenya:</strong>
                        <p className="text-primary">+254 20 387 4938</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* General Crisis Resources */}
              <Card className="p-6 shadow-medium hover:shadow-strong transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-destructive/10 rounded-xl">
                    <Phone className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">International Crisis Lines</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      24/7 support for immediate help
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Emergency Services:</strong>
                        <p className="text-primary">112 or 999 (Kenya)</p>
                      </div>
                      <div>
                        <strong>Crisis Text Line:</strong>
                        <p className="text-primary">Text HOME to local number</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Mental Health Support */}
              <Card className="p-6 shadow-medium hover:shadow-strong transition-smooth">
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
                        <strong>Kenya Red Cross Counseling:</strong>
                        <p className="text-primary">1199</p>
                      </div>
                      <div>
                        <strong>Befrienders Kenya:</strong>
                        <p className="text-primary">+254 722 178 177</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Legal Aid */}
              <Card className="p-6 shadow-medium hover:shadow-strong transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[hsl(45,100%,50%)]/20 rounded-xl">
                    <FileText className="h-6 w-6 text-[hsl(45,100%,50%)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legal Aid & Support</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Free legal assistance and guidance
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>National Legal Aid Service (Kenya):</strong>
                        <p className="text-primary">+254 800 720 152</p>
                      </div>
                      <div>
                        <strong>Kituo Cha Sheria:</strong>
                        <p className="text-primary">+254 20 387 4220</p>
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
                    All resources listed are verified organizations operating in Africa. If you're in immediate danger, 
                    please call emergency services (112 in Kenya, 999 in many African countries) or your local emergency number.
                    We respect and honor the diverse cultures and communities across our continent.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="safety-plan">
            {user ? (
              <SafetyPlanCreator />
            ) : (
              <Card className="p-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-4">
                  Please sign in to create and save your personal safety plan. Your plan will be encrypted and only accessible to you.
                </p>
                <Button onClick={() => navigate("/auth")}>Sign In to Continue</Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ai-support">
            <Card className="p-8 text-center">
              <Bot className="h-16 w-16 mx-auto mb-4 text-accent" />
              <h3 className="text-2xl font-semibold mb-4">HERA AI Support Assistant</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                HERA is here to listen and support you. Chat confidentially about your situation, 
                get information about resources, or simply talk to someone who understands.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold text-sm">Confidential</h4>
                  <p className="text-xs text-muted-foreground">Your conversations stay private</p>
                </Card>
                <Card className="p-4">
                  <Heart className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <h4 className="font-semibold text-sm">Trauma-Informed</h4>
                  <p className="text-xs text-muted-foreground">Trained to be supportive</p>
                </Card>
                <Card className="p-4">
                  <Globe className="h-6 w-6 mx-auto mb-2 text-secondary" />
                  <h4 className="font-semibold text-sm">African Context</h4>
                  <p className="text-xs text-muted-foreground">Understands local resources</p>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground">
                Click the chat button in the bottom right corner to start talking to HERA.
              </p>
            </Card>
          </TabsContent>

          {/* New Tab Contents */}
          <TabsContent value="report">
            <IncidentReportForm />
          </TabsContent>

          <TabsContent value="contacts">
            {user ? (
              <TrustedContacts />
            ) : (
              <Card className="p-12 text-center">
                <UserCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-4">
                  Please sign in to add and manage your trusted contacts.
                </p>
                <Button onClick={() => navigate("/auth")}>Sign In to Continue</Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="risk">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Safety Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Answer a few questions to help understand your situation
                  </p>
                </div>
              </div>
              <RiskAssessment />
            </Card>
          </TabsContent>

          <TabsContent value="directory">
            <ResourceDirectory />
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Chat Assistant - Support Context */}
      <AIChatAssistant context="support" />
    </div>
  );
};

export default Support;
