# RULES — Fase 0: Entrevista e Alinhamento

- **Ação Obrigatória:** Pare a execução imediatamente se não tiver todas as informações e formule de 3 a 5 perguntas objetivas.
- **Uso do Modal (ask_question):** Você é OBRIGADO a utilizar a ferramenta de perguntas interativas do sistema (`ask_question`) que permite ao usuário selecionar respostas através de checkboxes/múltipla escolha. É EXPRESSAMENTE PROIBIDO fazer as perguntas em texto puro no chat.
- **Bloqueio Absoluto:** Você NÃO DEVE escrever código de negócio, scaffolds, testes ou criar qualquer arquivo dentro de `generated/` antes do usuário responder à entrevista.
- **Auditoria de Entrada:** Se as informações do prompt inicial forem insuficientes para preencher o `CONTRACTS.md`, exija esclarecimentos.
- **Diretrizes de UI (Skills):** Se o projeto envolver criação de Interface Visual (UI) ou Frontend, você DEVE ler o guia em [frontend-blueprint.md](../../skills/frontend-blueprint.md) antes de conduzir a entrevista, para saber quais referências visuais coletar.
- **Acessibilidade e Suporte Móvel:** O questionário da entrevista padrão DEVE incluir uma pergunta obrigatória sobre acessibilidade e suporte a diferentes dispositivos e telas de toque, visando mapear o suporte alternativo para interações sem cursor ou teclado físico.
- **Fluxos Destrutivos:** O questionário DEVE conter uma pergunta objetiva sobre como a aplicação deve tratar operações destrutivas ou de exclusão de dados e entidades do sistema.
- **Interações Avançadas de Layout:** O questionário DEVE conter uma pergunta sobre a necessidade de reordenar containers e painéis principais de interface além de elementos individuais.
- **Estratégia de Persistência e Capacidade:** Se houver requisitos de persistência de dados local ou cliente, pergunte sobre estratégias de fallback, backup, exportação de dados ou limitações físicas de armazenamento.
- **Limites de Linhas por Arquivo:** Perguntar explicitamente se há limite estrito de linhas por arquivo para forçar a modularização e divisão de responsabilidades da base de código.
- **Idioma Primário da Aplicação:** O questionário DEVE incluir uma pergunta obrigatória sobre o idioma primário da aplicação. Esta decisão guiará a localização de textos de interface e atributos estruturais.
- **Identidade Visual e Tipografia:** O questionário DEVE perguntar se o projeto utiliza fontes tipográficas customizadas ou recursos externos, de modo a registrar os nomes e pesos desejados.
- **Atalhos de Teclado:** O questionário DEVE perguntar se a aplicação requer suporte a atalhos globais ou padrões de acessibilidade específicos para navegação sem mouse.
- **Povoamento de Loaded Skills:** Ao consolidar a entrevista, o agente DEVE preencher o campo `"loaded_skills"` no `state.json` com base nas tecnologias selecionadas na entrevista. A tabela de mapeamento recomendada é:
  | Tecnologia | Skills a carregar |
  |------------|-------------------|
  | React / Next.js | `react-best-practices`, `web-best-practices`, `frontend-blueprint`, `coding-guidelines`, `security-checklist` |
  | Vanilla JS | `vanilla-js-mastery`, `web-best-practices`, `coding-guidelines`, `security-checklist` |
  | Backend apenas | `coding-guidelines`, `security-checklist` |
- **Povoamento do Technology Stack:** Ao consolidar a entrevista, o agente DEVE preencher obrigatoriamente a propriedade `"technology_stack"` no `state.json` (subcampos `"frontend"`, `"backend"`, `"database"` e `"styling"`) de acordo com as escolhas acordadas na entrevista (ex: React, Node.js, localStorage, CSS Modules), garantindo que nenhuma decisão técnica sobre o stack permaneça silenciosamente como `null`.
- **Política de Idiomas:** O idioma do protocolo em si é o Português, mas skills de terceiros importadas na pasta `skills/` podem estar em Inglês. Os artefatos produzidos nas fases subsequentes (ex: `task.md`, `architecture.md`, `review.md`) DEVEM obrigatoriamente seguir o idioma configurado em `primary_language` na entrevista (por padrão, Português).
- **Verificação de Ambiente na Entrevista:** Antes de encerrar a Fase 0, o agente DEVE verificar via terminal se as ferramentas de linha de comando requeridas pelo stack escolhido estão disponíveis e respondendo. Se qualquer ferramenta essencial estiver ausente, o agente DEVE:
  1. Registrar `"environment_ready": false` no `state.json`.
  2. Informar o usuário no chat com uma mensagem clara sobre o que está faltando e como isso impacta a cobertura de testes e validação da run.
  3. Perguntar ao usuário se deseja:
     - **Pausar a run** para resolver o ambiente antes de prosseguir, ou
     - **Continuar ciente do risco**, aceitando que testes não serão executados e o `quality_score.tests` terá um teto baixo.
  A decisão do usuário deve ser registrada como `"environment_decision"` em `interview_decisions` no `state.json` para que fases posteriores ajustem seu comportamento de acordo.
- **Tabela Binária de Escopo no Goal:** O arquivo `goal.md` gerado DEVE obrigatoriamente terminar com uma tabela de escopo binária com as colunas `Funcionalidade / Requisito`, `Status (✅ IN SCOPE / ❌ OUT OF SCOPE)` e `Observações / Regra de Negócio`. Todos os requisitos mencionados pelo usuário devem ser explicitamente listados nessa tabela.
- **Detalhamento de Atalhos:** Caso a aplicação exija atalhos de teclado, eles DEVEM ser listados individualmente na tabela de escopo binária (ou em seção anexa dedicada no `goal.md`), identificando a tecla exata (ex: `n`, `Delete`, `Escape`) e o respectivo comportamento esperado para validação posterior.
- **Expansão de Entidades de Domínio:** Quando o objetivo do usuário descrever um tipo de sistema reconhecível (ex: gerenciadores, quadros, plataformas, apps de produtividade, marketplaces, dashboards ou qualquer sistema com modelo de dados implicitamente rico), o agente DEVE inferir proativamente as entidades e funcionalidades padrão que tipicamente compõem esse tipo de sistema e que o usuário pode não ter mencionado explicitamente. O agente DEVE apresentar essa lista inferida ao usuário e perguntar quais estão IN SCOPE antes de encerrar a entrevista. O objetivo é evitar que entidades implícitas (sub-items, relacionamentos, estados, metadados) sejam omitidas do escopo por suposição incorreta de que o usuário as mencionaria.
- **Mapeamento de Interações Compostas:** Quando o escopo incluir funcionalidades que envolvam múltiplos elementos interativos em diferentes níveis hierárquicos (ex: elementos arrastáveis dentro de containers, menus aninhados, formulários com sub-formulários, listas dentro de grupos, painéis dentro de layouts), o agente DEVE identificar e registrar explicitamente em `interview_decisions` no `state.json` quais são esses níveis de interação, sob a chave `"complex_interactions"`. Esse mapeamento serve como contrato de que as fases subsequentes devem tratar o isolamento de comportamento entre níveis como requisito explícito, evitando que interações de um nível interfiram no comportamento de outro.
- **Saída para Modo Autônomo:** Ao consolidar as respostas da entrevista no `goal.md` e atualizar o `state.json` para transicionar para a Fase `1_planner`, o agente DEVE setar `"auto_mode": true` no `state.json`, sinalizando que a partir desta transição o restante do pipeline (Fases 1 a 6) rodará de forma 100% autônoma e contínua.


