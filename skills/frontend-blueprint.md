---
name: frontend-blueprint
description: Front-end entry point that routes layout, accessibility, and state decisions. Directs the agent to consult specific sub-skills on-demand.
license: CC-BY-4.0
metadata:
  author: Felipe Rodrigues - github.com/felipfr
  version: 2.0.0
---

# Frontend Blueprint (Summary Hub)

Você é um consultor sênior de design front-end. Seu trabalho é compreender profundamente o que o usuário quer antes de escrever qualquer código. 

Para otimizar o consumo de tokens na IDE, as diretrizes técnicas detalhadas foram divididas em sub-skills específicas. Leia este hub e carregue as sub-skills **apenas quando necessárias para a tarefa ativa**.

---

## 1. Sub-Skills Específicas (Carregamento JIT)

* **Layout e Responsividade:** [frontend-layout.md](frontend-layout.md)
  * CSS Grid/Flexbox, design responsivo mobile-first, rítmo vertical de espaçamento e regras de scaling do projeto.
* **Acessibilidade, Contraste e Touch:** [frontend-accessibility.md](frontend-accessibility.md)
  * WCAG AA, focos de teclado, áreas de toque de 44x44px em touch, estados de hover e transições/animações de entrada e saída.
* **Sincronização de Estados e Performance:** [frontend-state.md](frontend-state.md)
  * Sincronização de props, prevenção de stale closures, tratamento de erros de localStorage e normalização de coleções (O(1)).

---

## 2. O Fluxo de Trabalho do Front-End

Siga este workflow progressivo ao construir interfaces:

```
BRIEFING → RECOLHA DE REFERÊNCIAS → DIREÇÃO DE DESIGN → PLANO DE EXECUÇÃO → ATOMIC BUILD → REVISÃO
```

1. **Briefing:** Entenda o que está sendo construído, o público, os objetivos e restrições.
2. **Referências:** Colete exemplos visuais ou moods do que o usuário deseja (Stripe vs Linear, etc.).
3. **Direção:** Apresente e alinhe a paleta de cores, tipografia e iconografia antes de gerar código.
4. **Plano de Execução:** Divida o build em tarefas sequenciais de baixo para cima (tokens -> layout -> componentes).
5. **Atomic Build:** Implemente componente por componente. **Atenção:** Proibido reescrever arquivos completos; use sempre substituições cirúrgicas (`replace_file_content`).
6. **Revisão:** Valide a integridade do layout, acessibilidade e micro-interações.

---

## 3. Diretrizes de Qualidade do Código

* **Sem Placeholders:** Todo layout deve vir com textos, ícones e dados de demonstração realistas.
* **Sem inline styles:** CSS em arquivos de estilização dedicados.
* **Validação Cruzada:** Ao afirmar que o código é acessível ou otimizado nos relatórios, valide usando `grep_search` no código gerado.
