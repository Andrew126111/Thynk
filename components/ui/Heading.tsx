import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Heading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h1 className={cn("text-heading", className)}>{children}</h1>;
}