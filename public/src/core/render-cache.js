/**
 * ==============================================================================
 * DARC Design Team — Universal Render Cache & DOM Memoization Engine
 * ==============================================================================
 * Architecture: Clean, modular, standalone render lifecycle governor.
 * Purpose:
 *   1. Eliminates redundant DOM innerHTML destruction during polling & events.
 *   2. Enforces container mount invariants (prevents blank screen regressions).
 *   3. Preserves horizontal & vertical scroll positions across same-view updates.
 *   4. Gathers telemetry on prevented CPU cycles and DOM layout reflows.
 * ==============================================================================
 */

export class RenderCacheEngine {
  constructor() {
    this._lastView = null;
    this._lastHtml = '';
    this._lastRenderTs = 0;
    this._metrics = {
      totalRenders: 0,
      bypassedRenders: 0,
      forcedRenders: 0
    };
  }

  /**
   * Evaluates whether the requested view render can be safely skipped.
   * Guarantees that empty or newly mounted containers are NEVER skipped.
   *
   * @param {string} view - The target view key (e.g. 'tasks', 'projects')
   * @param {string} html - The newly generated HTML string
   * @param {HTMLElement|null} container - The DOM container element (#main-content)
   * @param {boolean} force - Force re-render bypass flag
   * @returns {boolean} True if the render should be skipped (fast-path)
   */
  shouldSkipRender(view, html, container, force = false) {
    if (force) return false;
    if (!container) return true;

    // Safety Invariant: Empty container must ALWAYS receive its HTML
    if (!container.hasChildNodes() || container.innerHTML.trim() === '') {
      return false;
    }

    const isSameView = this._lastView === view;
    const isIdenticalHtml = this._lastHtml === html;

    if (isSameView && isIdenticalHtml) {
      this._metrics.bypassedRenders++;
      return true;
    }

    return false;
  }

  /**
   * Captures scroll offsets from the container and nested board element.
   *
   * @param {HTMLElement|null} container - The container element
   * @param {boolean} isSameView - Whether navigating within the same view
   * @returns {{scrollTop: number, scrollLeft: number, boardScrollLeft: number|null}}
   */
  captureScrollState(container, isSameView) {
    if (!container || !isSameView) {
      return { scrollTop: 0, scrollLeft: 0, boardScrollLeft: null };
    }
    const board = container.querySelector('.board, .tasks-board, .board-columns');
    return {
      scrollTop: container.scrollTop || 0,
      scrollLeft: container.scrollLeft || 0,
      boardScrollLeft: board ? board.scrollLeft : null
    };
  }

  /**
   * Restores captured scroll coordinates after the DOM has been updated.
   *
   * @param {HTMLElement|null} container - The container element
   * @param {{scrollTop: number, scrollLeft: number, boardScrollLeft: number|null}} scrollState
   */
  restoreScrollState(container, scrollState) {
    if (!container || !scrollState) return;

    if (scrollState.scrollTop) {
      container.scrollTop = scrollState.scrollTop;
    }
    if (scrollState.scrollLeft) {
      container.scrollLeft = scrollState.scrollLeft;
    }

    if (scrollState.boardScrollLeft !== null) {
      const newBoard = container.querySelector('.board, .tasks-board, .board-columns');
      if (newBoard) {
        newBoard.style.scrollSnapType = 'none';
        newBoard.scrollLeft = scrollState.boardScrollLeft;
        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(() => {
            if (newBoard && !(typeof window !== 'undefined' && window._isDraggingTask)) {
              newBoard.style.scrollSnapType = '';
            }
          });
        }
      }
    }
  }

  /**
   * Commits the view and its HTML content into the cache after a successful render.
   *
   * @param {string} view - The rendered view key
   * @param {string} html - The rendered HTML string
   * @param {boolean} force - Whether this render was forced
   */
  commit(view, html, force = false) {
    this._lastView = view;
    this._lastHtml = html;
    this._lastRenderTs = Date.now();
    this._metrics.totalRenders++;
    if (force) {
      this._metrics.forcedRenders++;
    }
  }

  /**
   * Completely purges the cache.
   * Must be called whenever the app shell is remounted or on auth state changes.
   */
  invalidate() {
    this._lastView = null;
    this._lastHtml = '';
  }

  /**
   * Returns current render performance and efficiency telemetry.
   *
   * @returns {{totalRenders: number, bypassedRenders: number, forcedRenders: number, lastView: string|null, lastRenderTs: number, efficiencyRatio: number}}
   */
  getMetrics() {
    const total = this._metrics.totalRenders + this._metrics.bypassedRenders;
    const efficiencyRatio = total > 0 ? Math.round((this._metrics.bypassedRenders / total) * 100) : 0;
    return {
      ...this._metrics,
      lastView: this._lastView,
      lastRenderTs: this._lastRenderTs,
      efficiencyRatio
    };
  }
}

// Universal Singleton Instance
export const renderCache = new RenderCacheEngine();
