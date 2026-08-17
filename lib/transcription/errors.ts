export type TranscriptionErrorCode =
  | "provider-unavailable"
  | "unsupported-audio"
  | "upload-failed"
  | "transcription-failed"
  | "timeout";

export class TranscriptionError extends Error {
  readonly code: TranscriptionErrorCode;

  constructor(code: TranscriptionErrorCode, message: string) {
    super(message);
    this.name = "TranscriptionError";
    this.code = code;
  }
}