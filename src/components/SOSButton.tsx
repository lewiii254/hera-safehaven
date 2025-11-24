import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOSButtonProps {
  onActivate: () => void;
}

export const SOSButton = ({ onActivate }: SOSButtonProps) => {
  const [pressing, setPressing] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setPressing(true);
    const timer = setTimeout(() => {
      onActivate();
      setPressing(false);
    }, 2000); // 2 second hold to activate
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setPressing(false);
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      className={`fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-strong transition-all ${
        pressing ? "scale-110 shadow-glow" : ""
      }`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      title="Hold for 2 seconds to activate SOS mode"
    >
      <AlertTriangle className="h-8 w-8" />
    </Button>
  );
};
