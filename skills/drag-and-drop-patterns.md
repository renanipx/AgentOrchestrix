# Skill: Drag-and-Drop Patterns (DnD Nativo em React)

> Esta skill define os padrões obrigatórios para implementação de Drag-and-Drop nativo (HTML5 API) em projetos React, com foco em hierarquias de elementos arrastáveis. Deve ser lida pelo **Builder (Fase 3)** antes de implementar qualquer funcionalidade de DnD, e usada como régua de auditoria pelo **Validator (Fase 4)**, **Reviewer (Fase 5)** e **Critic (Fase 6)**.

---

## 1. Princípio Fundamental: Isolamento por Nível

Quando múltiplos tipos de elementos são arrastáveis em hierarquia (ex: **card** dentro de **coluna**), as responsabilidades de DnD de cada nível DEVEM ser completamente isoladas. O modelo mental correto é:

```
[Coluna: draggable APENAS no header]
  └── [Column Header] ← draggable aqui, onDragStart com "application/kanban-column"
       └── [Card List] ← drop zone apenas (onDrop, onDragOver), sem draggable próprio
             └── [Card] ← draggable aqui, onDragStart com "application/kanban-card"
```

**Anti-pattern proibido (causa da falha na run-003):**
```jsx
// ❌ ERRADO: draggable no container raiz que engloba os cards
<div className="column-container" draggable onDragStart={handleColumnDrag}>
  <div className="column-cards-list">  {/* cards aqui herdam o drag do pai */}
    <Card draggable ... />  {/* conflito: dois níveis arrastáveis sem isolamento */}
  </div>
</div>
```

**Padrão correto:**
```jsx
// ✅ CORRETO: draggable apenas no header da coluna
<div className="column-container">
  <div
    className="column-header"
    draggable                                         // drag somente aqui
    onDragStart={handleColumnDragStart}
    onDragOver={handleColumnDragOver}
    onDrop={handleColumnDrop}
  >
    {/* título, ações */}
  </div>
  <div
    className="column-cards-list"
    onDragOver={handleCardDragOver}                   // drop zone de cards
    onDrop={handleCardDrop}
  >
    {cards.map(card => (
      <Card key={card.id} draggable ... />            // drag de cards aqui
    ))}
  </div>
</div>
```

---

## 2. Regra de MIME Types Distintos

Todo `dataTransfer.setData()` DEVE usar um MIME type personalizado e único por nível de elemento. Isso permite que handlers de drop diferenciem o tipo de drag antes de processar.

```jsx
// Card — nivel filho
const handleCardDragStart = (e) => {
  e.stopPropagation();  // OBRIGATÓRIO — bloqueia borbulhamento para a coluna
  e.dataTransfer.setData('application/kanban-card', JSON.stringify({
    cardId: card.id,
    sourceColumnId: columnId
  }));
  e.dataTransfer.effectAllowed = 'move';
};

// Column — nível pai
const handleColumnDragStart = (e) => {
  e.dataTransfer.setData('application/kanban-column', column.id);
  e.dataTransfer.effectAllowed = 'move';
};
```

---

## 3. Regra de stopPropagation Obrigatório no Filho

O `e.stopPropagation()` no handler `onDragStart` do elemento filho é **obrigatório e inegociável**. Sem ele, o evento `dragstart` do card borbulha até o container da coluna (que também é `draggable`), confundindo o browser sobre qual elemento está sendo arrastado.

```jsx
// ✅ Card.jsx — stopPropagation SEMPRE primeiro
const handleDragStart = (e) => {
  e.stopPropagation();  // DEVE ser a primeira linha
  e.dataTransfer.setData('application/kanban-card', JSON.stringify({ ... }));
};
```

---

## 4. Verificação de Tipo no onDrop

Todo handler `onDrop` DEVE verificar o tipo de dado antes de processar o drop. Isso garante que o handler da coluna não processa drops de cards (e vice-versa):

```jsx
// Drop zone da lista de cards na coluna
const handleCardAreaDrop = (e) => {
  e.preventDefault();
  const cardData = e.dataTransfer.getData('application/kanban-card');
  if (!cardData) return;  // ignora se não for um drop de card
  try {
    const { cardId, sourceColumnId } = JSON.parse(cardData);
    onCardDrop(cardId, sourceColumnId, column.id, insertIndex);
  } catch (err) {
    console.error('Drop inválido:', err);
  }
};

// Drop zone de reordenação de colunas no board
const handleColumnAreaDrop = (e) => {
  e.preventDefault();
  const colId = e.dataTransfer.getData('application/kanban-column');
  if (!colId) return;  // ignora se não for um drop de coluna
  onColumnDrop(colId, targetColumnId);
};
```

---

## 5. Drop com Posicionamento por Índice

O drop de um card DEVE inserir o elemento na posição correta (não apenas no final da lista). Use `getBoundingClientRect()` para calcular se o mouse está na metade superior ou inferior do card alvo:

```jsx
const handleCardDragOver = (e) => {
  e.preventDefault();
  const cardData = e.dataTransfer.getData('application/kanban-card');
  if (!cardData) return;

  const cardElements = [...e.currentTarget.querySelectorAll('[data-card-id]')];
  let insertIndex = cardElements.length; // padrão: fim da lista

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

## 6. Indicadores Visuais de Posição de Drop

Durante o drag, o usuário DEVE ver uma indicação visual de onde o card será inserido (linha pontilhada entre os cards):

```css
/* Linha indicadora de posição de drop */
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

## 7. Fallback Obrigatório para Mobile

A API HTML5 de DnD não funciona de forma confiável em dispositivos touch (iOS Safari, especialmente). O Builder DEVE implementar botões de movimentação acessíveis como fallback permanente em telas touch:

```css
/* Oculto por padrão em desktop */
.card-accessible-actions {
  display: none;
}

/* Visível permanentemente em touch devices */
@media (hover: none) {
  .card-accessible-actions {
    display: flex;
  }
}
```

---

## 8. Checklist de Autovalidação (Builder e Validator)

Antes de concluir o build ou a validação, execute os seguintes greps:

| Check | Comando | Critério de PASS |
|---|---|---|
| `draggable` no lugar certo | `grep -n "draggable" src/components/*.jsx` | Aparece apenas em elementos de "handle" (header/card), nunca em containers raiz que englobam filhos draggable |
| `stopPropagation` no filho | `grep -n "stopPropagation" src/components/*.jsx` | Presente em todos os handlers dragStart de elementos filhos |
| MIME types distintos | `grep -n "setData" src/components/*.jsx` | Cada nível usa um tipo diferente (ex: `kanban-card` vs `kanban-column`) |
| Verificação de tipo no drop | `grep -n "getData" src/components/*.jsx` | Todo `onDrop` verifica o tipo antes de processar |
| Fallback mobile | `grep -n "hover: none" src/*.css` | Presente para controles de movimento alternativo |
