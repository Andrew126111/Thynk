"use client";

import { useState } from "react";

import { FadeIn } from "@/components/ui/FadeIn";
import { challengeMock } from "@/lib/practice";
import type { PracticeSessionData, PracticeStage } from "@/types/practice";
import { ChallengeStage } from "./ChallengeStage";
import { FeedbackStage } from "./FeedbackStage";
import { PresentationStage } from "./PresentationStage";
import { ResearchStage } from "./ResearchStage";

export function PracticeSession() {
  const [stage, setStage] = useState<PracticeStage>("challenge");
  const [sessionData, setSessionData] = useState<PracticeSessionData>({
    topic: challengeMock.topic,
    notes: "",
  });

  const updateNotes = (notes: string) => {
    setSessionData((prev) => ({ ...prev, notes }));
  };

  return (
    <FadeIn key={stage}>
      {stage === "challenge" ? (
        <ChallengeStage
          topic={sessionData.topic}
          onStartResearch={() => setStage("research")}
        />
      ) : stage === "research" ? (
        <ResearchStage
          topic={sessionData.topic}
          notes={sessionData.notes}
          onNotesChange={updateNotes}
          onTransition={() => setStage("presentation")}
        />
      ) : stage === "presentation" ? (
        <PresentationStage
          topic={sessionData.topic}
          notes={sessionData.notes}
          onComplete={() => setStage("feedback")}
        />
      ) : (
        <FeedbackStage />
      )}
    </FadeIn>
  );
}