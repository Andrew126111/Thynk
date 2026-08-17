import { Body } from "@/components/ui/Body";
import { Heading } from "@/components/ui/Heading";

export function FeedbackStage({
  recording,
}: {
  recording: Blob | null;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Feedback
      </p>
      <Heading>Presentation complete.</Heading>
      {recording ? (
        <Body className="max-w-2xl text-muted-foreground">
          Your recording is ready for the next processing step.
        </Body>
      ) : (
        <Body className="max-w-2xl text-muted-foreground">
          No recording was captured.
        </Body>
      )}
    </div>
  );
}