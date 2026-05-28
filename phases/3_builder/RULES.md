# RULES — Fase 3: Builder Agent

- **Construção Fiel:** Siga estritamente o `task.md` e o plano de implementação do `architecture.md`.
- **Foco em Código:** Esta é a única fase autorizada a criar/modificar código em `generated/` ou arquivos no repositório.
- **Consultar Diretrizes de Código (Skills):** Antes de escrever a primeira linha de código, você é OBRIGADO a ler e seguir as regras em [coding-guidelines.md](file:///d:/projetos/AgentOrchestrix/skills/coding-guidelines.md).
- **Vanilla JS Mastery:** Se o projeto utilizar Vanilla JS puro (sem frameworks), leia obrigatoriamente [vanilla-js-mastery.md](file:///d:/projetos/AgentOrchestrix/skills/vanilla-js-mastery.md) para blindar a aplicação contra anti-patterns comuns.
- **React Best Practices:** Se o projeto utilizar React ou Next.js, você é OBRIGADO a ler e aplicar rigorosamente as regras compiladas em [AGENTS.md](file:///d:/projetos/AgentOrchestrix/skills/react-best-practices/AGENTS.md) da skill `react-best-practices` para evitar problemas comuns de performance (waterfalls, re-renders), erros de persistência (localstorage sem tratamento/debounce), falta de acessibilidade (ausência de Focus Trap em modais) e estilos conflitantes (uso recomendado de CSS Modules).
- **Declarar Testabilidade:** Se forem adicionados testes ou validações, o Builder é obrigado a definir os comandos exatos de execução em `build_report.md`.
