"use client";

import { useTelemetry } from "@/lib/telemetry-context";
import { GlassCard } from "@/components/ui/glass-card";
import { Settings, RefreshCw, Cpu, ShieldAlert, Wifi } from "lucide-react";

export default function SettingsPage() {
  const { 
    refreshInterval, 
    setRefreshInterval, 
    backendStatus, 
    esp32Status, 
    latestTelemetry,
    simulatorEnabled,
    toggleSimulatorEnabled
  } = useTelemetry();

  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full space-y-md">
      {/* Header */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Settings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Configure dashboard preferences, alert thresholds, and device settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Polling Preferences & Simulator */}
        <div className="space-y-md">
          {/* Polling Preferences */}
          <GlassCard className="p-lg border border-outline-variant/20 space-y-md">
            <div className="flex items-center gap-sm text-primary mb-sm">
              <RefreshCw className="w-5 h-5" />
              <h3 className="font-label-sm uppercase tracking-wider font-bold">Polling Preferences</h3>
            </div>
            
            <div className="space-y-sm">
              <label className="font-label-sm text-on-surface-variant block">Refresh Interval (Polling Cycle)</label>
              <p className="font-body-sm text-on-surface-variant">
                Specify how frequently the dashboard queries the FastAPI backend for telemetry updates.
              </p>
              
              <div className="flex gap-sm pt-2">
                {[2000, 5000, 10000].map((ms) => (
                  <button
                    key={ms}
                    onClick={() => setRefreshInterval(ms)}
                    className={`flex-1 py-2 rounded-lg font-label-sm text-label-sm font-semibold border transition-all ${
                      refreshInterval === ms
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant text-on-surface hover:bg-surface-variant"
                    }`}
                  >
                    {ms / 1000} Seconds {ms === 2000 ? "(Default)" : ""}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Telemetry Simulator Toggle */}
          <GlassCard className="p-lg border border-outline-variant/20 space-y-md">
            <div className="flex items-center gap-sm text-primary mb-sm">
              <Settings className="w-5 h-5" />
              <h3 className="font-label-sm uppercase tracking-wider font-bold">Telemetry Simulation</h3>
            </div>
            
            <div className="space-y-sm">
              <label className="font-label-sm text-on-surface-variant block">Backend Simulator Status</label>
              <p className="font-body-sm text-on-surface-variant">
                Toggle the backend simulated environmental data generator. Disable this to test the heartbeat timeout when no telemetry data arrives for 5 seconds.
              </p>
              
              <button
                onClick={() => toggleSimulatorEnabled(!simulatorEnabled)}
                className={`w-full py-2.5 rounded-lg font-label-sm text-label-sm font-semibold border transition-all mt-2 cursor-pointer ${
                  simulatorEnabled
                    ? "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30 hover:bg-[#4ade80]/20"
                    : "bg-[#f87171]/10 text-[#f87171] border-[#f87171]/30 hover:bg-[#f87171]/20"
                }`}
              >
                {simulatorEnabled ? "🟢 Simulator Active (Click to Pause)" : "🔴 Simulator Paused (Click to Resume)"}
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Environmental Thresholds (Visual reference) */}
        <GlassCard className="p-lg border border-outline-variant/20 space-y-md">
          <div className="flex items-center gap-sm text-primary mb-sm">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-label-sm uppercase tracking-wider font-bold">Alert Thresholds</h3>
          </div>
          
          <div className="space-y-md font-body-sm">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-sm">
              <div>
                <p className="font-semibold text-on-background">Climate Temperature</p>
                <p className="text-on-surface-variant text-xs">Thresholds for card warning colors</p>
              </div>
              <div className="text-right">
                <span className="text-[#60a5fa] font-bold">&lt;= 26°C</span> (Normal) <br />
                <span className="text-[#fb923c] font-bold">&gt; 26°C</span> (Warm) <br />
                <span className="text-[#f87171] font-bold">&gt; 32°C</span> (Hot)
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-sm">
              <div>
                <p className="font-semibold text-on-background">Gas Air Quality</p>
                <p className="text-on-surface-variant text-xs">Thresholds for MQ2 sensor readings</p>
              </div>
              <div className="text-right">
                <span className="text-[#4ade80] font-bold">&lt;= 200</span> (Good) <br />
                <span className="text-[#fb923c] font-bold">&gt; 200</span> (Poor) <br />
                <span className="text-[#f87171] font-bold">&gt; 400</span> (Leak)
              </div>
            </div>

            <div className="flex justify-between items-center pb-sm">
              <div>
                <p className="font-semibold text-on-background">Motion Trigger</p>
                <p className="text-on-surface-variant text-xs">PIR sensor motion detection state</p>
              </div>
              <div className="text-right">
                <span className="text-[#f87171] font-bold">Active</span> (Changes Card to Red)
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Device Parameters */}
        <GlassCard className="p-lg border border-outline-variant/20 space-y-md md:col-span-2">
          <div className="flex items-center gap-sm text-primary mb-sm">
            <Cpu className="w-5 h-5" />
            <h3 className="font-label-sm uppercase tracking-wider font-bold">Device & Connection Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md font-body-sm text-on-surface-variant">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-outline block">Device Name</span>
              <span className="text-on-background font-bold">{backendStatus === "online" && latestTelemetry ? latestTelemetry.device : "Offline"}</span>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-outline block">IP Address</span>
              <span className="text-on-background font-mono font-bold">
                {backendStatus === "online" && latestTelemetry ? latestTelemetry.ip_address : "Offline"}
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-outline block">WiFi Network RSSI</span>
              <span className="text-on-background font-bold">
                {backendStatus === "online" && latestTelemetry ? `${latestTelemetry.rssi} dBm` : "Offline"}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-outline block">Connection Protocol</span>
              <span className="text-on-background font-bold">HTTP (REST JSON Client)</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-outline block">SOC Architecture</span>
              <span className="text-on-background font-bold">Tensilica Xtensa Dual-Core 32-bit LX6</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-outline block">Firmware Version</span>
              <span className="text-on-background font-bold">v1.0 (Sentinel Edge Core)</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
