"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          classNames: {
            toast:
              "rounded-xl border border-zinc-700/80 bg-zinc-800/95 text-zinc-100 shadow-xl backdrop-blur-md",
            description: "text-zinc-400",
            success: "border-emerald-500/30",
            error: "border-red-500/30",
          },
        }}
      />
    </>
  );
}
