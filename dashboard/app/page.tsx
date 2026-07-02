import { Sparkles, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { EnvironmentGrid } from "@/components/dashboard/environment-grid";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";

export default function Dashboard() {
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
            <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> Device online for 14 hours</li>
            <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> 3 motion events detected</li>
            <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> Temperature remained within the comfortable range</li>
            <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> Wi-Fi connection stayed stable</li>
            <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> No unusual activity detected</li>
          </ul>
        </GlassCard>
      </section>

      {/* Current Environment Grid */}
      <EnvironmentGrid />

      {/* Recent Activity Timeline */}
      <ActivityTimeline />
    </main>
  );
}
