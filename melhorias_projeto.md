# Melhorias do Protocolo AgentOrchestrix

Este documento apresenta uma análise crítica e sugestões de aprimoramento para o protocolo multiagente **AgentOrchestrix**, tendo como base os aprendizados obtidos na execução real da run de referência (`run-004`).

---

## 1. Mapeamento de Restrições Conflitantes (Fases 0, 1 e 2)

### O Problema
Na `run-004`, a restrição de **limite estrito de no máximo 100 linhas por arquivo de código** (definida na Fase 0) entrou em atrito direto com o desenvolvimento em React Vanilla sem estado global. Para manter o limite de linhas nos componentes, os arquivos foram muito divididos, o que forçou um padrão acentuado de *prop drilling* de callbacks de mutação (`updateTask`, `deleteTask`, `moveTask`) do topo até as folhas. Esse risco estrutural só foi formalmente apontado na Fase 6 (Critic), quando o código já estava concluído.

### Sugestão de Melhoria
* **Validação de Conflito de Constraints (Fase 2: Architect):** O arquivo de regras da Fase 2 (`phases/2_architect/RULES.md`) deve conter uma instrução explícita de "Análise de Atrito de Restrições".
  > **Nova Regra Proposta:** *Ao desenhar a arquitetura, o Architect deve correlacionar as decisões de escopo/tecnologia com as restrições (constraints) da Fase 0. Se houver restrições estritas de tamanho de arquivo (ex: <100 linhas), o Architect é obrigado a propor ferramentas de isolamento de estado (como Context API ou Zustand) para mitigar o acoplamento excessivo (prop drilling).*

---

## 2. Loop de Refatoração no Critic (Fase 6)

### O Problema
Atualmente, a Fase 6 (Critic) atua como um "fim de linha". O Critic avalia riscos arquiteturais, riscos ocultos e preocupações de manutenção futura, gera o artefato `critic.md` e a run é definida como `completed`. Os problemas graves apontados pelo Critic (como o estouro de cota do `localStorage` ou o próprio acoplamento de props) não possuem um caminho formal no protocolo para serem corrigidos dentro da mesma run.

### Sugestão de Melhoria
* **Fluxo de Retorno de Crítica (HEARTBEAT.md):** Alterar o fluxo de transições em `HEARTBEAT.md` para incluir um passo condicional de aprovação.
  > **Novo Fluxo Proposto:**
  > Se o Critic identificar um risco com severidade **Alta** ou preocupações de manutenção complexas, a run pode assumir o status de `waiting_for_user` com a opção de:
  > 1. Concluir a run (assumir estado `completed`).
  > 2. Retornar a run para a Fase `2_architect` ou `3_builder` com uma "Tarefa de Refatoração baseada no Critic", permitindo um ciclo de polimento estrutural antes da entrega final.

---

## 3. Validação Automatizada de Restrições e Contratos

### O Problema
A "Auditoria de Consistência" do `HEARTBEAT.md` hoje apenas verifica se os arquivos esperados de saída (ex: `validation_report.md`, `critic.md`) existem e não estão vazios. Ela não valida se as restrições acertadas na Fase 0 (como tamanho máximo de arquivo, tecnologias permitidas, presença de seções markdown obrigatórias) foram realmente seguidas pelo Builder.

### Sugestão de Melhoria
* **Linters de Contrato e Regras:** Introduzir ou descrever em `phases/4_validator/RULES.md` e `phases/5_reviewer/RULES.md` um passo obrigatório de validação sintática e semântica:
  1. **Tamanho de Arquivo:** Validar programaticamente se algum arquivo no diretório `generated/` excede o limite de linhas especificado nas constraints do `state.json`.
  2. **Estrutura de Markdown:** Garantir que todos os artefatos de documentação gerados contenham rigorosamente os cabeçalhos H1/H2 exigidos nos contratos de cada fase.

---

## 4. Mapeamento Prévio de Acessibilidade e Suporte Móvel (Fase 0: Interview)

### O Problema
No app gerado na `run-004`, a interface baseada em drag-and-drop nativo apresenta limitações críticas de usabilidade em celulares (touch). Esse "Risco Oculto" foi mapeado tardiamente.

### Sugestão de Melhoria
* **Ajuste na Entrevista Padrão:** O template ou guia de perguntas para a Fase 0 (`0_interview`) deve incluir uma pergunta padrão obrigatória sobre suporte a dispositivos móveis e acessibilidade (WCAG).
  > **Pergunta Exemplo:** *"A aplicação deve ser totalmente utilizável em telas touch/dispositivos móveis? Se sim, como planeja contornar limitações de drag-and-drop ou interações complexas de mouse?"*

---

## 5. Padronização de Scaffolds de Teste (DX e Qualidade)

### O Problema
Atualmente, as runs deixam a critério do Builder a inclusão ou não de testes automatizados unitários/de integração, fazendo com que a Fase 4 (Validator) muitas vezes se restrinja a rodar apenas o comando de build estático.

### Sugestão de Melhoria
* **Exigência de Testabilidade Mínima:** Definir nas diretrizes de código gerais (`skills/coding-guidelines.md`) que, para qualquer run de desenvolvimento, o Builder deve criar ao menos um arquivo de teste de fumaça (smoke test) ou teste de integração simples utilizando as ferramentas nativas ou sugeridas do ecossistema do projeto (ex: Vitest para React Vite, Jest para Vanilla).
