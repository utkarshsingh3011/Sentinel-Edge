"use client";

import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Wifi,
  Cpu
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { RawTelemetry } from "@/lib/api";
import { getRelativeTimeString } from "@/lib/utils";
import { useEffect, useState } from "react";

interface EnvironmentGridProps {
  telemetry: RawTelemetry | null;
  backendStatus: "online" | "offline";
  esp32Status: "online" | "offline";
}

export function EnvironmentGrid({ telemetry, backendStatus, esp32Status }: EnvironmentGridProps) {
  // Trigger a render update every second to keep the "seconds ago" timers fresh
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDeviceOnline = backendStatus === "online" && esp32Status === "online" && telemetry !== null;
  const hasTelemetry = telemetry !== null;
  const lastSeenText = telemetry?.timestamp ? getRelativeTimeString(telemetry.timestamp) : "Never";

  // 1. Temperature Card Logic
  const temp = hasTelemetry ? telemetry!.temperature : 0;
  let tempStatus = "Offline";
  let tempColorClass = "text-outline border-outline-variant/30";
  let tempBgClass = "";
  
  if (hasTelemetry) {
    if (temp <= 26) {
      tempStatus = "Comfortable";
      tempColorClass = isDeviceOnline ? "text-[#60a5fa] border-[#60a5fa]/20" : "text-outline border-outline-variant/30";
      tempBgClass = isDeviceOnline ? "shadow-[0_0_20px_rgba(96,165,250,0.02)]" : "";
    } else if (temp <= 32) {
      tempStatus = "Warm";
      tempColorClass = isDeviceOnline ? "text-[#fb923c] border-[#fb923c]/20" : "text-outline border-outline-variant/30";
      tempBgClass = isDeviceOnline ? "shadow-[0_0_20px_rgba(251,146,60,0.02)] bg-[#fb923c]/5" : "";
    } else {
      tempStatus = "Hot";
      tempColorClass = isDeviceOnline ? "text-[#f87171] border-[#f87171]/20" : "text-outline border-outline-variant/30";
      tempBgClass = isDeviceOnline ? "shadow-[0_0_20px_rgba(248,113,113,0.05)] bg-[#f87171]/5" : "";
    }
  }

  // 2. Humidity Card Logic
  const humidity = hasTelemetry ? telemetry!.humidity : 0;
  const humColorClass = isDeviceOnline ? "text-[#60a5fa] border-[#60a5fa]/20" : "text-outline border-outline-variant/30";

  // 3. Gas Card Logic
  const gas = hasTelemetry ? telemetry!.gas : 0;
  let gasStatus = "Offline";
  let gasColorClass = "text-outline border-outline-variant/30";
  let gasBgClass = "";

  if (hasTelemetry) {
    if (gas <= 150) {
      gasStatus = "Good";
      gasColorClass = isDeviceOnline ? "text-[#4ade80] border-[#4ade80]/20" : "text-outline border-outline-variant/30";
    } else if (gas <= 250) {
      gasStatus = "Moderate";
      gasColorClass = isDeviceOnline ? "text-[#60a5fa] border-[#60a5fa]/20" : "text-outline border-outline-variant/30";
    } else if (gas <= 400) {
      gasStatus = "Poor";
      gasColorClass = isDeviceOnline ? "text-[#fb923c] border-[#fb923c]/20" : "text-outline border-outline-variant/30";
      gasBgClass = isDeviceOnline ? "bg-[#fb923c]/5 border-[#fb923c]/40" : "";
    } else {
      gasStatus = "Danger";
      gasColorClass = isDeviceOnline ? "text-[#f87171] border-[#f87171]/20" : "text-outline border-outline-variant/30";
      gasBgClass = isDeviceOnline ? "bg-[#f87171]/10 border-[#f87171]/50 pulse-glow" : "";
    }
  }

  // 4. Motion Card Logic
  const motionDetected = hasTelemetry ? telemetry!.motion : false;
  const motionStatus = hasTelemetry ? (motionDetected ? "Motion Detected" : "No Motion") : "Offline";
  
  let motionCardClass = "border-outline-variant/30";
  if (isDeviceOnline && motionDetected) {
    motionCardClass = "border-[#f87171]/40 bg-[#f87171]/10";
  }

  // 5. WiFi Signal strength and quality
  const rssi = isDeviceOnline ? telemetry!.rssi : -100;
  let wifiQuality = 0;
  let signalQuality = "Offline";
  let signalColorClass = "text-outline";

  if (isDeviceOnline) {
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

  return (
    <div className="space-y-md">
      {/* FIRST ROW: Environmental Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        
        {/* Temperature Card */}
        <GlassCard 
          ambientGlow={isDeviceOnline && temp > 26}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${tempColorClass} ${tempBgClass} ${!isDeviceOnline ? "opacity-65 hover:translate-y-0" : ""}`}
          whileHover={isDeviceOnline ? { y: -4, transition: { duration: 0.2 } } : { y: 0 }}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Temperature</span>
            <div className="flex items-center gap-2">
              {!isDeviceOnline && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30 rounded-full tracking-wider">
                  OFFLINE
                </span>
              )}
              <Thermometer className="w-5 h-5 opacity-70" />
            </div>
          </div>
          <div className="my-sm">
            <span className="font-display-lg text-display-lg leading-none text-on-background">
              {hasTelemetry ? `${temp.toFixed(1)}°C` : "--°C"}
            </span>
          </div>
          <div className="flex flex-col gap-xs mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface">{hasTelemetry ? tempStatus : "Offline"}</span>
              <span className={isDeviceOnline ? "text-on-surface-variant font-mono" : "text-[#f87171] font-semibold"}>
                {isDeviceOnline ? `Updated ${lastSeenText}` : `Last seen ${lastSeenText}`}
              </span>
            </div>
            {!isDeviceOnline && (
              <span className="text-outline text-[10px] italic">Waiting for device...</span>
            )}
          </div>
        </GlassCard>

        {/* Humidity Card */}
        <GlassCard 
          ambientGlow={isDeviceOnline}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${humColorClass} ${!isDeviceOnline ? "opacity-65 hover:translate-y-0" : ""}`}
          whileHover={isDeviceOnline ? { y: -4, transition: { duration: 0.2 } } : { y: 0 }}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Humidity</span>
            <div className="flex items-center gap-2">
              {!isDeviceOnline && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30 rounded-full tracking-wider">
                  OFFLINE
                </span>
              )}
              <Droplets className="w-5 h-5 opacity-70" />
            </div>
          </div>
          <div className="my-sm">
            <span className="font-display-lg text-display-lg leading-none text-on-background">
              {hasTelemetry ? `${humidity.toFixed(0)}%` : "--%"}
            </span>
          </div>
          <div className="flex flex-col gap-xs mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface">{isDeviceOnline ? "Normal" : (hasTelemetry ? "Stale" : "Offline")}</span>
              <span className={isDeviceOnline ? "text-on-surface-variant font-mono" : "text-[#f87171] font-semibold"}>
                {isDeviceOnline ? `Updated ${lastSeenText}` : `Last seen ${lastSeenText}`}
              </span>
            </div>
            {!isDeviceOnline && (
              <span className="text-outline text-[10px] italic">Waiting for device...</span>
            )}
          </div>
        </GlassCard>

        {/* Air Quality Card */}
        <GlassCard 
          ambientGlow={isDeviceOnline && gas > 150}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${gasColorClass} ${gasBgClass} ${!isDeviceOnline ? "opacity-65 hover:translate-y-0" : ""}`}
          whileHover={isDeviceOnline ? { y: -4, transition: { duration: 0.2 } } : { y: 0 }}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Air Quality</span>
            <div className="flex items-center gap-2">
              {!isDeviceOnline && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30 rounded-full tracking-wider">
                  OFFLINE
                </span>
              )}
              <Wind className="w-5 h-5 opacity-70" />
            </div>
          </div>
          <div className="my-sm flex flex-col">
            <span className="font-body-md text-on-surface-variant">
              MQ2 Value: <span className="text-on-background font-bold font-mono">{hasTelemetry ? gas : "---"}</span>
            </span>
            <span className="font-headline-md text-headline-md leading-tight text-on-background font-bold mt-1">
              {hasTelemetry ? gasStatus : "Offline"}
            </span>
          </div>
          <div className="flex flex-col gap-xs mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface">MQ2 Sensor</span>
              <span className={isDeviceOnline ? "text-on-surface-variant font-mono" : "text-[#f87171] font-semibold"}>
                {isDeviceOnline ? `Updated ${lastSeenText}` : `Last seen ${lastSeenText}`}
              </span>
            </div>
            {!isDeviceOnline && (
              <span className="text-outline text-[10px] italic">Waiting for device...</span>
            )}
          </div>
        </GlassCard>

        {/* Motion Detection Card */}
        <GlassCard 
          key={motionDetected ? "motion-active" : "motion-idle"}
          ambientGlow={isDeviceOnline && motionDetected}
          animate={isDeviceOnline && motionDetected ? { scale: [1, 1.04, 0.97, 1.02, 1] } : {}}
          transition={{ duration: 0.5 }}
          className={`p-lg flex flex-col justify-between min-h-[160px] transition-all border ${motionCardClass} ${!isDeviceOnline ? "opacity-65 hover:translate-y-0" : ""}`}
          whileHover={isDeviceOnline ? { y: -4, transition: { duration: 0.2 } } : { y: 0 }}
        >
          <div className="flex items-center justify-between mb-sm">
            <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">Motion Detection</span>
            <div className="flex items-center gap-2">
              {!isDeviceOnline && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30 rounded-full tracking-wider">
                  OFFLINE
                </span>
              )}
              <Eye className={`w-5 h-5 ${isDeviceOnline && motionDetected ? "text-[#f87171]" : "opacity-70"}`} />
            </div>
          </div>
          <div className="my-sm">
            <span className={`font-headline-lg text-headline-lg font-bold leading-none ${isDeviceOnline && motionDetected ? "text-[#f87171]" : "text-on-background"}`}>
              {hasTelemetry ? motionStatus : "Offline"}
            </span>
          </div>
          <div className="flex flex-col gap-xs mt-sm border-t border-outline-variant/20 pt-2 font-label-sm text-label-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface">PIR Sensor State</span>
              <span className={isDeviceOnline ? "text-on-surface-variant font-mono" : "text-[#f87171] font-semibold"}>
                {isDeviceOnline ? `Updated ${lastSeenText}` : `Last seen ${lastSeenText}`}
              </span>
            </div>
            {!isDeviceOnline && (
              <span className="text-outline text-[10px] italic">Waiting for device...</span>
            )}
          </div>
        </GlassCard>

      </div>

      {/* SECOND ROW: Connectivity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        
        {/* Connectivity Card */}
        <GlassCard className={`p-lg border flex flex-col justify-between min-h-[220px] ${isDeviceOnline ? "border-outline-variant/20" : "border-[#f87171]/20"}`}>
          <div>
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md font-bold text-on-background">Connectivity</h3>
              <Wifi className={`w-5 h-5 ${isDeviceOnline ? "text-primary" : "text-[#f87171]"}`} />
            </div>
            
            <div className="grid grid-cols-2 gap-sm mb-md">
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">WiFi Status</p>
                <p className={`font-body-md font-bold ${isDeviceOnline ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                  {isDeviceOnline ? "Connected" : "Offline"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">RSSI</p>
                <p className="font-body-md font-bold text-on-background font-mono">
                  {isDeviceOnline ? `${telemetry!.rssi} dBm` : "---"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Signal Quality</p>
                <p className={`font-body-md font-bold ${signalColorClass}`}>{signalQuality}</p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Backend Status</p>
                <p className={`font-body-md font-bold ${backendStatus === "online" ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                  {backendStatus === "online" ? "Online" : "Offline"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">ESP32 Status</p>
                <p className={`font-body-md font-bold ${isDeviceOnline ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                  {isDeviceOnline ? "Online" : "Offline"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">IP Address</p>
                <p className="font-body-md font-bold text-outline">Private LAN</p>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-center text-label-sm font-label-sm mb-1 text-on-surface-variant">
              <span>Link Quality</span>
              <span>{wifiQuality}%</span>
            </div>
            <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isDeviceOnline ? "bg-primary" : "bg-outline-variant"}`} 
                style={{ width: `${wifiQuality}%` }}
              ></div>
            </div>
          </div>
        </GlassCard>

        {/* System Status Card */}
        <GlassCard className={`p-lg border flex flex-col justify-between min-h-[220px] ${isDeviceOnline ? "border-outline-variant/20" : "border-[#f87171]/20"}`}>
          <div>
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md font-bold text-on-background">System Status</h3>
              <Cpu className={`w-5 h-5 ${isDeviceOnline ? "text-primary" : "text-[#f87171]"}`} />
            </div>
            
            <div className="grid grid-cols-2 gap-sm mb-sm">
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Device</p>
                <p className="font-body-md font-bold text-on-background">ESP32 DevKit V1</p>
              </div>
              
              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Firmware</p>
                <p className="font-body-md font-bold text-on-background font-mono">v1.0</p>
              </div>

              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Status</p>
                <span className={`inline-flex items-center gap-xs font-body-md font-bold ${isDeviceOnline ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                  {isDeviceOnline ? "🟢 Online" : "🔴 Offline"}
                </span>
              </div>

              <div className="space-y-1">
                <p className="font-label-sm text-on-surface-variant">Last Seen</p>
                <p className={`font-body-md font-semibold ${isDeviceOnline ? "text-primary" : "text-[#f87171]"}`}>
                  {isDeviceOnline ? lastSeenText : `Last seen ${lastSeenText}`}
                </p>
              </div>

              <div className="space-y-1 col-span-2">
                <p className="font-label-sm text-on-surface-variant">Monitoring</p>
                <p className="font-body-md font-bold text-[#4ade80]">Active</p>
              </div>
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
