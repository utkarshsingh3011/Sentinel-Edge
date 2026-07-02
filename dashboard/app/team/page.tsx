import { Users } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function TeamPage() {
  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Team Members</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Manage access and permissions for your team.
        </p>
      </div>
      <GlassCard className="p-lg flex flex-col items-center justify-center min-h-[300px] text-on-surface-variant">
        <Users className="w-12 h-12 mb-4 opacity-50" />
        <p className="font-body-lg">Team member list will appear here.</p>
      </GlassCard>
    </main>
  );
}
