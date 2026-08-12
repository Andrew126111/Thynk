"use client";

import { useEffect, useRef } from "react";

import { Body } from "@/components/ui/Body";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCountdown } from "@/hooks/useCountdown";
import { challengeMock } from "@/lib/practice";
import { formatMMSS } from "@/utils/format";

export function ResearchStage({
  onTransition,
}: {
  onTransition?: () => void;
}) {
  const duration = challengeMock.researchDurationSeconds;
  const { remainingSeconds, isComplete, start } = useCountdown(duration);
  const completedRef = useRef(false);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onTransition?.();
    }
  }, [isComplete, onTransition]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Research
      </p>
      <Heading>Research your topic.</Heading>
      <div className="flex flex-col items-center gap-2">
        <p className="text-small font-medium tracking-widest text-muted-foreground uppercase">
          Research Time
        </p>
        <p
          role="timer"
          aria-label="Research time remaining"
          className="text-display tabular-nums"
        >
          {formatMMSS(remainingSeconds)}
        </p>
      </div>
      <Body className="max-w-2xl text-muted-foreground">
        You have a limited amount of time to prepare your thoughts. Research
        manually and prepare your presentation.
      </Body>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{challengeMock.topic}</CardTitle>
          <CardDescription>{challengeMock.researchRestriction}</CardDescription>
        </CardHeader>
      </Card>
      <Button size="lg" className="mt-2" onClick={onTransition}>
        I&rsquo;m Ready
      </Button>
    </div>
  );
}