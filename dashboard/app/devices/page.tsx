import { Cpu } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function DevicesPage() {
  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Your Devices</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Manage and monitor all your connected edge devices.
        </p>
      </div>
      <GlassCard className="p-lg flex flex-col items-center justify-center min-h-[300px] text-on-surface-variant">
        <Cpu className="w-12 h-12 mb-4 opacity-50" />
        <p className="font-body-lg">Device list will appear here.</p>
      </GlassCard>
    </main>
  );
}
