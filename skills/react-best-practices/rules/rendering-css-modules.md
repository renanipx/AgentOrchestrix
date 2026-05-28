---
title: Scope styling to components using CSS Modules
impact: MEDIUM
impactDescription: Prevents styling conflicts and class namespace collisions across components in scaling applications
tags: styling, css-modules, rendering
---

## Scope styling to components using CSS Modules

Using purely global CSS stylesheets (e.g., `/styles/global.css`) forces developers to maintain a single global namespace. As components scale, the likelihood of two unrelated components utilizing the same CSS class names (such as `.card`, `.button`, `.active`) increases, resulting in cascade issues, unintended styles, and visual regression bugs. Leveraging CSS Modules scopes style selectors locally by generating unique class names.

**Incorrect (Using global CSS classes susceptible to namespace collision):**

```css
/* /src/styles/TaskCard.css */
.card {
  border: 1px solid #ccc;
  padding: 1rem;
}
.button {
  background: blue;
}
```

```javascript
// TaskCard.jsx
import React from 'react';
import '../styles/TaskCard.css'; // Globally loaded styles

export const TaskCard = () => {
  return (
    <div className="card">
      <button className="button">Action</button>
    </div>
  );
};
```

**Correct (Scoping with CSS Modules):**

```css
/* /src/components/TaskCard.module.css */
.card {
  border: 1px solid #ccc;
  padding: 1rem;
}
.button {
  background: blue;
}
```

```javascript
// TaskCard.jsx
import React from 'react';
import styles from './TaskCard.module.css'; // Locally scoped styles

export const TaskCard = () => {
  return (
    <div className={styles.card}>
      <button className={styles.button}>Action</button>
    </div>
  );
};
```

Reference: [Vite CSS Modules Support](https://vite.dev/guide/features.html#css-modules)
