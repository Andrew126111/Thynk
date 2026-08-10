"use client";

import { animate } from "animejs";
import { useEffect, useRef, type ReactNode } from "react";

import { motion, prefersReducedMotion } from "@/lib/animation";

export function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const targets = Array.from(root.children);
    if (targets.length === 0) return;

    const animations = new Set<ReturnType<typeof animate>>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.intersectionRatio < motion.revealThreshold) continue;

          observer.unobserve(entry.target);

          const animation = animate(entry.target, {
            opacity: [0, 1],
            translateY: [motion.entranceOffset, 0],
            duration: motion.duration,
            ease: motion.easing,
          });
          animations.add(animation);
          animation.then(() => {
            animations.delete(animation);
            animation.revert();
          });
        }
      },
      { threshold: motion.revealThreshold }
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}