"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Body } from "@/components/ui/Body";
import { Caption } from "@/components/ui/Caption";
import { Heading } from "@/components/ui/Heading";
import { Subheading } from "@/components/ui/Subheading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useCountdown } from "@/hooks/useCountdown";
import { challengeMock } from "@/lib/practice";
import { formatMMSS } from "@/utils/format";

type PresentationMode = "ready" | "presenting" | "confirming";

type PresentationStageProps = {
  topic: string;
  notes: string;
  onComplete: (recording: Blob | null) => void;
};

export function PresentationStage({
  topic,
  notes,
  onComplete,
}: PresentationStageProps) {
  const [mode, setMode] = useState<PresentationMode>("ready");
  const { remainingSeconds, isComplete, start } = useCountdown(
    challengeMock.presentationDurationSeconds
  );
  const { isRecording, error, startRecording, stopRecording } =
    useAudioRecorder();
  const completedRef = useRef(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const finishRecording = useCallback(async () => {
    const recording = await stopRecording();
    onComplete(recording);
  }, [onComplete, stopRecording]);

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      void finishRecording();
    }
  }, [isComplete, finishRecording]);

  useEffect(() => {
    if (error) {
      startButtonRef.current?.focus();
    }
  }, [error]);

  const finish = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      void finishRecording();
    }
  };

  const beginPresentation = async () => {
    const started = await startRecording();
    if (!started) return;
    setMode("presenting");
    start();
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        {mode === "ready" ? "Presentation" : "Presenting"}
      </p>

      <Heading>
        {mode === "ready" ? "You&rsquo;re ready to present." : "Present your answer."}
      </Heading>

      <div className="flex flex-col items-center gap-2">
        {mode === "presenting" && isRecording && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1"
          >
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full bg-destructive"
            />
            <Caption className="font-medium text-destructive">
              Recording
            </Caption>
          </div>
        )}
        <p className="text-small font-medium tracking-widest text-muted-foreground uppercase">
          {mode === "ready" ? "Maximum Time" : "Remaining Time"}
        </p>
        <p
          role="timer"
          aria-label="Presentation time remaining"
          className="text-display tabular-nums"
        >
          {formatMMSS(remainingSeconds)}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="w-full max-w-md rounded-lg border border-warning/50 bg-warning/10 p-4"
        >
          <Body className="text-foreground">
            We couldn&rsquo;t access your microphone. Please check your browser
            permissions and try again.
          </Body>
        </div>
      )}

      <Card className="w-full text-left">
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Subheading>Your Research Notes</Subheading>
          {notes.trim().length > 0 ? (
            <Body className="text-muted-foreground whitespace-pre-wrap">{notes}</Body>
          ) : (
            <Body className="text-muted-foreground">No notes yet.</Body>
          )}
        </CardContent>
      </Card>

      {mode === "ready" && (
        <Button
          ref={startButtonRef}
          size="lg"
          className="mt-2"
          onClick={beginPresentation}
        >
          Start Presentation
        </Button>
      )}

      {mode === "presenting" && (
        <Button
          variant="secondary"
          size="lg"
          className="mt-2"
          onClick={() => setMode("confirming")}
        >
          Finish Presentation
        </Button>
      )}

      {mode === "confirming" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Finish presentation confirmation"
          className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border bg-card p-6"
        >
          <Subheading>Are you finished presenting?</Subheading>
          <Body className="text-muted-foreground">
            Your presentation will be submitted for analysis.
          </Body>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => setMode("presenting")}>
              Continue Presenting
            </Button>
            <Button variant="destructive" onClick={finish}>
              Finish Presentation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}