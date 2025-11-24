import { useState } from "react";
import { AlertCircle, Brain, Shield, Zap, Send, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DetectionResult {
  is_safe: boolean;
  categories: string[];
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
  explanation: string;
}

const Detect = () => {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const analyzeText = async () => {
    if (!text.trim()) {
      toast.error("Please enter text to analyze");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("detect-toxicity", {
        body: { text },
      });

      if (error) throw error;

      setResult(data);
      
      if (!data.is_safe) {
        toast.warning(`Potentially harmful content detected: ${data.severity} severity`);
      } else {
        toast.success("Text appears safe");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to analyze text");
    } finally {
      setAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-destructive/70 text-white";
      case "medium": return "bg-orange-500 text-white";
      case "low": return "bg-yellow-500 text-black";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-2xl mb-4">
            <Brain className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Digital Violence <span className="text-secondary">Detector</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time protection powered by AI. Detect toxic, abusive, and threatening messages before they cause harm.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Real-Time Detection</h3>
            <p className="text-sm text-muted-foreground">
              AI analyzes messages instantly to flag harmful content
            </p>
          </Card>

          <Card className="p-6 text-center shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-xl mb-4">
              <AlertCircle className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Smart Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Get warnings before sending or reading unsafe messages
            </p>
          </Card>

          <Card className="p-6 text-center shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-xl mb-4">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Safe Rewrite</h3>
            <p className="text-sm text-muted-foreground">
              AI suggests safer alternatives for potentially harmful messages
            </p>
          </Card>
        </div>

        <Card className="p-8 md:p-12 shadow-strong animate-in fade-in slide-in-from-bottom duration-700 delay-400 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Try AI Detection
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <Textarea
              placeholder="Enter text to analyze for toxicity, threats, or harassment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={2000}
              className="resize-none"
            />
            
            <Button onClick={analyzeText} disabled={analyzing} className="w-full gap-2">
              {analyzing ? (
                <>
                  <Brain className="h-5 w-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Analyze Text
                </>
              )}
            </Button>

            {result && (
              <Card className={`p-6 ${result.is_safe ? 'border-green-500' : 'border-destructive'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {result.is_safe ? "✓ Text Appears Safe" : "⚠ Potentially Harmful Content"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{result.explanation}</p>
                  </div>
                  {!result.is_safe && (
                    <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
                  )}
                </div>

                {!result.is_safe && result.categories.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Detected Issues:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.categories.map((category) => (
                        <Badge key={category} variant="destructive">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span>Severity:</span>
                  <Badge className={getSeverityColor(result.severity)}>
                    {result.severity.toUpperCase()}
                  </Badge>
                </div>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Confidence:</span>
                  <span className="font-medium">{(result.confidence * 100).toFixed(0)}%</span>
                </div>
              </Card>
            )}
          </div>
        </Card>

        <Card className="p-8 md:p-12 text-center shadow-strong animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Coming Soon: Browser Extension
            </h2>
            <p className="text-muted-foreground mb-6">
              Install our Chrome extension to protect yourself across all social media platforms. 
              The AI detector will work seamlessly in the background, keeping you safe while you browse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" disabled>
                <Brain className="h-5 w-5" />
                Install Extension
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Currently in development. Join our waitlist to be notified when it launches.
            </p>
          </div>
        </Card>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="animate-in fade-in slide-in-from-left duration-700 delay-600">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Install & Activate</h4>
                  <p className="text-sm text-muted-foreground">
                    Add the extension to Chrome and enable real-time protection
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Browse Safely</h4>
                  <p className="text-sm text-muted-foreground">
                    AI monitors messages across all platforms in real-time
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Get Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive instant warnings about harmful content with suggested actions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right duration-700 delay-600">
            <h3 className="text-xl font-semibold mb-4">What We Detect</h3>
            <div className="space-y-3">
              {[
                "Cyberbullying and harassment",
                "Threats and intimidation",
                "Hate speech and discrimination",
                "Sexual harassment and grooming",
                "Impersonation attempts",
                "Blackmail and extortion",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detect;
