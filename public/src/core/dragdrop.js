import { state } from './state.js';
import { api } from './api.js';
import { renderView } from './router.js';
import { showToast } from '../shared/ui.js';
import { choose } from '../core/utils.js';
import { getTaskSortOrder } from '../features/tasks/tasks.js';

let placeholder = null;
let activeDraggedTaskId = null;

function getOrCreatePlaceholder() {
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.className = 'drag-placeholder';
    placeholder.style.cssText = `
      border: 2px dashed var(--teal, #0d9488);
      background: rgba(13, 148, 136, 0.08);
      border-radius: 10px;
      height: 52px;
      margin: 6px 0;
      transition: none;
      pointer-events: none;
      box-shadow: inset 0 0 10px rgba(13, 148, 136, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--teal, #0d9488);
      font-size: 11px;
      font-weight: 600;
    `;
    placeholder.innerHTML = `<span>↓ ${choose('الموقع الجديد للمهمة', 'Drop position')}</span>`;
  }
  return placeholder;
}

function removePlaceholder() {
  if (placeholder && placeholder.parentNode) {
    placeholder.parentNode.removeChild(placeholder);
  }
}

// Find closest card to insert placeholder before/after based on cursor Y
function getDropTargetCard(cardsContainer, clientY) {
  const cards = Array.from(cardsContainer.querySelectorAll('.task-card:not(.is-dragging)'));
  for (const card of cards) {
    const box = card.getBoundingClientRect();
    const midPoint = box.top + box.height / 2;
    if (clientY < midPoint) {
      return card;
    }
  }
  return null;
}

document.addEventListener('dragstart', (event) => {
  const card = event.target.closest('.task-card');
  if (card) {
    window._isDraggingTask = true;
    activeDraggedTaskId = card.dataset.taskId;
    event.dataTransfer.effectAllowed = 'move';
    try { event.dataTransfer.setData('text/plain', activeDraggedTaskId); } catch(e) {}
    card.classList.add('is-dragging');
  }
});

document.addEventListener('dragend', (event) => {
  const card = event.target.closest('.task-card');
  if (card) {
    card.classList.remove('is-dragging');
  }
  window._isDraggingTask = false;
  window._justDroppedTaskId = activeDraggedTaskId;
  window._justDroppedAt = Date.now();
  activeDraggedTaskId = null;
  document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
  removePlaceholder();
});

document.addEventListener('dragover', (event) => {
  const column = event.target.closest('.board-column');
  if (column) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    column.classList.add('drag-over');

    // Horizontal auto-scroll if dragging near screen edges on desktop
    const edgeMargin = 50;
    const boardEl = document.querySelector('.board, .board-columns, .tasks-board, [data-board]');
    if (boardEl) {
      if (event.clientX < edgeMargin) {
        boardEl.scrollLeft -= 14;
      } else if (event.clientX > window.innerWidth - edgeMargin) {
        boardEl.scrollLeft += 14;
      }
    }

    const cardsContainer = column.querySelector('.board-cards');
    if (cardsContainer) {
      const ph = getOrCreatePlaceholder();
      const nextCard = getDropTargetCard(cardsContainer, event.clientY);
      if (nextCard) {
        if (ph.nextSibling !== nextCard) {
          cardsContainer.insertBefore(ph, nextCard);
        }
      } else {
        if (!cardsContainer.contains(ph) || cardsContainer.lastElementChild !== ph) {
          cardsContainer.appendChild(ph);
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
    const rect = column.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    // Only remove placeholder if cursor is genuinely outside column boundary
    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      column.classList.remove('drag-over');
      removePlaceholder();
    }
  }
});

async function handleTaskDrop(column, clientY, explicitTaskId = null) {
  if (!column) {
    removePlaceholder();
    return;
  }
  column.classList.remove('drag-over');

  const cardsContainer = column.querySelector('.board-cards');
  
  // Determine exact drop position BEFORE removing placeholder
  let insertBeforeTaskId = null;
  if (placeholder && placeholder.parentNode === cardsContainer) {
    const nextEl = placeholder.nextElementSibling;
    if (nextEl && nextEl.classList.contains('task-card') && nextEl.dataset.taskId !== (explicitTaskId || activeDraggedTaskId)) {
      insertBeforeTaskId = nextEl.dataset.taskId;
    }
  } else if (cardsContainer) {
    const nextCard = getDropTargetCard(cardsContainer, clientY);
    if (nextCard && nextCard.dataset.taskId !== (explicitTaskId || activeDraggedTaskId)) {
      insertBeforeTaskId = nextCard.dataset.taskId;
    }
  }

  removePlaceholder();

  const taskId = explicitTaskId || activeDraggedTaskId;
  activeDraggedTaskId = null;

  const newStatus = column.dataset.status;
  if (!taskId || !newStatus) return;

  const task = (state.data?.tasks || []).find(t => t.id === taskId);
  if (!task) return;

  const isStatusSame = task.status === newStatus || (newStatus === 'review' && ['review', 'approval', 'blocked'].includes(task.status));

  if (!isStatusSame && newStatus === 'done' && task.dependencies && task.dependencies.length) {
    const incomplete = task.dependencies.filter(depId => {
      const dep = state.data.tasks.find(t => t.id === depId);
      return dep && dep.status !== 'done';
    });
    if (incomplete.length) {
      return showToast(choose('لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.', 'Cannot complete task before its dependencies.'), true);
    }
  }

  // Set sort preferences to custom
  state.projectTaskSort = 'custom';
  state.myTaskSort = 'custom';
  localStorage.setItem('darc_task_sort_pref', 'custom');

  // Find all sibling tasks in this target column (scope reordering to this column & project)
  const columnStatuses = (newStatus === 'review') ? ['review', 'approval', 'blocked'] : [newStatus];
  let targetColumnTasks = (state.data.tasks || []).filter(t => 
    t.projectId === task.projectId && 
    (columnStatuses.includes(t.status) || t.id === taskId)
  );

  // Remove dragged task from column tasks list if present
  const existingColIdx = targetColumnTasks.findIndex(t => t.id === taskId);
  if (existingColIdx !== -1) {
    targetColumnTasks.splice(existingColIdx, 1);
  }

  // Ensure tasks are sorted by current order first so relative insertion is exact
  targetColumnTasks.sort((a, b) => getTaskSortOrder(a) - getTaskSortOrder(b));

  // Update dragged task status
  task.status = newStatus;

  // Insert at the exact calculated location
  let insertIdx = targetColumnTasks.length; // default to end
  if (insertBeforeTaskId) {
    let nextIdx = targetColumnTasks.findIndex(t => t.id === insertBeforeTaskId);
    if (nextIdx === -1 && placeholder && placeholder.parentNode) {
      // Find the first subsequent card in DOM that belongs to this same project
      let siblingEl = placeholder.nextElementSibling;
      while (siblingEl) {
        if (siblingEl.classList?.contains('task-card') && siblingEl.dataset.taskId) {
          const sIdx = targetColumnTasks.findIndex(t => t.id === siblingEl.dataset.taskId);
          if (sIdx !== -1) {
            nextIdx = sIdx;
            break;
          }
        }
        siblingEl = siblingEl.nextElementSibling;
      }
    }
    if (nextIdx !== -1) insertIdx = nextIdx;
  }
  targetColumnTasks.splice(insertIdx, 0, task);

  // Re-assign distinct sortOrder to every task in this column
  targetColumnTasks.forEach((t, idx) => {
    const newOrder = (idx + 1) * 100;
    t.sortOrder = newOrder;
    t.sort_order = newOrder;
    t.customFields = { ...(t.customFields || {}), sortOrder: newOrder, sort_order: newOrder };
    t.custom_fields = { ...(t.custom_fields || {}), sortOrder: newOrder, sort_order: newOrder };
  });

  // Re-render board immediately (instant UI response)
  renderView();
  const droppedCardEl = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
  if (droppedCardEl) {
    droppedCardEl.classList.add('just-dropped');
    setTimeout(() => droppedCardEl.classList.remove('just-dropped'), 400);
  }

  // Debounce & Queue batch reorder API sync to consolidate rapid consecutive drops
  if (window._reorderSyncTimer) clearTimeout(window._reorderSyncTimer);
  window._pendingReorderBatch = window._pendingReorderBatch || new Map();
  targetColumnTasks.forEach(t => {
    window._pendingReorderBatch.set(t.id, {
      id: t.id,
      status: t.status,
      sortOrder: t.sortOrder,
      customFields: t.customFields
    });
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
  const column = event.target.closest('.board-column');
  event.preventDefault();
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
  document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
  removePlaceholder();
  touchCard = null;
  isTouchDragging = false;
  activeDraggedTaskId = null;
}

document.addEventListener('touchstart', (e) => {
  // Only handle single touch on a task card
  if (e.touches.length !== 1) return;
  const card = e.target.closest('.task-card');
  // Avoid dragging if touch started on an interactive control inside the card
  if (!card || e.target.closest('button, a, input, select, textarea, .btn')) return;

  touchCard = card;
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  isTouchDragging = false;

  // 220ms Long-Press Timer: Prevents accidental dragging when user simply scrolls the board
  touchHoldTimer = setTimeout(() => {
    if (!touchCard) return;
    isTouchDragging = true;
    activeDraggedTaskId = touchCard.dataset.taskId;

    // Haptic feedback if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40); } catch (e) {}
    }

    const rect = touchCard.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;

    // Create floating clone that visibly follows the finger
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
      transform: translate3d(${rect.left}px, ${rect.top}px, 0) scale(1.03) rotate(1.5deg);
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      transition: transform 0.05s linear;
      border: 1px solid var(--teal, #0d9488);
      background: var(--surface, #ffffff);
      border-radius: 12px;
    `;
    document.body.appendChild(touchGhost);

    // Make original card transparent and transparent to elementFromPoint
    touchCard.classList.add('is-dragging');
    touchCard.style.opacity = '0.25';
    touchCard.style.pointerEvents = 'none';

    // Highlight initial column
    const column = touchCard.closest('.board-column');
    if (column) {
      column.classList.add('drag-over');
      const cardsContainer = column.querySelector('.board-cards');
      if (cardsContainer) {
        const ph = getOrCreatePlaceholder();
        const nextCard = getDropTargetCard(cardsContainer, touch.clientY);
        if (nextCard && ph.nextSibling !== nextCard) {
          cardsContainer.insertBefore(ph, nextCard);
        } else if (!cardsContainer.contains(ph)) {
          cardsContainer.appendChild(ph);
        }
      }
    }
  }, 220);
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!touchCard) return;
  const touch = e.touches[0];
  const deltaX = Math.abs(touch.clientX - touchStartX);
  const deltaY = Math.abs(touch.clientY - touchStartY);

  // If user moves finger before long-press fires, they are scrolling: cancel drag timer!
  if (!isTouchDragging) {
    if (deltaX > 8 || deltaY > 8) {
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

  // Move floating ghost smoothly with finger
  if (touchGhost) {
    const gx = touch.clientX - touchOffsetX;
    const gy = touch.clientY - touchOffsetY;
    touchGhost.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(1.03) rotate(1.5deg)`;
  }

  // Horizontal auto-scroll if dragging near screen edges
  const edgeMargin = 45;
  const boardEl = document.querySelector('.board, .board-columns, .tasks-board, [data-board]');
  if (boardEl) {
    if (touch.clientX < edgeMargin) {
      boardEl.scrollLeft -= 12;
    } else if (touch.clientX > window.innerWidth - edgeMargin) {
      boardEl.scrollLeft += 12;
    }
  }

  // Find target element underneath finger (touchGhost & touchCard have pointer-events: none)
  const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
  const column = elUnder?.closest('.board-column');
  document.querySelectorAll('.board-column').forEach(col => col.classList.toggle('drag-over', col === column));

  if (column) {
    const cardsContainer = column.querySelector('.board-cards');
    if (cardsContainer) {
      const ph = getOrCreatePlaceholder();
      const nextCard = getDropTargetCard(cardsContainer, touch.clientY);
      if (nextCard) {
        if (ph.nextSibling !== nextCard) cardsContainer.insertBefore(ph, nextCard);
      } else {
        if (!cardsContainer.contains(ph) || cardsContainer.lastElementChild !== ph) {
          cardsContainer.appendChild(ph);
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
    const column = elUnder?.closest('.board-column') || (placeholder && placeholder.closest('.board-column'));
    const draggedId = activeDraggedTaskId;

    // Immediately remove ghost clone from DOM for crisp responsive touch release
    if (touchGhost && touchGhost.parentNode) {
      touchGhost.parentNode.removeChild(touchGhost);
    }
    touchGhost = null;

    if (column && draggedId) {
      // Let handleTaskDrop calculate exact slot relative to placeholder before removing it
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
