# AI_RULES.md

This document governs how AI assistants (and humans) work on the Thynk codebase. Read it before making any change. When in conflict with other guidance, this file wins unless the agent rules in `AGENTS.md` say otherwise.

## Coding Standards

- Write TypeScript throughout. Prefer explicit types over `any`. Use strict typing.
- Follow existing code style: tabs/indentation, naming, and quoting must match neighboring files.
- Do not add comments unless asked. Prefer self-documenting code with clear names.
- Use the `@/*` import alias for project files (e.g. `@/components/ui/button`).
- Keep functions small and focused. Extract shared logic rather than duplicating it.
- Run `npm run lint` before finishing any change. Fix warnings and errors.
- Do not commit secrets, environment variables, or API keys.
- Import only what you use. Avoid barrel imports that pull in whole libraries.

## Folder Conventions

- `components/` — reusable, generic UI primitives, organized by type. `components/ui/` holds shadcn components; do not hand-edit shadcn files unless strictly necessary.
- `features/` — feature-scoped modules. Each feature owns its components, logic, and API calls inside its own subfolder.
- `lib/` — framework-tied infrastructure and helpers (e.g. `lib/utils.ts` for `cn()`).
- `hooks/` — custom React hooks with reusable stateful logic.
- `types/` — shared TypeScript types and interfaces (API contracts, domain models).
- `utils/` — pure, framework-agnostic helper functions (formatting, dates, math).
- `docs/` — project documentation. Keep in sync with implementation.
- `app/` — Next.js App Router routes only. Keep pages thin; put logic in `features/` and `lib/`.
- Place new files in the folder that matches their purpose. When in doubt, ask.

## Architecture Principles

- Next.js App Router with Server Components by default. Use `"use client"` only when interactivity or browser APIs require it.
- Follow the project's framework version exactly. This Next.js version has breaking changes — consult `node_modules/next/dist/docs/` before writing Next.js-specific code.
- Keep data fetching in Server Components or route handlers where possible.
- Business logic lives in `features/` or `lib/`, not inside page components.
- Favor small, composable modules over large monolith files.
- Do not add dependencies without justification. Prefer the existing stack (Tailwind v4, shadcn/ui, Base UI).
- Preserve performance: avoid client-side rendering of content that can be rendered on the server.

## UI Principles

- Build on shadcn/ui components and Tailwind CSS utilities. Reuse `components/ui/*` before creating new primitives.
- Use the design tokens from `app/globals.css` (e.g. `bg-background`, `text-foreground`, `--radius`) instead of hard-coded values.
- Match existing visual conventions: spacing, radii, typography, and dark mode behavior.
- Respect accessibility: semantic HTML, keyboard navigation, focus states, and `aria` attributes where needed.
- No new visual design without confirming the intended style.

## How Prompts Should Be Answered

- Understand the intent before acting. If a request is ambiguous, ask a clarifying question first.
- Give a short plan before starting work. Explain what you will do and why.
- Answer directly and concisely. Do not pad responses with unnecessary detail.
- If a request conflicts with these rules, say so and propose the correct approach.

## Rules About Explaining Changes Before Implementing

- For any non-trivial change, explain the approach and the files you will touch before editing.
- State what the change is for, how it fits the architecture, and any trade-offs.
- Wait for confirmation before making significant changes unless the task explicitly authorizes immediate implementation.
- Trivial changes (typos, small fixes) may proceed without a separate explanation.
- After implementing, summarize what changed and how it was verified (e.g. `npm run lint`, `npm run build`).

## Committing

- Commit after every ticket with a concise, conventional message (e.g. `feat:`, `fix:`, `chore:`, `docs:`).
- Push changes only when the user asks or after an explicitly requested commit.
