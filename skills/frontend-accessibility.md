# Frontend Accessibility — Acessibilidade, Contraste e Interação Touch

Esta sub-skill regula as diretrizes de acessibilidade (WCAG), contraste, navegação por teclado, e suporte completo a telas touch e animações de interface.

---

## 1. Padrões de Acessibilidade e Contraste

1. **Relação de Contraste (WCAG AA):** Qualquer texto ou elemento crítico de interface deve possuir taxa de contraste mínima de 4.5:1 (ou 3:1 para textos grandes). Evite cores escuras sobrepostas a fundos escuros.
2. **Navegação por Teclado:**
   * Todos os elementos interativos (botões, links, inputs, abas) devem ser alcançáveis via tecla `Tab`.
   * Indique visualmente o foco de forma nítida (ex: contorno/outline customizado, nunca remova `:focus { outline: none }` sem fornecer um substituto claro).
   * Atalhos de teclado (ex: `Escape` para fechar modais, setas para navegar em listas) devem ser documentados e funcionais.
3. **Semântica HTML5:** Use tags semânticas apropriadas (`<button>`, `<nav>`, `<main>`, `<article>`, `<header>`, `<dialog>`) para garantir o funcionamento correto de leitores de tela e utilitários de acessibilidade.

---

## 2. Controles Contextuais (Touch vs Hover)

1. **Área Mínima de Clique:** Botões e áreas acionáveis devem possuir uma área mínima de clique de **44x44px** em dispositivos móveis/telas touch para evitar erros de toque do usuário.
2. **Hover vs Touch:**
   * Elementos contextuais (como botões de exclusão ou edição rápidos) que ficam ocultos por padrão e só aparecem ao passar o mouse (`hover`) em desktops **devem ficar permanentemente visíveis em telas touch**.
   * Use a media query `@media (hover: none)` no CSS para desativar a ocultação desses elementos e torná-los estáticos para usuários móveis.

---

## 3. Animações e Movimentos de Interface

1. **Transições Suaves:** Qualquer interação de estado (hover, clique, expansão) deve possuir transições sutis (ex: `transition: all 0.2s ease-in-out`) para evitar saltos visuais secos.
2. **Entradas e Saídas Completas:**
   * Qualquer elemento renderizado com animação de entrada (ex: modal surgindo com fade-in e scale-up) **DEVE possuir uma animação de saída correspondente** (fade-out e scale-down) ao ser fechado ou desmontado.
   * Elementos desaparecendo abruptamente do DOM sem transição de saída são considerados defeitos visuais.
3. **Preferência por Redução de Movimento:** Respeite a preferência do sistema operacional do usuário por movimentos reduzidos usando a media query `@media (prefers-reduced-motion: reduce)` para desativar animações pesadas.
