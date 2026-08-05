import Link from "next/link";

import { Container } from "./Container";

const navLinks = ["Home", "Coaching", "Insights", "Settings"];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <span className="font-heading text-lg font-medium tracking-tight">
          Thynk
        </span>
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((label) => (
            <Link
              key={label}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          T
        </div>
      </Container>
    </header>
  );
}