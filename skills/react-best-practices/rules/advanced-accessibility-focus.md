---
title: Focus trap inside interactive overlays and modals
impact: HIGH
impactDescription: Prevents keyboard navigation escaping modal boundaries to inactive UI elements behind overlay
tags: accessibility, focus, modal, wcag
---

## Focus trap inside interactive overlays and modals

When a modal, drawer, or dialog popup is active (`aria-modal="true"`), screen readers and keyboard-only users navigating with `Tab` should not be allowed to focus on background elements. Without a focus trap, users using keyboard tab navigation can exit the visible overlay boundaries and interact with elements hidden behind the backdrop. This creates confusion and breaks standard WCAG accessibility compliance.

**Incorrect (Modal component without focus lock):**

```javascript
import React from 'react';

export const TaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-modal="true">
        <h2>Add Task</h2>
        <input type="text" placeholder="Title" />
        <button onClick={onClose}>Save</button>
      </div>
    </div>
  );
};
```

**Correct (Modal component capturing and trapping Tab focus):**

```javascript
import React, { useEffect, useRef } from 'react';

export const TaskModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Get all focusable elements
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalElement.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element on mount
    firstElement?.focus();

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) { // Tab back
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else { // Tab forward
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef} role="dialog" aria-modal="true">
        <h2>Add Task</h2>
        <input type="text" placeholder="Title" />
        <button onClick={onClose}>Save</button>
      </div>
    </div>
  );
};
```

Reference: [W3C Modal Dialog Design Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)
