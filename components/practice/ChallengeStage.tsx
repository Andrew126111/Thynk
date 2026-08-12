import { Caption } from "@/components/ui/Caption";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { challengeMock } from "@/lib/practice";

const challengeInfo = [
  { label: "Research Time", value: challengeMock.researchTime },
  { label: "Presentation Time", value: challengeMock.presentationTime },
  { label: "Research Restriction", value: challengeMock.researchRestriction },
];

export function ChallengeStage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-small font-medium tracking-widest text-primary uppercase">
        Today&rsquo;s Challenge
      </p>
      <Heading>{challengeMock.topic}</Heading>
      <Caption>
        Placeholder challenge — sample data until live topics are available.
      </Caption>
      <div className="mt-4 grid w-full gap-4 sm:grid-cols-3">
        {challengeInfo.map((info) => (
          <Card key={info.label}>
            <CardHeader>
              <CardTitle>{info.value}</CardTitle>
              <CardDescription>{info.label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Button size="lg" className="mt-2">
        Start Research
      </Button>
    </div>
  );
}