export type PracticeStage =
  | "challenge"
  | "research"
  | "presentation"
  | "feedback";

export interface PracticeSessionData {
  topic: string;
  notes: string;
}