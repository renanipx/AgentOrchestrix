# CONTRACTS — Phase 2: Architect Agent

## 1. Inputs
- `runs/run-XXX/artifacts/task.md`

## 2. Outputs
- **`runs/run-XXX/artifacts/architecture.md`**: Markdown document that MUST contain these sections:
  ```markdown
  # System Design
  # File Structure (Folder and File Structure)
  # Technologies Used
  # Interfaces (Components / APIs / Screens)
  # Interaction Map (Interaction Map and Accessibility)
  # Data Models (Data Structures / States)
  # Storage Strategy (Limits and Persistence Strategy)
  # Performance Strategy (Memoization, Dependency Arrays, Lazy Loading)
  # Shared Utilities (Shared Utility Functions Catalog)
  # Technical Contracts Checklist (Technical Contracts Checklist per Component)
  # Implementation Plan (Step-by-step Build plan)
  ```
- **`runs/run-XXX/artifacts/planning_summary.md`** (mandatory if the command is `plan:`): Consolidated document containing links and summaries for the artifacts `goal.md` (in `runs/run-XXX/input/goal.md`), `task.md`, and `architecture.md`.
