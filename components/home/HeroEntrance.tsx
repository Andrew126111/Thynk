"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef, type ReactNode } from "react";

import { motion, prefersReducedMotion } from "@/lib/animation";

export function HeroEntrance({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const targets = root.querySelectorAll("[data-entrance]");
    if (targets.length === 0) return;

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [motion.entranceOffset, 0],
      duration: motion.duration,
      ease: motion.easing,
      delay: stagger(motion.staggerDelay),
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}