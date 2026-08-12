"use client";

import { useState } from "react";

import { FadeIn } from "@/components/ui/FadeIn";
import type { PracticeSessionData, PracticeStage } from "@/types/practice";
import { ChallengeStage } from "./ChallengeStage";
import { FeedbackStage } from "./FeedbackStage";
import { PresentationStage } from "./PresentationStage";
import { ResearchStage } from "./ResearchStage";

export function PracticeSession() {
  const [stage, setStage] = useState<PracticeStage>("challenge");
  const [sessionData] = useState<PracticeSessionData>({ notes: "" });

  return (
    <FadeIn key={stage}>
      {stage === "challenge" ? (
        <ChallengeStage onStartResearch={() => setStage("research")} />
      ) : stage === "research" ? (
        <ResearchStage onTransition={() => setStage("presentation")} />
      ) : stage === "presentation" ? (
        <PresentationStage
          notes={sessionData.notes}
          onComplete={() => setStage("feedback")}
        />
      ) : (
        <FeedbackStage />
      )}
    </FadeIn>
  );
}