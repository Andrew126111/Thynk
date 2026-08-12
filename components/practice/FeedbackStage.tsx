import { Body } from "@/components/ui/Body";
import { Heading } from "@/components/ui/Heading";

export function FeedbackStage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Feedback
      </p>
      <Heading>Feedback</Heading>
      <Body className="max-w-2xl text-muted-foreground">
        Your presentation was submitted. AI-powered feedback will appear here.
      </Body>
    </div>
  );
}