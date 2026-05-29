# CONTRACTS — Fase 5: Reviewer Agent

## 1. Entradas (Input)
- `task.md`
- `architecture.md`
- `build_report.md`
- `validation_report.md`
- Código fonte implementado.

## 2. Saídas (Output)
- **`runs/run-XXX/artifacts/review.md`**: Documento contendo obrigatoriamente estas seções:
  ```markdown
  # Verdict (Aprovado / Reprovado / Precisa de Ajustes)
  # Requirements Coverage (Quão bem os requisitos foram atendidos)
  # Architecture Alignment (Alinhamento com o plano de arquitetura)
  # Syntax And Test Check (Resultado da análise estática e execução de testes)
  # UX Compliance (Conformidade de UX: formulários, empty states, feedback de erro)
  # Issues (Lista de problemas identificados)
  # Recommendation (Recomendações e próximos passos)
  ```
