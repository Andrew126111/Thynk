export const motion = {
  duration: 450,
  easing: "outCubic",
  staggerDelay: 60,
  entranceOffset: 10,
  revealThreshold: 0.2,
} as const;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}