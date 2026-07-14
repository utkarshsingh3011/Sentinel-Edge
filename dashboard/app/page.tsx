"use client";

import { EnvironmentGrid } from "@/components/dashboard/environment-grid";
import { LiveCharts } from "@/components/dashboard/live-charts";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { useTelemetry } from "@/lib/telemetry-context";
import { GlassCard } from "@/components/ui/glass-card";
import { getRelativeTimeString } from "@/lib/utils";

export default function Dashboard() {
  const { latestTelemetry, history, events, backendStatus, esp32Status } = useTelemetry();

  if (backendStatus === "offline") {
    return (
      <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full flex items-center justify-center min-h-[60vh]">
        <GlassCard className="p-xl border border-[#f87171]/20 max-w-md w-full text-center space-y-md shadow-[0_0_50px_rgba(248,113,113,0.05)]">
          <div className="flex justify-center mb-sm">
            <span className="status-dot bg-[#f87171] h-4 w-4 rounded-full animate-ping"></span>
          </div>
          <h2 className="font-headline-lg text-[#f87171] font-bold">Backend Offline</h2>
          <p className="font-body-md text-on-surface-variant">
            Unable to fetch telemetry
          </p>
          <div className="flex items-center justify-center gap-xs font-label-sm text-outline animate-pulse pt-sm">
            <span>Retrying...</span>
          </div>
        </GlassCard>
      </main>
    );
  }

  const lastSeenText = latestTelemetry?.timestamp ? getRelativeTimeString(latestTelemetry.timestamp) : "Never";

  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full space-y-md">
      {/* ESP32 Offline Warning Banner */}
      {esp32Status === "offline" && (
        <div className="bg-[#fb923c]/10 border border-[#fb923c]/20 text-[#fb923c] p-md rounded-xl flex flex-col sm:flex-row justify-between items-center gap-sm transition-all duration-300">
          <div className="flex items-center gap-sm font-semibold text-body-sm">
            <span className="status-dot bg-[#fb923c] animate-pulse h-2.5 w-2.5 rounded-full inline-block"></span>
            <span>ESP32 Offline — Waiting for telemetry...</span>
          </div>
          <span className="font-mono text-xs opacity-85">
            Last seen {lastSeenText}
          </span>
        </div>
      )}

      {/* Real-Time Cards Grid */}
      <EnvironmentGrid 
        telemetry={latestTelemetry} 
        backendStatus={backendStatus} 
        esp32Status={esp32Status} 
      />

      {/* Live Charts Section */}
      <LiveCharts history={history} />

      {/* Real-Time Event Log */}
      <ActivityTimeline events={events} />
    </main>
  );
}
