# CONTRACTS — Fase 0: Entrevista e Alinhamento

## 1. Entradas (Input)
- Descrição da intenção do usuário no chat (`orquestrar: <objetivo>`).
- Perguntas formuladas pelo agente e respostas providas pelo usuário.

## 2. Saídas (Output)
- **`runs/run-XXX/input/goal.md`**: Arquivo consolidando o objetivo geral e as decisões tomadas.
- **`runs/run-XXX/state.json`**: Atualização do campo `"interview_decisions"` com as respostas (linguagem, escopo, aceitação, integrações, restrições, e os novos campos: `destructive_operations_strategy`, `storage_strategy`, `accessibility_level`, `max_lines_per_file`).
