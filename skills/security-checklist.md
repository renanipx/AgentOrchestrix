# Security Checklist

Diretrizes de segurança para mitigação de vulnerabilidades comuns no desenvolvimento de software, com foco em sanitização de dados e defesa em profundidade.

## 1. Sanitização de Dados Importados

Todo dado importado de fonte externa (como uploads JSON/CSV, parâmetros de URL, localStorage, APIs externas ou área de transferência) DEVE passar por um processo rigoroso de validação e limpeza antes de ser processado pela lógica da aplicação.

### 1.1 Prevenção contra Prototype Pollution (JS/TS)
Ao clonar, fundir ou parsear objetos dinâmicos obtidos de dados externos, você deve garantir que propriedades de protótipo de objetos em Javascript sejam limpas ou ignoradas para evitar poluição global de objetos.

**Propriedades a serem removidas ou proibidas:**
- `__proto__`
- `constructor`
- `prototype`

**Implementação Recomendada para parsing seguro:**
```javascript
function sanitizeData(input) {
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeData);
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(input)) {
    // Pula chaves perigosas de protótipo
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    sanitized[key] = sanitizeData(value);
  }
  return sanitized;
}
```

## 2. Validação de Tamanho e Tipo de Dados

- **Definição de Tipos e Esquemas:** Use validação de tipos em tempo de execução (como schemas Zod para TypeScript/JavaScript ou validações explícitas de tipo) para garantir que strings, números e booleanos correspondem ao formato esperado.
- **Buffer/String Limits (maxLength):** Limite explicitamente o tamanho de campos de texto. Strings excessivamente grandes podem travar o processador do JSON ou estourar a memória do navegador.

## 3. Prevenção contra Cross-Site Scripting (XSS)

- **Sanitização de HTML:** Nunca injete strings não sanitizadas de usuários diretamente no DOM usando métodos como `innerHTML` ou `document.write`. Preferir propriedades seguras como `textContent` ou `innerText`.
- **Uso de Ferramentas de Sanitização:** Se a renderização de elementos rich-text/HTML fornecidos pelo usuário for realmente necessária, utilize bibliotecas especializadas e atestadas, como o DOMPurify:
```javascript
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

## 4. Defesa em Profundidade

Mesmo que a linguagem ou framework em uso prometa proteção nativa (como a escapagem automática de JSX no React), o desenvolvedor deve assumir o pior caso e tratar os dados na entrada/persistência, adicionando camadas adicionais de validação.
