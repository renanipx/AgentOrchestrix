# Frontend Layout — Grids, Spacing, and Responsiveness

This sub-skill regulates layout guidelines, grids, flexbox, responsiveness, and design scaling.

---

## 1. Layout and Grid Principles

1. **Mobile-First Responsiveness:** Design layouts thinking first of mobile devices, expanding progressively to larger screens using appropriate CSS breakpoints (e.g., `480px`, `768px`, `1024px`, `1200px`).
2. **CSS Grid and Flexbox:** Use Grid for page layouts or two-dimensional structures (such as Kanban, Bento Grids, and Dashboards). Use Flexbox for one-dimensional alignments of components (such as menus, cards, lists, and buttons).
3. **Consistent Spacing Rhythm:** Utilize a fixed spacing scale (e.g., multiples of 4px or 8px or variables like `--spacing-sm: 8px`, `--spacing-md: 16px`, `--spacing-lg: 24px`) to maintain visual harmony.
4. **Avoid Magic (Hardcoded) Values:** Never use arbitrary pixel values for margins, paddings, or main layout widths. Use CSS variables to ensure consistency and ease of maintenance.

---

## 2. Scaling Standards by Project Size

### Small (Individual component, quick fix):
* No complex layout. Use basic flexbox to organize elements.
* No need for global page grids.

### Medium (Page, feature with multiple components):
* Single-column or collapsible sidebar layout.
* Responsive layout with 1-2 breakpoint changes.
* 3 to 5 mapped spacing tokens.

### Large (Full application, control panel, dashboard):
* 12-column Grid for the main content.
* Fixed/responsive sidebar, sticky headers, and flexible content areas.
* Robust support for dense or spacious layouts, configured via design tokens.

---

## 3. CSS Technical Guidelines
* **No inline styles:** All styling must be in CSS.
* **Modern CSS:** Give preference to modern features like CSS Grid, flexbox, `container queries`, `:has()`, `:focus-within`, and custom variables.
* **Safe Overflow:** Ensure that containers having local scrollbars (`overflow: auto/scroll`) do not break or clip floating boxes (such as popups and tooltips).
