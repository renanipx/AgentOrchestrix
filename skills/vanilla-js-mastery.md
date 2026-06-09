# Vanilla JS Mastery

This document describes architectural and resilience best practices when building applications using Vanilla JS (without frameworks).

## 1. Local Persistence Handling (localStorage)
Never assume that locally stored data is integral. Instead of a direct parse, use `try/catch` blocks to provide a friendly fallback.

```javascript
// ❌ BAD: Can cause crashes if corrupted
const data = JSON.parse(localStorage.getItem("appState"));

// ✅ GOOD: Handles failures and prevents UI crash
function getStoredState() {
  try {
    const rawData = localStorage.getItem("appState");
    return rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("Failed to parse appState", error);
    return null; // or a default empty state
  }
}
```

## 2. Secure Identifiers Generation
Do not use `Date.now()` for IDs. Concurrent requests or synchronous loops will generate the same timestamp, leading to key collisions (duplicate IDs).

```javascript
// ❌ BAD: Prone to collision
const newId = Date.now().toString();

// ✅ GOOD: Use Web Crypto API for real UUIDs
const newId = crypto.randomUUID();
```

## 3. Continuous Event Performance
Event listeners that fire multiple times per second (`scroll`, `resize`, `mousemove`, `dragover`) must **always** be controlled using `throttle` (if feedback must be constant) or `debounce` (if it should only execute after a pause).

```javascript
// Throttle Example (useful for dragover and scroll)
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

## 4. Atomic vs Destructive Rendering
Never discard the entire DOM for a small state change. Replacing everything with `innerHTML` from a root div or rebuilding the UI causes:
- Massive performance hit
- Loss of input focus
- Re-triggering reflow and repaint on unaffected elements.

Instead, update only what changed (look up existing nodes and alter their `textContent`, `classList`, or `value`).
