import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function PageLayout({
  children,
  navbar = <Navbar />,
  footer = <Footer />,
  className,
}: {
  children: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      {navbar}
      <main className="flex flex-1 flex-col py-8 sm:py-12">{children}</main>
      {footer}
    </div>
  );
}