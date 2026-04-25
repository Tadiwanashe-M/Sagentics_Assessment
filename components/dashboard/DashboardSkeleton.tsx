import { Card } from "@/components/ui/Card";

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-800" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-28 animate-pulse border-zinc-800/80 bg-zinc-800/40 p-4" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-40 animate-pulse border-zinc-800/80 bg-zinc-800/40" />
        ))}
      </div>
    </div>
  );
}
