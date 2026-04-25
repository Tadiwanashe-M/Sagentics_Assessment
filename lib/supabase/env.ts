/**
 * Returns trimmed URL/key only when they look usable by the Supabase client.
 * Avoids middleware / server crashes from placeholders or malformed .env values.
 */
export function getSupabaseEnv(): { url: string; key: string } | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!rawUrl || !rawKey) return null;

  try {
    const u = new URL(rawUrl);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (!u.hostname) return null;
  } catch {
    return null;
  }

  // Copy-paste from docs often leaves this hostname; it is not a real project.
  if (rawUrl.includes("your-project-ref.supabase.co")) return null;

  return { url: rawUrl, key: rawKey };
}
