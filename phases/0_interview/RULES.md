# RULES — Phase 0: Interview and Alignment

- **Mandatory Action:** Stop execution immediately if you do not have all required information, and formulate 3 to 5 objective questions.
- **Modal Usage (ask_question):** You are REQUIRED to use the system's interactive question tool (`ask_question`), which allows the user to select answers via checkboxes/multiple choice. It is EXPRESSLY PROHIBITED to ask questions in plain text in the chat.
- **Absolute Blocking:** You MUST NOT write business code, scaffolds, tests, or create any file within `generated/` before the user responds to the interview.
- **Input Audit:** If the initial prompt information is insufficient to fill the `CONTRACTS.md`, demand clarification.
- **UI Guidelines (Skills):** If the project involves creating a visual interface (UI) or Frontend, you MUST read the guide in [frontend-blueprint.md](../../skills/frontend-blueprint.md) before conducting the interview to know which visual references to collect.
- **Accessibility and Mobile Support:** The standard interview questionnaire MUST include a mandatory question about accessibility and support for different devices and touchscreens, aiming to map alternative support for interactions without a cursor or physical keyboard.
- **Destructive Flows:** The questionnaire MUST contain an objective question on how the application should handle destructive operations or data/entity deletion from the system.
- **Advanced Layout Interactions:** The questionnaire MUST contain a question about the need to reorder main container and interface panels in addition to individual elements.
- **Persistence Strategy and Capacity:** If local or client-side data persistence is required, ask about fallback strategies, backup, data export, or physical storage limitations.
- **Line Limits per File:** Ask explicitly if there is a strict line limit per file to enforce modularization and division of responsibilities in the codebase.
- **Primary Language of the Application:** The questionnaire MUST include a mandatory question about the application's primary language. This decision will guide the localization of interface texts and structural attributes.
- **Visual Identity and Typography:** The questionnaire MUST ask if the project uses custom fonts or external assets to register the desired names and weights.
- **Keyboard Shortcuts:** The questionnaire MUST ask if the application requires support for global shortcuts or specific accessibility standards for mouse-free navigation.
- **Populating Loaded Skills:** When consolidating the interview, the agent MUST populate the `"loaded_skills"` field in `state.json` based on the technologies selected in the interview. The recommended mapping table is:
  | Technology | Skills to Load |
  |------------|----------------|
  | React / Next.js | `react-best-practices`, `web-best-practices`, `frontend-blueprint`, `coding-guidelines`, `security-checklist` |
  | Vanilla JS | `vanilla-js-mastery`, `web-best-practices`, `coding-guidelines`, `security-checklist` |
  | Backend only | `coding-guidelines`, `security-checklist` |
- **Populating the Technology Stack:** When consolidating the interview, the agent MUST populate the `"technology_stack"` property in `state.json` (subfields `"frontend"`, `"backend"`, `"database"`, and `"styling"`) according to the choices agreed upon in the interview (e.g., React, Node.js, localStorage, CSS Modules), ensuring that no technical decision about the stack remains silently as `null`.
- **Language Policy:** The language of the protocol itself is English, and third-party skills imported in the `skills/` folder may be in English. The artifacts produced in subsequent phases (e.g., `task.md`, `architecture.md`, `review.md`) MUST follow the language configured in `primary_language` in the interview (by default, English).
- **Environment Verification in the Interview:** Before closing Phase 0, the agent MUST verify via terminal if the command line tools required by the chosen stack are available and responding. If any essential tool is missing, the agent MUST:
  1. Record `"environment_ready": false` in `state.json`.
  2. Inform the user in chat with a clear message about what is missing and how this impacts test coverage and validation of the run.
  3. Ask the user if they wish to:
     - **Pause the run** to resolve the environment before proceeding, or
     - **Continue aware of the risk**, accepting that tests will not be executed and `quality_score.tests` will have a low ceiling.
  The user's decision must be recorded as `"environment_decision"` in `interview_decisions` within `state.json` so that subsequent phases adjust their behavior accordingly.
- **Binary Scope Table in Goal:** The generated `goal.md` file MUST end with a binary scope table with the columns `Feature / Requirement`, `Status (✅ IN SCOPE / ❌ OUT OF SCOPE)`, and `Observations / Business Rule`. All requirements mentioned by the user must be explicitly listed in this table.
- **Shortcut Details:** If the application requires keyboard shortcuts, they MUST be listed individually in the binary scope table (or in a dedicated attached section in `goal.md`), identifying the exact key (e.g., `n`, `Delete`, `Escape`) and the respective expected behavior for later validation.
- **Domain Entity Expansion:** When the user's goal describes a recognizable type of system (e.g., managers, boards, platforms, productivity apps, marketplaces, dashboards, or any system with an implicitly rich data model), the agent MUST proactively infer the default entities and functionalities that typically compose that type of system and that the user may not have explicitly mentioned. The agent MUST present this inferred list to the user and ask which ones are IN SCOPE before closing the interview. The goal is to prevent implicit entities (sub-items, relationships, states, metadata) from being omitted from the scope by incorrectly assuming the user would mention them.
- **Compound Interaction Mapping:** When the scope includes functionalities involving multiple interactive elements at different hierarchical levels (e.g., draggable elements inside containers, nested menus, forms with sub-forms, lists inside groups, panels inside layouts), the agent MUST identify and explicitly record in `interview_decisions` in `state.json` what these interaction levels are, under the `"complex_interactions"` key. This mapping serves as a contract that subsequent phases must treat behavior isolation between levels as an explicit requirement, preventing interactions at one level from interfering with the behavior of another.
- **Output to Autonomous Mode:** When consolidating the interview responses in `goal.md` and updating `state.json` to transition to Phase `1_planner`, the agent MUST set `"auto_mode": true` in `state.json`, signaling that from this transition onwards, the rest of the pipeline (Phases 1 to 6) will run 100% autonomously and continuously.
