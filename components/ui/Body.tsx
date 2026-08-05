import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Body({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("text-body", className)}>{children}</p>;
}