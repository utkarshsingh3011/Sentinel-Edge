import { Wifi, RefreshCw, Eye, AlertTriangle, XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

type EventIntent = "healthy" | "connectivity" | "warning" | "critical" | "default";

interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  description: React.ReactNode;
  icon: React.ElementType;
  intent: EventIntent;
}

const events: TimelineEvent[] = [
  {
    id: "1",
    title: "Network Reconnected",
    time: "2m ago",
    description: (
      <>
        The device successfully joined <span className="text-primary">Office_IoT_5G</span> after a brief router reboot.
      </>
    ),
    icon: Wifi,
    intent: "connectivity"
  },
  {
    id: "2",
    title: "System Update Applied",
    time: "45m ago",
    description: (
      <>
        Firmware was updated to <span className="font-medium text-on-background">v2.4.1</span> to improve sensor accuracy.
      </>
    ),
    icon: RefreshCw,
    intent: "healthy"
  },
  {
    id: "3",
    title: "High Temperature Warning",
    time: "2h ago",
    description: "Sensor reported temperature exceeding 28°C in Server Room A.",
    icon: AlertTriangle,
    intent: "warning"
  },
  {
    id: "4",
    title: "Routine Motion Detected",
    time: "4h ago",
    description: (
      <>
        Normal movement registered in <span className="font-medium text-on-background">Server Room B</span> during cleaning shift.
      </>
    ),
    icon: Eye,
    intent: "default"
  },
  {
    id: "5",
    title: "Camera Feed Lost",
    time: "Yesterday",
    description: "Primary camera feed disconnected unexpectedly.",
    icon: XCircle,
    intent: "critical"
  }
];

function getIntentColors(intent: EventIntent) {
  switch (intent) {
    case "healthy":
      return "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/20";
    case "connectivity":
      return "text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/20";
    case "warning":
      return "text-[#fb923c] bg-[#fb923c]/10 border-[#fb923c]/20";
    case "critical":
      return "text-[#f87171] bg-[#f87171]/10 border-[#f87171]/20";
    default:
      return "text-on-surface-variant bg-surface-container border-outline-variant";
  }
}

export function ActivityTimeline() {
  return (
    <GlassCard className="p-lg">
      <div className="flex items-center justify-between mb-lg">
        <h3 className="font-headline-md text-headline-md text-on-background">Activity Timeline</h3>
        <button className="text-primary font-label-sm text-label-sm hover:bg-primary/10 px-md py-sm rounded-lg transition-colors">See full history</button>
      </div>
      
      <div className="relative space-y-0">
        {/* Vertical line connecting events */}
        <div className="absolute left-[23px] top-4 bottom-4 w-px bg-outline-variant opacity-30"></div>
        
        {events.map((event) => {
          const Icon = event.icon;
          const colors = getIntentColors(event.intent);
          
          return (
            <div key={event.id} className="flex gap-md p-md hover:bg-surface-variant/50 rounded-xl transition-all relative">
              <div className={`relative z-10 w-12 h-12 flex items-center justify-center border rounded-full shrink-0 ${colors}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-body-md font-semibold text-on-background">{event.title}</h4>
                  <span className="font-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">{event.time}</span>
                </div>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
