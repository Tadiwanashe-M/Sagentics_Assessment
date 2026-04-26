"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { FeedbackRow } from "@/lib/types/feedback";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function computeStats(items: FeedbackRow[]) {
  const total = items.length;
  const avg = total === 0 ? 0 : items.reduce((s, r) => s + r.rating, 0) / total;
  const dist = [1, 2, 3, 4, 5].map((n) => items.filter((r) => r.rating === n).length);
  const max = Math.max(...dist, 1);
  return { total, avg, dist, max };
}

export function DashboardView({ initial }: { initial: FeedbackRow[] }) {
  const [items, setItems] = useState(initial);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- createBrowserClient only in browser after mount
    setSupabase(createBrowserClient(url, key));
  }, []);

  const stats = computeStats(items);

  async function archive(id: string) {
    if (!supabase) {
      toast.error("Client not ready");
      return;
    }
    const prev = items;
    setItems((list) => list.filter((i) => i.id !== id));
    const { error } = await supabase.from("feedback").update({ archived: true }).eq("id", id);
    if (error) {
      setItems(prev);
      toast.error(error.message);
      return;
    }
    toast.success("Archived");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Total submissions
            </p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-100">{stats.total}</p>
            <p className="mt-1 text-xs text-zinc-500">Active (not archived)</p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Average rating
            </p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-100">
              {stats.total === 0 ? "—" : stats.avg.toFixed(1)}
            </p>
            <div className="mt-2">
              <StarRating value={Math.round(stats.avg) || 0} readOnly size="sm" label="Average" />
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Rating spread
            </p>
            <ul className="mt-3 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.dist[star - 1] ?? 0;
                const pct = (count / stats.max) * 100;
                return (
                  <li key={star} className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="w-3 tabular-nums text-zinc-500">{star}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-900/80">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600/80 to-indigo-500/70"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + star * 0.03 }}
                      />
                    </div>
                    <span className="w-6 text-right tabular-nums text-zinc-500">{count}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Latest feedback</h2>
            <p className="text-sm text-zinc-500">Newest first</p>
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/80 bg-zinc-800/30 py-20 text-center"
          >
            <p className="text-sm font-medium text-zinc-300">No feedback yet</p>
            <p className="mt-2 max-w-sm text-sm text-zinc-500">
              When clients submit the public form, their messages will land here—sorted with care.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4" role="list">
            <AnimatePresence mode="popLayout">
              {items.map((row, index) => (
                <motion.article
                  key={row.id}
                  role="listitem"
                  layout
                  initial={{ y: 16 }}
                  animate={{ y: 0 }}
                  exit={{ scale: 0.97, x: -12 }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                    delay: index * 0.03,
                  }}
                  className="list-none"
                >
                  <Card className="group relative overflow-hidden p-6 transition-shadow hover:shadow-2xl hover:shadow-violet-950/20">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/[0.04] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="truncate text-base font-semibold text-zinc-100">{row.name}</h3>
                          <span className="text-xs text-zinc-500">{formatDate(row.created_at)}</span>
                        </div>
                        <p className="break-all text-sm text-violet-300/90">{row.email}</p>
                        <div className="flex items-center gap-2">
                          <StarRating value={row.rating} readOnly compact size="sm" />
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                          {row.comment}
                        </p>
                      </div>
                      <div className="shrink-0 sm:pt-1">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => archive(row.id)}
                        >
                          Archive
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
