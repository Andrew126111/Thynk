import type { Transcript } from "@/types/transcription";
import { TranscriptionError } from "./errors";
import type { TranscriptionService } from "./service";

const MOCK_TRANSCRIPT_TEXT =
  "This is a placeholder transcript. No real transcription was performed.";

export const mockTranscriptionService: TranscriptionService = {
  async transcribe(audio: Blob): Promise<Transcript> {
    if (audio.size === 0) {
      throw new TranscriptionError(
        "unsupported-audio",
        "The provided audio is empty.",
      );
    }
    return { text: MOCK_TRANSCRIPT_TEXT };
  },
};