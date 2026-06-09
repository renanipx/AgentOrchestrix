# HEARTBEAT — Execution Loop and Consistency

This file defines how the IDE must cycle through phases, update the state, and manage execution history.

## 1. Execution Loop (Transitions)
The lifecycle of AgentOrchestrix consists of 7 ordered phases:
`0_interview` -> `1_planner` -> `2_architect` -> `3_builder` -> `4_validator` -> `5_reviewer` -> `6_critic` -> `completed` (or `waiting_for_user`).

The IDE must read and write the `runs/run-XXX/state.json` file to persist progress. At each state change:
1. Complete the deliverables required by the contract of the current phase.
2. Perform the **Consistency Audit** (see Section 2).
3. Modify the `"current_phase"` field to the next phase.
4. Add the previous phase to the `"completed_phases"` list.
5. Update the `"updated_at"` field with the corresponding ISO 8601 timestamp.
6. Record the transition history in the `"phase_history"` array.

```mermaid
flowchart TD
    F0["0_interview"] --> F1["1_planner"]
    F1 --> F2["2_architect"]
    F2 --> F3["3_builder"]
    F3 --> F4["4_validator"]
    F4 --> F5["5_reviewer"]
    F5 --> F6["6_critic"]
    F6 -->|No high risks| DONE["completed"]
    F6 -->|HIGH risk| WAIT["waiting_for_user"]
    WAIT -->|Refactor| F2
    WAIT -->|Complete| DONE
    F4 -->|Failure (Rollback)| F3
    F5 -->|Architecture Failure (Rollback)| F2
    F5 -->|Code Failure (Rollback)| F3
```

### 1.1 Critic Feedback Flow (Phase 6)
If the current phase is `6_critic` and the Critic identifies a risk with **High** severity or complex maintenance concerns (such as strict file limits, coupling, storage), the run MUST assume the status of `waiting_for_user`. The user will have the option to:
1. Complete the run (assume the `completed` state).
2. Return the run to Phase `2_architect` or `3_builder` with a "Refactoring Task based on Critic", allowing a structural polishing cycle before final delivery.

### 1.2 Transition Auto-Validation Protocol
Before modifying the `"current_phase"` field in `state.json`, the agent MUST print a markdown block in the chat containing the following filled checklist:

#### 1.2.1 Transition Behavior in Autonomous Mode (auto_mode)
If the `"auto_mode"` property in `state.json` is `true`, the agent performs the same Auto-Validation Protocol, but the transition is direct:
1. Prints the auto-audit in the chat for logging and auditing purposes only.
2. Updates and saves the `state.json` with `"current_phase": "<Next_Phase>"` to disk.
3. Immediately loads the `RULES.md` and `CONTRACTS.md` of the new phase in the same execution thread.
4. Proceeds with the execution of the new phase continuously, without interrupting or waiting for new instructions/messages from the user in the chat (usually under `/goal` mode).

```markdown
### 🔍 Transition Auto-Audit: [Current_Phase] -> [Next_Phase]
- [ ] Have all output artifacts required by CONTRACTS.md been generated and saved? (List physical paths)
- [ ] Has the state.json file been validated against the JSON Schema in `schemas/state.schema.json` and is it 100% compliant?
- [ ] Have I performed a complete read of the final state.json to ensure valid JSON syntax (no trailing commas, closed quotes)?
- [ ] Has the "completed_phases" array been updated with the phase I am closing?
- [ ] Was the "updated_at" field filled with the current timestamp?
- [ ] Does critic.md contain any risk classified as [HIGH]?
      If YES → status MUST be "waiting_for_user". Transition to "completed" blocked.
      If NO → "completed" status is permitted.
```
*Note: If any check is false, the transition is blocked and the agent must correct the issue before saving `state.json`.*


### 1.3 Recovery/Rollback Mechanism between Phases
If a late validation or verification phase fails, execution may enter a `blocked` or `failed` state. To recover and proceed, the agent must perform a state **rollback**.
The official rollback mapping table is:

| Failure Origin Phase | Cause of Blockage | Rollback Destination Phase | Required Action |
|----------------------|-------------------|----------------------------|-----------------|
| `4_validator`        | Test, style, or lint error | `3_builder` | Builder corrects the code to resolve the reported failure |
| `5_reviewer`         | Clean code violation or duplicated logic | `3_builder` | Builder refactors the code for simplification |
| `5_reviewer`         | Severe folder structure or interface mismatch | `2_architect` | Architect reviews the design and re-aligns with the Builder |
| `6_critic`           | HIGH security, performance, or maintenance risk | `2_architect` or `3_builder` | Adjust the architecture or implement mitigation |

#### Rollback Transition Protocol:
1. Update `"status"` to `"running"`.
2. Set `"current_phase"` to the rollback destination phase.
3. Remove phases after the rollback destination phase from the `"completed_phases"` array.
4. Record the event in `"phase_history"` with `"status": "running"`, the corresponding timestamp, and fill the optional `"rollback_changes"` array detailing each file that requires correction/modification and the respective reason (e.g., `[{"file": "src/components/Card.jsx", "reason": "Lack of sync between local state and props"}]`).

### 1.4 Run Duplication Validation
Before creating a new run, the agent MUST check if the desired `runs/run-XXX/` directory already exists.
- The directory listing must be consulted to determine already occupied run IDs.
- Active or archived run IDs must never be overwritten or reused. The agent must incrementally create the next available run (e.g., `run-002` if `run-001` already exists).

### 1.5 Inheritance Mechanism between Runs
For runs that inherit goals and scopes from previous runs (such as executing Actionable Backlogs from the Critic), the agent MUST:
1. Fill the `"parent_run"` field in `state.json` with the parent run ID (e.g., `"parent_run": "run-001"`).
2. Copy the `"interview_decisions"`, `"prevention_guardrails"`, and `"loaded_skills"` fields from the parent run to the child run as initial data.
3. Omit Phase 0 (Interview) if decisions have not changed, starting directly at Phase `1_planner` or `2_architect` to handle the additional tasks.

### 1.6 Scope Expansion by Domain Inference
When a run's goal describes a recognizable type of system (e.g., management systems, platforms, productivity apps, collaborative tools, marketplaces, or any system whose data model is implicitly rich in the context of the described domain), Phase 0 MUST execute a **Domain Scope Expansion** process before closing the interview:
1. **Infer** the entities, functionalities, and relationships that typically compose this type of system and that the user may not have explicitly mentioned (sub-items, metadata, states, history, permissions, etc.).
2. **Present** this inferred list to the user objectively, asking which ones are IN SCOPE for this run.
3. **Record** the expanded result in the binary scope table of `goal.md` and in the `"scope"` field of `state.json`.
4. **Identify** if the approved scope contains interactions at multiple hierarchical levels (e.g., interactive elements inside other interactive elements), and if so, record in `interview_decisions.complex_interactions` the list of these level pairs to activate corresponding guardrails in subsequent phases.

This process prevents implicit features from being omitted from the initial contract and forces the planning, architecture, and build phases to address the necessary isolation and separation aspects from the beginning.

### 1.7 Memory Anchors
To prevent the Reviewer (Phase 5) and Critic (Phase 6) from reading multiple large markdown files (such as `goal.md`, `task.md`, or `architecture.md`), the agent must populate and update the `"phase_summaries"` property in `state.json` upon completing each phase.
- Each summary must be a maximum of 2 lines.
- The summary should consolidate only critical decisions and phase results.
- In subsequent phases, agents should prioritize reading `"phase_summaries"` instead of re-reading physical documentation files from previous phases.

### 1.8 Conversation Transitions (Multi-Chat Handoffs)
To mitigate the effects of token congestion and role leakage during continuous execution, the AgentOrchestrix protocol implements conversation transitions controlled by handoff files.
- **Recommended Handoff:** At the end of **Phase 2 (Architect)**, before starting the build in Phase 3.
- **Mandatory Handoff:** At the end of **Phase 3 (Builder)**, before the Validator in Phase 4.

#### 1.8.1 Handoff Generation:
When a handoff transition is activated (whether recommended or mandatory):
1. The departing agent MUST create the `runs/run-XXX/artifacts/handoff.md` file and fill the `"handoff"` field under `"artifacts"` in `state.json`.
2. The `handoff.md` file must contain the following basic structure:
   - **Date:** ISO 8601 timestamp of handoff creation.
   - **Origin Phase:** The phase being closed (e.g., `2_architect` or `3_builder`).
   - **Progress Summary:** A short, focused summary of what was completed in the run up to this point.
   - **Critical Files Structure:** Relative paths of relevant architecture or code files.
   - **Next Steps and Pending Actions:** What the next phase must execute as soon as the run is resumed.
3. The run status is changed to `"waiting_for_user"` in `state.json`.
4. The agent finalizes the response by asking the user to open a new clean chat in the IDE and send the command `continue-run: runs/run-XXX`.

#### 1.8.2 Handoff Recovery:
Upon receiving the command `continue-run: runs/run-XXX` in a new chat window:
1. The agent loads `state.json`.
2. The agent reads the `artifacts/handoff.md` file to load the run's essential memory.
3. The agent reads the `RULES.md` and `CONTRACTS.md` of the corresponding `"current_phase"`.
4. The run status is restored to `"running"` with `"auto_mode": true`, and execution proceeds autonomously from the new phase.

---

## 2. Consistency Audit
Before moving to the next phase, the IDE must check whether all files described as outputs in the `CONTRACTS.md` of the current phase have been generated and are not empty.
- If any artifact is missing or inconsistent, the transition **must be aborted**.
- The run status in `state.json` must be changed to `"blocked"` or `"failed"`.
- A descriptive error must be inserted into the `"errors"` array in `state.json`.
- The agent must request user intervention before attempting to proceed.

---

## 3. Run Structure (`runs/`)
All work cycle data for a run is stored in `runs/run-XXX/`:
- `state.json`: State control file.
- `input/`: Directory for initial inputs (e.g., `goal.md`).
- `artifacts/`: Location of phase artifacts (`task.md`, `architecture.md`, etc.).
- `generated/`: Source code, tests, and scaffolds produced by the Builder.
- `logs/`: Tool audit logs.

**Mandatory Logs Directory Initialization:** When creating any new run, the agent MUST create the following structure **before starting Phase 0**:
- `runs/run-XXX/logs/` ← mandatory directory
- `runs/run-XXX/logs/.keep` ← empty file to ensure traceability in version control

**Transitions Logging:** At each phase transition, the agent MUST write the file `runs/run-XXX/logs/transition_<origin_phase>_to_<destination_phase>.log` containing:
```
timestamp: <ISO 8601>
from_phase: <origin_phase>
to_phase:   <destination_phase>
artifacts_checked:
  - <artifact 1 path> → PRESENT / MISSING
  - <artifact 2 path> → PRESENT / MISSING
contracts_checked:
  - <component contract identifier/name> → PASSED | FAILED
consistency_check: PASSED | BLOCKED
blocker_reason: <detailed file-by-file reason and contract checklist if blocked>
```
Missing logs in a run MUST be treated as evidence of a Consistency Check violation by the `validate-run` command.

---

## 4. `state.json` Contract
The JSON file must follow this format:
```json
{
  "run_id": "run-XXX",
  "command": "orchestrate",
  "auto_mode": false,
  "goal": "Goal description",
  "status": "created | waiting_for_user | running | blocked | failed | completed",
  "current_phase": "0_interview",
  "completed_phases": [],
  "protocol_version": "1.0.0",
  "created_at": "YYYY-MM-DDTHH:mm:ssZ",
  "updated_at": "YYYY-MM-DDTHH:mm:ssZ",
  "parent_run": null,
  "phase_history": [],
  "interview_decisions": {
    "language_runtime": null,
    "technology_stack": {
      "frontend": null,
      "backend": null,
      "database": null,
      "styling": null
    },
    "scope": null,
    "acceptance_criteria": null,
    "integrations_data": null,
    "constraints": null,
    "destructive_operations_strategy": null,
    "storage_strategy": null,
    "accessibility_level": null,
    "max_lines_per_file": null,
    "primary_language": null,
    "typography_strategy": null,
    "keyboard_shortcuts": null,
    "environment_decision": null,
    "complex_interactions": null
  },
  "artifacts": {
    "goal": "input/goal.md",
    "task": "artifacts/task.md",
    "architecture": "artifacts/architecture.md",
    "build_report": "artifacts/build_report.md",
    "validation_report": "artifacts/validation_report.md",
    "review": "artifacts/review.md",
    "critic": "artifacts/critic.md",
    "planning_summary": "artifacts/planning_summary.md",
    "handoff": "artifacts/handoff.md"
  },
  "prevention_guardrails": [],
  "loaded_skills": [],
  "quality_score": {
    "visual": null,
    "ux": null,
    "functionality": null,
    "code_quality": null,
    "tests": null,
    "security": null
  },
  "errors": [],
  "phase_summaries": {
    "0_interview": "Summary...",
    "1_planner": "Summary..."
  }
}
```

### 4.1 Backward Compatibility
To ensure compatibility with legacy runs, if the `state.json` read by the agent is missing some of the new fields in `interview_decisions` (such as `destructive_operations_strategy`, `storage_strategy`, `accessibility_level`, `max_lines_per_file`), the `"loaded_skills"`, `"protocol_version"`, `"created_at"`, `"parent_run"`, or `"phase_history"` fields, the agent must treat them as optional or assume default values (e.g., `null` for strings/objects, `[]` for arrays, and `"1.0.0"` for `"protocol_version"`) to avoid catastrophic failure in parsing or phase transitions.
- **Stack Mapping:** If the `"technology_stack"` field is not present but `"language_runtime"` is populated, the agent must map the existing value as backend (e.g., `technology_stack: { "frontend": null, "backend": language_runtime, "database": null, "styling": null }`) to ensure smooth transitions.

### 4.2 Prevention Guardrails (`prevention_guardrails`)
The `prevention_guardrails` array records which preventive guardrails were applied during the run. Each entry is a descriptive string (e.g., `"SEO_META_TAGS"`, `"FONT_LOADING_VERIFIED"`, `"SANITIZATION_APPLIED"`). This allows retroaudits and continuous protocol improvement.

#### Guardrails Enforcement
Each guardrail registered in the array MUST have an associated programmatic verification check in [build-validation-checklist.md](skills/build-validation-checklist.md). Guardrails without a corresponding programmatic check CANNOT be registered — this prevents declarative guardrails without actual enforcement. The mapping table is:

| Guardrail | Required Check |
|-----------|----------------|
| `STRICT_TYPES_NO_ANY` | `grep "as any"` returns 0 occurrences in `src/` |
| `SECURE_UUID_GENERATION` | `grep "Date.now()\|Math.random()"` returns 0 occurrences |
| `SEO_META_TAGS` | `grep "<title>"` + `grep "name=\"description\""` present |
| `FONT_LOADING_VERIFIED` | Fonts in CSS have matching `<link>` in HTML |
| `PERSISTENCE_ERRORS_UI_HANDLED` | Every `catch` with `localStorage` has a call to toast/modal |
| `FILE_SIZE_LIMIT_COMPLIANCE` | All components have < N lines |

### 4.3 Quality Score (`quality_score`)
The `quality_score` object is populated progressively by the validation (4), review (5), and critic (6) phases. Each dimension receives a score from 0 to 10 based on the rubric below. Scores equal to or greater than 8 MUST have an explicit justification in the corresponding artifact.

#### `tests` Rubric:
| Score | Criterion |
|-------|-----------|
| 0-3   | No tests or basic smoke test only |
| 4-5   | Tests cover < 40% of functions/utilities |
| 6-7   | Tests cover 40-70% of functions, no component tests |
| 8-9   | Tests cover > 70% including integration or components |
| 10    | Coverage > 90% with E2E or visual tests |

#### `code_quality` Rubric:
| Score | Criterion |
|-------|-----------|
| 0-3   | Multiple guardrail violations (`as any`, duplicated logic) |
| 4-5   | 1-2 minor violations, basic structure respected |
| 6-7   | Zero violations, partial memoization, modularization ok |
| 8-9   | Zero violations, full memoization, performance optimized |
| 10    | Zero violations + clean AST/lint + bundle analysis performed |

#### `security` Rubric:
| Score | Criterion |
|-------|-----------|
| 0-3   | No sanitization or validation of external data |
| 4-5   | Schema validation present, no sanitization |
| 6-7   | Schema + sanitization present, no security tests |
| 8-9   | Schema + sanitization + security tests + XSS mitigated |
| 10    | All of the above + audit with external tool |
