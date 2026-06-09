# CONTRACTS — Phase 1: Planner Agent

## 1. Inputs
- `runs/run-XXX/input/goal.md`
- `runs/run-XXX/state.json` (`interview_decisions`)

## 2. Outputs
- **`runs/run-XXX/artifacts/task.md`**: Markdown document that MUST contain these sections:
  ```markdown
  # Goal
  # Requirements (Functional Requirements)
  # Constraints (Technical Constraints)
  # Edge Cases (Edge Cases and Destructive Flows)
  # Deliverables (Expected Deliverables)
  # Acceptance Criteria
  ```
- **`runs/run-XXX/artifacts/planning_summary.md`**: Planning synthesis document, mandatory so that the Architect and the Builder have sufficient strategic context. It must contain the following sections:
  ```markdown
  # Planning Summary
  # Scope Boundaries (What is in and out of scope for this run)
  # Risk Assumptions (Assumptions that may invalidate the plan)
  # Test Strategy (Which behaviors will be tested and how)
  ```

  The `Test Strategy` section is especially critical: it defines — before the Builder starts — which behaviors will be covered by tests, making coverage a scope commitment rather than a late decision by the Builder.
