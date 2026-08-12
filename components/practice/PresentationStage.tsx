"use client";

import { useEffect, useRef, useState } from "react";

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
import { useCountdown } from "@/hooks/useCountdown";
import { challengeMock } from "@/lib/practice";
import { formatMMSS } from "@/utils/format";

type PresentationMode = "ready" | "presenting" | "confirming";

export function PresentationStage({
  notes,
  onComplete,
}: {
  notes: string;
  onComplete?: () => void;
}) {
  const [mode, setMode] = useState<PresentationMode>("ready");
  const { remainingSeconds, isComplete, start } = useCountdown(
    challengeMock.presentationDurationSeconds
  );
  const completedRef = useRef(false);

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  const finish = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  };

  const beginPresentation = () => {
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

      <Card className="w-full text-left">
        <CardHeader>
          <CardTitle>{challengeMock.topic}</CardTitle>
        </CardHeader>
        <CardContent>
          {notes.trim().length > 0 ? (
            <Body className="text-muted-foreground">{notes}</Body>
          ) : (
            <Body className="text-muted-foreground">No notes yet.</Body>
          )}
        </CardContent>
      </Card>

      {mode === "presenting" && (
        <Caption>Microphone input will be connected here.</Caption>
      )}

      {mode === "ready" && (
        <Button size="lg" className="mt-2" onClick={beginPresentation}>
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