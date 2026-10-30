import { state } from './state.js';
import { api } from './api.js';
import { renderView } from './router.js';
import { showToast } from '../shared/ui.js';
import { choose, can, isAdmin } from '../core/utils.js';
import { getTaskSortOrder, setSavedTaskSort, canUserMoveTask } from '../features/tasks/tasks.js';

let placeholder = null;
let activeDraggedTaskId = null;
let draggedCardHeight = 64;
let autoScrollRaf = null;
let currentMouseX = -1;
let currentMouseY = -1;
let isDraggingActive = false;

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

document.addEventListener('dragstart', (event) => {
  const card = event.target.closest('.task-card');
  if (card) {
    const task = (state.data?.tasks || []).find(t => t.id === card.dataset.taskId);
    if (!canUserMoveTask(task)) {
      event.preventDefault();
      return;
    }
    window._isDraggingTask = true;
    isDraggingActive = true;
    activeDraggedTaskId = card.dataset.taskId;

    // Capture precise card height to eliminate layout shift
    const rect = card.getBoundingClientRect();
    draggedCardHeight = rect.height;

    event.dataTransfer.effectAllowed = 'move';
    try { event.dataTransfer.setData('text/plain', activeDraggedTaskId); } catch(e) {}

    // Subtle custom drag ghost if supported
    try {
      const dragGhost = card.cloneNode(true);
      dragGhost.style.width = `${rect.width}px`;
      dragGhost.style.position = 'absolute';
      dragGhost.style.top = '-9999px';
      dragGhost.style.left = '-9999px';
      dragGhost.style.opacity = '0.94';
      dragGhost.style.boxShadow = '0 16px 36px rgba(0,0,0,0.25)';
      dragGhost.style.transform = 'scale(1.02) rotate(1deg)';
      document.body.appendChild(dragGhost);
      event.dataTransfer.setDragImage(dragGhost, event.clientX - rect.left, event.clientY - rect.top);
      setTimeout(() => dragGhost.remove(), 0);
    } catch(e) {}

    card.classList.add('is-dragging');
    startContinuousAutoScroll();
  }
});

document.addEventListener('dragend', (event) => {
  const card = event.target.closest('.task-card');
  if (card) {
    card.classList.remove('is-dragging');
  }
  window._isDraggingTask = false;
  isDraggingActive = false;
  window._justDroppedTaskId = activeDraggedTaskId;
  window._justDroppedAt = Date.now();
  activeDraggedTaskId = null;
  currentMouseX = -1;
  currentMouseY = -1;
  stopContinuousAutoScroll();
  document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
  removePlaceholder();
});

document.addEventListener('dragover', (event) => {
  if (!isDraggingActive && !window._isDraggingTask) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }

  currentMouseX = event.clientX;
  currentMouseY = event.clientY;

  let column = event.target.closest('.board-column');
  if (!column) {
    const columns = Array.from(document.querySelectorAll('.board-column'));
    if (columns.length > 0) {
      column = columns.reduce((closest, col) => {
        const rect = col.getBoundingClientRect();
        const dist = Math.abs(event.clientX - (rect.left + rect.width / 2));
        return dist < closest.dist ? { col, dist } : closest;
      }, { col: null, dist: Infinity }).col;
    }
  }

  if (column) {
    document.querySelectorAll('.board-column').forEach(col => {
      col.classList.toggle('drag-over', col === column);
    });

    const cardsContainer = column.querySelector('.board-cards');
    if (cardsContainer) {
      const ph = getOrCreatePlaceholder(draggedCardHeight);
      const afterCard = getDragAfterElement(cardsContainer, event.clientY);

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
});

document.addEventListener('dragenter', (event) => {
  const column = event.target.closest('.board-column');
  if (column) event.preventDefault();
});

document.addEventListener('dragleave', (event) => {
  const column = event.target.closest('.board-column');
  if (column) {
    if (event.relatedTarget && column.contains(event.relatedTarget)) {
      return; // Still inside column
    }
    // Ignore synthetic 0,0 dragleave events frequently dispatched by WebKit/Safari
    if (event.clientX === 0 && event.clientY === 0) return;
    const rect = column.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    // Only remove placeholder if cursor is genuinely outside the entire board area
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      column.classList.remove('drag-over');
      if (!isDraggingActive) {
        removePlaceholder();
      }
    }
  }
});

async function handleTaskDrop(column, clientY, explicitTaskId = null) {
  if (!column) {
    removePlaceholder();
    stopContinuousAutoScroll();
    isDraggingActive = false;
    return;
  }
  column.classList.remove('drag-over');

  const taskId = explicitTaskId || activeDraggedTaskId;
  activeDraggedTaskId = null;
  const newStatus = column.dataset.status;

  if (!taskId || !newStatus) {
    removePlaceholder();
    stopContinuousAutoScroll();
    isDraggingActive = false;
    return;
  }

  const task = (state.data?.tasks || []).find(t => t.id === taskId);
  if (!task) {
    removePlaceholder();
    stopContinuousAutoScroll();
    isDraggingActive = false;
    return;
  }

  const cardsContainer = column.querySelector('.board-cards');
  if (!cardsContainer) {
    removePlaceholder();
    stopContinuousAutoScroll();
    isDraggingActive = false;
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
      removePlaceholder();
      stopContinuousAutoScroll();
      isDraggingActive = false;
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
    const nextEl = placeholder.nextElementSibling;
    if (!nextEl || !nextEl.classList.contains('task-card')) {
      // Placeholder is at the bottom of the column
      insertIdx = existingTaskIds.length;
    } else {
      const nextTaskId = nextEl.dataset.taskId;
      const idx = existingTaskIds.indexOf(nextTaskId);
      if (idx !== -1) {
        insertIdx = idx;
      }
    }
  } else if (existingCards.length > 0) {
    // Fallback if placeholder was detached right before drop: calculate via clientY
    const firstRect = existingCards[0].getBoundingClientRect();
    const lastRect = existingCards[existingCards.length - 1].getBoundingClientRect();

    if (clientY <= firstRect.top + firstRect.height / 2) {
      insertIdx = 0; // Guaranteed TOP of the column
    } else if (clientY >= lastRect.bottom - lastRect.height / 3) {
      insertIdx = existingTaskIds.length; // Guaranteed BOTTOM of the column
    } else {
      const afterCard = getDragAfterElement(cardsContainer, clientY);
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
  removePlaceholder();
  stopContinuousAutoScroll();
  isDraggingActive = false;

  // 4. Build the final ordered list of task IDs for this column
  const newColumnTaskIds = [...existingTaskIds];
  newColumnTaskIds.splice(insertIdx, 0, taskId);

  // 5. Update dragged task status
  if (newStatus === 'review' && ['review', 'approval', 'blocked'].includes(task.status)) {
    // Keep existing sub-status within review/approval/blocked grouping
  } else {
    task.status = newStatus;
  }

  // Register in recently moved tasks cache to protect against stale background polls
  if (!window._recentlyMovedTasks) {
    window._recentlyMovedTasks = new Map();
  }
  window._recentlyMovedTasks.set(taskId, {
    status: task.status,
    sortOrder: (insertIdx + 1) * 100,
    timestamp: Date.now()
  });
  const nowCleanup = Date.now();
  for (const [id, info] of window._recentlyMovedTasks.entries()) {
    if (nowCleanup - info.timestamp > 30000) {
      window._recentlyMovedTasks.delete(id);
    }
  }

  // 6. Assign clean, contiguous sortOrder (100, 200, 300, ...) to every task in this column
  newColumnTaskIds.forEach((id, idx) => {
    const t = (state.data.tasks || []).find(x => x.id === id);
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
    }
  });

  // Also adjust trailing orders for any non-visible tasks sharing this status
  const columnStatuses = (newStatus === 'review') ? ['review', 'approval', 'blocked'] : [newStatus];
  let trailingOrder = (newColumnTaskIds.length + 1) * 100;
  (state.data.tasks || []).forEach(t => {
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

document.addEventListener('drop', async (event) => {
  if (!isDraggingActive && !window._isDraggingTask) return;
  event.preventDefault();

  let column = event.target.closest('.board-column');
  if (!column && placeholder && placeholder.parentNode) {
    column = placeholder.closest('.board-column');
  }
  if (!column) {
    const el = document.elementFromPoint(event.clientX, event.clientY);
    column = el?.closest('.board-column');
  }
  if (!column) {
    const columns = Array.from(document.querySelectorAll('.board-column'));
    if (columns.length > 0) {
      column = columns.reduce((closest, col) => {
        const rect = col.getBoundingClientRect();
        const dist = Math.abs(event.clientX - (rect.left + rect.width / 2));
        return dist < closest.dist ? { col, dist } : closest;
      }, { col: null, dist: Infinity }).col;
    }
  }

  const taskId = activeDraggedTaskId || (event.dataTransfer ? event.dataTransfer.getData('text/plain') : null);
  await handleTaskDrop(column, event.clientY, taskId);
});

// Touch Drag & Drop Support for Mobile / iPad
let touchCard = null;
let touchGhost = null;
let touchStartX = 0;
let touchStartY = 0;
let touchOffsetX = 0;
let touchOffsetY = 0;
let touchHoldTimer = null;
let isTouchDragging = false;

function cleanTouchDrag() {
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (touchGhost && touchGhost.parentNode) {
    touchGhost.parentNode.removeChild(touchGhost);
  }
  touchGhost = null;
  if (touchCard) {
    touchCard.style.opacity = '';
    touchCard.style.pointerEvents = '';
    touchCard.classList.remove('is-dragging');
  }
  stopContinuousAutoScroll();
  isDraggingActive = false;
  document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
  removePlaceholder();
  touchCard = null;
  isTouchDragging = false;
  activeDraggedTaskId = null;
  currentMouseX = -1;
  currentMouseY = -1;
}

document.addEventListener('touchstart', (e) => {
  // Only handle single touch on a task card
  if (e.touches.length !== 1) return;
  const card = e.target.closest('.task-card');
  // Avoid dragging if touch started on an interactive control inside the card
  if (!card || e.target.closest('button, a, input, select, textarea, .btn')) return;

  const task = (state.data?.tasks || []).find(t => t.id === card.dataset.taskId);
  if (!canUserMoveTask(task)) return;

  touchCard = card;
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  isTouchDragging = false;

  // 120ms Optimized Tactile Pickup: Instant feedback without hindering normal fast swipe
  touchHoldTimer = setTimeout(() => {
    if (!touchCard) return;
    isTouchDragging = true;
    isDraggingActive = true;
    activeDraggedTaskId = touchCard.dataset.taskId;

    // Haptic feedback tick
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(30); } catch (e) {}
    }

    const rect = touchCard.getBoundingClientRect();
    draggedCardHeight = rect.height;
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;

    // Create floating clone that visibly follows the finger with zero lag
    touchGhost = touchCard.cloneNode(true);
    touchGhost.id = 'touch-drag-ghost';
    touchGhost.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: ${rect.width}px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.95;
      transform: translate3d(${rect.left}px, ${rect.top}px, 0) scale(1.03) rotate(1.2deg);
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      border: 1px solid var(--brand-teal, #0d6269);
      background: var(--surface, #ffffff);
      border-radius: 12px;
      will-change: transform;
    `;
    document.body.appendChild(touchGhost);

    // Make original card transparent to elementFromPoint
    touchCard.classList.add('is-dragging');
    touchCard.style.opacity = '0.22';
    touchCard.style.pointerEvents = 'none';

    // Highlight initial column
    const column = touchCard.closest('.board-column');
    if (column) {
      column.classList.add('drag-over');
      const cardsContainer = column.querySelector('.board-cards');
      if (cardsContainer) {
        const ph = getOrCreatePlaceholder(draggedCardHeight);
        const afterCard = getDragAfterElement(cardsContainer, touch.clientY);
        if (afterCard == null) {
          cardsContainer.appendChild(ph);
        } else {
          cardsContainer.insertBefore(ph, afterCard);
        }
      }
    }
    startContinuousAutoScroll();
  }, 120);
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!touchCard) return;
  const touch = e.touches[0];
  const deltaX = Math.abs(touch.clientX - touchStartX);
  const deltaY = Math.abs(touch.clientY - touchStartY);

  // If user moves finger before hold timer fires, check natural finger wobble threshold (14px)
  if (!isTouchDragging) {
    if (deltaX > 14 || deltaY > 14) {
      if (touchHoldTimer) {
        clearTimeout(touchHoldTimer);
        touchHoldTimer = null;
      }
      touchCard = null;
    }
    return;
  }

  // Active Dragging Mode
  if (e.cancelable) e.preventDefault();

  currentMouseX = touch.clientX;
  currentMouseY = touch.clientY;

  // Move floating ghost smoothly with finger via hardware acceleration
  if (touchGhost) {
    const gx = touch.clientX - touchOffsetX;
    const gy = touch.clientY - touchOffsetY;
    touchGhost.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(1.03) rotate(1.2deg)`;
  }

  // Find target element underneath finger
  const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
  let column = elUnder?.closest('.board-column');
  if (!column) {
    const columns = Array.from(document.querySelectorAll('.board-column'));
    if (columns.length > 0) {
      column = columns.reduce((closest, col) => {
        const rect = col.getBoundingClientRect();
        const dist = Math.abs(touch.clientX - (rect.left + rect.width / 2));
        return dist < closest.dist ? { col, dist } : closest;
      }, { col: null, dist: Infinity }).col;
    }
  }

  document.querySelectorAll('.board-column').forEach(col => col.classList.toggle('drag-over', col === column));

  if (column) {
    const cardsContainer = column.querySelector('.board-cards');
    if (cardsContainer) {
      const ph = getOrCreatePlaceholder(draggedCardHeight);
      const afterCard = getDragAfterElement(cardsContainer, touch.clientY);
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

document.addEventListener('touchend', async (e) => {
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (!touchCard) return;

  if (isTouchDragging) {
    const touch = e.changedTouches[0];
    const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
    let column = elUnder?.closest('.board-column') || (placeholder && placeholder.closest('.board-column'));
    if (!column) {
      const columns = Array.from(document.querySelectorAll('.board-column'));
      if (columns.length > 0) {
        column = columns.reduce((closest, col) => {
          const rect = col.getBoundingClientRect();
          const dist = Math.abs(touch.clientX - (rect.left + rect.width / 2));
          return dist < closest.dist ? { col, dist } : closest;
        }, { col: null, dist: Infinity }).col;
      }
    }
    const draggedId = activeDraggedTaskId;

    // Immediately remove ghost clone from DOM for crisp release
    if (touchGhost && touchGhost.parentNode) {
      touchGhost.parentNode.removeChild(touchGhost);
    }
    touchGhost = null;

    if (column && draggedId) {
      await handleTaskDrop(column, touch.clientY, draggedId);
    }
    cleanTouchDrag();
  } else {
    cleanTouchDrag();
  }
});

document.addEventListener('touchcancel', () => {
  cleanTouchDrag();
});
