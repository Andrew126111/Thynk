import type { Metadata } from "next";

import { PageLayout } from "@/components/layout/PageLayout";
import { PracticeSession } from "@/components/practice/PracticeSession";

export const metadata: Metadata = {
  title: "Practice Session — Thynk",
  description: "Focused communication practice with AI-powered feedback.",
};

export default function PracticePage() {
  return (
    <PageLayout>
      <PracticeSession />
    </PageLayout>
  );
}