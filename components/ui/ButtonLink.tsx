import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonLinkProps = LinkProps & {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-[transform,colors] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 hover:scale-[1.02] active:scale-[0.98]",
        variant === "primary" &&
          "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white shadow-lg shadow-violet-900/25 hover:from-violet-500 hover:to-indigo-500",
        variant === "ghost" &&
          "bg-zinc-800/80 text-zinc-200 ring-1 ring-zinc-700/80 hover:bg-zinc-700/80",
        className,
      )}
      {...props}
    />
  );
}
