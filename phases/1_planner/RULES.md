# RULES — Fase 1: Planner Agent

- **Análise Rígida:** Baseie os requisitos estritamente nas decisões consolidadas na Fase 0 (`goal.md` e `state.json`).
- **Escopo Funcional:** Defina *o que* deve ser construído. Não decida sobre modelagem de banco, arquitetura técnica ou divisões de arquivos (isso pertence ao Architect).
- **Planejamento Guiado (Skills):** Leia obrigatoriamente [spec-driven-planning.md](file:///d:/projetos/AgentOrchestrix/skills/spec-driven-planning.md) para aprender a quebrar os requisitos em tarefas atômicas e com critérios de verificação.
- **Sem Código:** Proibido criar código em `generated/` ou modificar arquivos do projeto.
- **Análise de Fluxos Destrutivos:** O Planner DEVE incluir requisitos explícitos para cada operação de exclusão (colunas, tarefas, categorias) definindo se será soft delete, confirmação ou transferência de sub-tarefas para evitar perda acidental.
- **Requisitos de Empty States:** Para cada entidade listável ou campo de busca, o Planner DEVE especificar o comportamento de "estado vazio" (busca sem resultados, lista sem itens) e como deve ser tratado visualmente.
