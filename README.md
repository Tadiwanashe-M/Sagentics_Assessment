# Sagentics_Assessment

Client feedback dashboard built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase (auth + Postgres), and Framer Motion.

## Setup

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project (Settings → API).
2. Run `npm install`, then `npm run dev`.
3. In the Supabase SQL editor, run `supabase/schema.sql` to create the `feedback` table and RLS policies.

## Deploy

Deploy on [Vercel](https://vercel.com) and add the same `NEXT_PUBLIC_*` environment variables. Do not commit `.env.local`.
