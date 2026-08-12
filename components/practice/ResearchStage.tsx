import { Body } from "@/components/ui/Body";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { challengeMock } from "@/lib/practice";

export function ResearchStage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Research
      </p>
      <Heading>Research your topic.</Heading>
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
      <Button size="lg" className="mt-2">
        Begin Presentation
      </Button>
    </div>
  );
}