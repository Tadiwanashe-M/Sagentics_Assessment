"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-300">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            "w-full resize-y rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors",
            "focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        {error ? <p className="text-xs text-red-400">{error}</p> : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
