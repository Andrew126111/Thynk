import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Subheading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={cn("text-subheading", className)}>{children}</h2>;
}