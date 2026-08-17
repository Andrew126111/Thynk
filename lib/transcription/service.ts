import type { Transcript } from "@/types/transcription";

export interface TranscriptionService {
  transcribe(audio: Blob): Promise<Transcript>;
}