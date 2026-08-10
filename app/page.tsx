import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Body } from "@/components/ui/Body";
import { Heading } from "@/components/ui/Heading";
import { Subheading } from "@/components/ui/Subheading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Thynk — Communication Coaching",
  description:
    "Train your mind and master your communication with AI-powered practice.",
};

const valueProps = [
  {
    title: "Think Faster",
    description:
      "Practice researching unfamiliar topics under time pressure.",
  },
  {
    title: "Speak Better",
    description: "Present your ideas clearly and confidently.",
  },
  {
    title: "Improve Continuously",
    description: "Receive personalized AI feedback after every session.",
  },
];

const steps = [
  {
    number: "1",
    title: "Receive a challenge",
    description: "Get a real-world topic handed to you on the spot.",
  },
  {
    number: "2",
    title: "Research the topic without AI",
    description: "Build knowledge with your own effort and speed.",
  },
  {
    number: "3",
    title: "Present your findings",
    description: "Deliver a clear, confident, structured answer.",
  },
  {
    number: "4",
    title: "Receive AI-powered feedback",
    description: "Learn exactly where you shine and how to improve.",
  },
];

export default function Home() {
  return (
    <PageLayout>
      <Section>
        <Container className="flex flex-col items-center gap-4 text-center">
          <p className="text-small font-medium tracking-widest text-primary uppercase">
            Communication Training
          </p>
          <Heading className="text-display">
            Train your mind.
            <br />
            Master your communication.
          </Heading>
          <Body className="max-w-2xl text-muted-foreground">
            Thynk helps you practice thinking on the spot, researching quickly,
            and communicating clearly with AI-powered feedback.
          </Body>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button>Start Practicing</Button>
            <Button variant="outline">See How It Works</Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col items-center gap-4 text-center">
          <Subheading>Why Thynk</Subheading>
          <Body className="max-w-2xl text-muted-foreground">
            Three ways Thynk helps you communicate with confidence.
          </Body>
        </Container>
        <Container className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col items-center gap-4 text-center">
          <Subheading>How It Works</Subheading>
          <Body className="max-w-2xl text-muted-foreground">
            Four steps from challenge to feedback.
          </Body>
        </Container>
        <Container className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.number}>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {step.number}
                    </span>
                    {step.title}
                  </span>
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col items-center gap-4 text-center">
          <Subheading className="text-heading">
            Ready to improve how you communicate?
          </Subheading>
          <Body className="max-w-2xl text-muted-foreground">
            Practice a little today. Speak a little better tomorrow.
          </Body>
          <div className="mt-4">
            <Button>Start Practicing</Button>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}