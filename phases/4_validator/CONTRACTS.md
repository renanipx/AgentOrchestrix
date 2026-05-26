# CONTRACTS — Fase 4: Validator Stage

## 1. Entradas (Input)
- `runs/run-XXX/artifacts/build_report.md`
- Arquivos de código gerados no repositório.

## 2. Saídas (Output)
- **`runs/run-XXX/artifacts/validation_report.md`**: Documento contendo obrigatoriamente estas seções:
  ```markdown
  # Summary (Status geral de sucesso ou falha)
  # Commands Executed (Quais comandos foram disparados)
  # Results (Logs e saídas de sucesso)
  # Failures (Logs e saídas de erro / testes quebrados)
  # Skipped Checks (O que foi ignorado e o motivo)
  ```
