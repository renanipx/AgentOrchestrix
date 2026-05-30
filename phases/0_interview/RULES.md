# RULES — Fase 0: Entrevista e Alinhamento

- **Ação Obrigatória:** Pare a execução imediatamente se não tiver todas as informações e formule de 3 a 5 perguntas objetivas.
- **Uso do Modal (ask_question):** Você é OBRIGADO a utilizar a ferramenta de perguntas interativas do sistema (`ask_question`) que permite ao usuário selecionar respostas através de checkboxes/múltipla escolha. É EXPRESSAMENTE PROIBIDO fazer as perguntas em texto puro no chat.
- **Bloqueio Absoluto:** Você NÃO DEVE escrever código de negócio, scaffolds, testes ou criar qualquer arquivo dentro de `generated/` antes do usuário responder à entrevista.
- **Auditoria de Entrada:** Se as informações do prompt inicial forem insuficientes para preencher o `CONTRACTS.md`, exija esclarecimentos.
- **Diretrizes de UI (Skills):** Se o projeto envolver criação de Interface Visual (UI) ou Frontend, você DEVE ler o guia em [frontend-blueprint.md](file:///d:/projetos/AgentOrchestrix/skills/frontend-blueprint.md) antes de conduzir a entrevista, para saber quais referências visuais coletar.
- **Acessibilidade e Suporte Móvel:** O questionário da entrevista padrão DEVE incluir uma pergunta obrigatória sobre acessibilidade e suporte a diferentes dispositivos e telas de toque, visando mapear o suporte alternativo para interações sem cursor ou teclado físico.
- **Fluxos Destrutivos:** O questionário DEVE conter uma pergunta objetiva sobre como a aplicação deve tratar operações destrutivas ou de exclusão de dados e entidades do sistema.
- **Interações Avançadas de Layout:** O questionário DEVE conter uma pergunta sobre a necessidade de reordenar containers e painéis principais de interface além de elementos individuais.
- **Estratégia de Persistência e Capacidade:** Se houver requisitos de persistência de dados local ou cliente, pergunte sobre estratégias de fallback, backup, exportação de dados ou limitações físicas de armazenamento.
- **Limites de Linhas por Arquivo:** Perguntar explicitamente se há limite estrito de linhas por arquivo para forçar a modularização e divisão de responsabilidades da base de código.
- **Idioma Primário da Aplicação:** O questionário DEVE incluir uma pergunta obrigatória sobre o idioma primário da aplicação. Esta decisão guiará a localização de textos de interface e atributos estruturais.
- **Identidade Visual e Tipografia:** O questionário DEVE perguntar se o projeto utiliza fontes tipográficas customizadas ou recursos externos, de modo a registrar os nomes e pesos desejados.
- **Atalhos de Teclado:** O questionário DEVE perguntar se a aplicação requer suporte a atalhos globais ou padrões de acessibilidade específicos para navegação sem mouse.
