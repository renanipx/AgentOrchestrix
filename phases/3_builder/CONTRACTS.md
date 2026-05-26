# CONTRACTS — Fase 3: Builder Agent

## 1. Entradas (Input)
- `runs/run-XXX/artifacts/task.md`
- `runs/run-XXX/artifacts/architecture.md`

## 2. Saídas (Output)
- Código fonte funcional no repositório (`runs/run-XXX/generated/` ou conforme planejado).
- **`runs/run-XXX/artifacts/build_report.md`**: Documento contendo obrigatoriamente estas seções:
  ```markdown
  # Summary (Resumo do que foi construído)
  # Files Written (Lista de novos arquivos criados)
  # Files Modified (Lista de arquivos modificados, se houver)
  # Tests Added (Testes automatizados criados)
  # Validation Commands (Comandos determinísticos para rodar os testes/validações)
  # Known Limitations (Limitações conhecidas)
  ```
