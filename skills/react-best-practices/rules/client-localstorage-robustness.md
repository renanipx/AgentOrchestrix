---
title: Robust localStorage persistence with error handling and debouncing
impact: HIGH
impactDescription: Prevents QuotaExceededError crashes and blocks on UI threads during high-frequency writes
tags: persistence, client-side, localStorage, debounce
---

## Robust localStorage persistence with error handling and debouncing

Writing to `localStorage` is a synchronous, blocking I/O operation. If executed inside a component effect on every minor state update (e.g., ticking subtasks, moving nodes, dragging elements), it can degrade UI responsiveness. Furthermore, modern browsers limit `localStorage` capacity (typically ~5MB); writing huge payloads (like base64 assets or large state arrays) without error handling can throw a fatal `QuotaExceededError` that crashes the application thread.

**Incorrect (Synchronous, unhandled localStorage write on every update):**

```javascript
import React, { useEffect, useState } from 'react';

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Runs synchronously on every single state change, blocking UI thread.
  // Will crash the React app if QuotaExceededError is thrown.
  useEffect(() => {
    localStorage.setItem('orchestrix_tasks', JSON.stringify(tasks));
  }, [tasks]);

  return <Context.Provider value={{ tasks, setTasks }}>{children}</Context.Provider>;
};
```

**Correct (Debounced localStorage write with error catching):**

```javascript
import React, { useEffect, useState } from 'react';

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Debounces the write to prevent excessive I/O and wraps in a try-catch block
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem('orchestrix_tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to persist tasks to localStorage:', error);
        // Inform user or fallback gracefully
      }
    }, 500); // 500ms debounce window

    return () => clearTimeout(handler);
  }, [tasks]);

  return <Context.Provider value={{ tasks, setTasks }}>{children}</Context.Provider>;
};
```

Reference: [Window.localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
