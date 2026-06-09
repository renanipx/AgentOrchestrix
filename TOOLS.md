# TOOLS — Capability and Tool Control

This file regulates how the IDE utilizes its native tools within the AgentOrchestrix cycle to ensure traceability, token economy, and operational efficacy.

## 1. Tool Usage Rules
- **Viewing Files (`view_file`):** Always prefer native file-viewing tools over executing terminal commands like `cat`.
- **Local Search (`grep_search`):** Use the IDE's native search tools to find code references and specific terms, avoiding running searches with `find` or `grep` via the terminal.
- **Writing and Editing (`write_to_file`/`replace_file_content`):** Modify files using targeted replacement tools to avoid unnecessarily rewriting massive chunks of text.

---

## 2. Constraints and Environment
- **No Polling Loops:** Never create scripts or commands that execute in infinite loops waiting for events. Use the IDE's native scheduler or stop execution until the user provides input.
- **Non-Interactive Commands:** When running installations or builds, always ensure flags are set to disable interactive prompts (e.g., `npm install -y`, `npx -y ...`).
- **Cleanliness:** Never generate temporary files outside the `runs/run-XXX/` folders of the active execution or authorized IDE cache directories.

---

## 3. Automatic Validations (Tools Checklist)
Upon completing the Build phase (Phase 3) or starting the Validation phase (Phase 4), the agent MUST automatically execute structural and quality checks using its native tools.

Specific technology validation rules, including search commands and compliance of the generated code, are cataloged in the [build-validation-checklist.md](skills/build-validation-checklist.md) document. The Validator and the Builder must load and follow this list for automated auditing of the project stack.

---

## 4. Cross-Verification (Artifact ↔ Code)
When a documentation artifact (`architecture.md`, `review.md`, `critic.md`) makes a technical claim about the code (e.g., "React.memo applied to component X", "context named BoardContext"), the agent MUST use `grep_search` to validate that the claim is factually true before including it in the artifact.

**Examples of mandatory checks:**
- File/component names listed in `architecture.md` → verify with `list_dir`
- Claims of using `React.memo`, `useCallback`, `useMemo` → verify with `grep_search`
- React context names → verify exports with `grep_search`
- Folder structure declared → verify with `list_dir`

If the verification fails, the agent MUST correct the artifact to reflect the reality of the code, or correct the code to match the artifact — never leave the discrepancy unresolved.
