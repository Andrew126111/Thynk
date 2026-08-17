import type { Transcript } from "./transcription";

export type PracticeStage =
  | "challenge"
  | "research"
  | "presentation"
  | "feedback";

export interface PracticeSessionData {
  topic: string;
  notes: string;
  transcript: Transcript | null;
}