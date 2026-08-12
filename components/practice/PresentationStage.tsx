import { Body } from "@/components/ui/Body";
import { Heading } from "@/components/ui/Heading";

export function PresentationStage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Presentation
      </p>
      <Heading>Presentation</Heading>
      <Body className="max-w-2xl text-muted-foreground">
        The presentation experience is coming next.
      </Body>
    </div>
  );
}