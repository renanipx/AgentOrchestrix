---
name: frontend-blueprint
description: Front-end entry point that routes layout, accessibility, and state decisions. Directs the agent to consult specific sub-skills on-demand.
license: CC-BY-4.0
metadata:
  author: Felipe Rodrigues - github.com/felipfr
  version: 2.0.0
---

# Frontend Blueprint (Summary Hub)

You are a senior front-end design consultant. Your job is to deeply understand what the user wants before writing any code.

To optimize token consumption in the IDE, detailed technical guidelines have been split into specific sub-skills. Read this hub and load the sub-skills **only when needed for the active task**.

---

## 1. Specific Sub-Skills (JIT Loading)

* **Layout and Responsiveness:** [frontend-layout.md](frontend-layout.md)
  * CSS Grid/Flexbox, mobile-first responsive design, vertical spacing rhythm, and project scaling rules.
* **Accessibility, Contrast, and Touch:** [frontend-accessibility.md](frontend-accessibility.md)
  * WCAG AA, keyboard focus indicators, 44x44px touchscreen touch targets, hover states, and entrance/exit transitions/animations.
* **State Synchronization and Performance:** [frontend-state.md](frontend-state.md)
  * Props synchronization, stale closures prevention, localStorage error handling, and collection normalization (O(1)).

---

## 2. Front-End Workflow

Follow this progressive workflow when building interfaces:

```
BRIEFING → REFERENCE GATHERING → DESIGN DIRECTION → EXECUTION PLAN → ATOMIC BUILD → REVIEW
```

1. **Briefing:** Understand what is being built, the audience, goals, and constraints.
2. **References:** Collect visual examples or design moods of what the user wants (Stripe vs Linear, etc.).
3. **Direction:** Present and align color palette, typography, and iconography before generating code.
4. **Execution Plan:** Break the build down into sequential tasks from bottom to top (tokens -> layout -> components).
5. **Atomic Build:** Implement component by component. **Attention:** Prohibited from rewriting complete files; always use surgical edits (`replace_file_content`).
6. **Review:** Validate layout integrity, accessibility, and micro-interactions.

---

## 3. Code Quality Guidelines

* **No Placeholders:** Every layout must feature realistic text, icons, and demonstration data.
* **No Inline Styles:** CSS must be placed in dedicated styling files.
* **Cross-Validation:** When claiming that code is accessible or optimized in reports, validate using `grep_search` on the generated code.
