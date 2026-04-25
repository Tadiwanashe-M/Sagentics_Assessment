"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  /** Hides the label row (for inline star rows on cards). */
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
};

const starClass: Record<NonNullable<StarRatingProps["size"]>, string> = {
  sm: "size-7 text-lg",
  md: "size-9 text-xl",
  lg: "size-11 text-2xl",
};

const gapClass: Record<NonNullable<StarRatingProps["size"]>, string> = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
};

export function StarRating({
  value,
  onChange,
  readOnly,
  compact,
  size = "md",
  label = "Rating",
  error,
}: StarRatingProps) {
  const interactive = !readOnly && typeof onChange === "function";
  const showLabelRow =
    !compact && (interactive || Boolean(label?.trim()));

  return (
    <div className={cn("space-y-2", compact && "space-y-0")}>
      {showLabelRow ? (
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-zinc-300">
            {label?.trim() ? label : "Rating"}
          </span>
          {interactive ? <span className="text-xs text-zinc-500">{value} / 5</span> : null}
        </div>
      ) : null}
      <div
        className={cn("flex items-center", gapClass[size])}
        role={interactive ? "radiogroup" : undefined}
        aria-label={label}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = value >= star;
          return (
            <motion.button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => onChange?.(star)}
              whileHover={interactive ? { scale: 1.12 } : undefined}
              whileTap={interactive ? { scale: 0.92 } : undefined}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={cn(
                starClass[size],
                "flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60",
                interactive ? "cursor-pointer text-zinc-500 hover:text-amber-300/90" : "cursor-default",
              )}
              aria-checked={interactive ? value === star : undefined}
              role={interactive ? "radio" : undefined}
            >
              <span
                className={cn(
                  "leading-none transition-colors",
                  filled ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.25)]" : "text-zinc-600",
                )}
              >
                ★
              </span>
            </motion.button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
