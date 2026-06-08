# Build Validation Checklist

Este guia define as validações automáticas, estruturais e de qualidade que o Validator (Fase 4) e o Builder (Fase 3) devem executar no código-fonte do projeto para garantir a conformidade técnica.

---

## 1. Web, HTML & SEO

### 1.1 Verificação de Metatags e Idioma
- **Arquivo Alvo:** `index.html` (ou arquivo de entrada principal).
- **Checks Obrigatórios:**
  - O elemento `<html lang="...">` deve existir e conter o idioma correto correspondente ao definido na entrevista da Fase 0 (ex: `lang="pt-BR"`).
  - O elemento `<title>` deve existir e conter o nome específico do projeto. Textos padrão ou gerados automaticamente (ex: "generated", "Vite App", "React App") são expressamente proibidos.
  - O elemento `<meta name="description" content="...">` deve existir e descrever de forma concisa e relevante a aplicação.

*Comando de Validação Sugerido:*
```powershell
# Buscar tags SEO
grep_search -Query "<title>" -SearchPath "<run_generated_path>"
grep_search -Query "name=\"description\"" -SearchPath "<run_generated_path>"
```

### 1.2 Correspondência de Fontes e Assets Externos
- **Check Obrigatório:**
  - Para cada fonte tipográfica customizada declarada nos arquivos de estilo CSS via `font-family` (ex: `Outfit`, `Inter`, `Poppins`), deve existir um elemento `<link>` ou tag `<style>` correspondente no HTML que efetue o carregamento da fonte (via Google Fonts ou outro CDN confiável).
  - Fontes declaradas mas não carregadas constituem falha estrutural.
  - **Check Bidirecional:** Para cada fonte carregada via `<link>` no HTML (ex: Google Fonts), deve existir ao menos uma referência a essa fonte em `font-family` nos arquivos CSS. Fontes carregadas mas nunca referenciadas no CSS constituem falha estrutural (recursos desperdiçados e latência desnecessária).

*Comando de Validação Sugerido:*
```powershell
# Buscar declarações de fontes no CSS
grep_search -Query "font-family" -SearchPath "<run_generated_path>"
```

---

## 2. TypeScript & Qualidade de Código Geral

### 2.1 Tipagem Estrita (TypeScript)
- **Check Obrigatório:**
  - O uso de casting forçado para `as any` é proibido em arquivos `.ts` e `.tsx`.
  - Preferir tipos explícitos, Union Types ou Type Guards (`if (isType(x))`).

*Comando de Validação Sugerido:*
```powershell
# Buscar por "as any"
grep_search -Query "as any" -SearchPath "<run_generated_path>"
```

### 2.2 Geração de IDs Únicos
- **Check Obrigatório:**
  -IDs gerados no cliente não devem utilizar geradores simples e inseguros baseados apenas em tempo/estatística simples (como `Date.now()` ou `Math.random()`).
  - IDs devem ser gerados de forma robusta por APIs dedicadas, como `crypto.randomUUID()` ou bibliotecas específicas (como `uuid`).

*Comando de Validação Sugerido:*
```powershell
# Buscar geradores fracos
grep_search -Query "Date.now()" -SearchPath "<run_generated_path>"
grep_search -Query "Math.random()" -SearchPath "<run_generated_path>"
```

### 2.3 Tratamento de Persistência e Logs
- **Check Obrigatório:**
  - Operações de escrita persistente (como `localStorage.setItem` ou conexões com APIs) que possuam blocos de captura de erros `catch` não podem apenas logar no console (`console.error`/`console.warn`). Elas devem disparar alguma notificação visual na UI (toast, modal, banner) para manter o usuário informado.

*Comando de Validação Sugerido:*
```powershell
# Buscar tratamentos de erro silenciosos
grep_search -Query "console.error" -SearchPath "<run_generated_path>"
```

---

## 3. Interfaces & Frameworks (React/Next.js)

### 3.1 Imports de React Desnecessários
- **Check Obrigatório:**
  - Em ambientes modernos com React 17+ (JSX Transform ativo), imports explícitos de `React` (ex: `import React from 'react'`) em arquivos apenas com JSX são desnecessários e devem ser limpos, exceto quando hooks específicos são carregados a partir dele (ex: `import React, { useState } ...`).

*Comando de Validação Sugerido:*
```powershell
# Buscar imports desnecessários
grep_search -Query "import React from" -SearchPath "<run_generated_path>"
```

### 3.2 Dependency Arrays de Hooks Estáveis
- **Check Obrigatório:**
  - Verifique se callbacks ou funções passados para dependency arrays de hooks como `useEffect`, `useMemo` ou `useCallback` são estáveis (estabilizados via `useCallback` ou armazenados em `useRef`). Funções recriadas a cada renderização causam loops de efeitos colaterais e problemas de performance.

---

## 4. UX e CSS (Visual)

### 4.1 Pares de Animações
- **Check Obrigatório:**
  - Componentes dinâmicos que exibem animação na entrada (ex: fade-in, slide-in) devem obrigatoriamente possuir uma animação de saída correspondente e suave (ex: fade-out, slide-out) antes de sua remoção/desaparecimento do DOM. Desaparecimentos bruscos constituem falha de UX.

### 4.2 Controles Visuais Responsivos
- **Check Obrigatório:**
  - Ações secundárias exibidas em hover em tabelas ou cards (como botões de exclusão ou edição) devem suportar dispositivos touch. Verifique a existência de diretivas `@media (hover: none)` garantindo que controles de hover sejam sempre visíveis em telas touch.

---

## 5. Build Output & Bundle Analysis

### 5.1 Registro de Tamanho do Bundle
- **Check Obrigatório:**
  - O `validation_report.md` DEVE registrar o tamanho total do bundle JS e CSS (raw e gzip) conforme saída do build de produção.
  - Se a run for uma iteração de uma run anterior com o mesmo objetivo, o Validator DEVE comparar os tamanhos e justificar qualquer aumento > 5%.

### 5.2 Verificação de Dead Code
- **Check Recomendado:**
  - Buscar imports não utilizados com análise do build output (módulos transformados vs módulos declarados).

---

## 6. Interações Compostas (Múltiplos Níveis Hierárquicos)

Esta seção é ativada quando `"complex_interactions"` estiver preenchido em `interview_decisions`. Os checks abaixo devem ser executados usando os contratos declarados na seção `# Technical Contracts Checklist` do `architecture.md` como referência de verdade, adaptando os comandos ao stack e linguagem do projeto.

### 6.1 Verificação de Pontos de Ativação

- **Check Obrigatório:** Para cada nível de interação contratado, verificar que o ponto de ativação da interação (ex: o elemento que inicia um gesto, clique ou foco) está implementado exclusivamente no elemento especificado no contrato — sem escapar para containers pai ou filhos não-intencionados.

*Abordagem de Validação:*
```
grep_search pelo identificador do ponto de ativação (ex: atributo, event handler, classe)
em todos os arquivos de componente, verificando que aparece apenas nos elementos corretos.
```

### 6.2 Verificação de Mecanismos de Isolamento

- **Check Obrigatório:** Para cada par de níveis interativos, verificar que o mecanismo de isolamento especificado no contrato está presente e ativo no código — impedindo que a interação de um nível propague ou ative handlers de outro nível.

*Critério de PASS:* O mecanismo de isolamento (ex: bloqueio de propagação, condição de guarda, verificação de metadado) está presente e é chamado antes de qualquer processamento de evento no nível filho.

### 6.3 Verificação de Identificação de Tipo

- **Check Obrigatório:** Para cada handler de resposta a interações, verificar que existe verificação do tipo ou origem do evento antes de processá-lo — garantindo que o handler do nível correto processa apenas eventos que lhe pertencem.

*Critério de PASS:* Toda função de resposta a interação verifica a origem ou tipo do evento como primeira condição, antes de executar lógica de negócio.

*Nota: Os comandos exatos de grep ou inspeção dependem do stack tecnológico. O Validator deve derivá-los dos contratos do `architecture.md` e adaptar ao padrão do projeto (ex: atributos HTML5 para DnD nativo, event.target para eventos de DOM, tipos de dados para mensagens em sistemas de comunicação).*
