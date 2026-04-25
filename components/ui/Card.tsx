import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-700/50 bg-zinc-800/80 shadow-xl shadow-black/20 backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}
