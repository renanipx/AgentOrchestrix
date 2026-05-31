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

### 1.2 Protocolo de Auto-Validação de Transição
Antes de modificar o campo `"current_phase"` no `state.json`, o agente DEVE imprimir no chat um bloco markdown contendo a seguinte lista de verificação preenchida:
```markdown
### 🔍 Auto-Auditoria de Transição: [Fase_Atual] -> [Próxima_Fase]
- [ ] Todos os artefatos de saída exigidos pelo CONTRACTS.md foram gerados e salvos? (Listar caminhos físicos)
- [ ] Fiz uma leitura completa do state.json final para garantir sintaxe JSON válida (sem vírgulas sobressalentes, aspas fechadas)?
- [ ] O array "completed_phases" foi atualizado com a fase que estou encerrando?
- [ ] O campo "updated_at" foi preenchido com o timestamp atual?
```
*Nota: Se qualquer check for falso, a transição está bloqueada e o agente deve corrigir o problema antes de salvar o `state.json`.*

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
    "constraints": null,
    "destructive_operations_strategy": null,
    "storage_strategy": null,
    "accessibility_level": null,
    "max_lines_per_file": null,
    "primary_language": null,
    "typography_strategy": null,
    "keyboard_shortcuts": null
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
  "prevention_guardrails": [],
  "loaded_skills": [],
  "quality_score": {
    "visual": null,
    "ux": null,
    "functionality": null,
    "code_quality": null,
    "tests": null,
    "security": null
  },
  "errors": [],
  "updated_at": "YYYY-MM-DDTHH:mm:ssZ"
}
```

### 4.1 Retrocompatibilidade (Backward Compatibility)
Para garantir compatibilidade com runs legadas, se o `state.json` lido pelo agente não possuir alguns dos novos campos em `interview_decisions` (como `destructive_operations_strategy`, `storage_strategy`, `accessibility_level`, `max_lines_per_file`) ou o campo `"loaded_skills"`, o agente deve tratá-los como opcionais ou assumir valor default `null` (e `[]` para `loaded_skills`) para evitar falha catastrófica no parse ou na transição de fases.


### 4.2 Guardrails de Prevenção (`prevention_guardrails`)
O array `prevention_guardrails` registra quais guardrails preventivos foram aplicados durante a run. Cada entrada é uma string descritiva (ex: `"SEO_META_TAGS"`, `"FONT_LOADING_VERIFIED"`, `"SANITIZATION_APPLIED"`). Isso permite auditoria retroativa e melhoria contínua do protocolo.

#### Enforcement de Guardrails
Cada guardrail registrado no array DEVE ter um check de verificação programático associado no [build-validation-checklist.md](file:///d:/projetos/AgentOrchestrix/skills/build-validation-checklist.md). Guardrails sem check programático correspondente NÃO PODEM ser registrados — isso previne guardrails declarativos sem enforcement real. A tabela de mapeamento é:

| Guardrail | Check obrigatório |
|-----------|-------------------|
| `STRICT_TYPES_NO_ANY` | `grep "as any"` retorna 0 ocorrências em `src/` |
| `SECURE_UUID_GENERATION` | `grep "Date.now()\|Math.random()"` retorna 0 ocorrências |
| `SEO_META_TAGS` | `grep "<title>"` + `grep "name=\"description\""` presentes |
| `FONT_LOADING_VERIFIED` | Fontes no CSS possuem `<link>` correspondente no HTML |
| `PERSISTENCE_ERRORS_UI_HANDLED` | Todo `catch` com `localStorage` possui chamada a toast/modal |
| `FILE_SIZE_LIMIT_COMPLIANCE` | Todos os componentes possuem < N linhas |

### 4.3 Score de Qualidade (`quality_score`)
O objeto `quality_score` é preenchido progressivamente pelas fases de validação (4), revisão (5) e crítica (6). Cada dimensão recebe uma nota de 0 a 10 com base na rubrica abaixo. Notas iguais ou superiores a 8 DEVEM ter justificativa explícita no artefato correspondente.

#### Rubrica de `tests`:
| Nota | Critério |
|------|----------|
| 0-3  | Sem testes ou apenas smoke test básico |
| 4-5  | Testes cobrem < 40% das funções/utilitários |
| 6-7  | Testes cobrem 40-70% das funções, sem testes de componentes |
| 8-9  | Testes cobrem > 70% incluindo integração ou componentes |
| 10   | Cobertura > 90% com testes E2E ou visuais |

#### Rubrica de `code_quality`:
| Nota | Critério |
|------|----------|
| 0-3  | Múltiplas violações de guardrails (`as any`, lógica duplicada) |
| 4-5  | 1-2 violações menores, estrutura básica respeitada |
| 6-7  | Zero violações, memoização parcial, modularização ok |
| 8-9  | Zero violações, memoização completa, performance otimizada |
| 10   | Zero violações + AST/lint limpo + bundle analysis realizado |

#### Rubrica de `security`:
| Nota | Critério |
|------|----------|
| 0-3  | Sem sanitização ou validação de dados externos |
| 4-5  | Validação de schema presente, sem sanitização |
| 6-7  | Schema + sanitização presente, sem testes de segurança |
| 8-9  | Schema + sanitização + testes de segurança + XSS mitigado |
| 10   | Tudo anterior + auditoria com ferramenta externa |

