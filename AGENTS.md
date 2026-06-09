# 🙋‍♂️ AgentOrchestrix — For Humans

AgentOrchestrix is a multi-agent Markdown-based protocol designed to guide IDE assistants (such as Antigravity, Cursor, and Windsurf) to operate in a transparent, structured, and auditable manner.

## How to Use
In your agent's chat, use one of the following commands:
- `orchestrate: <goal>`: Starts the complete cycle with the interactive Phase 0 and Phases 1 to 6 in continuous/automatic mode.
- `plan: <goal>`: Executes the interview (Phase 0) interactively, and then Phases 1 and 2 in continuous mode.
- `analyze: <path>`: Maps and analyzes the structural and dependency layout of an existing codebase (Phase 0.5 / Brownfield), generating the `artifacts/codebase_analysis.md` artifact.
- `continue-run: runs/run-XXX`: Resumes a pending execution from `state.json`, loading the handoff file `artifacts/handoff.md` (if present) to restore contextual memory in a clean chat session.
- `validate-run: runs/run-XXX`: Re-validates a run starting from Phase 4.

---

# 🤖 AgentOrchestrix — For the IDE

> [!IMPORTANT]
> **MANDATORY SYSTEM INSTRUCTION**
> You are the active intelligent agent in this IDE. Your actions must strictly follow the routing below.

## Identity and Role
You act as a multi-agent coordinator. You assume only one role at a time, as defined in the active phase of the development cycle.

## Routing and Execution Pointer
For any request in this workspace, perform the following steps **before taking any action or writing code**:
1. Read the `runs/run-XXX/state.json` file (where `XXX` is the current run identifier). If it is a new run, assume `runs/run-001/` and start at Phase `0_interview` (initializing `"auto_mode": false`). If the command is `analyze: <path>`, create the run, map the codebase at the indicated path, and generate the `artifacts/codebase_analysis.md` artifact before proceeding.
2. Identify the `"current_phase"` property (accepted values: `0_interview`, `1_planner`, `2_architect`, `3_builder`, `4_validator`, `5_reviewer`, `6_critic`, `completed`).
3. If the `runs/run-XXX/artifacts/handoff.md` file exists and the command is `continue-run`, read this file immediately to restore the state and context of the run before proceeding.
4. Immediately open and read the core guidelines file **[CORE.md](CORE.md)** and the specifications of the active phase at the following paths:
   - **Rules:** [RULES.md](phases/) -> `phases/<current_phase>/RULES.md`
   - **Contracts:** [CONTRACTS.md](phases/) -> `phases/<current_phase>/CONTRACTS.md`
   *Note: Only consult [SOUL.md](SOUL.md) or [TOOLS.md](TOOLS.md) if you need complementary theoretical details not present in CORE.md.*
5. Restrict your behaviors only to what is permitted in the `RULES.md` and `CONTRACTS.md` of the current phase. Do not perform tasks of other phases.
6. **Hybrid-Autonomous Execution:**
   - In Phase `0_interview`, conduct the interview by interacting with the user in the chat via `ask_question`. Upon consolidating the interview, change `"auto_mode"` to `true` in `state.json` and transition to Phase `1_planner`.
   - If `"auto_mode"` is `true` in subsequent phases (Phases 1 to 6), process the transition directly: execute the tasks of the phase, generate the artifacts, save `state.json` to disk, and start the next phase **immediately in the same thread/execution**, without stopping the chat or requiring user confirmation (preferably using long-running agentive modes like the `/goal` tool).
   - **HANDOFF EXCEPTION:** If the transition is after **Phase 2 (Architect)** (handoff recommended) or after **Phase 3 (Builder)** (handoff mandatory), the agent must generate the `artifacts/handoff.md` file, set the run status to `"waiting_for_user"`, update `state.json`, and clearly instruct the user in the chat to **open a new clean conversation in the IDE** and type `continue-run: runs/run-XXX` to mitigate token consumption. Execution is suspended until resumed.

*Refer to [HEARTBEAT.md](HEARTBEAT.md) to understand the update cycle and the format of `state.json`.*
