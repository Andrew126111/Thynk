import { Body } from "@/components/ui/Body";
import { Caption } from "@/components/ui/Caption";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Transcript, TranscriptionStatus } from "@/types/transcription";

export function FeedbackStage({
  status,
  transcript,
  onRetry,
}: {
  status: TranscriptionStatus;
  transcript: Transcript | null;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Feedback
      </p>

      {status === "processing" && (
        <>
          <Heading>Presentation complete.</Heading>
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="size-3 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground motion-reduce:animate-none"
            />
            <Body className="text-muted-foreground">
              Analyzing your presentation...
            </Body>
          </div>
          <Caption>Development build: transcription is simulated.</Caption>
        </>
      )}

      {status === "complete" && (
        <>
          <Heading>Transcript ready.</Heading>
          <Body className="max-w-2xl text-muted-foreground">
            Your presentation transcript has been prepared.
          </Body>
          {transcript && (
            <Card className="w-full text-left">
              <CardHeader>
                <CardTitle>Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <Body className="whitespace-pre-wrap">{transcript.text}</Body>
              </CardContent>
            </Card>
          )}
          <Caption>Development build: mock transcript shown.</Caption>
        </>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="flex flex-col items-center gap-6"
        >
          <Heading>Presentation complete.</Heading>
          <Body className="max-w-2xl text-foreground">
            We couldn&rsquo;t process your presentation. Please try again.
          </Body>
          <Caption>Development build: transcription is simulated.</Caption>
          <Button size="lg" variant="secondary" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}

      {status === "idle" && (
        <>
          <Heading>Presentation complete.</Heading>
          <Body className="max-w-2xl text-muted-foreground">
            No presentation was submitted for processing.
          </Body>
        </>
      )}
    </div>
  );
}