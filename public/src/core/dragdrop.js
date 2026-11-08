import { state } from './state.js';
import { api } from './api.js';
import { renderView } from './router.js';
import { showToast } from '../shared/ui.js';
import { choose, t, setSavedTaskSort, canUserMoveTask } from '../core/utils.js';

let placeholder = null;
let activeDraggedTaskId = null;
let draggedCardHeight = 64;
let autoScrollRaf = null;
let currentMouseX = -1;
let currentMouseY = -1;
let prevMouseX = -1;
let currentTilt = 0;
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
let currentPointerType = 'mouse';

// Accessible Keyboard Drag State
let keyboardDraggedTaskId = null;
let keyboardDraggedCard = null;
let keyboardOriginalStatus = null;
let keyboardOriginalSortOrder = null;

// Screen Reader Live Region Announcer
function announceDnd(message) {
  let announcer = document.getElementById('dnd-live-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'dnd-live-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'assertive');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
  announcer.textContent = '';
  setTimeout(() => { announcer.textContent = message; }, 40);
}

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
    transition: height 0.15s cubic-bezier(0.16, 1, 0.3, 1);
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
  const cards = Array.from(cardsContainer.querySelectorAll('.task-card:not(.is-dragging):not(#active-drag-ghost)'));
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

// Universal Multi-Engine RTL Scroll Type Detector
function getRtlScrollType() {
  if (typeof window === 'undefined') return 'reverse';
  if (window.__rtlScrollType) return window.__rtlScrollType;
  try {
    const def = document.createElement('div');
    def.dir = 'rtl';
    def.style.width = '4px';
    def.style.height = '4px';
    def.style.position = 'absolute';
    def.style.top = '-9999px';
    def.style.overflow = 'scroll';
    document.body.appendChild(def);
    let type = 'reverse';
    if (def.scrollLeft > 0) {
      type = 'default';
    } else {
      def.scrollLeft = 1;
      if (def.scrollLeft === 0) type = 'negative';
    }
    document.body.removeChild(def);
    window.__rtlScrollType = type;
    return type;
  } catch (e) {
    return 'reverse';
  }
}

// Interactive Visual Edge Hotzones for Mobile & Narrow Viewports
let leftEdgeHotzone = null;
let rightEdgeHotzone = null;

// Interactive Mobile & Tablet Quick-Column Drag Dock
let columnDock = null;
let activeDockStatus = null;

function showColumnDock() {
  if (typeof document === 'undefined') return;
  const isMobileOrTouch = window.innerWidth <= 860 || currentPointerType === 'touch';
  if (!isMobileOrTouch) return;
  if (columnDock && columnDock.parentNode) return;

  const boardCols = Array.from(document.querySelectorAll('.board-column'));
  if (!boardCols.length) return;

  columnDock = document.createElement('div');
  columnDock.id = 'dnd-column-dock';
  columnDock.className = 'dnd-column-dock';
  columnDock.setAttribute('role', 'toolbar');
  columnDock.setAttribute('aria-label', choose('التنقل السريع بين الأعمدة', 'Quick column navigator'));

  let pillsHtml = '';
  boardCols.forEach(col => {
    const status = col.dataset.status;
    const titleEl = col.querySelector('.board-column-title');
    const dotEl = col.querySelector('.column-dot');
    const dotClass = dotEl ? dotEl.className : 'column-dot';
    const countEl = col.querySelector('.board-count');
    const title = titleEl ? titleEl.innerText.trim() : status;
    const count = countEl ? countEl.innerText.trim() : '0';

    pillsHtml += `
      <div class="dock-column-pill" data-dock-status="${status}">
        <span class="${dotClass}" style="width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;"></span>
        <span class="dock-pill-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;">${title}</span>
        <span class="dock-pill-count" style="font-size:10px;font-weight:700;opacity:0.85;padding:1px 5px;border-radius:10px;background:rgba(0,0,0,0.06);">${count}</span>
      </div>
    `;
  });

  columnDock.innerHTML = pillsHtml;
  document.body.appendChild(columnDock);

  requestAnimationFrame(() => {
    columnDock?.classList.add('is-visible');
  });
}

function hideColumnDock() {
  activeDockStatus = null;
  if (columnDock) {
    columnDock.classList.remove('is-visible');
    const el = columnDock;
    columnDock = null;
    setTimeout(() => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 220);
  }
}

function showEdgeHotzones() {
  if (typeof document === 'undefined') return;
  if (!leftEdgeHotzone) {
    leftEdgeHotzone = document.createElement('div');
    leftEdgeHotzone.className = 'dnd-edge-hotzone left';
    document.body.appendChild(leftEdgeHotzone);
  }
  if (!rightEdgeHotzone) {
    rightEdgeHotzone = document.createElement('div');
    rightEdgeHotzone.className = 'dnd-edge-hotzone right';
    document.body.appendChild(rightEdgeHotzone);
  }
}

function hideEdgeHotzones() {
  if (leftEdgeHotzone && leftEdgeHotzone.parentNode) {
    leftEdgeHotzone.parentNode.removeChild(leftEdgeHotzone);
    leftEdgeHotzone = null;
  }
  if (rightEdgeHotzone && rightEdgeHotzone.parentNode) {
    rightEdgeHotzone.parentNode.removeChild(rightEdgeHotzone);
    rightEdgeHotzone = null;
  }
}

let lastPlaceholderY = -1;
let lastPlaceholderColumn = null;
let lastHapticColIndex = -1;

// Dynamic Placeholder & Dropzone Hit-Testing with Spatial Hysteresis Deadband
function updatePlaceholderPosition(clientX, clientY) {
  if (!isDraggingActive || clientX < 0 || clientY < 0) return;

  const elUnder = document.elementFromPoint(clientX, clientY);
  let column = elUnder?.closest('.board-column');

  // If outside all columns, snap to nearest column if within vertical bounds of board
  // (Tolerant edge detection: guarantees placeholder stays active even at mobile screen edges)
  const boardEl = document.querySelector('.board, .tasks-board, .board-columns');
  if (!column && boardEl) {
    const bRect = boardEl.getBoundingClientRect();
    if (clientY >= bRect.top - 80 && clientY <= bRect.bottom + 80) {
      const columns = Array.from(document.querySelectorAll('.board-column'));
      if (columns.length > 0) {
        column = columns.reduce((closest, col) => {
          const rect = col.getBoundingClientRect();
          const dist = Math.abs(clientX - (rect.left + rect.width / 2));
          return dist < closest.dist ? { col, dist } : closest;
        }, { col: null, dist: Infinity }).col;
      }
    }
  }

  // If completely outside the board, clean drag-over and exit cleanly without jumping
  if (!column) {
    document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
    return;
  }

  document.querySelectorAll('.board-column').forEach(col => col.classList.toggle('drag-over', col === column));

  const cardsContainer = column.querySelector('.board-cards');
  if (cardsContainer) {
    // Spatial Hysteresis Buffer (14px): If same column and vertical movement is within deadband, avoid DOM churn
    if (lastPlaceholderColumn === column && lastPlaceholderY >= 0 && Math.abs(clientY - lastPlaceholderY) < 14) {
      return;
    }
    lastPlaceholderColumn = column;
    lastPlaceholderY = clientY;

    const ph = getOrCreatePlaceholder(draggedCardHeight);
    const afterCard = getDragAfterElement(cardsContainer, clientY);
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

// Continuous Velocity-Based Proportional Auto-Scroller via requestAnimationFrame (Universal Dual-Zone Engine)
function startContinuousAutoScroll() {
  if (autoScrollRaf) return;

  function step() {
    if (!isDraggingActive) {
      autoScrollRaf = null;
      return;
    }

    if (currentMouseX >= 0 && currentMouseY >= 0) {
      let didScroll = false;

      // ── 1. HORIZONTAL BOARD AUTO-SCROLL (Universal RTL & Multi-Engine Aware) ──
      const boardEl = document.querySelector('.board, .board-columns, .tasks-board, [data-board]');
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const hEdgeMargin = isMobile ? 75 : 85;
      const maxHScrollSpeed = isMobile ? 24 : 28;

      if (boardEl) {
        let hDelta = 0;
        const screenW = (typeof window !== 'undefined' && window.visualViewport?.width) || window.innerWidth;
        const ghostRect = dragGhost ? dragGhost.getBoundingClientRect() : null;

        // Dual-zone detection: checks both finger touch coordinate and floating card bounding box
        const isLeftZone = (currentMouseX < hEdgeMargin) || (ghostRect && ghostRect.left < 35);
        const isRightZone = (currentMouseX > screenW - hEdgeMargin) || (ghostRect && ghostRect.right > screenW - 35);

        if (isLeftZone) {
          const edgeDist = Math.max(0, currentMouseX < hEdgeMargin ? (hEdgeMargin - currentMouseX) : 35);
          const factor = Math.min(1.5, Math.max(0.15, edgeDist / hEdgeMargin));
          const speed = Math.max(4, Math.round(Math.pow(factor, 1.3) * maxHScrollSpeed));
          hDelta = -speed;
        } else if (isRightZone) {
          const edgeDist = Math.max(0, currentMouseX > screenW - hEdgeMargin ? (currentMouseX - (screenW - hEdgeMargin)) : 35);
          const factor = Math.min(1.5, Math.max(0.15, edgeDist / hEdgeMargin));
          const speed = Math.max(4, Math.round(Math.pow(factor, 1.3) * maxHScrollSpeed));
          hDelta = speed;
        }

        if (hDelta !== 0) {
          const prevLeft = boardEl.scrollLeft;
          try {
            boardEl.scrollBy({ left: hDelta });
          } catch (e) {}
          if (boardEl.scrollLeft === prevLeft) {
            boardEl.scrollLeft += hDelta;
          }
          if (boardEl.scrollLeft !== prevLeft) {
            didScroll = true;
          }

          // Dynamic Active Glow on Edge Hotzones
          if (didScroll) {
            if (hDelta < 0) {
              leftEdgeHotzone?.classList.add('is-active');
              rightEdgeHotzone?.classList.remove('is-active');
            } else {
              rightEdgeHotzone?.classList.add('is-active');
              leftEdgeHotzone?.classList.remove('is-active');
            }
          } else {
            // Hit boundary wall: remove active glow
            leftEdgeHotzone?.classList.remove('is-active');
            rightEdgeHotzone?.classList.remove('is-active');
          }

          // Haptic tick when crossing columns on touch devices
          if (isMobile) {
            const centerEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            const activeCol = centerEl?.closest('.board-column');
            if (activeCol) {
              const allCols = Array.from(document.querySelectorAll('.board-column'));
              const colIdx = allCols.indexOf(activeCol);
              if (colIdx !== -1 && colIdx !== lastHapticColIndex) {
                lastHapticColIndex = colIdx;
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  try { navigator.vibrate(12); } catch (e) {}
                }
              }
            }
          }
        } else {
          leftEdgeHotzone?.classList.remove('is-active');
          rightEdgeHotzone?.classList.remove('is-active');
        }
      }

      // ── 2. VERTICAL PAGE & WORKSPACE AUTO-SCROLL (Downwards & Upwards) ──
      const vEdgeMargin = 95;
      const maxVScrollSpeed = 26;

      const mainContent = document.getElementById('main-content') || document.querySelector('.workspace-content');
      const mainRect = mainContent ? mainContent.getBoundingClientRect() : null;

      // Top Boundary: Near top of viewport or top of workspace container
      const topBoundary = mainRect ? Math.max(60, mainRect.top + 60) : 80;
      // Bottom Boundary: Near bottom of viewport or bottom edge of workspace container
      const bottomBoundary = mainRect ? Math.min(window.innerHeight - 30, mainRect.bottom - 60) : (window.innerHeight - 80);

      if (currentMouseY > bottomBoundary) {
        const factor = Math.min(1.5, Math.max(0.2, (currentMouseY - bottomBoundary) / vEdgeMargin));
        const speed = Math.max(4, Math.round(factor * maxVScrollSpeed));

        if (mainContent && mainContent.scrollHeight > mainContent.clientHeight) {
          const prev = mainContent.scrollTop;
          mainContent.scrollTop += speed;
          if (mainContent.scrollTop !== prev) didScroll = true;
        }
        if (document.documentElement.scrollHeight > window.innerHeight) {
          const prev = window.scrollY;
          window.scrollBy({ top: speed, behavior: 'instant' });
          if (window.scrollY !== prev) didScroll = true;
        }
      } else if (currentMouseY < topBoundary) {
        const factor = Math.min(1.5, Math.max(0.2, (topBoundary - currentMouseY) / vEdgeMargin));
        const speed = -Math.max(4, Math.round(factor * maxVScrollSpeed));

        if (mainContent && mainContent.scrollHeight > mainContent.clientHeight) {
          const prev = mainContent.scrollTop;
          mainContent.scrollTop += speed;
          if (mainContent.scrollTop !== prev) didScroll = true;
        }
        if (document.documentElement.scrollHeight > window.innerHeight) {
          const prev = window.scrollY;
          window.scrollBy({ top: speed, behavior: 'instant' });
          if (window.scrollY !== prev) didScroll = true;
        }
      }

      // ── 3. NESTED COLUMN AUTO-SCROLL (For long task lists inside individual column) ──
      const elUnder = document.elementFromPoint(currentMouseX, currentMouseY);
      const cardsCol = elUnder?.closest('.board-cards') || elUnder?.closest('.board-column')?.querySelector('.board-cards');
      if (cardsCol && cardsCol.scrollHeight > cardsCol.clientHeight) {
        const cRect = cardsCol.getBoundingClientRect();
        const vMargin = 60;
        if (currentMouseY > cRect.top && currentMouseY < cRect.top + vMargin) {
          const vFactor = (vMargin - (currentMouseY - cRect.top)) / vMargin;
          cardsCol.scrollTop -= Math.max(3, Math.round(vFactor * 18));
          didScroll = true;
        } else if (currentMouseY < cRect.bottom && currentMouseY > cRect.bottom - vMargin) {
          const vFactor = (currentMouseY - (cRect.bottom - vMargin)) / vMargin;
          cardsCol.scrollTop += Math.max(3, Math.round(vFactor * 18));
          didScroll = true;
        }
      }

      // If page or column scrolled, re-evaluate placeholder position under current cursor
      if (didScroll) {
        updatePlaceholderPosition(currentMouseX, currentMouseY);
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
      while (cur && (!cur.classList?.contains('task-card') || cur.dataset?.taskId === taskId || cur.classList?.contains('is-dragging'))) {
        cur = cur.nextElementSibling;
      }
      if (cur && cur.dataset?.taskId && cur.dataset.taskId !== taskId) {
        const idx = existingTaskIds.indexOf(cur.dataset.taskId);
        insertIdx = (idx !== -1) ? idx : existingTaskIds.length;
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
      if (afterCard && afterCard.dataset.taskId !== taskId) {
        const idx = existingTaskIds.indexOf(afterCard.dataset.taskId);
        if (idx !== -1) insertIdx = idx;
      }
    }
  } else {
    // Column is currently empty
    insertIdx = 0;
  }

  // 4. Atlassian Self-Drop Guard: If dropped in the EXACT same spot, cancel mutation with 0 state churn
  const currentCardIdx = Array.from(cardsContainer.querySelectorAll('.task-card')).findIndex(c => c.dataset.taskId === taskId);
  if (isStatusSame && currentCardIdx !== -1 && (insertIdx === currentCardIdx || insertIdx === currentCardIdx + 1)) {
    cleanDragState();
    return;
  }

  // Snapshot previous state for local rollback in case of network or server failure
  const oldStatus = task.status;
  const snapshotTasks = (state.data.tasks || []).map(t => ({
    id: t.id,
    status: t.status,
    sortOrder: t.sortOrder || t.sort_order,
    progress: t.progress,
    customFields: JSON.parse(JSON.stringify(t.customFields || t.custom_fields || {}))
  }));

  // Clean up drag visuals immediately
  cleanDragState();

  // 5. Build the final ordered list of task IDs for this column
  const newColumnTaskIds = [...existingTaskIds];
  newColumnTaskIds.splice(insertIdx, 0, taskId);

  // 6. Update dragged task status & optimistic progress
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

  // 7. Calculate Midpoint Fractional sortOrder (O(1) update)
  let newSortOrder = 100;
  let needsBatchNormalize = false;

  if (newColumnTaskIds.length <= 1) {
    newSortOrder = 100;
  } else if (insertIdx === 0) {
    const nextTask = (state.data?.tasks || []).find(x => x.id === newColumnTaskIds[1]);
    const nextOrder = (nextTask?.sortOrder || nextTask?.sort_order || 100);
    newSortOrder = Math.max(1, Math.round(nextOrder / 2));
    if (newSortOrder >= nextOrder) needsBatchNormalize = true;
  } else if (insertIdx === newColumnTaskIds.length - 1) {
    const prevTask = (state.data?.tasks || []).find(x => x.id === newColumnTaskIds[newColumnTaskIds.length - 2]);
    const prevOrder = (prevTask?.sortOrder || prevTask?.sort_order || 100);
    newSortOrder = prevOrder + 100;
  } else {
    const prevTask = (state.data?.tasks || []).find(x => x.id === newColumnTaskIds[insertIdx - 1]);
    const nextTask = (state.data?.tasks || []).find(x => x.id === newColumnTaskIds[insertIdx + 1]);
    const prevOrder = (prevTask?.sortOrder || prevTask?.sort_order || 100);
    const nextOrder = (nextTask?.sortOrder || nextTask?.sort_order || 200);

    if (nextOrder - prevOrder > 1) {
      newSortOrder = Math.round((prevOrder + nextOrder) / 2);
    } else {
      needsBatchNormalize = true;
    }
  }

  const nowMovedAt = Date.now();
  if (!window._recentlyMovedTasks) window._recentlyMovedTasks = new Map();
  const syncItems = [];

  if (needsBatchNormalize) {
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

        syncItems.push({
          id: t.id,
          status: t.status,
          sortOrder: order,
          customFields: t.customFields
        });
      }
    });
  } else {
    task.sortOrder = newSortOrder;
    task.sort_order = newSortOrder;
    if (!task.customFields) task.customFields = {};
    task.customFields.sortOrder = newSortOrder;
    task.customFields.sort_order = newSortOrder;
    if (!task.custom_fields) task.custom_fields = {};
    task.custom_fields.sortOrder = newSortOrder;
    task.custom_fields.sort_order = newSortOrder;

    window._recentlyMovedTasks.set(task.id, {
      status: task.status,
      sortOrder: newSortOrder,
      progress: task.progress,
      timestamp: nowMovedAt
    });

    syncItems.push({
      id: task.id,
      status: task.status,
      sortOrder: newSortOrder,
      customFields: task.customFields
    });
  }

  // Cleanup old entries (> 45s) from recently moved cache
  for (const [id, info] of window._recentlyMovedTasks.entries()) {
    if (nowMovedAt - info.timestamp > 45000) {
      window._recentlyMovedTasks.delete(id);
    }
  }

  // 8. Enforce Custom Sort mode across state and storage so board renders the exact drop order
  setSavedTaskSort('custom');
  state.taskSortPref = 'custom';
  state.projectTaskSort = 'custom';
  state.myTaskSort = 'custom';

  // 9. Re-render board immediately (instant 0ms optimistic response)
  renderView(true);

  // 10. Post-Drop Target Column Retention & Viewport Centering on Mobile
  const newBoard = document.querySelector('.board, .tasks-board, .board-columns');
  const targetColEl = newBoard?.querySelector(`.board-column[data-status="${newStatus}"]`);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  if (targetColEl && isMobile) {
    try {
      targetColEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } catch (e) {}
  }

  // 11. Tactile haptic feedback on touch devices
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(20); } catch(e) {}
  }

  // 12. Column Counter Micro-Pulse Animation (Linear Standard)
  if (oldStatus !== newStatus) {
    const badges = document.querySelectorAll(`.board-column[data-status="${newStatus}"] .board-count, .board-column[data-status="${oldStatus}"] .board-count`);
    badges.forEach(b => {
      b.classList.remove('count-updated');
      void b.offsetWidth;
      b.classList.add('count-updated');
      setTimeout(() => b.classList.remove('count-updated'), 350);
    });
  }

  // 12. Landing visual pulse
  const droppedCardEl = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
  if (droppedCardEl) {
    droppedCardEl.classList.add('just-dropped');
    setTimeout(() => droppedCardEl?.classList.remove('just-dropped'), 450);
  }

  // 13. Screen reader announcement
  const colTitleEl = column.querySelector('.board-column-title');
  const colName = colTitleEl ? colTitleEl.innerText.trim() : newStatus;
  announceDnd(choose(`تم إفلات المهمة في عمود: ${colName}، الموضع ${insertIdx + 1}.`, `Dropped task into column: ${colName}, position ${insertIdx + 1}.`));

  // 14. Register local mutations immediately to eliminate Realtime echo re-render churn
  syncItems.forEach(item => {
    if (item?.id && typeof window !== 'undefined' && typeof window.recordRecentLocalMutation === 'function') {
      window.recordRecentLocalMutation(item.id);
    }
  });

  // Zero-Latency Cross-Tab Sync: Dispatch granular mutation immediately across local browser tabs
  if (typeof window !== 'undefined' && typeof window.notifyStateMutation === 'function') {
    window.notifyStateMutation({
      table: 'tasks',
      action: 'BATCH_REORDER',
      record: { items: syncItems }
    });
  }

  // Debounce & Queue batch reorder API sync to consolidate rapid consecutive drops
  if (window._reorderSyncTimer) clearTimeout(window._reorderSyncTimer);
  window._pendingReorderBatch = window._pendingReorderBatch || new Map();
  syncItems.forEach(item => {
    window._pendingReorderBatch.set(item.id, item);
  });

  // Micro-flush delay: 10ms for instant network dispatch without artificial lag
  const DROP_FLUSH_DELAY_MS = 10;
  window._reorderSyncTimer = setTimeout(() => {
    const batchItems = Array.from(window._pendingReorderBatch.values());
    window._pendingReorderBatch.clear();

    api('/api/tasks/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ items: batchItems })
    }).catch(e => {
      console.warn('Reorder sync error, performing local rollback:', e);
      // Automatic Enterprise Rollback: preserve any items moved in subsequent user gestures
      snapshotTasks.forEach(snap => {
        const movedInfo = window._recentlyMovedTasks?.get(snap.id);
        if (movedInfo && movedInfo.timestamp > nowMovedAt) {
          return; // Do not overwrite a newer user move
        }
        const item = (state.data?.tasks || []).find(x => x.id === snap.id);
        if (item) {
          item.status = snap.status;
          item.sortOrder = snap.sortOrder;
          item.sort_order = snap.sortOrder;
          item.progress = snap.progress;
          item.customFields = snap.customFields;
        }
      });
      renderView(true);
      showToast(choose('فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.', 'Failed to save task order to server. Reverted automatically.'), true);
    });
  }, DROP_FLUSH_DELAY_MS);
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
    try {
      if (activePointerId != null) dragCard.releasePointerCapture(activePointerId);
    } catch(e) {}
    dragCard.style.opacity = '';
    dragCard.style.pointerEvents = '';
    dragCard.style.touchAction = '';
    dragCard.classList.remove('is-dragging');
    dragCard.classList.remove('is-touch-charging');
    dragCard.classList.remove('is-touch-holding');
  }
  dragCard = null;

  // Restore CSS scroll-snap on board container
  const boardEl = document.querySelector('.board, .board-columns, .tasks-board, [data-board]');
  if (boardEl) boardEl.style.scrollSnapType = '';

  document.body.classList.remove('is-touch-dragging');
  activePointerId = null;
  isPointerDragging = false;
  isDraggingActive = false;
  isTouchCharging = false;
  isScrollingGesture = false;
  window._isDraggingTask = false;
  window._isTouchHoldingTask = false;
  activeDraggedTaskId = null;
  currentMouseX = -1;
  currentMouseY = -1;
  prevMouseX = -1;
  currentTilt = 0;
  lastPlaceholderY = -1;
  lastPlaceholderColumn = null;
  lastHapticColIndex = -1;
  currentPointerType = 'mouse';
  leftEdgeHotzone?.classList.remove('is-active');
  rightEdgeHotzone?.classList.remove('is-active');

  hideColumnDock();
  hideEdgeHotzones();
  stopContinuousAutoScroll();
  document.querySelectorAll('.board-column').forEach(col => col.classList.remove('drag-over'));
  removePlaceholder();

  document.body.style.userSelect = '';
  document.body.style.webkitUserSelect = '';
  document.body.style.cursor = '';

  // Concurrency Shield Flush: if a background render was queued during drag, flush it now
  if (window._pendingRenderAfterDrag) {
    window._pendingRenderAfterDrag = false;
    requestAnimationFrame(() => renderView(true));
  }
}

// Initiate Active Dragging (creates floating ghost, highlights column, starts auto-scroll)
function initiateDrag(clientX, clientY, pointerType = currentPointerType) {
  if (!dragCard || isPointerDragging) return;

  currentPointerType = pointerType;
  const targetTaskId = dragCard.dataset.taskId;
  // Self-Healing DOM Reconnect: If dragCard was replaced/detached during touch charging, reconnect to live element!
  if (!dragCard.isConnected && targetTaskId) {
    const liveCard = document.querySelector(`.task-card[data-task-id="${targetTaskId}"]`);
    if (liveCard) dragCard = liveCard;
  }

  const task = (state.data?.tasks || []).find(t => t.id === dragCard.dataset.taskId);
  if (!canUserMoveTask(task)) {
    cleanDragState();
    return;
  }

  // Reject invalid synthetic coordinates (WebKit mobile 0,0 bug shield)
  if (clientX === 0 && clientY === 0 && (dragStartX !== 0 || dragStartY !== 0)) {
    clientX = dragStartX;
    clientY = dragStartY;
  }

  isPointerDragging = true;
  isDraggingActive = true;
  window._isDraggingTask = true;
  window._isTouchHoldingTask = false;
  activeDraggedTaskId = dragCard.dataset.taskId;
  currentMouseX = clientX;
  currentMouseY = clientY;
  prevMouseX = clientX;
  currentTilt = 0;

  // Haptic feedback tick
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(35); } catch (e) {}
  }

  const rect = dragCard.getBoundingClientRect();
  draggedCardHeight = rect.height;

  // Defensive Dimension Clamping: guarantee card width matches column width and NEVER squishes into a pill
  const col = dragCard.closest('.board-column') || document.querySelector('.board-column');
  const colRect = col?.getBoundingClientRect();
  const fallbackWidth = colRect ? Math.round(colRect.width - 24) : 260;
  const expectedWidth = Math.max(230, Math.min(320, fallbackWidth));
  const safeWidth = (rect && Number.isFinite(rect.width) && rect.width >= 180 && rect.width <= 400)
    ? Math.round(rect.width)
    : expectedWidth;

  dragOffsetX = clientX - rect.left;
  dragOffsetY = clientY - rect.top;

  // Safety fallback if offset is NaN or out of bounds
  if (isNaN(dragOffsetX) || dragOffsetX <= 0 || dragOffsetX > safeWidth) dragOffsetX = safeWidth / 2;
  if (isNaN(dragOffsetY) || dragOffsetY <= 0 || dragOffsetY > (rect.height || 120)) dragOffsetY = (rect.height || 120) / 2;

  // Finger Occlusion Lift Offset on Touch: lifts floating clone 32px above finger for 100% visibility
  const touchLift = (pointerType === 'touch') ? 32 : 0;
  // Integer positioning eliminates subpixel text shimmering on macOS Safari
  const startGx = Math.round(clientX - dragOffsetX);
  const startGy = Math.round(clientY - dragOffsetY - touchLift);

  // Disable scroll-snap on board during drag so WebKit doesn't snap back against programmatic scroll
  const boardEl = document.querySelector('.board, .board-columns, .tasks-board, [data-board]');
  if (boardEl) boardEl.style.scrollSnapType = 'none';

  // Linear-standard hardware-accelerated floating clone that smoothly follows cursor/finger
  // WebKit GPU layer isolation: backface-visibility, transform-style, no transition
  dragGhost = dragCard.cloneNode(true);
  dragGhost.id = 'active-drag-ghost';
  dragGhost.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${safeWidth}px;
    min-width: 230px;
    max-width: 320px;
    box-sizing: border-box;
    contain: none;
    content-visibility: visible;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.98;
    transform: translate3d(${startGx}px, ${startGy}px, 0) scale(1.025);
    box-shadow: 0 20px 42px -8px rgba(13, 98, 105, 0.28), 0 8px 18px rgba(0, 0, 0, 0.12);
    border: 1.5px solid var(--brand-teal, #0d6269);
    background: var(--surface, #ffffff);
    border-radius: 12px;
    will-change: transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: none !important;
    cursor: grabbing !important;
  `;
  document.body.appendChild(dragGhost);

  // Release capture safely before modifying source card styles to avoid WebKit coordinate dropping
  if (activePointerId != null && dragCard) {
    try { dragCard.releasePointerCapture(activePointerId); } catch (e) {}
  }

  // Dim source card & make it transparent to elementFromPoint hit-testing
  dragCard.classList.remove('is-touch-charging');
  dragCard.classList.remove('is-touch-holding');
  dragCard.classList.add('is-dragging');
  dragCard.style.opacity = '0.22';
  dragCard.style.pointerEvents = 'none';

  document.body.classList.add('is-touch-dragging');
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.cursor = 'grabbing';

  showEdgeHotzones();
  showColumnDock();

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

// Unified Velocity & Tilt Physics Movement Engine (Low-Pass Filter & Safari Jitter Elimination)
function updateDragMovement(clientX, clientY, pointerType = currentPointerType) {
  if (!isDraggingActive || !dragGhost) return;
  // Guard WebKit synthetic (0, 0) coordinate glitch on mobile
  if (clientX === 0 && clientY === 0 && (dragStartX !== 0 || dragStartY !== 0)) return;
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return;

  currentPointerType = pointerType;
  currentMouseX = clientX;
  currentMouseY = clientY;

  // On touch devices, keep tilt at 0 for 100% stable finger alignment
  // On desktop mouse, apply subtle low-pass tilt (-2deg to +2deg) with deadband
  if (pointerType === 'touch') {
    currentTilt = 0;
  } else {
    const rawVelX = (prevMouseX >= 0) ? (clientX - prevMouseX) : 0;
    const velX = Math.abs(rawVelX) < 1.5 ? 0 : rawVelX;
    const targetTilt = Math.max(-2, Math.min(2, velX * 0.12));
    currentTilt += (targetTilt - currentTilt) * 0.22;
    if (Math.abs(currentTilt) < 0.12) currentTilt = 0;
  }
  prevMouseX = clientX;

  // Finger Occlusion Lift Offset on Touch: lifts floating clone 32px above finger for 100% visibility
  const touchLift = (pointerType === 'touch') ? 32 : 0;
  // Integer positioning eliminates subpixel rasterization shimmering on Retina displays
  const gx = Math.round(clientX - dragOffsetX);
  const gy = Math.round(clientY - dragOffsetY - touchLift);
  if (Number.isFinite(gx) && Number.isFinite(gy)) {
    const tiltStr = currentTilt !== 0 ? ` rotate(${currentTilt.toFixed(1)}deg)` : '';
    dragGhost.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(1.025)${tiltStr}`;
  }

  // Interactive Quick Column Dock Hit-Testing
  if (columnDock) {
    const dockRect = columnDock.getBoundingClientRect();
    const isOverDock = (clientY >= dockRect.top - 15 && clientY <= dockRect.bottom + 18 && clientX >= dockRect.left - 10 && clientX <= dockRect.right + 10);
    const pills = columnDock.querySelectorAll('.dock-column-pill');
    let currentHoveredStatus = null;

    if (isOverDock) {
      pills.forEach(pill => {
        const pRect = pill.getBoundingClientRect();
        const isInside = (clientX >= pRect.left && clientX <= pRect.right && clientY >= pRect.top - 15 && clientY <= pRect.bottom + 15);
        pill.classList.toggle('is-hovered', isInside);
        if (isInside) currentHoveredStatus = pill.dataset.dockStatus;
      });
    } else {
      pills.forEach(p => p.classList.remove('is-hovered'));
    }

    if (currentHoveredStatus && currentHoveredStatus !== activeDockStatus) {
      activeDockStatus = currentHoveredStatus;
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(14); } catch (e) {}
      }
    } else if (!currentHoveredStatus) {
      activeDockStatus = null;
    }
  }

  // Update target column and placeholder position with spatial deadband hysteresis
  updatePlaceholderPosition(clientX, clientY);
}

// Unified Drop Finalizer with Magnetic Glide Animation & Rollback Safety
async function finalizeDragDrop(clientX, clientY) {
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (dragCard) {
    dragCard.classList.remove('is-touch-charging');
    dragCard.classList.remove('is-touch-holding');
  }

  if (!isPointerDragging && !activeDraggedTaskId) {
    cleanDragState();
    return;
  }

  // Quick Drop Target on Mobile Column Dock
  if (activeDockStatus && activeDraggedTaskId) {
    const targetCol = document.querySelector(`.board-column[data-status="${activeDockStatus}"]`);
    const draggedId = activeDraggedTaskId;
    activeDraggedTaskId = null;
    if (dragGhost && dragGhost.parentNode) dragGhost.parentNode.removeChild(dragGhost);
    dragGhost = null;
    hideColumnDock();
    if (targetCol && draggedId) {
      await handleTaskDrop(targetCol, 0, draggedId);
      return;
    }
  }

  const moveDist = Math.hypot(clientX - dragStartX, clientY - dragStartY);

  // Suppress clicks on drop release
  window._justDroppedTaskId = activeDraggedTaskId;
  window._justDroppedAt = Date.now();
  window._isDraggingTask = false;

  // Only process drop if cursor/finger genuinely moved (> 4px); ignore stationary tap & hold
  if (moveDist > 4 && activeDraggedTaskId) {
    const elUnder = document.elementFromPoint(clientX, clientY);
    let column = elUnder?.closest('.board-column') || (placeholder && placeholder.closest('.board-column'));
    if (!column) {
      const columns = Array.from(document.querySelectorAll('.board-column'));
      if (columns.length > 0) {
        column = columns.reduce((closest, col) => {
          const rect = col.getBoundingClientRect();
          const dist = Math.abs(clientX - (rect.left + rect.width / 2));
          return dist < closest.dist ? { col, dist } : closest;
        }, { col: null, dist: Infinity }).col;
      }
    }

    const draggedId = activeDraggedTaskId;
    const targetRect = placeholder && placeholder.parentNode ? placeholder.getBoundingClientRect() : null;

    // Linear Magnetic Snap Animation: Smoothly glide into placeholder slot before finalizing DOM
    if (dragGhost && targetRect && targetRect.width > 0 && targetRect.height > 0) {
      dragGhost.style.transition = 'transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease';
      dragGhost.style.transform = `translate3d(${targetRect.left}px, ${targetRect.top}px, 0) scale(1) rotate(0deg)`;
      dragGhost.style.boxShadow = '0 4px 14px rgba(13, 98, 105, 0.12)';

      setTimeout(async () => {
        if (dragGhost && dragGhost.parentNode) dragGhost.parentNode.removeChild(dragGhost);
        dragGhost = null;
        if (column && draggedId) {
          await handleTaskDrop(column, clientY, draggedId);
        } else {
          cleanDragState();
        }
      }, 130);
      return;
    }

    if (column && draggedId) {
      if (dragGhost && dragGhost.parentNode) dragGhost.parentNode.removeChild(dragGhost);
      dragGhost = null;
      await handleTaskDrop(column, clientY, draggedId);
      return;
    }
  }

  cleanDragState();
}

// ── UNIFIED POINTER ENGINE (Mouse, Stylus & Touch with Slop Box & Decoupled Capture) ──

const TOUCH_SLOP = 14; // W3C mobile slop box preventing human finger tremor on glass from aborting hold
let isTouchCharging = false;
let isScrollingGesture = false;
let isDragStartedFromGrip = false;

document.addEventListener('pointerdown', (e) => {
  // Only handle primary button (left mouse click or touch contact)
  if (e.button !== 0 && e.pointerType === 'mouse') return;

  const targetEl = (e.target instanceof Element) ? e.target : (e.target?.parentElement || null);
  const card = targetEl?.closest?.('.task-card');
  // Avoid dragging if interaction started on a button, link, input, etc.
  if (!card || targetEl?.closest?.('button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]')) return;

  const task = (state.data?.tasks || []).find(t => t.id === card.dataset.taskId);
  if (!canUserMoveTask(task)) return;

  dragCard = card;
  activePointerId = e.pointerId;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  currentMouseX = e.clientX;
  currentMouseY = e.clientY;
  prevMouseX = e.clientX;
  isPointerDragging = false;
  isScrollingGesture = false;

  const rect = card.getBoundingClientRect();
  draggedCardHeight = rect.height;
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  if (isNaN(dragOffsetX)) dragOffsetX = rect.width / 2;
  if (isNaN(dragOffsetY)) dragOffsetY = rect.height / 2;

  isDragStartedFromGrip = Boolean(targetEl?.closest?.('.task-drag-handle'));

  if (e.pointerType === 'touch') {
    currentPointerType = 'touch';
    window._isTouchHoldingTask = true;
    if (isDragStartedFromGrip) {
      // Grip handle dragged: Immediate pickup for fluid zero-latency drag
      initiateDrag(e.clientX, e.clientY, 'touch');
    } else {
      // Card body touched: Allow native scrolling! Require deliberate 260ms hold
      isTouchCharging = true;
      card.classList.add('is-touch-charging');
      touchHoldTimer = setTimeout(() => {
        touchHoldTimer = null;
        if (dragCard && !isScrollingGesture && !isPointerDragging) {
          isTouchCharging = false;
          card.classList.remove('is-touch-charging');
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(28); } catch (e) {}
          }
          initiateDrag(currentMouseX >= 0 ? currentMouseX : dragStartX, currentMouseY >= 0 ? currentMouseY : dragStartY, 'touch');
        }
      }, 260);
    }
  } else {
    currentPointerType = e.pointerType || 'mouse';
    // Mouse / Pen: Instant ready, will initiate on 6px movement
    try { card.setPointerCapture(e.pointerId); } catch (err) {}
  }
}, { passive: true });

document.addEventListener('pointermove', (e) => {
  if (!dragCard || isScrollingGesture) return;
  if (activePointerId != null && e.pointerId !== activePointerId) return;

  currentMouseX = e.clientX;
  currentMouseY = e.clientY;

  if (!isPointerDragging) {
    const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);

    if (e.pointerType === 'touch') {
      currentPointerType = 'touch';
      if (isDragStartedFromGrip) {
        if (dist >= 4) {
          initiateDrag(e.clientX, e.clientY, 'touch');
        }
      } else {
        if (dist > TOUCH_SLOP) {
          // Moved before 260ms expired -> Treat as pure scroll gesture!
          isScrollingGesture = true;
          window._isTouchHoldingTask = false;
          if (touchHoldTimer) {
            clearTimeout(touchHoldTimer);
            touchHoldTimer = null;
          }
          if (dragCard) {
            dragCard.classList.remove('is-touch-charging');
            dragCard.classList.remove('is-touch-holding');
          }
          return; // Let browser scroll naturally without drag interference
        }
      }
    } else {
      currentPointerType = e.pointerType || 'mouse';
      // Mouse movement threshold (>= 6px)
      if (dist >= 6) {
        initiateDrag(e.clientX, e.clientY, e.pointerType || 'mouse');
      } else {
        return;
      }
    }
  }

  // Active Dragging Mode: Cancel native gesture interference and update position
  if (isPointerDragging) {
    if (e.cancelable) e.preventDefault();
    updateDragMovement(e.clientX, e.clientY, e.pointerType);
  }
}, { passive: false });

document.addEventListener('pointerup', async (e) => {
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (dragCard) {
    dragCard.classList.remove('is-touch-charging');
    dragCard.classList.remove('is-touch-holding');
  }
  if (activePointerId != null && dragCard) {
    try {
      dragCard.releasePointerCapture(activePointerId);
    } catch (err) {}
  }
  if (!isPointerDragging) {
    cleanDragState();
    return;
  }
  await finalizeDragDrop(e.clientX, e.clientY);
});

// Guard pointercancel: never abort active touch drag on mobile due to gesture ambiguities
document.addEventListener('pointercancel', (e) => {
  if (isPointerDragging) return;
  cleanDragState();
});

// Window blur & tab visibility change: prevent ghost hanging on screen if user switches tab
window.addEventListener('blur', () => {
  if (isPointerDragging || dragCard) cleanDragState();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && (isPointerDragging || dragCard)) cleanDragState();
});
window.addEventListener('orientationchange', () => {
  if (isPointerDragging || dragCard) cleanDragState();
});
window.addEventListener('resize', () => {
  if (isPointerDragging || dragCard) cleanDragState();
});

// ── DEDICATED NATIVE TOUCH INTERCEPTORS (iOS Safari, Android Chrome, iPadOS) ──

window.addEventListener('touchmove', (e) => {
  if (isPointerDragging) {
    if (e.cancelable) e.preventDefault();
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      if (touch && touch.clientX > 0 && touch.clientY > 0) {
        currentMouseX = touch.clientX;
        currentMouseY = touch.clientY;
        updateDragMovement(touch.clientX, touch.clientY, 'touch');
      }
    }
  }
}, { passive: false });

window.addEventListener('touchend', async (e) => {
  window._isTouchHoldingTask = false;
  if (touchHoldTimer) {
    clearTimeout(touchHoldTimer);
    touchHoldTimer = null;
  }
  if (isPointerDragging) {
    const touch = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : null;
    const finalX = touch ? touch.clientX : (currentMouseX >= 0 ? currentMouseX : dragStartX);
    const finalY = touch ? touch.clientY : (currentMouseY >= 0 ? currentMouseY : dragStartY);
    await finalizeDragDrop(finalX, finalY);
  }
}, { passive: true });

window.addEventListener('touchcancel', () => {
  cleanDragState();
});

// Suppress browser native HTML5 drag on task cards to give 100% control to our engine
document.addEventListener('dragstart', (e) => {
  const targetEl = (e.target instanceof Element) ? e.target : (e.target?.parentElement || null);
  if (targetEl?.closest?.('.task-card')) {
    e.preventDefault();
  }
});

// Capture-phase click interceptor to guarantee task modals NEVER open upon dropping a card
document.addEventListener('click', (e) => {
  if (window._justDroppedAt && (Date.now() - window._justDroppedAt < 500)) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}, true);

// ── ACCESSIBLE KEYBOARD DRAG & DROP ENGINE ─────────

document.addEventListener('keydown', async (e) => {
  const targetEl = (e.target instanceof Element) ? e.target : (e.target?.parentElement || null);
  // Ignore keyboard DnD if user is typing inside an input, textarea, or if a modal is open
  if (targetEl?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
  if (document.querySelector('.modal-overlay, #taskModal, .modal-backdrop')) return;

  const focusedCard = document.activeElement?.closest?.('.task-card');

  // Grab or Release card with Space or Alt+M
  if ((e.key === ' ' || (e.altKey && (e.key === 'm' || e.key === 'M'))) && focusedCard) {
    const task = (state.data?.tasks || []).find(t => t.id === focusedCard.dataset.taskId);
    if (!canUserMoveTask(task)) return;

    e.preventDefault();

    if (!keyboardDraggedTaskId) {
      // Pick up / Lift Card
      keyboardDraggedTaskId = task.id;
      keyboardDraggedCard = focusedCard;
      keyboardOriginalStatus = task.status;
      keyboardOriginalSortOrder = task.sortOrder || task.sort_order;
      window._isKeyboardDraggingTask = true;

      focusedCard.classList.add('is-keyboard-grabbed');
      focusedCard.setAttribute('aria-grabbed', 'true');

      const colTitle = focusedCard.closest('.board-column')?.querySelector('.board-column-title')?.innerText?.trim() || '';
      const taskTitle = choose(task.titleAr, task.titleEn);
      announceDnd(choose(
        `تم الإمساك بالمهمة "${taskTitle}". العمود الحالي: ${colTitle}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,
        `Grabbed task "${taskTitle}". Current column: ${colTitle}. Use arrow keys to move, Enter to drop, Escape to cancel.`
      ));
    } else if (keyboardDraggedTaskId === task.id) {
      // Release in place
      keyboardDraggedCard?.classList.remove('is-keyboard-grabbed');
      keyboardDraggedCard?.setAttribute('aria-grabbed', 'false');
      keyboardDraggedTaskId = null;
      keyboardDraggedCard = null;
      window._isKeyboardDraggingTask = false;
      announceDnd(choose('تم إلغاء الإمساك بالمهمة.', 'Task released.'));
    }
    return;
  }

  // Active Keyboard Dragging Navigation
  if (keyboardDraggedTaskId && keyboardDraggedCard) {
    const task = (state.data?.tasks || []).find(t => t.id === keyboardDraggedTaskId);
    if (!task) return;

    const currentColumn = keyboardDraggedCard.closest('.board-column');
    if (!currentColumn) return;

    const allColumns = Array.from(document.querySelectorAll('.board-column'));
    const currentColIdx = allColumns.indexOf(currentColumn);
    const isRtl = document.documentElement.dir === 'rtl' || state.lang === 'ar';

    // Move Within Column (Up / Down)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevCard = keyboardDraggedCard.previousElementSibling;
      if (prevCard && prevCard.classList.contains('task-card')) {
        currentColumn.querySelector('.board-cards').insertBefore(keyboardDraggedCard, prevCard);
        keyboardDraggedCard.focus();
        announceDnd(choose('تم التحريك للأعلى.', 'Moved up.'));
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextCard = keyboardDraggedCard.nextElementSibling;
      if (nextCard && nextCard.classList.contains('task-card')) {
        currentColumn.querySelector('.board-cards').insertBefore(nextCard, keyboardDraggedCard);
        keyboardDraggedCard.focus();
        announceDnd(choose('تم التحريك للأسفل.', 'Moved down.'));
      }
      return;
    }

    // Move Across Columns (Left / Right with RTL Awareness)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const forwardKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
      const targetColIdx = (e.key === forwardKey) ? currentColIdx + 1 : currentColIdx - 1;

      if (targetColIdx >= 0 && targetColIdx < allColumns.length) {
        const targetCol = allColumns[targetColIdx];
        const targetCards = targetCol.querySelector('.board-cards');
        if (targetCards) {
          targetCards.appendChild(keyboardDraggedCard);
          keyboardDraggedCard.focus();
          const targetColTitle = targetCol.querySelector('.board-column-title')?.innerText?.trim() || '';
          announceDnd(choose(`تم النقل إلى عمود: ${targetColTitle}.`, `Moved to column: ${targetColTitle}.`));
        }
      }
      return;
    }

    // Confirm Drop with Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const finalColumn = keyboardDraggedCard.closest('.board-column');
      const draggedId = keyboardDraggedTaskId;

      keyboardDraggedCard.classList.remove('is-keyboard-grabbed');
      keyboardDraggedCard.setAttribute('aria-grabbed', 'false');
      keyboardDraggedTaskId = null;
      keyboardDraggedCard = null;
      window._isKeyboardDraggingTask = false;

      if (finalColumn && draggedId) {
        const rect = keyboardDraggedCard ? keyboardDraggedCard.getBoundingClientRect() : null;
        await handleTaskDrop(finalColumn, rect ? rect.top + 10 : 0, draggedId);
      }
      return;
    }

    // Cancel with Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      keyboardDraggedCard.classList.remove('is-keyboard-grabbed');
      keyboardDraggedCard.setAttribute('aria-grabbed', 'false');
      keyboardDraggedTaskId = null;
      keyboardDraggedCard = null;
      window._isKeyboardDraggingTask = false;

      // Restore original state
      task.status = keyboardOriginalStatus;
      if (keyboardOriginalSortOrder !== null) {
        task.sortOrder = keyboardOriginalSortOrder;
      }
      renderView(true);
      announceDnd(choose('تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.', 'Move cancelled. Task returned to original position.'));
      return;
    }
  }
});
