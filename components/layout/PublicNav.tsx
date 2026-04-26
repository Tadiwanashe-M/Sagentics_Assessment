"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PublicNav() {
  return (
    <motion.header
      initial={{ y: -8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-x-0 top-0 z-20 flex justify-center px-4 pt-6"
    >
      <nav className="flex items-center gap-3 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-2 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
        <Link
          href="/"
          className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100"
        >
          Home
        </Link>
        <Link
          href="/feedback"
          className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100"
        >
          Feedback
        </Link>
        <Link
          href="/login"
          className="rounded-full bg-zinc-800/90 px-4 py-2 text-sm font-medium text-zinc-100 ring-1 ring-zinc-600/60 transition-colors hover:bg-zinc-700/90"
        >
          Dashboard
        </Link>
      </nav>
    </motion.header>
  );
}
