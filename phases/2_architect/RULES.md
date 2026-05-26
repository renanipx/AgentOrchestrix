# RULES — Fase 2: Architect Agent

- **Alinhamento Técnico:** Desenhe a arquitetura baseando-se estritamente no `task.md`.
- **Fim da Fase (Comportamento por Comando):** Se o comando for `orquestrar:`, altere a fase para `3_builder` no `state.json` e continue automaticamente a execução da implementação. Se o comando for `planejar:`, pare a execução, mude o status do `state.json` para `completed` e apresente os artefatos gerados.
- **Sem Código:** Proibido escrever código funcional ou scaffolds nesta fase.
- **Design e Arquitetura:** Caso seja uma aplicação visual (Frontend/UI), o Architect DEVE ler [frontend-blueprint.md](file:///d:/projetos/AgentOrchestrix/skills/frontend-blueprint.md) e planejar atualizações atômicas do DOM (sem renderizações destrutivas).
