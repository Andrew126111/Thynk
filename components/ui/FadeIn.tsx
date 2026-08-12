"use client";

import { animate } from "animejs";
import { useEffect, useRef, type ReactNode } from "react";

import { motion, prefersReducedMotion } from "@/lib/animation";

export function FadeIn({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const animation = animate(root, {
      opacity: [0, 1],
      translateY: [motion.entranceOffset, 0],
      duration: motion.duration,
      ease: motion.easing,
    });

    return () => {
      animation.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}