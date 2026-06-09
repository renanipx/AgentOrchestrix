# Skill: Drag-and-Drop Patterns (Native DnD in React)

> This skill defines the mandatory patterns for implementing native Drag-and-Drop (HTML5 API) in React projects, with a focus on hierarchies of draggable elements. It must be read by the **Builder (Phase 3)** before implementing any DnD functionality, and used as an auditing benchmark by the **Validator (Phase 4)**, **Reviewer (Phase 5)**, and **Critic (Phase 6)**.

---

## 1. Fundamental Principle: Isolation by Level

When multiple types of elements are draggable in a hierarchy (e.g., **card** inside **column**), the DnD responsibilities of each level MUST be completely isolated. The correct mental model is:

```
[Column: draggable ONLY on the header]
  └── [Column Header] ← draggable here, onDragStart with "application/kanban-column"
       └── [Card List] ← drop zone only (onDrop, onDragOver), without its own draggable
             └── [Card] ← draggable here, onDragStart with "application/kanban-card"
```

**Prohibited anti-pattern (cause of failure in run-003):**
```jsx
// ❌ WRONG: draggable on the root container encompassing the cards
<div className="column-container" draggable onDragStart={handleColumnDrag}>
  <div className="column-cards-list">  {/* cards here inherit the drag from the parent */}
    <Card draggable ... />  {/* conflict: two draggable levels without isolation */}
  </div>
</div>
```

**Correct pattern:**
```jsx
// ✅ CORRECT: draggable only on the column header
<div className="column-container">
  <div
    className="column-header"
    draggable                                         // drag only here
    onDragStart={handleColumnDragStart}
    onDragOver={handleColumnDragOver}
    onDrop={handleColumnDrop}
  >
    {/* title, actions */}
  </div>
  <div
    className="column-cards-list"
    onDragOver={handleCardDragOver}                   // drop zone for cards
    onDrop={handleCardDrop}
  >
    {cards.map(card => (
      <Card key={card.id} draggable ... />            // card drag here
    ))}
  </div>
</div>
```

---

## 2. Distinct MIME Types Rule

Every `dataTransfer.setData()` MUST use a custom and unique MIME type per element level. This allows drop handlers to differentiate the drag type before processing.

```jsx
// Card — child level
const handleCardDragStart = (e) => {
  e.stopPropagation();  // MANDATORY — blocks bubbling up to the column
  e.dataTransfer.setData('application/kanban-card', JSON.stringify({
    cardId: card.id,
    sourceColumnId: columnId
  }));
  e.dataTransfer.effectAllowed = 'move';
};

// Column — parent level
const handleColumnDragStart = (e) => {
  e.dataTransfer.setData('application/kanban-column', column.id);
  e.dataTransfer.effectAllowed = 'move';
};
```

---

## 3. Mandatory stopPropagation Rule on Child Elements

Calling `e.stopPropagation()` in the `onDragStart` handler of the child element is **mandatory and non-negotiable**. Without it, the card's `dragstart` event bubbles up to the column container (which is also `draggable`), confusing the browser about which element is being dragged.

```jsx
// ✅ Card.jsx — stopPropagation is ALWAYS first
const handleDragStart = (e) => {
  e.stopPropagation();  // MUST be the first line
  e.dataTransfer.setData('application/kanban-card', JSON.stringify({ ... }));
};
```

---

## 4. Type Verification in onDrop

Every `onDrop` handler MUST verify the data type before processing the drop. This ensures that the column handler does not process card drops (and vice versa):

```jsx
// Drop zone of the cards list in the column
const handleCardAreaDrop = (e) => {
  e.preventDefault();
  const cardData = e.dataTransfer.getData('application/kanban-card');
  if (!cardData) return;  // ignores if not a card drop
  try {
    const { cardId, sourceColumnId } = JSON.parse(cardData);
    onCardDrop(cardId, sourceColumnId, column.id, insertIndex);
  } catch (err) {
    console.error('Invalid drop:', err);
  }
};

// Drop zone for column reordering in the board
const handleColumnAreaDrop = (e) => {
  e.preventDefault();
  const colId = e.dataTransfer.getData('application/kanban-column');
  if (!colId) return;  // ignores if not a column drop
  onColumnDrop(colId, targetColumnId);
};
```

---

## 5. Position-Based Drop via Index

Dropping a card MUST insert the element in the correct position (not just at the end of the list). Use `getBoundingClientRect()` to calculate if the mouse is in the upper or lower half of the target card:

```jsx
const handleCardDragOver = (e) => {
  e.preventDefault();
  const cardData = e.dataTransfer.getData('application/kanban-card');
  if (!cardData) return;

  const cardElements = [...e.currentTarget.querySelectorAll('[data-card-id]')];
  let insertIndex = cardElements.length; // default: end of the list

  for (let i = 0; i < cardElements.length; i++) {
    const rect = cardElements[i].getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    if (e.clientY < midY) {
      insertIndex = i;
      break;
    }
  }
  setDropIndicatorIndex(insertIndex);
};
```

---

## 6. Visual Drop Position Indicators

During drag, the user MUST see a visual indication of where the card will be inserted (dashed line between cards):

```css
/* Drop position indicator line */
.drop-indicator {
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
  margin: 2px 0;
  animation: dropIndicatorPulse 0.8s ease-in-out infinite alternate;
}

@keyframes dropIndicatorPulse {
  from { opacity: 0.6; }
  to { opacity: 1; }
}
```

---

## 7. Mandatory Fallback for Mobile

The HTML5 DnD API does not work reliably on touch devices (specifically iOS Safari). The Builder MUST implement accessible movement buttons as a permanent fallback on touch screens:

```css
/* Hidden by default on desktop */
.card-accessible-actions {
  display: none;
}

/* Permanently visible on touch devices */
@media (hover: none) {
  .card-accessible-actions {
    display: flex;
  }
}
```

---

## 8. Self-Validation Checklist (Builder and Validator)

Before concluding build or validation, execute the following greps:

| Check | Command | PASS Criterion |
|---|---|---|
| `draggable` in the right place | `grep -n "draggable" src/components/*.jsx` | Appears only on "handle" elements (header/card), never on root containers that enclose draggable children |
| `stopPropagation` on the child | `grep -n "stopPropagation" src/components/*.jsx` | Present in all dragStart handlers of child elements |
| Distinct MIME types | `grep -n "setData" src/components/*.jsx` | Each level uses a different type (e.g., `kanban-card` vs `kanban-column`) |
| Type check on drop | `grep -n "getData" src/components/*.jsx` | Every `onDrop` verifies type before processing |
| Mobile fallback | `grep -n "hover: none" src/*.css` | Present for alternative movement controls |
