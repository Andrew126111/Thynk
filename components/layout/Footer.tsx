import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="flex h-16 items-center justify-between">
        <span className="text-sm font-medium">Thynk</span>
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Thynk. All rights reserved.
        </span>
      </Container>
    </footer>
  );
}