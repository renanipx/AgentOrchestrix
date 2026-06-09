# CORE — Diretrizes Unificadas e Otimização de Tokens

Este arquivo condensa os princípios mais importantes de execução, comportamento e ferramentas do **AgentOrchestrix**. Leia este arquivo e o `RULES.md` da fase ativa antes de executar qualquer ação.

---

## 1. Loop de Execução e Transições (HEARTBEAT)

1. **Ciclo de Fases:** `0_interview` -> `1_planner` -> `2_architect` -> `3_builder` -> `4_validator` -> `5_reviewer` -> `6_critic` -> `completed`.
2. **Híbrido-Autônomo (`auto_mode`):**
   * **Fase 0 (Interview):** É interativa. Colete as respostas do usuário usando `ask_question`. Ao salvar o `goal.md`, transicione para a Fase 1 e ative `"auto_mode": true` no `state.json`.
   * **Fase 1 a 6:** Rodam de forma 100% autônoma na IDE (geralmente sob modo `/goal`). Não pare no chat para aguardar novos inputs; imprima a checklist de transição, atualize o `state.json` no disco e inicie a próxima fase imediatamente.
   * **Exceção de Handoff (Multi-Chat):** Ao fim da Fase 2 (Recomendado) ou Fase 3 (Obrigatório), gere o arquivo `artifacts/handoff.md`, altere o status para `waiting_for_user` no `state.json` e instrua o usuário a abrir um novo chat limpo e usar o comando `continuar-run: runs/run-XXX` para limpar a memória acumulada de tokens.
3. **Rollback de Falhas:** Se a Fase 4 (Validator) ou Fase 5 (Reviewer) falharem de forma não crítica, altere `"current_phase"` para a fase de rollback (ex: `3_builder`), apague fases posteriores do array `"completed_phases"`, detalhe os motivos em `"rollback_changes"` no `state.json` e execute os reparos autônomos.
4. **Âncoras de Memória (`phase_summaries`):** Ao concluir a fase ativa, o agente deve gravar um resumo executivo de no máximo 2 linhas descrevendo os pontos vitais e decisões tomadas no campo `"phase_summaries"` do `state.json`. Agentes subsequentes devem usar esses sumários como âncoras em vez de reler artefatos inteiros.

### 🔍 Auto-Auditoria de Transição (Obrigatório antes de salvar state.json):
```markdown
### 🔍 Auto-Auditoria de Transição: [Fase_Atual] -> [Próxima_Fase]
- [ ] Todos os artefatos de saída exigidos pelo CONTRACTS.md foram gerados e salvos?
- [ ] O handoff.md foi gerado (se for fim de Fase 2 ou 3)?
- [ ] O state.json foi validado contra o schema e está 100% correto?
- [ ] O critic.md contém algum risco classificado como [ALTO] (se sim, status = waiting_for_user)?
- [ ] Log transition_<origem>_to_<destino>.log gerado em runs/run-XXX/logs/ ?
```

---

## 2. Princípios Comportamentais (SOUL)

1. **Barreiras de Contexto:** Aja como especialista exclusivo da fase ativa. O Planner especifica requisitos; o Architect projeta divisões/arquitetura; o Builder escreve código em `generated/`; o Validator executa e analisa testes/lint.
2. **Prevenção > Detecção:** Mapeie erros sistêmicos recorrentes (UX, segurança, performance) e retroalimente novas regras preventivas na Fase 0 ou 2.
3. **Anti-Viés de Auto-Avaliação:** Proibido auto-elogiar o código. Não dê notas máximas (10/10) a quesitos não medidos programaticamente. Todo claim em artefato deve ser verificado via `grep_search`.
4. **Segurança por Padrão:** Toda entrada externa de dados (JSON, APIs) DEVE ser sanitizada e validada. Não use funções redundantes se o framework (ex: React JSX) já mitigar nativamente (evite double-encoding).

---

## 3. Uso de Ferramentas e Edição Precisa (TOOLS)

1. **Edições Cirúrgicas Obrigatórias:**
   * **PROIBIDO** usar `write_to_file` com `Overwrite: true` em arquivos de código ou configuração já existentes.
   * **OBRIGATÓRIO** usar `replace_file_content` ou `multi_replace_file_content` para alterações em arquivos existentes. Isso economiza milhares de tokens de entrada e saída.
2. **Visualização Inteligente:**
   * Prefira `view_file` nativo a comandos de terminal (`cat`, `dir`).
   * Para ler arquivos de código grandes, use `grep_search` para localizar o trecho e abra apenas as linhas relevantes com `StartLine` e `EndLine` no `view_file`.
3. **Validação Factual:** Sempre use `grep_search` para certificar-se de que declarações qualitativas nos relatórios (ex: "XSS mitigado em X") refletem a realidade do código-fonte.
4. **Sem loops de Polling:** Proibido rodar processos infinitos no terminal.
5. **Poda Dinâmica de Contexto (Context Pruning):**
   * **Não Relera Arquivos Redundantes:** O agente não deve re-ler arquivos que já foram carregados na conversa caso estes não tenham sofrido alterações externas. Confie no histórico de chat.
   * **Feche Abas Inativas:** Se o agente identificar que existem arquivos abertos na IDE irrelevantes ao objetivo atual, deve pedir ao usuário para fechar essas abas para limpar o contexto do prompt.
