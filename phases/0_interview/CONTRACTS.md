# CONTRACTS — Phase 0: Interview and Alignment

## 1. Inputs
- Description of the user's intent in chat (`orchestrate: <goal>` or `plan: <goal>`).
- Questions asked by the agent and responses provided by the user.

## 2. Outputs
- **`runs/run-XXX/input/goal.md`**: File consolidating the general goal, the decisions made, and ending with a binary scope table (`✅ IN SCOPE` / `❌ OUT OF SCOPE`) detailing each desired feature, including keyboard shortcuts specified individually with their corresponding keys.
- **`runs/run-XXX/state.json`**: Update of the `"interview_decisions"` field with the decisions (language, technology stack: `technology_stack`, scope, acceptance, integrations, constraints, and the expanded fields: `destructive_operations_strategy`, `storage_strategy`, `accessibility_level`, `max_lines_per_file`, `primary_language`, `typography_strategy`, `keyboard_shortcuts`).
