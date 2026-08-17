import { mockTranscriptionService } from "./mock";
import type { TranscriptionService } from "./service";

export type { TranscriptionService } from "./service";
export { TranscriptionError, type TranscriptionErrorCode } from "./errors";

export const transcriptionService: TranscriptionService =
  mockTranscriptionService;