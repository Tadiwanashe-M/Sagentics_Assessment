import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import type { FeedbackRow } from "@/lib/types/feedback";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export const metadata = {
  title: "Dashboard",
};

async function DashboardData() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("archived", false)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-sm font-medium text-red-400">{error.message}</p>
        <p className="mt-2 text-xs text-zinc-500">
          Check your Supabase URL, anon key, and that the <code className="text-zinc-400">feedback</code>{" "}
          table exists with RLS policies.
        </p>
      </div>
    );
  }

  return <DashboardView initial={(data ?? []) as FeedbackRow[]} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardData />
    </Suspense>
  );
}
