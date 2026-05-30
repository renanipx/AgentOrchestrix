---
name: coding-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, modifying, or reviewing code — implementation tasks, code changes, refactoring, bug fixes, or feature development. Do NOT use for architecture design, documentation, or non-code tasks.
metadata:
  author: ale
  version: '1.0.0'
  source: 'Karpathy Guidelines'
---

# Coding Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. These principles bias toward caution over speed—for trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them—don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- Disagree honestly. If the user's approach seems wrong, say so—don't be sycophantic.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it—don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Exigência de Testabilidade Mínima

**Provas tangíveis superam "parece que funciona".**

Para qualquer run de desenvolvimento de software, você DEVE criar ao menos um arquivo de teste de fumaça (smoke test) ou teste de integração simples utilizando as ferramentas nativas ou sugeridas do ecossistema do projeto (ex: Vitest para React Vite, Jest para Vanilla, XUnit para .NET).
Nunca confie apenas em análises estáticas ou builds visuais quando uma funcionalidade crítica puder ser validada com um script de teste simples.

## 6. Práticas Técnicas de Linguagem & Tipagem (TS/JS)

- **Tipagem Estrita (TypeScript):** É expressamente proibido o uso de casting forçado para `as any` em arquivos `.ts` ou `.tsx`. Você deve utilizar tipos explícitos, tipos union (ex: `as Category | 'all'`) ou asserções controladas com guards (`if (isType(value))`) para manter a segurança do compilador.
- **Identificadores Únicos e Seguros:** Para a geração de chaves primárias e IDs de entidades no cliente (ex: IDs de tarefas, colunas), não utilize timestamps simples ou geradores baseados em probabilidade simples como `Date.now()` ou `Math.random()`. Você deve utilizar APIs criptograficamente seguras como `crypto.randomUUID()` (suportada por browsers modernos e Node.js) ou a biblioteca recomendada pelo stack (ex: `uuid`).
- **Limites de Entrada (maxLength):** Todo campo de entrada textual (como `<input type="text">` ou `<textarea>`) deve conter a propriedade `maxLength` declarada com limites razoáveis de acordo com a regra de negócio (ex: 100 caracteres para títulos, 1000-2000 para descrições). Isso evita buffer overflows visuais e protege o parseador de dados.
