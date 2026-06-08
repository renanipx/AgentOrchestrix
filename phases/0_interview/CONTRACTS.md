# CONTRACTS — Fase 0: Entrevista e Alinhamento

## 1. Entradas (Input)
- Descrição da intenção do usuário no chat (`orquestrar: <objetivo>`).
- Perguntas formuladas pelo agente e respostas providas pelo usuário.

## 2. Saídas (Output)
- **`runs/run-XXX/input/goal.md`**: Arquivo consolidando o objetivo geral, as decisões tomadas e terminando com uma tabela de escopo binária (`✅ IN SCOPE` / `❌ OUT OF SCOPE`) detalhando cada funcionalidade desejada, incluindo a especificação de atalhos de teclado de forma individual e com as teclas correspondentes.
- **`runs/run-XXX/state.json`**: Atualização do campo `"interview_decisions"` com as respostas (linguagem, stack de tecnologia: `technology_stack`, escopo, aceitação, integrações, restrições, e os campos expandidos: `destructive_operations_strategy`, `storage_strategy`, `accessibility_level`, `max_lines_per_file`, `primary_language`, `typography_strategy`, `keyboard_shortcuts`).


