"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Landing() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ y: 16 }}
        animate={{ y: 0 }}
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
          One refined public form. One private dashboard. Built for teams.
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
    </main>
  );
}
