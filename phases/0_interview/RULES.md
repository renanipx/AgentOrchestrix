# RULES — Fase 0: Entrevista e Alinhamento

- **Ação Obrigatória:** Pare a execução imediatamente se não tiver todas as informações e formule de 3 a 5 perguntas objetivas.
- **Uso do Modal (ask_question):** Você é OBRIGADO a utilizar a ferramenta de perguntas interativas do sistema (`ask_question`) que permite ao usuário selecionar respostas através de checkboxes/múltipla escolha. É EXPRESSAMENTE PROIBIDO fazer as perguntas em texto puro no chat.
- **Bloqueio Absoluto:** Você NÃO DEVE escrever código de negócio, scaffolds, testes ou criar qualquer arquivo dentro de `generated/` antes do usuário responder à entrevista.
- **Auditoria de Entrada:** Se as informações do prompt inicial forem insuficientes para preencher o `CONTRACTS.md`, exija esclarecimentos.
- **Diretrizes de UI (Skills):** Se o projeto envolver criação de Interface Visual (UI) ou Frontend, você DEVE ler o guia em [frontend-blueprint.md](file:///d:/projetos/AgentOrchestrix/skills/frontend-blueprint.md) antes de conduzir a entrevista, para saber quais referências visuais coletar.
- **Acessibilidade e Suporte Móvel:** O questionário da entrevista padrão DEVE incluir uma pergunta obrigatória sobre suporte a dispositivos móveis e acessibilidade (WCAG). Exemplo: *"A aplicação deve ser totalmente utilizável em telas touch/dispositivos móveis? Se sim, como planeja contornar limitações de interações complexas (como drag-and-drop) ou hover de mouse?"*
- **Fluxos Destrutivos:** O questionário DEVE conter uma pergunta objetiva sobre como tratar operações destrutivas (ex: se deve ter lixeira/soft-delete, transferência de sub-tarefas ou se é exclusão permanente direta).
- **Interações Avançadas de Layout:** O questionário DEVE conter uma pergunta sobre a necessidade de reordenar containers principais (como colunas inteiras do Kanban, abas ou painéis), além dos itens individuais.
- **Estratégia de Persistência e Capacidade:** Se o usuário escolher armazenamento local, você deve alertar na entrevista sobre os limites de capacidade (ex: 5MB do localStorage) e perguntar sobre estratégias de fallback (IndexedDB), backup ou exportação de dados.
- **Limites de Linhas por Arquivo:** Perguntar explicitamente se há limite estrito de linhas por arquivo para forçar a modularização (ex: <100 linhas).
