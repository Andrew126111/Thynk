"use client";

import { useState } from "react";

import { FadeIn } from "@/components/ui/FadeIn";
import type { PracticeStage } from "@/types/practice";
import { ChallengeStage } from "./ChallengeStage";
import { PresentationStage } from "./PresentationStage";
import { ResearchStage } from "./ResearchStage";

export function PracticeSession() {
  const [stage, setStage] = useState<PracticeStage>("challenge");

  return (
    <FadeIn key={stage}>
      {stage === "challenge" ? (
        <ChallengeStage onStartResearch={() => setStage("research")} />
      ) : stage === "research" ? (
        <ResearchStage onTransition={() => setStage("presentation")} />
      ) : (
        <PresentationStage />
      )}
    </FadeIn>
  );
}