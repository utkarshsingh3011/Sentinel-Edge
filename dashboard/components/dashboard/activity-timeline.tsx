"use client";

import { Info, AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { RawEvent } from "@/lib/api";

interface ActivityTimelineProps {
  events: RawEvent[];
}

function getSeverityDetails(severity: string) {
  switch (severity) {
    case "success":
      return {
        label: "Success",
        colorClass: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/20",
        icon: CheckCircle2
      };
    case "warning":
      return {
        label: "Warning",
        colorClass: "text-[#fb923c] bg-[#fb923c]/10 border-[#fb923c]/20",
        icon: AlertTriangle
      };
    case "critical":
      return {
        label: "Critical",
        colorClass: "text-[#f87171] bg-[#f87171]/10 border-[#f87171]/20",
        icon: ShieldAlert
      };
    case "info":
    default:
      return {
        label: "Info",
        colorClass: "text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/20",
        icon: Info
      };
  }
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  return (
    <GlassCard className="p-lg border border-outline-variant/20">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-on-background">Recent Events</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time system event logs</p>
        </div>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-xl text-on-surface-variant">
          <p>No events recorded yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="pb-md pr-md">Time</th>
                <th className="pb-md px-md">Severity</th>
                <th className="pb-md pl-md">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-body-sm">
              {events.map((event) => {
                const { label, colorClass, icon: Icon } = getSeverityDetails(event.severity);
                const eventTime = new Date(event.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                });
                
                return (
                  <tr key={event.id} className="hover:bg-surface-variant/10 transition-colors">
                    <td className="py-md pr-md text-primary font-mono whitespace-nowrap">
                      {eventTime}
                    </td>
                    <td className="py-md px-md">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm border ${colorClass}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </span>
                    </td>
                    <td className="py-md pl-md font-medium text-on-surface leading-normal">
                      {event.message}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
