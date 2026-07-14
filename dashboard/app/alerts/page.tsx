"use client";

import { useTelemetry } from "@/lib/telemetry-context";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";

export default function AlertsPage() {
  const { events } = useTelemetry();

  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full space-y-md">
      {/* Header */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">System Alerts & Logs</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Historical log of active alerts, warnings, and device status notifications.
        </p>
      </div>

      {/* Activity Timeline (Real-Time Events List) */}
      <ActivityTimeline events={events} />
    </main>
  );
}
