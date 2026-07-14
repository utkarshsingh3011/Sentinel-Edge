"use client";

import { EnvironmentGrid } from "@/components/dashboard/environment-grid";
import { LiveCharts } from "@/components/dashboard/live-charts";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { useTelemetry } from "@/lib/telemetry-context";

export default function Dashboard() {
  const { latestTelemetry, history, events, backendStatus, esp32Status } = useTelemetry();

  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full space-y-md">
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
