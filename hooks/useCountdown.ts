import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(durationSeconds: number) {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (durationSeconds <= 0) {
      clearTimer();
      endTimeRef.current = null;
      setRemainingSeconds(0);
      setIsRunning(false);
      setIsComplete(true);
      return;
    }

    clearTimer();
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setIsRunning(true);
    setIsComplete(false);
    intervalRef.current = setInterval(() => {
      const endTime = endTimeRef.current;
      if (endTime === null) return;

      const elapsedMs = endTime - Date.now();
      setRemainingSeconds(Math.max(0, Math.round(elapsedMs / 1000)));

      if (elapsedMs <= 0) {
        clearTimer();
        setIsRunning(false);
        setIsComplete(true);
      }
    }, 1000);
  }, [clearTimer, durationSeconds]);

  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    endTimeRef.current = null;
    setRemainingSeconds(durationSeconds);
    setIsRunning(false);
    setIsComplete(false);
  }, [clearTimer, durationSeconds]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    remainingSeconds,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
  };
}