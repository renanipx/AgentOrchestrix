# Frontend State — Synchronization, Performance, and Resilience

This sub-skill regulates state management, props synchronization, stale closure prevention, local storage handling, and collection normalization.

---

## 1. Local State vs. Props Synchronization

When initializing local state from component props, you must implement a synchronization mechanism or key-based resetting to avoid stale UI state when props change.

```jsx
// ❌ BAD: Stale local state if props.value changes later
const [val, setVal] = useState(props.value);

// ✅ GOOD: Synchronize state when prop changes
const [val, setVal] = useState(props.value);
useEffect(() => {
  setVal(props.value);
}, [props.value]);

// ✅ ALSO GOOD: Force key-based re-creation of component
<Component key={props.value} value={props.value} />
```

---

## 2. Preventing Stale Closures

Avoid capturing mutable state variables in callbacks (such as `useCallback` or `useEffect` inputs) without properly declaring them in dependency arrays. Use state updater functions where possible.

```jsx
// ❌ BAD: Captured stale board state
const addCard = useCallback(() => {
  setBoard({ ...board, cards: [...board.cards, newCard] });
}, []); // missing dependency: board

// ✅ GOOD: Use functional updater (stable callback reference)
const addCard = useCallback((newCard) => {
  setBoard(prevBoard => ({
    ...prevBoard,
    cards: [...prevBoard.cards, newCard]
  }));
}, []);
```

---

## 3. Local Storage Error Handling

Always warp `localStorage` operations in `try/catch` blocks and expose friendly error messages to the user if writing/reading fails.

```javascript
export function saveState(state) {
  try {
    localStorage.setItem('app-state', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
    // Trigger user notification/alert in the UI
  }
}
```

---

## 4. Collection Normalization (O(1) Access)

For large collections or lists requiring frequent lookup, update, or drag-and-drop operations, prefer storing entities as key-value pairs (normalized) alongside an array of IDs.

```json
{
  "entities": {
    "card-1": { "id": "card-1", "title": "First Card" },
    "card-2": { "id": "card-2", "title": "Second Card" }
  },
  "ids": ["card-1", "card-2"]
}
```
