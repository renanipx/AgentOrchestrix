# HEARTBEAT — Loop de Execução e Consistência

Este arquivo define como a IDE deve ciclar pelas fases, atualizar o estado e gerenciar o histórico de execução.

## 1. Loop de Execução (Transições)
O ciclo de vida do AgentOrchestrix consiste em 7 fases ordenadas:
`0_interview` -> `1_planner` -> `2_architect` -> `3_builder` -> `4_validator` -> `5_reviewer` -> `6_critic` -> `completed` (ou `waiting_for_user`).

A IDE deve ler e escrever o arquivo `runs/run-XXX/state.json` para persistir o progresso. A cada mudança de estado:
1. Conclua os entregáveis exigidos pelo contrato da fase atual.
2. Realize a **Auditoria de Consistência** (ver seção 2).
3. Modifique o campo `"current_phase"` para a próxima fase.
4. Adicione a fase anterior na lista `"completed_phases"`.
5. Atualize o campo `"updated_at"` com o timestamp ISO 8601 correspondente.

### 1.1 Fluxo de Retorno de Crítica (Fase 6)
Se a fase atual for a `6_critic` e o Critic identificar um risco com severidade **Alta** ou preocupações de manutenção complexas (como limites estritos de arquivos, acoplamento, armazenamento), a run DEVE assumir o status de `waiting_for_user`. O usuário terá a opção de:
1. Concluir a run (assumir estado `completed`).
2. Retornar a run para a Fase `2_architect` ou `3_builder` com uma "Tarefa de Refatoração baseada no Critic", permitindo um ciclo de polimento estrutural antes da entrega final.

---

## 2. Auditoria de Consistência
Antes de avançar para a próxima fase, a IDE deve obrigatoriamente verificar se todos os arquivos descritos como saída no `CONTRACTS.md` da fase atual foram gerados e não estão vazios.
- Se algum artefato estiver ausente ou inconsistente, a transição **deve ser abortada**.
- O status da run em `state.json` deve ser alterado para `"blocked"` ou `"failed"`.
- Um erro descritivo deve ser inserido no array `"errors"` no `state.json`.
- O agente deve solicitar intervenção ao usuário antes de tentar prosseguir.

---

## 3. Estrutura da Run (`runs/`)
Todo o ciclo de trabalho de uma run é armazenado em `runs/run-XXX/`:
- `state.json`: Arquivo de controle de estado.
- `input/`: Diretório para inputs iniciais (ex: `goal.md`).
- `artifacts/`: Onde ficam os artefatos das fases (`task.md`, `architecture.md`, etc.).
- `generated/`: Código-fonte, testes e scaffolds produzidos pelo Builder.
- `logs/`: Logs de auditoria das ferramentas.

---

## 4. Contrato do `state.json`
O arquivo JSON deve seguir este formato:
```json
{
  "run_id": "run-XXX",
  "command": "orquestrar",
  "goal": "Descrição do objetivo",
  "status": "created | waiting_for_user | running | blocked | failed | completed",
  "current_phase": "0_interview",
  "completed_phases": [],
  "interview_decisions": {
    "language_runtime": null,
    "scope": null,
    "acceptance_criteria": null,
    "integrations_data": null,
    "constraints": null
  },
  "artifacts": {
    "goal": "input/goal.md",
    "task": "artifacts/task.md",
    "architecture": "artifacts/architecture.md",
    "build_report": "artifacts/build_report.md",
    "validation_report": "artifacts/validation_report.md",
    "review": "artifacts/review.md",
    "critic": "artifacts/critic.md"
  },
  "errors": [],
  "updated_at": "YYYY-MM-DDTHH:mm:ssZ"
}
```
