# Frontend Accessibility — Accessibility, Contrast, and Touch Interaction

This sub-skill regulates accessibility guidelines (WCAG), contrast, keyboard navigation, and full support for touchscreens and UI animations.

---

## 1. Accessibility and Contrast Standards

1. **Contrast Ratio (WCAG AA):** Any text or critical interface element must have a minimum contrast ratio of 4.5:1 (or 3:1 for large text). Avoid dark colors overlapping dark backgrounds.
2. **Keyboard Navigation:**
   * All interactive elements (buttons, links, inputs, tabs) must be reachable via the `Tab` key.
   * Visually indicate focus clearly (e.g., custom outline/border, never remove `:focus { outline: none }` without providing a clear substitute).
   * Keyboard shortcuts (e.g., `Escape` to close modals, arrow keys to navigate lists) must be documented and functional.
3. **HTML5 Semantics:** Use appropriate semantic tags (`<button>`, `<nav>`, `<main>`, `<article>`, `<header>`, `<dialog>`) to ensure proper functioning of screen readers and accessibility tools.

---

## 2. Contextual Controls (Touch vs Hover)

1. **Minimum Tap Target Size:** Buttons and actionable areas must have a minimum click/tap target size of **44x44px** on mobile devices/touchscreens to prevent user touch errors.
2. **Hover vs Touch:**
   * Contextual elements (such as quick delete or edit buttons) that are hidden by default and only appear on hover (`hover`) on desktops **must remain permanently visible on touchscreens**.
   * Use the `@media (hover: none)` media query in CSS to disable the hiding of these elements and make them static for mobile users.

---

## 3. Animations and Interface Movements

1. **Smooth Transitions:** Any state interaction (hover, click, expansion) must have subtle transitions (e.g., `transition: all 0.2s ease-in-out`) to avoid abrupt visual jumps.
2. **Complete Entrances and Exits:**
   * Any element rendered with an entrance animation (e.g., a modal appearing with a fade-in and scale-up) **MUST have a corresponding exit animation** (fade-out and scale-down) when closed or unmounted.
   * Elements disappearing abruptly from the DOM without an exit transition are considered visual defects.
3. **Prefers Reduced Motion:** Respect the user's OS preference for reduced motion by using the `@media (prefers-reduced-motion: reduce)` media query to disable heavy animations.
