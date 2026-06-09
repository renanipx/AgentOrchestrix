# CONTRACTS — Phase 3: Builder Agent

## 1. Inputs
- `runs/run-XXX/artifacts/task.md`
- `runs/run-XXX/artifacts/architecture.md`

## 2. Outputs
- Functional source code in the repository (`runs/run-XXX/generated/` or as planned).
- **`runs/run-XXX/artifacts/build_report.md`**: Document that MUST contain these sections:
  ```markdown
  # Summary (Summary of what was built)
  # Files Written (List of new files created)
  # Files Modified (List of modified files, if any)
  # Tests Added (Automated tests created)
  # Validation Commands (Deterministic commands to run tests/validations)
  # Known Limitations
  ```
