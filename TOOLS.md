# TOOLS — Controle de Capacidades e Ferramentas

Este arquivo regula como a IDE utiliza suas ferramentas nativas no ciclo do AgentOrchestrix para garantir rastreabilidade, economia de tokens e eficácia operacional.

## 1. Regras de Uso de Ferramentas
- **Visualização de Arquivos (`view_file`):** Sempre prefira ferramentas nativas de visualização de arquivos à execução de comandos como `cat` no terminal.
- **Pesquisa Local (`grep_search`):** Utilize pesquisas nativas da IDE para buscar referências de código e termos específicos, evitando rodar buscas com `find` ou `grep` por terminal.
- **Escrita e Edição (`write_to_file`/`replace_file_content`):** Modifique arquivos usando ferramentas de substituição direcionadas para evitar reescrever trechos gigantescos desnecessariamente.

---

## 2. Restrições e Ambiente
- **Sem Loops de Polling:** Nunca crie scripts ou comandos que executem em loops infinitos esperando por eventos. Use o agendador nativo da IDE ou pare a execução até o usuário dar input.
- **Comandos não interativos:** Ao rodar instalações ou builds, sempre garanta flags que desativem prompts interativos (ex: `npm install -y`, `npx -y ...`).
- **Limpeza:** Nunca gere arquivos temporários fora das pastas `runs/run-XXX/` da execução ativa ou dos diretórios de cache autorizados da IDE.

---

## 3. Validações Automáticas (Checklist de Ferramentas)
Ao concluir a fase de Build (Fase 3) ou iniciar a fase de Validação (Fase 4), o agente DEVE executar automaticamente as verificações estruturais e de qualidade utilizando suas ferramentas nativas.

As regras de validação específicas de cada tecnologia, incluindo comandos de busca e conformidade do código gerado, estão catalogadas no documento [build-validation-checklist.md](file:///d:/projetos/AgentOrchestrix/skills/build-validation-checklist.md). O Validator e o Builder devem carregar e seguir esta lista para auditoria automática do stack do projeto.

---

## 4. Verificação Cruzada (Artefato ↔ Código)
Quando um artefato de documentação (`architecture.md`, `review.md`, `critic.md`) faz uma afirmação técnica sobre o código (ex: "React.memo aplicado no componente X", "contexto chamado BoardContext"), o agente DEVE utilizar `grep_search` para validar que a afirmação é factually verdadeira antes de incluí-la no artefato.

**Exemplos de verificações obrigatórias:**
- Nomes de arquivos/componentes listados no `architecture.md` → verificar com `list_dir`
- Claims de uso de `React.memo`, `useCallback`, `useMemo` → verificar com `grep_search`
- Nomes de contextos React → verificar exportações com `grep_search`
- Estrutura de pastas declarada → verificar com `list_dir`

Se a verificação falhar, o agente DEVE corrigir o artefato para refletir a realidade do código, ou corrigir o código para atender o artefato — nunca deixar a divergência.

