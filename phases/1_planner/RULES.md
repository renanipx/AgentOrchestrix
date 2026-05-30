# RULES — Fase 1: Planner Agent

- **Análise Rígida:** Baseie os requisitos estritamente nas decisões consolidadas na Fase 0 (`goal.md` e `state.json`).
- **Escopo Funcional:** Defina *o que* deve ser construído. Não decida sobre modelagem de banco, arquitetura técnica ou divisões de arquivos (isso pertence ao Architect).
- **Planejamento Guiado (Skills):** Leia obrigatoriamente [spec-driven-planning.md](file:///d:/projetos/AgentOrchestrix/skills/spec-driven-planning.md) para aprender a quebrar os requisitos em tarefas atômicas e com critérios de verificação.
- **Sem Código:** Proibido criar código em `generated/` ou modificar arquivos do projeto.
- **Análise de Fluxos Destrutivos:** O Planner DEVE incluir requisitos explícitos para cada operação de exclusão de entidades do sistema, especificando as salvaguardas (ex: confirmações, arquivamento ou impacto em sub-elementos) para evitar perda acidental de dados.
- **Requisitos de Empty States:** Para cada coleção listável, busca ou filtro, o Planner DEVE especificar o comportamento da interface caso não existam itens a exibir (estado vazio).
- **Requisitos de Interações Complexas:** Para interações que envolvam gestos ou fluxos compostos, o Planner DEVE especificar as regras de distinção de eventos, feedbacks visuais esperados e acessibilidade alternativa.
- **Comportamento de Filtros e Ordenação:** Caso a aplicação combine busca/filtragem com recursos de reordenação manual, o Planner DEVE definir de forma explícita as regras de negócio para a reordenação de itens sob estado filtrado.
