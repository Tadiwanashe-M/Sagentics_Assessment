import { PublicFeedbackForm } from "@/components/feedback/PublicFeedbackForm";
import { PublicNav } from "@/components/layout/PublicNav";

export const metadata = {
  title: "Feedback",
};

export default function FeedbackPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center px-4 py-28 sm:py-32">
      <PublicNav />
      <PublicFeedbackForm />
    </div>
  );
}
