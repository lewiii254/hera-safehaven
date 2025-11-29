import { Heart, FileText, Users, Phone, Shield, ClipboardList, AlertCircle, Building, Bot, Lock, MessageCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const menuItems = [
  {
    id: "resources",
    label: "Emergency Resources",
    icon: Phone,
    description: "Crisis lines & help"
  },
  {
    id: "report",
    label: "Report Incident",
    icon: ClipboardList,
    description: "Document safely"
  },
  {
    id: "contacts",
    label: "Trusted Contacts",
    icon: Users,
    description: "Your safe people"
  },
  {
    id: "risk",
    label: "Risk Assessment",
    icon: AlertCircle,
    description: "Check your safety"
  },
  {
    id: "directory",
    label: "Resource Directory",
    icon: Building,
    description: "Find local help"
  },
  {
    id: "safety-plan",
    label: "Safety Plan",
    icon: Shield,
    description: "Your escape plan"
  },
  {
    id: "ai-support",
    label: "HERA AI Support",
    icon: Bot,
    description: "Chat with HERA"
  }
];

const quickLinks = [
  { icon: Lock, label: "Evidence Locker", path: "/evidence" },
  { icon: MessageCircle, label: "Community Forum", path: "/forum" },
  { icon: BookOpen, label: "Learn Safety", path: "/learn" }
];

export const SupportSidebar = ({ activeTab, onTabChange, className }: SupportSidebarProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Navigation */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-3">Support Tools</h3>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                isActive
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "hover:bg-muted text-foreground hover:text-primary"
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              <div className="min-w-0">
                <p className={cn("font-medium text-sm truncate", isActive && "text-primary")}>{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-3">Quick Access</h3>
        <div className="space-y-1">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.path}
                href={link.path}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { menuItems };
