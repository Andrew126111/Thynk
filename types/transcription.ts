export interface Transcript {
  text: string;
}

export type TranscriptionStatus = "idle" | "processing" | "complete" | "error";