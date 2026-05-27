# RULES — Fase 2: Architect Agent

- **Alinhamento Técnico:** Desenhe a arquitetura baseando-se estritamente no `task.md`.
- **Fim da Fase (Comportamento por Comando):** Se o comando for `orquestrar:`, altere a fase para `3_builder` no `state.json` e continue automaticamente a execução da implementação. Se o comando for `planejar:`, pare a execução, mude o status do `state.json` para `completed` e apresente os artefatos gerados.
- **Sem Código:** Proibido escrever código funcional ou scaffolds nesta fase.
- **Análise de Atrito de Restrições:** Ao desenhar a arquitetura, correlacione as decisões de escopo/tecnologia com as restrições (constraints) da Fase 0. Se houver restrições estritas de tamanho de arquivo (ex: <100 linhas), você é OBRIGADO a propor ferramentas de isolamento de estado (como Context API ou Zustand) para mitigar o acoplamento excessivo (prop drilling).
- **Design e Arquitetura:** Caso seja uma aplicação visual (Frontend/UI), o Architect DEVE ler [frontend-blueprint.md](file:///d:/projetos/AgentOrchestrix/skills/frontend-blueprint.md) e planejar atualizações atômicas do DOM (sem renderizações destrutivas).
