# Frontend Layout — Grids, Spacing e Responsividade

Esta sub-skill regula as diretrizes de layout, grids, flexbox, responsividade e o dimensionamento (scaling) do design.

---

## 1. Princípios de Layout e Grids

1. **Responsividade Mobile-First:** Projete layouts pensando primeiro em dispositivos móveis, expandindo progressivamente para telas maiores usando breakpoints de CSS apropriados (ex: `480px`, `768px`, `1024px`, `1200px`).
2. **CSS Grid e Flexbox:** Use Grid para layouts de página ou estruturas bidimensionais (como Kanban, Bento Grids e Dashboards). Use Flexbox para alinhamentos unidimensionais de componentes (como menus, cards, listas e botões).
3. **Rítmo Espaçamento Consistente:** Utilize uma escala de espaçamento fixa (ex: múltiplos de 4px ou 8px ou variáveis como `--spacing-sm: 8px`, `--spacing-md: 16px`, `--spacing-lg: 24px`) para manter a harmonia visual.
4. **Evitar Valores Mágicos (Hardcoded):** Nunca use valores arbitrários de pixel para margens, preenchimentos ou larguras de layout principal. Use variáveis CSS para garantir consistência e facilidade de manutenção.

---

## 2. Padrões de Dimensionamento por Tamanho de Projeto

### Pequeno (Componente individual, ajuste rápido):
* Sem layout complexo. Use flexbox básico para organizar elementos.
* Sem a necessidade de grids globais de página.

### Médio (Página, feature com múltiplos componentes):
* Layout de coluna única ou sidebar colapsável.
* Layout responsivo com 1-2 quebras de breakpoint.
* 3 a 5 tokens de espaçamento mapeados.

### Grande (Aplicação completa, painel de controle, dashboard):
* Grid de 12 colunas para o conteúdo principal.
* Sidebar fixa/responsiva, cabeçalhos flutuantes (`sticky`) e áreas de conteúdo flexíveis.
* Suporte robusto a layouts densos ou espaçosos, configurado por design tokens.

---

## 3. Diretrizes Técnicas de CSS
* **Sem inline styles:** Toda estilização deve estar no CSS.
* **Modern CSS:** Dê preferência a recursos modernos como CSS Grid, flexbox, `container queries`, `:has()`, `:focus-within` e variáveis customizadas.
* **Overflow seguro:** Certifique-se de que contêineres que possuem barras de rolagem locais (`overflow: auto/scroll`) não quebrem ou cortem caixas flutuantes (como popups e tooltips).
