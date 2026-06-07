# 🙋‍♂️ AgentOrchestrix — Para Humanos

O AgentOrchestrix é um protocolo multiagente baseado em Markdown para orientar assistentes de IDE (como Antigravity, Cursor e Windsurf) a atuarem de forma transparente, estruturada e auditável.

## Como Usar
No chat do seu agente, utilize um dos seguintes comandos:
- `orquestrar: <objetivo>`: executa o ciclo completo (Fase 0 até Fase 6).
- `planejar: <objetivo>`: executa entrevista, planejamento e arquitetura (Fases 0 a 2).
- `analisar: <caminho>`: executa mapeamento estrutural e de dependências de código existente (Fase 0.5 / Brownfield), gerando o artefato `artifacts/codebase_analysis.md`.
- `continuar-run: runs/run-XXX`: retoma a execução pendente a partir do `state.json`.
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
1. Leia o arquivo `runs/run-XXX/state.json` (onde `XXX` é o identificador da run atual). Se for uma nova run, assuma `runs/run-001/` e inicie na Fase `0_interview`. Caso o comando seja `analisar: <caminho>`, crie a run, mapeie a base de código do caminho indicado e gere o artefato `artifacts/codebase_analysis.md` antes de prosseguir.
2. Identifique a propriedade `"current_phase"` (valores aceitos: `0_interview`, `1_planner`, `2_architect`, `3_builder`, `4_validator`, `5_reviewer`, `6_critic`, `completed`).
3. Abra e leia imediatamente as regras e especificações da fase ativa nos seguintes caminhos:
   - **Regras:** [RULES.md](phases/) -> `phases/<current_phase>/RULES.md`
   - **Contratos:** [CONTRACTS.md](phases/) -> `phases/<current_phase>/CONTRACTS.md`
4. Restrinja seus comportamentos apenas ao que for permitido no arquivo `RULES.md` e `CONTRACTS.md` da fase atual. Não execute tarefas de outras fases.

5. Antes da primeira ação, leia também os arquivos complementares:
   - **Princípios:** [SOUL.md](SOUL.md) — barreiras cognitivas, padrões de decisão e guardrails comportamentais.
   - **Ferramentas:** [TOOLS.md](TOOLS.md) — regras de uso de ferramentas, restrições de ambiente e validações automáticas.

*Consulte [HEARTBEAT.md](HEARTBEAT.md) para entender o ciclo de atualização e o formato do `state.json`.*
