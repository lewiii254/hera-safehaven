import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Bot, X, Vibrate, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FloatingActionMenuProps {
  onSOSActivate: () => void;
  onChatOpen: () => void;
  chatContext?: "support" | "general" | "detect";
}

export const FloatingActionMenu = ({ 
  onSOSActivate, 
  onChatOpen,
  chatContext = "general"
}: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [shakeEnabled, setShakeEnabled] = useState(true);

  // Shake detection for mobile devices
  const handleShake = useCallback(() => {
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;
    let lastTime = Date.now();
    let shakeCount = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    const SHAKE_THRESHOLD = 15;
    const SHAKE_COUNT_THRESHOLD = 3;
    const SHAKE_TIME_WINDOW = 1000;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;

      if (timeDiff > 100) {
        const x = acceleration.x || 0;
        const y = acceleration.y || 0;
        const z = acceleration.z || 0;

        if (lastX !== null && lastY !== null && lastZ !== null) {
          const deltaX = Math.abs(x - lastX);
          const deltaY = Math.abs(y - lastY);
          const deltaZ = Math.abs(z - lastZ);

          if (deltaX + deltaY + deltaZ > SHAKE_THRESHOLD) {
            shakeCount++;
            if (shakeCount >= SHAKE_COUNT_THRESHOLD) {
              if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
              }
              onSOSActivate();
              shakeCount = 0;
            }
            
            if (resetTimer) {
              clearTimeout(resetTimer);
            }
            resetTimer = setTimeout(() => {
              shakeCount = 0;
            }, SHAKE_TIME_WINDOW);
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
        lastTime = currentTime;
      }
    };

    return handleMotion;
  }, [onSOSActivate]);

  useEffect(() => {
    if (!shakeEnabled) return;

    const motionHandler = handleShake();

    const requestPermission = async () => {
      if (typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> })?.requestPermission === "function") {
        try {
          const permission = await (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
          if (permission === "granted") {
            window.addEventListener("devicemotion", motionHandler);
          }
        } catch (error) {
          console.log("Motion permission denied");
        }
      } else {
        window.addEventListener("devicemotion", motionHandler);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("devicemotion", motionHandler);
    };
  }, [shakeEnabled, handleShake]);

  // Countdown effect for SOS
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      onSOSActivate();
      setCountdown(null);
      setPressing(false);
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  }, [countdown, onSOSActivate]);

  const handleSOSPressStart = () => {
    setPressing(true);
    setCountdown(2);
    toast.info("Hold to activate SOS mode...", { duration: 2000 });
  };

  const handleSOSPressEnd = () => {
    setPressing(false);
    setCountdown(null);
  };

  const toggleShakeMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShakeEnabled(!shakeEnabled);
    toast.info(shakeEnabled ? "Shake-to-SOS disabled" : "Shake-to-SOS enabled", {
      description: shakeEnabled 
        ? "Shake detection is now off" 
        : "Shake your phone 3 times quickly to activate SOS",
    });
  };

  const handleChatClick = () => {
    setIsOpen(false);
    onChatOpen();
  };

  const getContextColor = () => {
    switch (chatContext) {
      case "support":
        return "bg-accent hover:bg-accent/90";
      case "detect":
        return "bg-secondary hover:bg-secondary/90";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu Items */}
      <div className={cn(
        "flex flex-col items-end gap-3 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {/* Shake Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-card/90 backdrop-blur px-2 py-1 rounded shadow-sm text-muted-foreground">
            Shake SOS
          </span>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full shadow-lg",
              shakeEnabled ? "bg-primary/10 border-primary" : "bg-muted"
            )}
            onClick={toggleShakeMode}
          >
            <Vibrate className={cn("h-5 w-5", shakeEnabled ? "text-primary" : "text-muted-foreground")} />
          </Button>
        </div>

        {/* Chat Button */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-card/90 backdrop-blur px-2 py-1 rounded shadow-sm text-muted-foreground">
            Chat with HERA
          </span>
          <Button
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full shadow-lg text-white",
              getContextColor()
            )}
            onClick={handleChatClick}
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>

        {/* SOS Button */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-card/90 backdrop-blur px-2 py-1 rounded shadow-sm text-destructive font-medium">
            Emergency SOS
          </span>
          <Button
            variant="destructive"
            size="icon"
            className={cn(
              "h-14 w-14 rounded-full shadow-lg transition-all relative",
              pressing ? "scale-110 animate-pulse" : "hover:scale-105"
            )}
            onMouseDown={handleSOSPressStart}
            onMouseUp={handleSOSPressEnd}
            onMouseLeave={handleSOSPressEnd}
            onTouchStart={handleSOSPressStart}
            onTouchEnd={handleSOSPressEnd}
          >
            {countdown !== null ? (
              <span className="text-xl font-bold">{countdown}</span>
            ) : (
              <AlertTriangle className="h-7 w-7" />
            )}
            {pressing && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset={countdown !== null ? (countdown / 2) * 283 : 283}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Main FAB Toggle */}
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
          isOpen 
            ? "bg-muted hover:bg-muted/80 text-foreground rotate-45" 
            : "bg-primary hover:bg-primary/90 text-primary-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>
  );
};
