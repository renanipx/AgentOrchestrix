# CONTRACTS — Phase 5: Reviewer Agent

## 1. Inputs
- `runs/run-XXX/artifacts/task.md`
- `runs/run-XXX/artifacts/architecture.md`
- `runs/run-XXX/artifacts/build_report.md`
- `runs/run-XXX/artifacts/validation_report.md`
- Implemented source code (in `runs/run-XXX/generated/`).

## 2. Outputs
- **`runs/run-XXX/artifacts/review.md`**: Document that MUST contain these sections:
  ```markdown
  # Verdict (Approved / Rejected / Needs Adjustment)
  # Requirements Coverage (How well the requirements were met)
  # Architecture Alignment (Alignment with the architecture plan)
  # Technical Contracts Status (Detailed PASSED/FAILED status of each technical contract)
  # Risk Mitigation Audit (Audit of risk mitigations mapped during planning)
  # Syntax And Test Check (Static analysis and test execution results)
  # UX Compliance (UX compliance: forms, empty states, error feedback)
  # Performance Review (Memoization, duplicate logic, dependency arrays)
  # Cross-Browser Compatibility
  # Issues (List of identified problems)
  # Recommendation (Recommendations and next steps)
  ```
