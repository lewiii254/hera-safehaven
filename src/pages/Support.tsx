import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Globe, AlertTriangle, UserCheck, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import SafetyPlanCreator from "@/components/SafetyPlanCreator";
import AIChatAssistant from "@/components/AIChatAssistant";
import IncidentReportForm from "@/components/IncidentReportForm";
import TrustedContacts from "@/components/TrustedContacts";
import RiskAssessment from "@/components/RiskAssessment";
import ResourceDirectory from "@/components/ResourceDirectory";
import { SupportSidebar } from "@/components/support/SupportSidebar";
import { MobileSupportNav } from "@/components/support/MobileSupportNav";
import { EmergencyResourcesSection } from "@/components/support/EmergencyResourcesSection";
import { AISupportSection } from "@/components/support/AISupportSection";

const Support = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resources");

  const renderContent = () => {
    switch (activeTab) {
      case "resources":
        return <EmergencyResourcesSection />;
      case "report":
        return <IncidentReportForm />;
      case "contacts":
        return user ? (
          <TrustedContacts />
        ) : (
          <Card className="p-8 md:p-12 text-center">
            <UserCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Please sign in to add and manage your trusted contacts.
            </p>
            <Button onClick={() => navigate("/auth")}>Sign In to Continue</Button>
          </Card>
        );
      case "risk":
        return (
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Safety Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Answer questions to understand your situation
                </p>
              </div>
            </div>
            <RiskAssessment />
          </Card>
        );
      case "directory":
        return <ResourceDirectory />;
      case "safety-plan":
        return user ? (
          <SafetyPlanCreator />
        ) : (
          <Card className="p-8 md:p-12 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Please sign in to create and save your personal safety plan.
            </p>
            <Button onClick={() => navigate("/auth")}>Sign In to Continue</Button>
          </Card>
        );
      case "ai-support":
        return <AISupportSection />;
      default:
        return <EmergencyResourcesSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Header - Compact on mobile */}
        <div className="text-center mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center justify-center p-2 md:p-3 bg-accent/10 rounded-xl mb-3">
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-accent" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Survivor Support <span className="text-accent">Portal</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            A safe, confidential space for survivors. Access resources, create safety plans, and connect with support.
          </p>
        </div>

        {/* African Context Banner - Smaller on mobile */}
        <Card className="p-3 md:p-4 mb-6 bg-gradient-to-r from-[hsl(140,60%,35%)]/10 to-[hsl(0,75%,45%)]/10 border-[hsl(45,100%,50%)]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[hsl(45,100%,50%)]/20 rounded-lg flex-shrink-0">
              <Globe className="h-5 w-5 text-[hsl(45,100%,50%)]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm">Supporting Communities Across Africa</h3>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Built with understanding of African contexts, cultures, and community values.
              </p>
            </div>
          </div>
        </Card>

        {/* Mobile Navigation */}
        <MobileSupportNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-lg border p-4">
              <SupportSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* AI Chat Assistant */}
      <AIChatAssistant context="support" />
    </div>
  );
};

export default Support;
