"use client";

import { useTelemetry } from "@/lib/telemetry-context";

export function TopAppBar() {
  const { backendStatus, esp32Status, lastUpdated } = useTelemetry();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-lg py-md gap-md max-w-[1536px] mx-auto bg-[#0F1115]/80 backdrop-blur-md sticky top-0 z-30 border-b border-outline-variant/20">
      <div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-background leading-none mb-1">Sentinel Edge</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Real-Time Edge Monitoring Dashboard</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-md">
        <div className="flex items-center gap-xs px-md py-1 bg-surface-container rounded-full border border-outline-variant">
          <span className={`status-dot ${backendStatus === "online" ? "healthy" : ""}`} style={backendStatus === "offline" ? { backgroundColor: "#f87171" } : {}}></span>
          <span className="text-label-sm font-label-sm text-on-surface uppercase tracking-wider">
            Live Monitoring
          </span>
        </div>
        
        <div className="flex flex-row items-center gap-md text-label-sm font-label-sm text-on-surface-variant">
          <div className="flex items-center gap-xs">
            <span>Backend:</span>
            <span className={backendStatus === "online" ? "text-[#4ade80] font-bold" : "text-[#f87171] font-bold"}>
              {backendStatus === "online" ? "Online" : "Offline"}
            </span>
          </div>
          
          <div className="text-outline-variant">|</div>
          
          <div className="flex items-center gap-xs">
            <span>ESP32:</span>
            <span className={esp32Status === "connected" ? "text-[#4ade80] font-bold" : "text-[#f87171] font-bold"}>
              {esp32Status === "connected" ? "Connected" : "Disconnected"}
            </span>
          </div>
          
          <div className="hidden md:inline-block text-outline-variant">|</div>
          
          <div className="hidden md:flex items-center gap-xs">
            <span>Updated:</span>
            <span className="text-primary font-mono font-bold">{lastUpdated}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

