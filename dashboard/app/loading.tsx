import { GlassCard } from "@/components/ui/glass-card";

export default function Loading() {
  return (
    <main className="flex-1 p-margin-mobile md:p-xl max-w-[1536px] mx-auto w-full animate-pulse">
      {/* Hero Header Skeleton */}
      <div className="mb-lg">
        <div className="h-10 bg-surface-variant rounded-md w-64 mb-sm"></div>
        <div className="h-6 bg-surface-variant rounded-md w-full max-w-2xl"></div>
      </div>

      {/* Summary Skeleton */}
      <section className="mb-xl">
        <GlassCard className="p-lg">
          <div className="h-6 bg-surface-variant rounded-md w-48 mb-md"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 bg-surface-variant rounded-md w-3/4 max-w-md"></div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} className="p-lg">
            <div className="flex items-center justify-between mb-lg">
              <div className="h-4 bg-surface-variant rounded-md w-24"></div>
              <div className="h-6 w-6 bg-surface-variant rounded-full"></div>
            </div>
            <div className="mb-md">
              <div className="h-12 bg-surface-variant rounded-md w-24 mb-2"></div>
              <div className="h-4 bg-surface-variant rounded-md w-32"></div>
            </div>
            <div className="h-4 bg-surface-variant rounded-md w-28"></div>
          </GlassCard>
        ))}
      </div>

      {/* Timeline Skeleton */}
      <GlassCard className="p-lg">
        <div className="h-8 bg-surface-variant rounded-md w-48 mb-lg"></div>
        <div className="space-y-6 relative">
           <div className="absolute left-[23px] top-4 bottom-4 w-px bg-surface-variant"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-md p-md">
              <div className="relative z-10 w-12 h-12 rounded-full bg-surface-variant shrink-0"></div>
              <div className="flex-1">
                <div className="h-6 bg-surface-variant rounded-md w-48 mb-2"></div>
                <div className="h-4 bg-surface-variant rounded-md w-full max-w-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </main>
  );
}
