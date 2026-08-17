"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AudioRecorderError =
  | "permission-denied"
  | "unsupported"
  | "start-failed";

type UseAudioRecorderResult = {
  isRecording: boolean;
  audioBlob: Blob | null;
  error: AudioRecorderError | null;
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
};

const PREFERRED_AUDIO_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

function getSupportedMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return PREFERRED_AUDIO_MIME_TYPES.find((type) =>
    MediaRecorder.isTypeSupported(type)
  );
}

export function useAudioRecorder(): UseAudioRecorderResult {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<AudioRecorderError | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const mimeTypeRef = useRef("audio/webm");
  const chunksRef = useRef<Blob[]>([]);
  const stopResolveRef = useRef<((blob: Blob | null) => void) | null>(null);

  const releaseTracks = useCallback(() => {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    streamRef.current = null;
  }, []);

  const finishStop = useCallback(() => {
    const chunks = chunksRef.current;
    chunksRef.current = [];
    const blob = new Blob(chunks, { type: mimeTypeRef.current });

    recorderRef.current = null;
    releaseTracks();
    setIsRecording(false);
    setAudioBlob(blob);

    const resolve = stopResolveRef.current;
    stopResolveRef.current = null;
    resolve?.(blob);
  }, [releaseTracks]);

  const startRecording = useCallback(async (): Promise<boolean> => {
    setError(null);

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setError("unsupported");
      return false;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const denied =
        err instanceof DOMException &&
        (err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError" ||
          err.name === "SecurityError");
      setError(denied ? "permission-denied" : "start-failed");
      return false;
    }

    const mimeType = getSupportedMimeType();
    let recorder: MediaRecorder;
    try {
      recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
    } catch {
      stream.getTracks().forEach((track) => track.stop());
      setError("start-failed");
      return false;
    }

    streamRef.current = stream;
    recorderRef.current = recorder;
    mimeTypeRef.current = recorder.mimeType || mimeType || "audio/webm";
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      finishStop();
    };

    recorder.onerror = () => {
      setIsRecording(false);
      setError("start-failed");
      recorderRef.current = null;
      chunksRef.current = [];
      releaseTracks();
      const resolve = stopResolveRef.current;
      stopResolveRef.current = null;
      resolve?.(null);
    };

    recorder.start();
    setAudioBlob(null);
    setIsRecording(true);
    return true;
  }, [finishStop, releaseTracks]);

  const stopRecording = useCallback((): Promise<Blob | null> => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      return Promise.resolve(null);
    }
    return new Promise<Blob | null>((resolve) => {
      stopResolveRef.current = resolve;
      recorder.stop();
    });
  }, []);

  useEffect(() => {
    return () => {
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      streamRef.current = null;
      recorderRef.current = null;
    };
  }, []);

  return {
    isRecording,
    audioBlob,
    error,
    startRecording,
    stopRecording,
  };
}