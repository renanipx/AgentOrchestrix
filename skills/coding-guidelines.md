---
name: coding-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, modifying, or reviewing code — implementation tasks, code changes, refactoring, bug fixes, or feature development. Do NOT use for architecture design, documentation, or non-code tasks.
metadata:
  author: ale
  version: '1.0.0'
  source: 'Karpathy Guidelines'
---

# Coding Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. These principles bias toward caution over speed—for trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them—don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- Disagree honestly. If the user's approach seems wrong, say so—don't be sycophantic.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it—don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Minimum Testability Requirement

**Tangible proof beats "looks like it works".**

For any software development run, you MUST create at least one smoke test file or simple integration test using native or suggested tools from the project ecosystem (e.g., Vitest for React Vite, Jest for Vanilla, XUnit for .NET).
Never trust static analysis or visual builds alone when critical functionality can be validated with a simple test script.

## 6. Language & Typing Technical Practices (TS/JS)

- **Strict Typing (TypeScript):** The use of forced casting to `as any` in `.ts` or `.tsx` files is expressely prohibited. You must use explicit types, union types (e.g., `as Category | 'all'`), or controlled assertions with guards (`if (isType(value))`) to maintain compiler safety.
- **Unique and Secure Identifiers:** For generating primary keys and entity IDs on the client (e.g., task IDs, columns), do not use simple timestamps or generators based on simple probability like `Date.now()` or `Math.random()`. You must use cryptographically secure APIs like `crypto.randomUUID()` (supported by modern browsers and Node.js) or the stack's recommended library (e.g., `uuid`).
  - **Seed/Initial Data:** Even IDs of pre-populated data (seed data, default initial state) must use the same generation format as IDs created at runtime, to avoid format inconsistency and collision during imports.
- **Input Limits (maxLength):** Every textual input field (such as `<input type="text">` or `<textarea>`) must have the `maxLength` property declared with reasonable limits according to the business rule (e.g., 100 characters for titles, 1000-2000 for descriptions). This prevents visual buffer overflows and protects the data parser.

## 7. Action Feedback
- **Prohibition of Silent Actions:** Every action triggered by the user (click, keyboard shortcut, submit) MUST produce observable feedback (visual, toast, focus, or state change). If the action cannot be executed in the current state (e.g., shortcut to focus a non-existent element), the system MUST display explanatory feedback (e.g., informative toast), rather than failing silently.

