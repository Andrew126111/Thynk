import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Caption({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-caption text-muted-foreground", className)}>
      {children}
    </span>
  );
}