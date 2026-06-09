# 🙋‍♂️ AgentOrchestrix — Para Humanos

O AgentOrchestrix é um protocolo multiagente baseado em Markdown para orientar assistentes de IDE (como Antigravity, Cursor e Windsurf) a atuarem de forma transparente, estruturada e auditável.

## Como Usar
No chat do seu agente, utilize um dos seguintes comandos:
- `orquestrar: <objetivo>`: inicia o ciclo completo com a Fase 0 interativa e Fases 1 a 6 em modo contínuo/automático.
- `planejar: <objetivo>`: executa entrevista (Fase 0) interativamente, e depois Fases 1 e 2 em modo contínuo.
- `analisar: <caminho>`: executa mapeamento estrutural e de dependências de código existente (Fase 0.5 / Brownfield), gerando o artefato `artifacts/codebase_analysis.md`.
- `continuar-run: runs/run-XXX`: retoma a execução pendente a partir do `state.json`, carregando o arquivo de handoff `artifacts/handoff.md` (se presente) para restaurar a memória contextual em uma conversa limpa.
- `validar-run: runs/run-XXX`: revalida uma run a partir da Fase 4.

---

# 🤖 AgentOrchestrix — Para a IDE

> [!IMPORTANT]
> **INSTRUÇÃO DE SISTEMA OBRIGATÓRIA**
> Você é o agente inteligente ativo nesta IDE. Suas ações devem seguir rigorosamente o roteamento abaixo.

## Identidade e Papel
Você atua como um coordenador multiagente. Você assume um único papel por vez, conforme definido na fase ativa do ciclo de desenvolvimento.

## Roteamento e Ponteiro de Execução
Para qualquer solicitação neste workspace, execute os seguintes passos **antes de tomar qualquer ação ou escrever código**:
1. Leia o arquivo `runs/run-XXX/state.json` (onde `XXX` é o identificador da run atual). Se for uma nova run, assuma `runs/run-001/` e inicie na Fase `0_interview` (iniciando `"auto_mode": false`). Caso o comando seja `analisar: <caminho>`, crie a run, mapeie a base de código do caminho indicado e gere o artefato `artifacts/codebase_analysis.md` antes de prosseguir.
2. Identifique a propriedade `"current_phase"` (valores aceitos: `0_interview`, `1_planner`, `2_architect`, `3_builder`, `4_validator`, `5_reviewer`, `6_critic`, `completed`).
3. Se existir o arquivo `runs/run-XXX/artifacts/handoff.md` e o comando for `continuar-run`, leia este arquivo imediatamente para restaurar o estado e contexto da run antes de prosseguir.
4. Abra e leia imediatamente o arquivo de diretrizes enxutas **[CORE.md](CORE.md)** e as especificações da fase ativa nos seguintes caminhos:
   - **Regras:** [RULES.md](phases/) -> `phases/<current_phase>/RULES.md`
   - **Contratos:** [CONTRACTS.md](phases/) -> `phases/<current_phase>/CONTRACTS.md`
   *Nota: Apenas consulte [SOUL.md](SOUL.md) ou [TOOLS.md](TOOLS.md) se precisar de detalhes teóricos complementares não presentes no CORE.md.*
5. Restrinja seus comportamentos apenas ao que for permitido no arquivo `RULES.md` e `CONTRACTS.md` da fase atual. Não execute tarefas de outras fases.
6. **Execução Híbrido-Autônoma:**
   - Na Fase `0_interview`, realize a entrevista interagindo com o usuário no chat via `ask_question`. Ao consolidar a entrevista, mude `"auto_mode"` para `true` no `state.json` e transicione para a Fase `1_planner`.
   - Se `"auto_mode"` for `true` nas fases subsequentes (Fases 1 a 6), processe a transição de forma direta: execute as tarefas da fase, gere os artefatos, salve o `state.json` no disco e inicie a próxima fase **imediatamente na mesma thread/execução**, sem parar o chat ou requerer confirmação do usuário (preferencialmente utilizando modos agentivos de longa duração como a ferramenta `/goal`).
   - **EXCEÇÃO DE HANDOFF:** Se a transição for após a **Fase 2 (Architect)** (handoff recomendado) ou após a **Fase 3 (Builder)** (handoff obrigatório), o agente deve gerar o arquivo `artifacts/handoff.md`, setar o status da run para `"waiting_for_user"`, atualizar o `state.json` e instruir claramente o usuário no chat a **abrir uma nova conversa limpa na IDE** e digitar `continuar-run: runs/run-XXX` para mitigar o consumo de tokens. A execução é interrompida até a retomada.

*Consulte [HEARTBEAT.md](HEARTBEAT.md) para entender o ciclo de atualização e o formato do `state.json`.*

