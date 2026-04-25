"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={props.type ?? "button"}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-[transform,colors,opacity] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 enabled:hover:scale-[1.02] enabled:active:scale-[0.98]",
          variant === "primary" &&
            "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white shadow-lg shadow-violet-900/25 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50",
          variant === "ghost" &&
            "bg-zinc-800/80 text-zinc-200 ring-1 ring-zinc-700/80 hover:bg-zinc-700/80 disabled:opacity-50",
          variant === "danger" &&
            "bg-red-500/15 text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/25 disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner />
            <span>Please wait</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

function Spinner() {
  return (
    <span
      className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
      aria-hidden
    />
  );
}
