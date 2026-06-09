# CONTRACTS — Phase 4: Validator Stage

## 1. Inputs
- `runs/run-XXX/artifacts/build_report.md`
- Generated code files in the repository.

## 2. Outputs
- **`runs/run-XXX/artifacts/validation_report.md`**: Document that MUST contain these sections:
  ```markdown
  # Summary (Overall success or failure status)
  # Commands Executed (Which commands were run)
  # Results (Success logs and outputs - MUST contain the actual stdout from the terminal)
  # Failures (Error logs and outputs / broken tests - MUST contain the actual stdout from the terminal)
  # Skipped Checks (What was bypassed and the reason)
  ```
