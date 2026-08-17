"use client";

import { useCallback, useRef, useState } from "react";

import { FadeIn } from "@/components/ui/FadeIn";
import { challengeMock } from "@/lib/practice";
import { transcriptionService } from "@/lib/transcription";
import type { PracticeSessionData, PracticeStage } from "@/types/practice";
import type { TranscriptionStatus } from "@/types/transcription";
import { ChallengeStage } from "./ChallengeStage";
import { FeedbackStage } from "./FeedbackStage";
import { PresentationStage } from "./PresentationStage";
import { ResearchStage } from "./ResearchStage";

export function PracticeSession() {
  const [stage, setStage] = useState<PracticeStage>("challenge");
  const [sessionData, setSessionData] = useState<PracticeSessionData>({
    topic: challengeMock.topic,
    notes: "",
    transcript: null,
  });
  const [recording, setRecording] = useState<Blob | null>(null);
  const [transcriptionStatus, setTranscriptionStatus] =
    useState<TranscriptionStatus>("idle");
  const transcriptionStartedRef = useRef(false);

  const updateNotes = (notes: string) => {
    setSessionData((prev) => ({ ...prev, notes }));
  };

  const runTranscription = useCallback(async (audioBlob: Blob) => {
    setTranscriptionStatus("processing");
    try {
      const transcript = await transcriptionService.transcribe(audioBlob);
      setSessionData((prev) => ({ ...prev, transcript }));
      setTranscriptionStatus("complete");
    } catch {
      setTranscriptionStatus("error");
    }
  }, []);

  const handlePresentationComplete = useCallback(
    (audioBlob: Blob | null) => {
      setRecording(audioBlob);
      setStage("feedback");

      if (transcriptionStartedRef.current) return;
      transcriptionStartedRef.current = true;

      if (!audioBlob || audioBlob.size === 0) {
        setTranscriptionStatus("error");
        return;
      }

      void runTranscription(audioBlob);
    },
    [runTranscription]
  );

  const retryTranscription = useCallback(() => {
    if (!recording) {
      setTranscriptionStatus("error");
      return;
    }
    void runTranscription(recording);
  }, [recording, runTranscription]);

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
          onComplete={handlePresentationComplete}
        />
      ) : (
        <FeedbackStage
          status={transcriptionStatus}
          transcript={sessionData.transcript}
          onRetry={retryTranscription}
        />
      )}
    </FadeIn>
  );
}