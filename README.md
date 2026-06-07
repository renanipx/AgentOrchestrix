# 🤖 AgentOrchestrix

O **AgentOrchestrix** é um protocolo multiagente baseado em Markdown projetado para guiar assistentes de inteligência artificial em ambientes de IDE (como Antigravity, Cursor, Windsurf) a trabalharem de forma transparente, robusta, auto-corrigível e auditável.

Ao estruturar a execução da IA em **fases bem definidas** com contratos de entrada e saída (CONTRACTS) e regras estritas por fase (RULES), o protocolo reduz alucinações, mitiga o viés de auto-elogio e garante alta qualidade no código entregue.

---

## 🚀 Como Usar

No chat da sua IDE, invoque os comandos do protocolo:

* **`orquestrar: <objetivo>`**: Executa o ciclo completo de desenvolvimento (Fase 0 até a Fase 6 e conclusão).
* **`planejar: <objetivo>`**: Executa a entrevista, planejamento e arquitetura (Fases 0 a 2), gerando um sumário de planejamento consolidado.
* **`analisar: <caminho>`**: Mapeia uma base de código existente (projeto brownfield) antes de planejar modificações.
* **`continuar-run: runs/run-XXX`**: Retoma uma execução interrompida de forma consistente usando o estado persistido.
* **`validar-run: runs/run-XXX`**: Revalida uma run a partir da Fase 4 (Validator) usando os logs e testes.

---

## 🗺️ O Ciclo de Fases

O protocolo opera através das seguintes fases, gerenciando o progresso no arquivo `runs/run-XXX/state.json`:

```mermaid
flowchart TD
    F0["0_interview<br/>(Entrevista)"] --> F1["1_planner<br/>(Requisitos)"]
    F1 --> F2["2_architect<br/>(Arquitetura)"]
    F2 --> F3["3_builder<br/>(Codificação)"]
    F3 --> F4["4_validator<br/>(Testes & Lint)"]
    F4 --> F5["5_reviewer<br/>(Clean Code)"]
    F5 --> F6["6_critic<br/>(Crítica de Risco)"]
    F6 -->|Sem riscos altos| DONE["completed<br/>(Concluído)"]
    F6 -->|Risco ALTO| WAIT["waiting_for_user<br/>(Aguardando)"]
    WAIT -->|Refatorar| F2
    WAIT -->|Aprovar e Concluir| DONE
    F4 -->|Falha (Rollback)| F3
    F5 -->|Falha de Arquitetura (Rollback)| F2
    F5 -->|Falha de Código (Rollback)| F3
```

---

## 📂 Estrutura do Repositório

```
AgentOrchestrix/
├── AGENTS.md                   # Instruções globais e comandos para a IDE
├── HEARTBEAT.md                # Regras de ciclo de vida, transições e rollback
├── SOUL.md                     # Princípios cognitivos, barreiras e segurança
├── TOOLS.md                    # Regras de uso de ferramentas nativas da IDE
├── README.md                   # Documentação principal para humanos
├── phases/                     # Definições de fases do protocolo
│   ├── 0_interview/
│   │   ├── RULES.md
│   │   └── CONTRACTS.md
│   └── ...
├── schemas/                    # Schemas de validação de dados
│   └── state.schema.json       # JSON Schema para o arquivo state.json
├── skills/                     # Guias técnicos especializados (carregamento sob demanda)
│   ├── manifest.json           # Manifesto central de skills
│   ├── coding-guidelines.md    # Melhores práticas de estilo e complexidade
│   ├── build-validation-checklist.md  # Scripts e queries de validação de build
│   └── ...
├── templates/                  # Templates reutilizáveis
│   └── run-template/           # Scaffold inicial de uma run
└── runs/                       # Histórico e memória das execuções (gitignored)
    └── run-001/
        ├── state.json          # Arquivo de estado
        ├── input/              # Entradas da run
        ├── artifacts/          # Documentos gerados pelas fases
        ├── generated/          # Código fonte do projeto gerado
        └── logs/               # Logs de execução e teste
```

---

## ⚙️ Configuração

1. Copie todo o conteúdo deste repositório para o root do seu workspace.
2. Adicione o conteúdo do arquivo [AGENTS.md](AGENTS.md) nas configurações de instruções customizadas (System Prompts) do seu assistente de IDE.
3. Inicie sua primeira orquestração com o comando `orquestrar: <seu objetivo>`.

Para detalhes avançados sobre o comportamento dos agentes, consulte [AGENTS.md](AGENTS.md).
