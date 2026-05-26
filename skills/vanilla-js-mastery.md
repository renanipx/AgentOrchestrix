# Vanilla JS Mastery

Este documento descreve as boas práticas arquiteturais e de resiliência ao construir aplicações utilizando Vanilla JS (sem frameworks).

## 1. Tratamento de Persistência Local (localStorage)
Nunca confie que os dados armazenados localmente estão íntegros. Ao invés de um parse direto, utilize blocos `try/catch` para prover um fallback amigável.

```javascript
// ❌ RUIM: Pode causar travamento se corrompido
const data = JSON.parse(localStorage.getItem("appState"));

// ✅ BOM: Trata falhas e previne quebra de UI
function getStoredState() {
  try {
    const rawData = localStorage.getItem("appState");
    return rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("Failed to parse appState", error);
    return null; // ou um estado padrão vazio
  }
}
```

## 2. Geração de Identificadores Seguros
Não utilize `Date.now()` para IDs. Requisições concorrentes ou loops síncronos irão gerar o mesmo timestamp, o que leva à colisão de chaves (IDs duplicados).

```javascript
// ❌ RUIM: Propensão à colisão
const newId = Date.now().toString();

// ✅ BOM: Uso da Web Crypto API para UUIDs reais
const newId = crypto.randomUUID();
```

## 3. Performance de Eventos Contínuos
Ouvintes de eventos que disparam várias vezes por segundo (`scroll`, `resize`, `mousemove`, `dragover`) devem **sempre** ser controlados utilizando `throttle` (se o feedback precisar ser constante) ou `debounce` (se só deve executar após a pausa).

```javascript
// Exemplo de Throttle (útil para dragover e scroll)
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

element.addEventListener('dragover', throttle(handleDragOver, 30));
```

## 4. Renderização Atômica vs Destrutiva
Nunca jogue fora o DOM inteiro para uma mudança de estado pequena. Substituir tudo com `innerHTML` de uma div raiz ou reconstruir a UI causa:
- Lentidão massiva
- Perda de "focus" de inputs
- Re-trigger de reflow e repaint em elementos não-afetados.

Ao invés disso, atualize apenas o que mudou (busque os nós existentes e altere o `textContent`, `classList` ou `value`).
