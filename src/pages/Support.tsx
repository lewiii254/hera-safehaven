import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Lock, FileText, Users, Phone, Shield, Globe, MapPin, MessageCircle, Bot, BookOpen, AlertTriangle, ClipboardList, UserCheck, AlertCircle, Building, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import SafetyPlanCreator from "@/components/SafetyPlanCreator";
import AIChatAssistant from "@/components/AIChatAssistant";
import IncidentReportForm from "@/components/IncidentReportForm";
import TrustedContacts from "@/components/TrustedContacts";
import RiskAssessment from "@/components/RiskAssessment";
import ResourceDirectory from "@/components/ResourceDirectory";

// Section navigation data for better organization
const sections = [
  { id: "resources", label: "Emergency Resources", icon: Phone, color: "text-destructive", bgColor: "bg-destructive/10" },
  { id: "tools", label: "Safety Tools", icon: Shield, color: "text-primary", bgColor: "bg-primary/10" },
  { id: "connect", label: "Get Help", icon: Heart, color: "text-accent", bgColor: "bg-accent/10" },
];

const Support = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("resources");
  const [activeTab, setActiveTab] = useState("resources");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-4">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Survivor Support <span className="text-accent">Portal</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe, confidential space for survivors across Africa. Access resources, create safety plans, and connect with support.
          </p>
        </div>

        {/* African Context Banner - More compact on mobile */}
        <Card className="p-4 md:p-6 mb-6 bg-gradient-to-r from-[hsl(140,60%,35%)]/10 to-[hsl(0,75%,45%)]/10 border-[hsl(45,100%,50%)]/30">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-[hsl(45,100%,50%)]/20 rounded-xl flex-shrink-0">
              <Globe className="h-5 w-5 md:h-6 md:w-6 text-[hsl(45,100%,50%)]" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-0.5 md:mb-1">Supporting Communities Across Africa</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Built with understanding of African contexts, cultures, and community values.
              </p>
            </div>
          </div>
        </Card>

        {/* Section Navigation - Mobile-friendly cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 md:hidden">Navigate to:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {sections.map((section) => (
              <Card 
                key={section.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  activeSection === section.id ? 'ring-2 ring-primary shadow-md' : ''
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.bgColor}`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{section.label}</h3>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links - Horizontal scroll on mobile */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-3">
              <Card 
                className="p-3 min-w-[120px] text-center cursor-pointer hover:shadow-lg transition-all hover:border-primary flex-shrink-0"
                onClick={() => navigate("/evidence")}
              >
                <Lock className="h-5 w-5 mx-auto mb-1.5 text-primary" />
                <h3 className="font-semibold text-xs">Evidence Locker</h3>
                <p className="text-[10px] text-muted-foreground">Secure storage</p>
              </Card>
              
              <Card 
                className="p-3 min-w-[120px] text-center cursor-pointer hover:shadow-lg transition-all hover:border-secondary flex-shrink-0"
                onClick={() => navigate("/forum")}
              >
                <MessageCircle className="h-5 w-5 mx-auto mb-1.5 text-secondary" />
                <h3 className="font-semibold text-xs">Community</h3>
                <p className="text-[10px] text-muted-foreground">Share & connect</p>
              </Card>
              
              <Card 
                className="p-3 min-w-[120px] text-center cursor-pointer hover:shadow-lg transition-all hover:border-accent flex-shrink-0"
                onClick={() => navigate("/messages")}
              >
                <Users className="h-5 w-5 mx-auto mb-1.5 text-accent" />
                <h3 className="font-semibold text-xs">Messages</h3>
                <p className="text-[10px] text-muted-foreground">Safe chats</p>
              </Card>
              
              <Card 
                className="p-3 min-w-[120px] text-center cursor-pointer hover:shadow-lg transition-all hover:border-green-500 flex-shrink-0"
                onClick={() => navigate("/learn")}
              >
                <BookOpen className="h-5 w-5 mx-auto mb-1.5 text-green-500" />
                <h3 className="font-semibold text-xs">Learn</h3>
                <p className="text-[10px] text-muted-foreground">Safety tips</p>
              </Card>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Main Content Area based on Section */}
        {activeSection === "resources" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-bold">Emergency Resources</h2>
            </div>
            
            {/* Emergency Resources Content */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Kenya Resources */}
              <Card className="p-4 md:p-6 shadow-sm hover:shadow-md transition-smooth border-[hsl(140,60%,35%)]/30">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-[hsl(140,60%,35%)]/10 rounded-xl flex-shrink-0">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[hsl(140,60%,35%)]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 md:mb-2 flex items-center gap-2 text-sm md:text-base">
                      Kenya Resources
                      <span className="text-xs bg-[hsl(140,60%,35%)]/20 px-2 py-0.5 rounded">🇰🇪</span>
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      24/7 support services in Kenya
                    </p>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div>
                        <strong>Gender Violence Recovery Centre:</strong>
                        <p className="text-primary">+254 709 400 200</p>
                      </div>
                      <div>
                        <strong>COVAW:</strong>
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

              {/* Crisis Lines */}
              <Card className="p-4 md:p-6 shadow-sm hover:shadow-md transition-smooth">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-destructive/10 rounded-xl flex-shrink-0">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">International Crisis Lines</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      24/7 support for immediate help
                    </p>
                    <div className="space-y-2 text-xs md:text-sm">
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

              {/* Mental Health */}
              <Card className="p-4 md:p-6 shadow-sm hover:shadow-md transition-smooth">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-accent/10 rounded-xl flex-shrink-0">
                    <Heart className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Mental Health Support</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      Professional counseling services
                    </p>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div>
                        <strong>Kenya Red Cross:</strong>
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
              <Card className="p-4 md:p-6 shadow-sm hover:shadow-md transition-smooth">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-[hsl(45,100%,50%)]/20 rounded-xl flex-shrink-0">
                    <FileText className="h-5 w-5 md:h-6 md:w-6 text-[hsl(45,100%,50%)]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Legal Aid & Support</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      Free legal assistance
                    </p>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div>
                        <strong>National Legal Aid (Kenya):</strong>
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

            {/* Safety Notice */}
            <Card className="p-4 bg-muted/50 border-2 border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Your Safety Is Our Priority</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    All resources are verified organizations in Africa. If in immediate danger, call 112 (Kenya) or your local emergency number.
                  </p>
                </div>
              </div>
            </Card>

            {/* View More Button */}
            <div className="text-center pt-2">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("directory")}
                className="gap-2"
              >
                <Building className="h-4 w-4" />
                View Full Resource Directory
              </Button>
            </div>
          </div>
        )}

        {activeSection === "tools" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Safety Tools</h2>
            </div>
            
            {/* Tool Selection Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  activeTab === "report" ? 'ring-2 ring-destructive' : ''
                }`}
                onClick={() => setActiveTab("report")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-destructive/10 rounded-xl mb-3">
                    <ClipboardList className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Report Incident</h3>
                  <p className="text-xs text-muted-foreground">Document incidents safely</p>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  activeTab === "risk" ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setActiveTab("risk")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-orange-500/10 rounded-xl mb-3">
                    <AlertCircle className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Risk Assessment</h3>
                  <p className="text-xs text-muted-foreground">Check your safety level</p>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  activeTab === "safety-plan" ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setActiveTab("safety-plan")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-green-500/10 rounded-xl mb-3">
                    <FileText className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Safety Plan</h3>
                  <p className="text-xs text-muted-foreground">Create your safety plan</p>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  activeTab === "contacts" ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveTab("contacts")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-500/10 rounded-xl mb-3">
                    <UserCheck className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Trusted Contacts</h3>
                  <p className="text-xs text-muted-foreground">Manage your contacts</p>
                </div>
              </Card>
            </div>

            {/* Tool Content Area */}
            <Card className="p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <ScrollArea className="w-full">
                  <TabsList className="inline-flex w-auto min-w-full md:w-full mb-4">
                    <TabsTrigger value="report" className="flex-1 min-w-[100px]">Report</TabsTrigger>
                    <TabsTrigger value="risk" className="flex-1 min-w-[100px]">Risk Check</TabsTrigger>
                    <TabsTrigger value="safety-plan" className="flex-1 min-w-[100px]">Safety Plan</TabsTrigger>
                    <TabsTrigger value="contacts" className="flex-1 min-w-[100px]">Contacts</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="report">
                  <IncidentReportForm />
                </TabsContent>

                <TabsContent value="risk">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">Safety Risk Assessment</h3>
                      <p className="text-xs text-muted-foreground">
                        Answer a few questions to understand your situation
                      </p>
                    </div>
                  </div>
                  <RiskAssessment />
                </TabsContent>

                <TabsContent value="safety-plan">
                  {user ? (
                    <SafetyPlanCreator />
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sign in to create and save your personal safety plan.
                      </p>
                      <Button onClick={() => navigate("/auth")}>Sign In to Continue</Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="contacts">
                  {user ? (
                    <TrustedContacts />
                  ) : (
                    <div className="text-center py-8">
                      <UserCheck className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sign in to add and manage your trusted contacts.
                      </p>
                      <Button onClick={() => navigate("/auth")}>Sign In to Continue</Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {activeSection === "connect" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">Get Help & Support</h2>
            </div>

            {/* Support Options */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* AI Support */}
              <Card className="p-4 md:p-6 hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="p-3 bg-accent/10 rounded-xl inline-flex mb-3">
                    <Bot className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-2">AI Support Assistant</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Chat confidentially with HERA, our AI assistant trained to support survivors.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="text-xs bg-primary/10 px-2 py-1 rounded">Confidential</span>
                    <span className="text-xs bg-accent/10 px-2 py-1 rounded">24/7 Available</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click the chat button in the bottom right corner to start.
                  </p>
                </div>
              </Card>

              {/* Resource Directory */}
              <Card 
                className="p-4 md:p-6 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setActiveTab("directory")}
              >
                <div className="text-center">
                  <div className="p-3 bg-green-500/10 rounded-xl inline-flex mb-3">
                    <Building className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-2">Resource Directory</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Find verified shelters, legal aid, counseling, and more services near you.
                  </p>
                  <Button variant="outline" size="sm" className="gap-1">
                    Browse Directory <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </Card>

              {/* Community Support */}
              <Card 
                className="p-4 md:p-6 hover:shadow-md transition-all cursor-pointer sm:col-span-2 lg:col-span-1"
                onClick={() => navigate("/forum")}
              >
                <div className="text-center">
                  <div className="p-3 bg-secondary/10 rounded-xl inline-flex mb-3">
                    <MessageCircle className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-2">Community Support</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Connect with others who understand. Share anonymously and find peer support.
                  </p>
                  <Button variant="outline" size="sm" className="gap-1">
                    Join Community <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Resource Directory Content */}
            {activeTab === "directory" && (
              <Card className="p-4 md:p-6 mt-4">
                <ResourceDirectory />
              </Card>
            )}

            {/* What We Offer */}
            <Card className="p-4 md:p-6 bg-muted/30">
              <h3 className="font-semibold text-base mb-4 text-center">What We Offer</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="p-2 bg-primary/10 rounded-lg inline-flex mb-2">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs font-medium">Encrypted Storage</p>
                  <p className="text-[10px] text-muted-foreground">Military-grade security</p>
                </div>
                <div>
                  <div className="p-2 bg-secondary/10 rounded-lg inline-flex mb-2">
                    <FileText className="h-4 w-4 text-secondary" />
                  </div>
                  <p className="text-xs font-medium">Digital Reports</p>
                  <p className="text-[10px] text-muted-foreground">For legal purposes</p>
                </div>
                <div>
                  <div className="p-2 bg-accent/10 rounded-lg inline-flex mb-2">
                    <Users className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-xs font-medium">Connect with Help</p>
                  <p className="text-[10px] text-muted-foreground">Verified resources</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* AI Chat Assistant - Support Context */}
      <AIChatAssistant context="support" />
    </div>
  );
};

export default Support;
