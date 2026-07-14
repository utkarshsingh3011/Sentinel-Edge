import { Sparkles, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { EnvironmentGrid } from "@/components/dashboard/environment-grid";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { fetchTelemetry, fetchEvents, fetchSummary } from "@/lib/api";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Dashboard() {
  const telemetry = await fetchTelemetry();
  const events = await fetchEvents();
  const summary = await fetchSummary();

  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full">
      {/* Hero Header */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">System Overview</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Everything is operating normally. Review the latest device activity and environmental conditions below.
        </p>
      </div>

      {/* Today's Summary Story Section */}
      <section className="mb-xl">
        <GlassCard className="p-lg border-primary/20 bg-gradient-to-br from-surface-container-low to-background">
          <div className="flex items-center gap-sm mb-md text-primary">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-label-md uppercase tracking-widest text-primary">Today's Summary</h3>
          </div>
          <ul className="font-body-lg text-on-surface leading-relaxed space-y-2">
            {summary.map((item, i) => (
              <li key={i} className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> {item}</li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {/* Current Environment Grid */}
      <EnvironmentGrid telemetry={telemetry} />

      {/* Recent Activity Timeline */}
      <ActivityTimeline events={events} />
    </main>
  );
}
