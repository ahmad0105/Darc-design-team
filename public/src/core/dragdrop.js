import { state } from './state.js';
import { api } from './api.js';
import { renderView } from './router.js';
import { showToast } from '../shared/ui.js';
import { choose } from '../core/utils.js';
import { setSavedTaskSort, canUserMoveTask } from '../features/tasks/tasks.js';

let placeholder = null;
let activeDraggedTaskId = null;
let draggedCardHeight = 64;
let autoScrollRaf = null;
let currentMouseX = -1;
let currentMouseY = -1;
let isDraggingActive = false;

// Active Unified Pointer Drag State (Mouse + Touch + Stylus)
let dragCard = null;
let dragGhost = null;
let dragStartX = 0;
let dragStartY = 0;
let dragOffsetX = 0;
let dragOffsetY = 0;
let isPointerDragging = false;
let activePointerId = null;
let touchHoldTimer = null;

// Dynamic High-Fidelity Placeholder with Adaptive Height & Smooth Snapping
function getOrCreatePlaceholder(height) {
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.className = 'drag-placeholder';
  }
  const h = Math.max(48, Math.min(220, height || draggedCardHeight || 64));
  placeholder.style.cssText = `
    border: 2px dashed var(--brand-teal, #0d6269);
    background: rgba(13, 98, 105, 0.06);
    border-radius: 12px;
    height: ${h}px;
    margin: 8px 0;
    transition: height 0.15s cubic-bezier(0.2, 0, 0, 1);
    pointer-events: none;
    box-shadow: inset 0 0 16px rgba(13, 98, 105, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-teal, #0d6269);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3px;
  `;
  placeholder.innerHTML = `<span>↓ ${choose('الموضع الجديد للمهمة', 'Drop position')}</span>`;
  return placeholder;
}

function removePlaceholder() {
  if (placeholder && placeholder.parentNode) {
    placeholder.parentNode.removeChild(placeholder);
  }
}

// Gold-Standard Nearest Element Algorithm (Linear / Atlassian Pragmatic DND Standard)
// Calculates exact distance offset from cursor center to each card center to eliminate jitter & jumping
function getDragAfterElement(cardsContainer, clientY) {
  const cards = Array.from(cardsContainer.querySelectorAll('.task-card:not(.is-dragging)'));
  if (cards.length === 0) return null;

  return cards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();
    const offset = clientY - (box.top + box.height / 2);
    // Elements below cursor have negative offset (closer to 0 is the immediate next card)
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: card };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Continuous Velocity-Based Auto-Scroller via requestAnimationFrame
function startContinuousAutoScroll() {
  if (autoScrollRaf) return;

  function step() {
    if (!isDraggingActive) {
      autoScrollRaf = null;
      return;
    }

    if (currentMouseX >= 0 && currentMouseY >= 0) {
      const boardEl = document.querySelector('.board, .board-columns, .tasks-board, [data-board]');
      const edgeMargin = 75;
      const maxScrollSpeed = 24;

      if (boardEl) {
        // Horizontal Board Auto-Scroll
        if (currentMouseX < edgeMargin) {
          const factor = (edgeMargin - currentMouseX) / edgeMargin;
          boardEl.scrollLeft -= Math.max(3, Math.round(factor * maxScrollSpeed));
        } else if (currentMouseX > window.innerWidth - edgeMargin) {
          const factor = (currentMouseX - (window.innerWidth - edgeMargin)) / edgeMargin;
          boardEl.scrollLeft += Math.max(3, Math.round(factor * maxScrollSpeed));
        }

        // Vertical Column Auto-Scroll (for long lists inside active column)
        const elUnder = document.elementFromPoint(currentMouseX, currentMouseY);
        const cardsCol = elUnder?.closest('.board-cards') || elUnder?.closest('.board-column')?.querySelector('.board-cards');
        if (cardsCol && cardsCol.scrollHeight > cardsCol.clientHeight) {
          const cRect = cardsCol.getBoundingClientRect();
          const vMargin = 60;
          if (currentMouseY > cRect.top && currentMouseY < cRect.top + vMargin) {
            const vFactor = (vMargin - (currentMouseY - cRect.top)) / vMargin;
            cardsCol.scrollTop -= Math.max(3, Math.round(vFactor * 18));
          } else if (currentMouseY < cRect.bottom && currentMouseY > cRect.bottom - vMargin) {
            const vFactor = (currentMouseY - (cRect.bottom - vMargin)) / vMargin;
            cardsCol.scrollTop += Math.max(3, Math.round(vFactor * 18));
          }
        }
      }
    }

    autoScrollRaf = requestAnimationFrame(step);
  }

  autoScrollRaf = requestAnimationFrame(step);
}

function stopContinuousAutoScroll() {
  if (autoScrollRaf) {
    cancelAnimationFrame(autoScrollRaf);
    autoScrollRaf = null;
  }
}

// Unified Drop Handler (shared by Mouse, Touch & Keyboard/API)
async function handleTaskDrop(column, clientY, explicitTaskId = null) {
  if (!column) {
    cleanDragState();
    return;
  }
  column.classList.remove('drag-over');

  const taskId = explicitTaskId || activeDraggedTaskId;
  activeDraggedTaskId = null;
  const newStatus = column.dataset.status;

  if (!taskId || !newStatus) {
    cleanDragState();
    return;
  }

  const task = (state.data?.tasks || []).find(t => t.id === taskId);
  if (!task) {
    cleanDragState();
    return;
  }

  const cardsContainer = column.querySelector('.board-cards');
  if (!cardsContainer) {
    cleanDragState();
    return;
  }

  // 1. Dependency Validation: Cannot complete task before dependencies
  const isStatusSame = task.status === newStatus || (newStatus === 'review' && ['review', 'approval', 'blocked'].includes(task.status));
  if (!isStatusSame && newStatus === 'done' && task.dependencies && task.dependencies.length) {
    const incomplete = task.dependencies.filter(depId => {
      const dep = state.data.tasks.find(t => t.id === depId);
      return dep && dep.status !== 'done';
    });
    if (incomplete.length) {
      cleanDragState();
      return showToast(choose('لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.', 'Cannot complete task before its dependencies.'), true);
    }
  }

  // 2. Identify all visible cards in this target column (excluding the dragged card)
  const existingCards = Array.from(cardsContainer.querySelectorAll('.task-card')).filter(c => c.dataset.taskId !== taskId);
  const existingTaskIds = existingCards.map(c => c.dataset.taskId).filter(Boolean);

  // 3. Determine exact insertion index (0 = very top/first, length = very bottom/last)
  let insertIdx = existingTaskIds.length; // default to end

  if (placeholder && placeholder.parentNode === cardsContainer) {
    // Exact WYSIWYG: Placeholder is positioned directly inside the column
    if (!placeholder.previousElementSibling || placeholder.previousElementSibling.classList?.contains('empty')) {
      insertIdx = 0; // Guaranteed TOP of the column
    } else {
      let cur = placeholder.nextElementSibling;
      while (cur && !cur.classList?.contains('task-card')) {
        cur = cur.nextElementSibling;
      }
      if (cur && cur.dataset?.taskId) {
        const idx = existingTaskIds.indexOf(cur.dataset.taskId);
        insertIdx = (idx !== -1) ? idx : 0;
      } else {
        insertIdx = existingTaskIds.length;
      }
    }
  } else if (existingCards.length > 0) {
    // Fallback if placeholder was detached right before drop: calculate via clientY / currentMouseY
    const effectiveY = (clientY && clientY > 0) ? clientY : (currentMouseY > 0 ? currentMouseY : 0);
    const firstRect = existingCards[0].getBoundingClientRect();
    const lastRect = existingCards[existingCards.length - 1].getBoundingClientRect();

    if (effectiveY <= firstRect.top + firstRect.height * 0.45) {
      insertIdx = 0; // Guaranteed TOP of the column
    } else if (effectiveY >= lastRect.bottom - lastRect.height * 0.45) {
      insertIdx = existingTaskIds.length; // Guaranteed BOTTOM of the column
    } else {
      const afterCard = getDragAfterElement(cardsContainer, effectiveY);
      if (afterCard) {
        const idx = existingTaskIds.indexOf(afterCard.dataset.taskId);
        if (idx !== -1) insertIdx = idx;
      }
    }
  } else {
    // Column is currently empty
    insertIdx = 0;
  }

  // Clean up drag visuals immediately
  cleanDragState();

  // 4. Build the final ordered list of task IDs for this column
  const newColumnTaskIds = [...existingTaskIds];
  newColumnTaskIds.splice(insertIdx, 0, taskId);

  // 5. Update dragged task status & optimistic progress
  if (newStatus === 'review' && ['review', 'approval', 'blocked'].includes(task.status)) {
    // Keep existing sub-status within review/approval/blocked grouping
  } else {
    task.status = newStatus;
  }

  // Automatic progress calculation matching backend business logic
  if (task.status === 'done') {
    task.progress = 100;
  } else if (task.status === 'not_started') {
    task.progress = 0;
  } else if (task.status === 'in_progress' && (task.progress === 0 || !task.progress)) {
    task.progress = 50;
  } else if (['review', 'approval'].includes(task.status) && (task.progress || 0) < 80) {
    task.progress = 80;
  }

  // 6. Assign clean, contiguous sortOrder (100, 200, 300, ...) to every task in this column
  // And register ALL affected tasks in recently moved tasks cache to protect against stale background polls
  if (!window._recentlyMovedTasks) {
    window._recentlyMovedTasks = new Map();
  }
  const nowMovedAt = Date.now();

  newColumnTaskIds.forEach((id, idx) => {
    const t = (state.data?.tasks || []).find(x => x.id === id);
    if (t) {
      const order = (idx + 1) * 100;
      t.sortOrder = order;
      t.sort_order = order;
      if (!t.customFields) t.customFields = {};
      t.customFields.sortOrder = order;
      t.customFields.sort_order = order;
      if (!t.custom_fields) t.custom_fields = {};
      t.custom_fields.sortOrder = order;
      t.custom_fields.sort_order = order;

      window._recentlyMovedTasks.set(id, {
        status: t.status,
        sortOrder: order,
        progress: t.progress,
        timestamp: nowMovedAt
      });
    }
  });

  // Cleanup old entries (> 45s) from recently moved cache
  for (const [id, info] of window._recentlyMovedTasks.entries()) {
    if (nowMovedAt - info.timestamp > 45000) {
      window._recentlyMovedTasks.delete(id);
    }
  }

  // Also adjust trailing orders for any non-visible tasks sharing this status within the same project
  const columnStatuses = (newStatus === 'review') ? ['review', 'approval', 'blocked'] : [newStatus];
  const projectScope = task.projectId || task.project_id;
  let trailingOrder = (newColumnTaskIds.length + 1) * 100;
  (state.data?.tasks || []).forEach(t => {
    if (projectScope && (t.projectId || t.project_id) !== projectScope) return;
    if (columnStatuses.includes(t.status) && !newColumnTaskIds.includes(t.id)) {
      t.sortOrder = trailingOrder;
      t.sort_order = trailingOrder;
      if (t.customFields) { t.customFields.sortOrder = trailingOrder; t.customFields.sort_order = trailingOrder; }
      if (t.custom_fields) { t.custom_fields.sortOrder = trailingOrder; t.custom_fields.sort_order = trailingOrder; }
      trailingOrder += 100;
    }
  });

  // 7. Enforce Custom Sort mode across state and storage so board renders the exact drop order
  setSavedTaskSort('custom');
  state.taskSortPref = 'custom';
  state.projectTaskSort = 'custom';
  state.myTaskSort = 'custom';

  // 8. Re-render board immediately (instant 0ms response)
  renderView();

  // 9. Tactile haptic feedback on touch devices
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(20); } catch(e) {}
  }

  // 10. Landing visual pulse
  const droppedCardEl = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
  if (droppedCardEl) {
    droppedCardEl.classList.add('just-dropped');
    setTimeout(() => droppedCardEl?.classList.remove('just-dropped'), 450);
  }

  // 11. Debounce & Queue batch reorder API sync to consolidate rapid consecutive drops
  if (window._reorderSyncTimer) clearTimeout(window._reorderSyncTimer);
  window._pendingReorderBatch = window._pendingReorderBatch || new Map();
  newColumnTaskIds.forEach(id => {
    const t = (state.data.tasks || []).find(x => x.id === id);
    if (t) {
      window._pendingReorderBatch.set(t.id, {
        id: t.id,
        status: t.status,
        sortOrder: t.sortOrder,
        customFields: t.customFields
      });
    }
  });

  window._reorderSyncTimer = setTimeout(() => {
    const batchItems = Array.from(window._pendingReorderBatch.values());
    window._pendingReorderBatch.clear();

    api('/api/tasks/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ items: batchItems })
    }).catch(e => {
      console.warn('Reorder sync error:', e);
      showToast(choose('فشل حفظ الترتيب الجديد في الخادم.', 'Failed to save task order to server.'), true);
    });
  }, 150);
}

// Clean all active drag states, ghosts, and placeholders
function cleanDragState() {
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (dragGhost && dragGhost.parentNode) {
    dragGhost.parentNode.removeChild(dragGhost);
  }
  dragGhost = null;

  if (dragCard) {
    dragCard.style.opacity = '';
    dragCard.style.pointerEvents = '';
    dragCard.classList.remove('is-dragging');
  }
  dragCard = null;

  activePointerId = null;
  isPointerDragging = false;
  isDraggingActive = false;
  window._isDraggingTask = false;
  activeDraggedTaskId = null;
  currentMouseX = -1;
  currentMouseY = -1;

  stopContinuousAutoScroll();
  document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
  removePlaceholder();

  document.body.style.userSelect = '';
  document.body.style.webkitUserSelect = '';
  document.body.style.cursor = '';
}

// Initiate Active Dragging (creates floating ghost, highlights column, starts auto-scroll)
function initiateDrag(clientX, clientY) {
  if (!dragCard || isPointerDragging) return;

  const task = (state.data?.tasks || []).find(t => t.id === dragCard.dataset.taskId);
  if (!canUserMoveTask(task)) {
    cleanDragState();
    return;
  }

  isPointerDragging = true;
  isDraggingActive = true;
  window._isDraggingTask = true;
  activeDraggedTaskId = dragCard.dataset.taskId;

  // Haptic feedback tick
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(30); } catch (e) {}
  }

  const rect = dragCard.getBoundingClientRect();
  draggedCardHeight = rect.height;
  dragOffsetX = clientX - rect.left;
  dragOffsetY = clientY - rect.top;

  // High-performance hardware-accelerated floating clone that smoothly follows cursor/finger
  dragGhost = dragCard.cloneNode(true);
  dragGhost.id = 'active-drag-ghost';
  dragGhost.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${rect.width}px;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.95;
    transform: translate3d(${rect.left}px, ${rect.top}px, 0) scale(1.03) rotate(1.2deg);
    box-shadow: 0 16px 36px rgba(0,0,0,0.22);
    border: 1.5px solid var(--brand-teal, #0d6269);
    background: var(--surface, #ffffff);
    border-radius: 12px;
    will-change: transform;
    cursor: grabbing !important;
  `;
  document.body.appendChild(dragGhost);

  // Dim source card & make it transparent to elementFromPoint hit-testing
  dragCard.classList.add('is-dragging');
  dragCard.style.opacity = '0.22';
  dragCard.style.pointerEvents = 'none';

  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.cursor = 'grabbing';

  // Highlight initial column
  const column = dragCard.closest('.board-column');
  if (column) {
    column.classList.add('drag-over');
    const cardsContainer = column.querySelector('.board-cards');
    if (cardsContainer) {
      const ph = getOrCreatePlaceholder(draggedCardHeight);
      const afterCard = getDragAfterElement(cardsContainer, clientY);
      if (afterCard == null) {
        cardsContainer.appendChild(ph);
      } else {
        cardsContainer.insertBefore(ph, afterCard);
      }
    }
  }

  startContinuousAutoScroll();
}

// ── UNIFIED POINTER ENGINE (Mouse, Touch, Stylus) ──────────────────────────

document.addEventListener('pointerdown', (e) => {
  // Only handle primary button (left mouse click or touch contact)
  if (e.button !== 0 && e.pointerType === 'mouse') return;

  const card = e.target.closest('.task-card');
  // Avoid dragging if interaction started on a button, link, input, etc.
  if (!card || e.target.closest('button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]')) return;

  const task = (state.data?.tasks || []).find(t => t.id === card.dataset.taskId);
  if (!canUserMoveTask(task)) return;

  dragCard = card;
  activePointerId = e.pointerId;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  isPointerDragging = false;

  const rect = card.getBoundingClientRect();
  draggedCardHeight = rect.height;
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  if (e.pointerType === 'touch') {
    // 110ms Tactile Pickup on Touch: Allows natural vertical scrolling without lag
    touchHoldTimer = setTimeout(() => {
      initiateDrag(e.clientX, e.clientY);
    }, 110);
  }
  // On mouse, no timer is needed: drag initiates when mouse moves > 4px
}, { passive: true });

document.addEventListener('pointermove', (e) => {
  if (!dragCard) return;

  // If drag hasn't started yet, check movement thresholds
  if (!isPointerDragging) {
    const deltaX = Math.abs(e.clientX - dragStartX);
    const deltaY = Math.abs(e.clientY - dragStartY);
    const dist = Math.hypot(deltaX, deltaY);

    if (e.pointerType === 'touch') {
      // Natural finger wobble threshold: if finger moves > 12px before hold timer fires, cancel drag and allow scroll
      if (dist > 12) {
        if (touchHoldTimer) {
          clearTimeout(touchHoldTimer);
          touchHoldTimer = null;
        }
        dragCard = null;
      }
      return;
    } else {
      // Mouse / Pen: 4px drag threshold starts dragging immediately
      if (dist >= 4) {
        initiateDrag(e.clientX, e.clientY);
      } else {
        return;
      }
    }
  }

  // Active Dragging Mode
  if (e.cancelable) e.preventDefault();

  currentMouseX = e.clientX;
  currentMouseY = e.clientY;

  // Move floating ghost smoothly with cursor via GPU hardware acceleration
  if (dragGhost) {
    const gx = e.clientX - dragOffsetX;
    const gy = e.clientY - dragOffsetY;
    dragGhost.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(1.03) rotate(1.2deg)`;
  }

  // Find target element underneath cursor
  const elUnder = document.elementFromPoint(e.clientX, e.clientY);
  let column = elUnder?.closest('.board-column');
  if (!column) {
    const columns = Array.from(document.querySelectorAll('.board-column'));
    if (columns.length > 0) {
      column = columns.reduce((closest, col) => {
        const rect = col.getBoundingClientRect();
        const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
        return dist < closest.dist ? { col, dist } : closest;
      }, { col: null, dist: Infinity }).col;
    }
  }

  document.querySelectorAll('.board-column').forEach(col => col.classList.toggle('drag-over', col === column));

  if (column) {
    const cardsContainer = column.querySelector('.board-cards');
    if (cardsContainer) {
      const ph = getOrCreatePlaceholder(draggedCardHeight);
      const afterCard = getDragAfterElement(cardsContainer, e.clientY);
      if (afterCard == null) {
        if (!cardsContainer.contains(ph) || cardsContainer.lastElementChild !== ph) {
          cardsContainer.appendChild(ph);
        }
      } else {
        if (ph.nextElementSibling !== afterCard) {
          cardsContainer.insertBefore(ph, afterCard);
        }
      }
    }
  }
}, { passive: false });

document.addEventListener('pointerup', async (e) => {
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (!dragCard) return;

  if (isPointerDragging) {
    const moveDist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);

    // Remove ghost immediately for crisp release
    if (dragGhost && dragGhost.parentNode) {
      dragGhost.parentNode.removeChild(dragGhost);
    }
    dragGhost = null;

    // Suppress clicks on drop release
    window._justDroppedTaskId = activeDraggedTaskId;
    window._justDroppedAt = Date.now();
    window._isDraggingTask = false;

    // Only process drop if cursor genuinely moved (> 4px); ignore stationary tap & hold
    if (moveDist > 4) {
      const elUnder = document.elementFromPoint(e.clientX, e.clientY);
      let column = elUnder?.closest('.board-column') || (placeholder && placeholder.closest('.board-column'));
      if (!column) {
        const columns = Array.from(document.querySelectorAll('.board-column'));
        if (columns.length > 0) {
          column = columns.reduce((closest, col) => {
            const rect = col.getBoundingClientRect();
            const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
            return dist < closest.dist ? { col, dist } : closest;
          }, { col: null, dist: Infinity }).col;
        }
      }
      const draggedId = activeDraggedTaskId;
      if (column && draggedId) {
        await handleTaskDrop(column, e.clientY, draggedId);
      }
    }
    cleanDragState();
  } else {
    // Regular click (no drag)
    cleanDragState();
  }
});

document.addEventListener('pointercancel', () => {
  cleanDragState();
});

// Suppress browser native HTML5 drag on task cards to give 100% control to the smooth unified pointer engine
document.addEventListener('dragstart', (e) => {
  if (e.target.closest('.task-card')) {
    e.preventDefault();
  }
});

// Capture-phase click interceptor to guarantee task modals NEVER open upon dropping a card
document.addEventListener('click', (e) => {
  if (window._justDroppedAt && (Date.now() - window._justDroppedAt < 400)) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}, true);
