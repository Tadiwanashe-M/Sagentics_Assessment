import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/auth/LoginForm";
import { PublicNav } from "@/components/layout/PublicNav";

export const metadata = {
  title: "Sign in",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center px-4 py-28 sm:py-32">
      <PublicNav />
      <LoginForm />
    </div>
  );
}
