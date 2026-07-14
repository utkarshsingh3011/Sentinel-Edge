"use client";

import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Wifi,
  Cpu,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { RawTelemetry } from "@/lib/api";

interface EnvironmentGridProps {
  telemetry: RawTelemetry | null;
  backendStatus: "online" | "offline";
  esp32Status: "connected" | "disconnected";
}

export function EnvironmentGrid({ telemetry, backendStatus, esp32Status }: EnvironmentGridProps) {
  // If telemetry is null, display offline placeholders (all dynamic based on status)
  const isOnline = backendStatus === "online" && esp32Status === "connected" && telemetry !== null;

  // Temperature Calculations
  const temp = isOnline ? telemetry!.temperature : 0;
  let tempStatus = "Offline";
  let tempColorClass = "text-outline border-outline/20";
  let tempBgClass = "";
  
  if (isOnline) {
    if (temp <= 26) {
      tempStatus = "Comfortable";
      tempColorClass = "text-[#60a5fa] border-[#60a5fa]/20";
      tempBgClass = "shadow-[0_0_20px_rgba(96,165,250,0.02)]";
    } else if (temp <= 32) {
      tempStatus = "Warm";
      tempColorClass = "text-[#fb923c] border-[#fb923c]/20";
      tempBgClass = "shadow-[0_0_20px_rgba(251,146,60,0.02)] bg-[#fb923c]/5";
    } else {
      tempStatus = "Hot";
      tempColorClass = "text-[#f87171] border-[#f87171]/20";
      tempBgClass = "shadow-[0_0_20px_rgba(248,113,113,0.05)] bg-[#f87171]/5";
    }
  }

  // Temperature Trend (simulated trend or stable based on value)
  let trendText = "Stable";
  let TrendIcon = Minus;
  let trendColor = "text-outline";

  if (isOnline) {
    // Generate trend based on value or let it fluctuate
    if (temp > 27) {
      trendText = "↑ Getting Warmer";
      TrendIcon = TrendingUp;
      trendColor = "text-[#f87171]";
    } else if (temp < 22) {
      trendText = "↓ Cooling";
      TrendIcon = TrendingDown;
      trendColor = "text-[#60a5fa]";
    } else {
      trendText = "→ Stable";
      TrendIcon = Minus;
      trendColor = "text-[#4ade80]";
    }
  }

  // Humidity Calculations
  const humidity = isOnline ? telemetry!.humidity : 0;
  const humStatus = isOnline ? "Normal" : "Offline";
  const humColorClass = isOnline ? "text-[#60a5fa] border-[#60a5fa]/20" : "text-outline border-outline/20";

  // Gas Calculations
  const gas = isOnline ? telemetry!.gas : 0;
  let gasStatus = "Offline";
  let gasColorClass = "text-outline border-outline/20";
  let gasBgClass = "";

  if (isOnline) {
    if (gas <= 200) {
      gasStatus = "Good";
      gasColorClass = "text-[#4ade80] border-[#4ade80]/20";
    } else if (gas <= 400) {
      gasStatus = "Poor Air Quality";
      gasColorClass = "text-[#fb923c] border-[#fb923c]/20";
      gasBgClass = "bg-[#fb923c]/5 border-[#fb923c]/40";
    } else {
      gasStatus = "Gas Leak Detected";
      gasColorClass = "text-[#f87171] border-[#f87171]/20";
      gasBgClass = "bg-[#f87171]/10 border-[#f87171]/50 pulse-glow";
    }
  }

  // Motion Calculations
  const motionDetected = isOnline ? telemetry!.motion : false;
  const motionStatus = isOnline ? (motionDetected ? "Motion Detected" : "No Motion") : "Offline";
  
  let motionCardClass = "border-outline-variant/30";
  if (isOnline && motionDetected) {
    motionCardClass = "border-[#f87171]/40 bg-[#f87171]/10";
  }

  // WiFi Signal Strength calculations
  const rssi = isOnline ? telemetry!.rssi : -100;
  let wifiQuality = 0;
  let signalQuality = "Disconnected";
  let signalColorClass = "text-outline";

  if (isOnline) {
    // RSSI to Percentage conversion
    if (rssi >= -50) wifiQuality = 100;
    else if (rssi <= -100) wifiQuality = 0;
    else wifiQuality = Math.round((rssi + 100) * 2);

    if (rssi >= -60) {
      signalQuality = "Excellent";
      signalColorClass = "text-[#4ade80]";
    } else if (rssi >= -70) {
      signalQuality = "Good";
      signalColorClass = "text-[#60a5fa]";
    } else if (rssi >= -80) {
      signalQuality = "Fair";
      signalColorClass = "text-[#fb923c]";
    } else {
      signalQuality = "Poor";
      signalColorClass = "text-[#f87171]";
    }
  }

  // Calculate Last Seen seconds ago
  let lastSeenText = "Never";
  if (isOnline && telemetry!.timestamp) {
    const elapsedSeconds = Math.max(0, Math.floor((new Date().getTime() - new Date(telemetry!.timestamp).getTime()) / 1000));
    lastSeenText = elapsedSeconds < 3 ? "Just now" : `${elapsedSeconds} seconds ago`;
  } else if (backendStatus === "online" && telemetry !== null) {
    const elapsedSeconds = Math.max(0, Math.floor((new Date().getTime() - new Date(telemetry!.timestamp).getTime()) / 1000));
    lastSeenText = `${elapsedSeconds} seconds ago`;
  }

  return (
    <div className="space-y-md">
      {/* FIRST ROW: Environmental Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        
        {/* Temperature Card */}
        <GlassCard 
          ambientGlow={isOnline && temp > 26}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${tempColorClass} ${tempBgClass}`}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Temperature</span>
            <Thermometer className="w-5 h-5 opacity-70" />
          </div>
          <div className="my-sm">
            <span className="font-display-lg text-display-lg leading-none text-on-background">
              {isOnline ? `${temp.toFixed(1)}°C` : "--°C"}
            </span>
          </div>
          <div className="flex items-center justify-between mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <span className="font-semibold">{tempStatus}</span>
            {isOnline && (
              <span className={`flex items-center gap-xs font-medium ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                {trendText}
              </span>
            )}
          </div>
        </GlassCard>

        {/* Humidity Card */}
        <GlassCard 
          ambientGlow={isOnline}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${humColorClass}`}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Humidity</span>
            <Droplets className="w-5 h-5 opacity-70" />
          </div>
          <div className="my-sm">
            <span className="font-display-lg text-display-lg leading-none text-on-background">
              {isOnline ? `${humidity.toFixed(0)}%` : "--%"}
            </span>
          </div>
          <div className="flex items-center justify-between mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <span className="font-semibold">{humStatus}</span>
          </div>
        </GlassCard>

        {/* Air Quality Card */}
        <GlassCard 
          ambientGlow={isOnline && gas > 200}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${gasColorClass} ${gasBgClass}`}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Air Quality</span>
            <Wind className="w-5 h-5 opacity-70" />
          </div>
          <div className="my-sm flex flex-col">
            <span className="font-body-lg text-body-lg text-on-surface-variant">
              Gas Sensor: <span className="text-on-background font-bold">{isOnline ? gas : "---"}</span>
            </span>
            <span className="font-headline-md text-headline-md leading-tight text-on-background font-bold mt-1">
              {isOnline ? gasStatus : "Offline"}
            </span>
          </div>
          <div className="mt-sm border-t border-outline-variant/20 pt-2">
            <span className="font-label-sm text-label-sm font-semibold opacity-70">
              MQ2 Raw Reading
            </span>
          </div>
        </GlassCard>

        {/* Motion Detection Card */}
        <GlassCard 
          ambientGlow={isOnline && motionDetected}
          animate={isOnline && motionDetected ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${motionCardClass}`}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Motion Detection</span>
            <Eye className={`w-5 h-5 ${isOnline && motionDetected ? "text-[#f87171]" : "opacity-70"}`} />
          </div>
          <div className="my-sm">
            <span className={`font-headline-lg text-headline-lg font-bold leading-none ${isOnline && motionDetected ? "text-[#f87171]" : "text-on-background"}`}>
              {motionStatus}
            </span>
          </div>
          <div className="flex items-center justify-between mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <span className="font-semibold opacity-70">
              PIR Sensor State
            </span>
            {isOnline && motionDetected && (
              <span className="flex items-center gap-1 text-[#f87171] font-bold">
                <span className="status-dot bg-[#f87171] animate-ping h-2.5 w-2.5 rounded-full inline-block"></span>
                ACTIVE
              </span>
            )}
          </div>
        </GlassCard>

      </div>

      {/* SECOND ROW: Connectivity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        
        {/* Connectivity Card */}
        <GlassCard className="p-lg border border-outline-variant/20 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md font-bold text-on-background">Connectivity</h3>
              <Wifi className="w-5 h-5 text-primary" />
            </div>
            
            <div className="grid grid-cols-2 gap-sm mb-md">
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">WiFi Status</p>
                <p className="font-body-md font-bold text-on-background">{isOnline ? "Connected" : "Disconnected"}</p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">WiFi RSSI</p>
                <p className="font-body-md font-bold text-on-background">{isOnline ? `${rssi} dBm` : "---"}</p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Signal Quality</p>
                <p className={`font-body-md font-bold ${signalColorClass}`}>{signalQuality}</p>
              </div>
              <div className="space-y-1 flex items-center gap-md">
                <div>
                  <p className="font-label-sm text-on-surface-variant">Backend</p>
                  <p className={`font-label-sm ${backendStatus === "online" ? "text-[#4ade80]" : "text-[#f87171]"}`}>{backendStatus === "online" ? "🟢 Online" : "🔴 Offline"}</p>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">ESP32</p>
                  <p className={`font-label-sm ${esp32Status === "connected" ? "text-[#4ade80]" : "text-[#f87171]"}`}>{esp32Status === "connected" ? "🟢 Connected" : "🔴 Offline"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-center text-label-sm font-label-sm mb-1 text-on-surface-variant">
              <span>Link Integrity</span>
              <span>{wifiQuality}%</span>
            </div>
            <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500" 
                style={{ width: `${wifiQuality}%` }}
              ></div>
            </div>
          </div>
        </GlassCard>

        {/* System Status Card */}
        <GlassCard className="p-lg border border-outline-variant/20 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md font-bold text-on-background">System Status</h3>
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            
            <div className="grid grid-cols-2 gap-md">
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">ESP32 Core</p>
                <span className={`inline-flex items-center gap-xs font-body-md font-bold ${esp32Status === "connected" ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                  {esp32Status === "connected" ? "🟢 Online" : "🔴 Offline"}
                </span>
              </div>
              
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Firmware</p>
                <p className="font-body-md font-bold text-on-background">v1.0</p>
              </div>

              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">IP Address</p>
                <p className="font-body-md font-mono font-semibold text-on-background">
                  {isOnline ? telemetry!.ip_address : "Disconnected"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Last Seen</p>
                <p className="font-body-md font-semibold text-primary">{lastSeenText}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-outline-variant/20 pt-md mt-md flex items-center justify-between text-label-sm text-on-surface-variant">
            <span>SOC Architecture</span>
            <span className="font-bold text-on-background">Tensilica Xtensa LX6 (ESP32 WROOM)</span>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
