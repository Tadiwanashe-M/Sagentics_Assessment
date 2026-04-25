"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Landing() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400/90">
          Client Feedback
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          A calmer way to hear your clients.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          One refined public form. One private dashboard. Built for teams who care about craft—not
          clutter.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/feedback" className="w-full px-8 py-3 text-base sm:flex-1">
            Leave feedback
          </ButtonLink>
          <ButtonLink href="/login" variant="ghost" className="w-full px-8 py-3 text-base sm:flex-1">
            Open dashboard
          </ButtonLink>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative z-10 mt-16 w-full max-w-2xl"
      >
        <Card className="p-6 text-left sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { t: "Soft motion", d: "Purposeful Framer Motion transitions, never noisy." },
              { t: "Supabase core", d: "RLS-ready Postgres with auth that fits Vercel." },
              { t: "Dark zinc UI", d: "Layered greys, glass edges, and restrained accent." },
            ].map((item) => (
              <div key={item.t} className="space-y-2">
                <p className="text-sm font-medium text-zinc-200">{item.t}</p>
                <p className="text-sm leading-relaxed text-zinc-500">{item.d}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
