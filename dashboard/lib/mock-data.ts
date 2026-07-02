import { Wifi, RefreshCw, Eye, AlertTriangle, XCircle, Thermometer, Droplets, UserSearch } from "lucide-react";
import type { ElementType, ReactNode } from "react";

export type EventIntent = "healthy" | "connectivity" | "warning" | "critical" | "default";

export interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  description: ReactNode;
  icon: ElementType;
  intent: EventIntent;
}

export interface TelemetryData {
  temperature: {
    value: number;
    unit: string;
    description: string;
    trend: "up" | "down" | "stable";
    trendText: string;
    lastUpdated: string;
  };
  humidity: {
    value: number;
    unit: string;
    description: string;
    status: "stable" | "unstable";
    statusText: string;
    lastUpdated: string;
  };
  security: {
    status: string;
    lastMotion: string;
    state: "secure" | "unsecure";
    stateText: string;
  };
  connectivity: {
    status: string;
    signalStrength: string;
    state: "connected" | "disconnected";
    stateText: string;
    quality: number; // percentage
  };
}

export interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  lastSeen: string;
}

export const eventsList: TimelineEvent[] = [
  {
    id: "1",
    title: "Network Reconnected",
    time: "2m ago",
    description: "The device successfully joined Office_IoT_5G after a brief router reboot.",
    icon: Wifi,
    intent: "connectivity",
  },
  {
    id: "2",
    title: "System Update Applied",
    time: "45m ago",
    description: "Firmware was updated to v2.4.1 to improve sensor accuracy.",
    icon: RefreshCw,
    intent: "healthy",
  },
  {
    id: "3",
    title: "High Temperature Warning",
    time: "2h ago",
    description: "Sensor reported temperature exceeding 28°C in Server Room A.",
    icon: AlertTriangle,
    intent: "warning",
  },
  {
    id: "4",
    title: "Routine Motion Detected",
    time: "4h ago",
    description: "Normal movement registered in Server Room B during cleaning shift.",
    icon: Eye,
    intent: "default",
  },
  {
    id: "5",
    title: "Camera Feed Lost",
    time: "Yesterday",
    description: "Primary camera feed disconnected unexpectedly.",
    icon: XCircle,
    intent: "critical",
  },
];

export const telemetryData: TelemetryData = {
  temperature: {
    value: 24,
    unit: "C",
    description: "Comfortable indoor temperature",
    trend: "down",
    trendText: "Getting cooler",
    lastUpdated: "15 seconds ago",
  },
  humidity: {
    value: 45,
    unit: "%",
    description: "Ideal humidity levels",
    status: "stable",
    statusText: "Stable environment",
    lastUpdated: "1 minute ago",
  },
  security: {
    status: "No activity detected",
    lastMotion: "4 hours ago",
    state: "secure",
    stateText: "Area secure",
  },
  connectivity: {
    status: "Excellent",
    signalStrength: "-45 dBm",
    state: "connected",
    stateText: "Connected",
    quality: 92,
  },
};

export const devicesList: Device[] = [
  { id: "dev-1", name: "Main Entrance Cam", status: "online", lastSeen: "Just now" },
  { id: "dev-2", name: "Server Room Temp", status: "online", lastSeen: "2m ago" },
  { id: "dev-3", name: "Backdoor Sensor", status: "offline", lastSeen: "2h ago" },
];

export const summaryData = [
  "Device online for 14 hours",
  "3 motion events detected",
  "Temperature remained within the comfortable range",
  "Wi-Fi connection stayed stable",
  "No unusual activity detected",
];
