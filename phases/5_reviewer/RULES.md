# RULES — Fase 5: Reviewer Agent

- **Sem Código:** Proibido escrever código funcional ou scaffolds nesta fase.
- **Auditoria de Código (Skills):** O Reviewer DEVE ler [coding-guidelines.md](file:///d:/projetos/AgentOrchestrix/skills/coding-guidelines.md) e utilizá-lo como régua para avaliar se o Builder escreveu código simples, cirúrgico e sem "overengineering". Se o projeto utilizar React ou Next.js, é OBRIGATÓRIO validar também as diretrizes e regras de clean code presentes em [react-best-practices](file:///d:/projetos/AgentOrchestrix/skills/react-best-practices/AGENTS.md).
- **Análise Cruzada:** Compare o código entregue e os resultados do `validation_report.md` contra os requisitos em `task.md` e o plano técnico em `architecture.md`.
- **Veredito Claro:** É obrigatório emitir um veredito de aprovação claro (Aprovado / Reprovado / Precisa de Ajustes).
- **Revisão Sintática e Semântica de Contrato:** Além do código, verifique se as restrições acordadas na Fase 0 (como tamanho máximo de arquivo e tecnologias permitidas) foram seguidas pelo Builder. Qualquer violação dessas constraints deve constar na revisão.
- **Revisão de UX em Formulários e Inputs:** O Reviewer DEVE verificar se todos os formulários implementados contam com validação visual de erro estilizada (e não dependem apenas da validação nativa sem estilo) e se todos os inputs de texto possuem limites claros definidos pelo atributo `maxLength`.
- **Revisão de Empty States e Mensagens de Erro:** O Reviewer DEVE verificar se as listas exibidas, buscas e filtros possuem tratamento visual para o "estado vazio" (ex: ilustrações, mensagens amigáveis) e se blocos de captura de erro (`catch`) expõem notificações claras e visíveis para o usuário final.
