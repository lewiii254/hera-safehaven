import { Bot, Shield, Heart, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export const AISupportSection = () => {
  return (
    <Card className="p-6 md:p-8 text-center">
      <Bot className="h-14 w-14 mx-auto mb-4 text-accent" />
      <h3 className="text-xl md:text-2xl font-semibold mb-4">HERA AI Support Assistant</h3>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm md:text-base">
        HERA is here to listen and support you. Chat confidentially about your situation, 
        get information about resources, or simply talk to someone who understands.
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6 max-w-lg mx-auto">
        <Card className="p-3">
          <Shield className="h-5 w-5 mx-auto mb-1.5 text-primary" />
          <h4 className="font-semibold text-xs">Confidential</h4>
          <p className="text-xs text-muted-foreground hidden sm:block">Private chats</p>
        </Card>
        <Card className="p-3">
          <Heart className="h-5 w-5 mx-auto mb-1.5 text-accent" />
          <h4 className="font-semibold text-xs">Trauma-Informed</h4>
          <p className="text-xs text-muted-foreground hidden sm:block">Supportive</p>
        </Card>
        <Card className="p-3">
          <Globe className="h-5 w-5 mx-auto mb-1.5 text-secondary" />
          <h4 className="font-semibold text-xs">African Context</h4>
          <p className="text-xs text-muted-foreground hidden sm:block">Local help</p>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        Click the chat button in the bottom right corner to start talking to HERA.
      </p>
    </Card>
  );
};
