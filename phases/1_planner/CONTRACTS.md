# CONTRACTS — Fase 1: Planner Agent

## 1. Entradas (Input)
- `runs/run-XXX/input/goal.md`
- `runs/run-XXX/state.json` (`interview_decisions`)

## 2. Saídas (Output)
- **`runs/run-XXX/artifacts/task.md`**: Documento em markdown contendo obrigatoriamente estas seções:
  ```markdown
  # Goal (Objetivo Geral)
  # Requirements (Requisitos Funcionais)
  # Constraints (Restrições Técnicas)
  # Edge Cases (Casos Limite e Fluxos Destrutivos)
  # Deliverables (Entregáveis esperados)
  # Acceptance Criteria (Critérios de Aceitação)
  ```
- **`runs/run-XXX/artifacts/planning_summary.md`**: Documento de síntese do planejamento, obrigatório para que o Architect e o Builder tenham contexto estratégico suficiente. Deve conter as seguintes seções:
  ```markdown
  # Planning Summary (Síntese do Planejamento)
  # Scope Boundaries (O que está dentro e fora do escopo desta run)
  # Risk Assumptions (Premissas que podem invalidar o plano)
  # Test Strategy (Quais comportamentos serão testados e de que forma)
  ```

  A seção `Test Strategy` é especialmente crítica: ela define — antes do Builder começar — quais comportamentos serão cobertos por testes, tornando a cobertura um compromisso de escopo e não uma decisão tardia do Builder.

