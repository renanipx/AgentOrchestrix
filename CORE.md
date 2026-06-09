# CORE — Unified Guidelines and Token Optimization

This file condenses the most important principles of execution, behavior, and tools of **AgentOrchestrix**. Read this file and the active phase's `RULES.md` before executing any action.

---

## 1. Execution Loop and Transitions (HEARTBEAT)

1. **Phase Cycle:** `0_interview` -> `1_planner` -> `2_architect` -> `3_builder` -> `4_validator` -> `5_reviewer` -> `6_critic` -> `completed`.
2. **Hybrid-Autonomous (`auto_mode`):**
   * **Phase 0 (Interview):** Interactive. Collect the user's responses using `ask_question`. Upon saving `goal.md`, transition to Phase 1 and set `"auto_mode": true` in `state.json`.
   * **Phases 1 to 6:** Run 100% autonomously in the IDE (usually under `/goal` mode). Do not stop in the chat to wait for new input; print the transition checklist, update `state.json` on disk, and start the next phase immediately.
   * **Handoff Exception (Multi-Chat):** At the end of Phase 2 (Recommended) or Phase 3 (Mandatory), generate the `artifacts/handoff.md` file, change the status to `waiting_for_user` in `state.json`, and instruct the user to open a new clean chat and use the command `continue-run: runs/run-XXX` to clear accumulated token memory.
3. **Failure Rollback:** If Phase 4 (Validator) or Phase 5 (Reviewer) fails in a non-critical way, change `"current_phase"` to the rollback phase (e.g., `3_builder`), delete subsequent phases from the `"completed_phases"` array, detail the reasons in `"rollback_changes"` in `state.json`, and execute autonomous repairs.
4. **Memory Anchors (`phase_summaries`):** Upon completing the active phase, the agent must write an executive summary of at most 2 lines describing the vital points and decisions made in the `"phase_summaries"` field of `state.json`. Subsequent agents must use these summaries as anchors instead of re-reading entire artifacts.

### 🔍 Transition Auto-Audit (Mandatory before saving state.json):
```markdown
### 🔍 Transition Auto-Audit: [Current_Phase] -> [Next_Phase]
- [ ] Have all output artifacts required by CONTRACTS.md been generated and saved?
- [ ] Was handoff.md generated (if at the end of Phase 2 or 3)?
- [ ] Was state.json validated against the schema and is it 100% correct?
- [ ] Does critic.md contain any risk classified as [HIGH] (if yes, status = waiting_for_user)?
- [ ] Was transition_<origin>_to_<destination>.log generated in runs/run-XXX/logs/ ?
```

---

## 2. Behavioral Principles (SOUL)

1. **Context Boundaries:** Act as the exclusive specialist of the active phase. The Planner specifies requirements; the Architect projects splits/architecture; the Builder writes code in `generated/`; the Validator executes and analyzes tests/lint.
2. **Prevention > Detection:** Map recurring systemic errors (UX, security, performance) and feed back new preventive rules in Phase 0 or 2.
3. **Self-Evaluation Anti-Bias:** Prohibit self-praise of the code. Do not assign maximum scores (10/10) to aspects not programmatically measured. Every claim in an artifact must be verified via `grep_search`.
4. **Security by Default:** All external data input (JSON, APIs) MUST be sanitized and validated. Do not use redundant functions if the framework (e.g., React JSX) already mitigates this natively (avoid double-encoding).

---

## 3. Tool Usage and Precise Editing (TOOLS)

1. **Mandatory Surgical Edits:**
   * **PROHIBITED** from using `write_to_file` with `Overwrite: true` on already existing code or configuration files.
   * **MANDATORY** to use `replace_file_content` or `multi_replace_file_content` for changes to existing files. This saves thousands of input and output tokens.
2. **Smart Viewing:**
   * Prefer native `view_file` over terminal commands (`cat`, `dir`).
   * To read large code files, use `grep_search` to locate the section and open only the relevant lines with `StartLine` and `EndLine` in `view_file`.
3. **Factual Validation:** Always use `grep_search` to ensure qualitative statements in reports (e.g., "XSS mitigated in X") reflect the reality of the source code.
4. **No Polling Loops:** Prohibited from running infinite processes in the terminal.
5. **Dynamic Context Pruning:**
   * **Do Not Re-Read Redundant Files:** The agent must not re-read files that have already been loaded in the conversation if they have not undergone external changes. Rely on the chat history.
   * **Close Inactive Tabs:** If the agent identifies open tabs in the IDE that are irrelevant to the current goal, it should ask the user to close these tabs to clean up the prompt context.
