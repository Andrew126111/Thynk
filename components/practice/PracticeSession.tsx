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
  const [sessionData, setSessionData] = useState<PracticeSessionData>({
    notes: "",
  });

  const updateNotes = (notes: string) => {
    setSessionData({ ...sessionData, notes });
  };

  return (
    <FadeIn key={stage}>
      {stage === "challenge" ? (
        <ChallengeStage onStartResearch={() => setStage("research")} />
      ) : stage === "research" ? (
        <ResearchStage
          notes={sessionData.notes}
          onNotesChange={updateNotes}
          onTransition={() => setStage("presentation")}
        />
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