import { useState } from "react";
import { BookOpen, Award, TrendingUp, Lock, Eye, Shield, UserX, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  completed: boolean;
  category: string;
}

const Learn = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons: Lesson[] = [
    {
      id: "1",
      title: "Recognizing Digital Violence",
      description: "Learn to identify cyberbullying, harassment, and online threats",
      icon: AlertTriangle,
      duration: "5 min",
      completed: false,
      category: "Safety Basics"
    },
    {
      id: "2",
      title: "Protecting Your Digital Identity",
      description: "Secure your personal information and online presence",
      icon: Lock,
      duration: "7 min",
      completed: false,
      category: "Privacy"
    },
    {
      id: "3",
      title: "Spotting Impersonation & Catfishing",
      description: "Identify fake profiles and protect yourself from fraud",
      icon: UserX,
      duration: "6 min",
      completed: false,
      category: "Safety Basics"
    },
    {
      id: "4",
      title: "Social Media Security",
      description: "Privacy settings, safe sharing, and boundary setting",
      icon: Eye,
      duration: "8 min",
      completed: false,
      category: "Privacy"
    },
    {
      id: "5",
      title: "Responding to Online Threats",
      description: "Document, report, and get help when facing harassment",
      icon: Shield,
      duration: "10 min",
      completed: false,
      category: "Response"
    },
  ];

  const totalLessons = lessons.length;
  const progress = (completedLessons.length / totalLessons) * 100;

  const handleLessonClick = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const badges = [
    { name: "First Steps", icon: "🌱", earned: completedLessons.length >= 1 },
    { name: "Safety Scholar", icon: "📚", earned: completedLessons.length >= 3 },
    { name: "Digital Guardian", icon: "🛡️", earned: completedLessons.length >= 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Digital Literacy <span className="text-primary">Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower yourself with knowledge. Learn to navigate the digital world safely and confidently.
          </p>
        </div>

        {/* Progress Section */}
        <Card className="p-6 mb-8 shadow-medium animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Your Progress</h3>
                <span className="text-sm font-medium">{completedLessons.length}/{totalLessons} Lessons</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex gap-4 pt-4 border-t">
            <Award className="h-5 w-5 text-accent mt-1" />
            <div className="flex-1">
              <h4 className="font-medium mb-3">Badges Earned</h4>
              <div className="flex gap-3 flex-wrap">
                {badges.map((badge) => (
                  <Badge
                    key={badge.name}
                    variant={badge.earned ? "default" : "outline"}
                    className={`px-3 py-2 ${badge.earned ? 'shadow-glow' : 'opacity-50'}`}
                  >
                    <span className="mr-2">{badge.icon}</span>
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const Icon = lesson.icon;
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <Card
                key={lesson.id}
                className={`p-6 cursor-pointer transition-smooth hover:shadow-medium hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-700`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isCompleted ? 'bg-primary/20' : 'bg-muted'}`}>
                    <Icon className={`h-6 w-6 ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                <Badge variant="outline" className="mb-3">
                  {lesson.category}
                </Badge>
                
                <h3 className="font-semibold text-lg mb-2">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  <Button
                    size="sm"
                    variant={isCompleted ? "outline" : "default"}
                  >
                    {isCompleted ? "Review" : "Start"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <Card className="mt-8 p-8 text-center gradient-accent text-white shadow-strong animate-in fade-in slide-in-from-bottom">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-white/90">
              You've completed all lessons. You're now a Digital Guardian!
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Learn;
