"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { StarRating } from "@/components/ui/StarRating";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = Partial<Record<"name" | "email" | "rating" | "comment", string>>;

export function PublicFeedbackForm() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only env check after mount (avoids prerender without env)
      setConfigError(
        "Supabase environment variables are not set. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      );
      return;
    }
    setSupabase(createBrowserClient(url, key));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!emailRe.test(email.trim())) next.email = "Enter a valid email";
    if (rating < 1 || rating > 5) next.rating = "Please choose a rating";
    if (!comment.trim()) next.comment = "Comment is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!validate()) return;
    setSubmitting(true);
    const { error } = await supabase.from("feedback").insert({
      name: name.trim(),
      email: email.trim(),
      rating,
      comment: comment.trim(),
    });
    setSubmitting(false);
    if (error) {
      setErrors({ comment: error.message });
      return;
    }
    setDone(true);
  }

  return (
    <Card className="relative w-full max-w-lg overflow-hidden p-8 sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-indigo-600/5" />
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={{ scale: 0.96, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative space-y-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.05 }}
              className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400 ring-1 ring-emerald-500/30"
            >
              ✓
            </motion.div>
            <h2 className="text-xl font-semibold text-zinc-100">Thank you</h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              Your feedback was submitted. We read every message and use it to improve what we
              ship next.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => {
                setDone(false);
                setName("");
                setEmail("");
                setRating(0);
                setComment("");
                setErrors({});
              }}
            >
              Submit another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            exit={{ y: -8 }}
            transition={{ duration: 0.35 }}
            onSubmit={onSubmit}
            className="relative space-y-6"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                Share your feedback
              </h1>
              <p className="text-sm text-zinc-400">
                Tell us what worked, what didn&apos;t, and what we should build next.
              </p>
            </div>

            <Input
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="Jane Doe"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="you@company.com"
            />

            <StarRating value={rating} onChange={setRating} error={errors.rating} />

            <Textarea
              label="Comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              error={errors.comment}
              placeholder="Your honest thoughts…"
            />

            {configError ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                {configError}
              </p>
            ) : null}
            <Button
              type="submit"
              className="w-full py-3 text-base"
              loading={submitting}
              disabled={!supabase || Boolean(configError)}
            >
              Send feedback
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}
