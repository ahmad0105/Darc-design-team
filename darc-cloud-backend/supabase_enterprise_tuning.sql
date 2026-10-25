-- ==============================================================================
-- DARC Design Team — Enterprise Database Optimization & Performance Tuning
-- Safe, Idempotent, High-Performance Suite for Production Supabase (PostgreSQL)
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS & SEARCH ACCELERATION
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- ------------------------------------------------------------------------------
-- 2. PARTIAL PERFORMANCE INDEXES (ACTIVE RECORDS ONLY)
-- Greatly reduces index footprint and delivers sub-millisecond query execution
-- ------------------------------------------------------------------------------

-- Tasks: Filter by project and status on active tasks
CREATE INDEX IF NOT EXISTS idx_tasks_active_proj_status 
ON tasks (project_id, status) 
WHERE deleted_at IS NULL;

-- Tasks: Filter by assignee for user's personal workload view
CREATE INDEX IF NOT EXISTS idx_tasks_active_assignee 
ON tasks (assignee_id, status) 
WHERE deleted_at IS NULL;

-- Tasks: Ordering by due date for deadlines
CREATE INDEX IF NOT EXISTS idx_tasks_active_due_date 
ON tasks (due_date) 
WHERE deleted_at IS NULL;

-- Documents: Active drawings by project and status
CREATE INDEX IF NOT EXISTS idx_docs_active_proj_status 
ON documents (project_id, status) 
WHERE deleted_at IS NULL;

-- Documents: Fast lookup by linked task
CREATE INDEX IF NOT EXISTS idx_docs_active_task 
ON documents (task_id) 
WHERE deleted_at IS NULL;

-- Projects: Active projects by manager
CREATE INDEX IF NOT EXISTS idx_projects_active_mgr 
ON projects (manager_id, status) 
WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- 3. INSTANT TEXT SEARCH INDEXES (ARABIC & ENGLISH TRIGRAM)
-- Eliminates full table scans on search queries
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_tasks_trgm_title_ar 
ON tasks USING gin (title_ar gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_tasks_trgm_title_en 
ON tasks USING gin (title_en gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_docs_trgm_filename 
ON documents USING gin (original_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_projects_trgm_name_ar 
ON projects USING gin (name_ar gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_projects_trgm_code 
ON projects USING gin (code gin_trgm_ops);

-- ------------------------------------------------------------------------------
-- 4. JSONB GIN INDEXES (FAST FLEXIBLE METADATA QUERYING)
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_tasks_custom_fields_gin 
ON tasks USING gin (custom_fields);

CREATE INDEX IF NOT EXISTS idx_audit_logs_details_gin 
ON audit_logs USING gin (details);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at_desc 
ON audit_logs (created_at DESC);

-- ------------------------------------------------------------------------------
-- 5. DATA INTEGRITY & MATHEMATICAL CHECK CONSTRAINTS
-- Prevents corrupted states and illogical user inputs at the engine level
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  -- Task Progress must be between 0% and 100%
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_tasks_progress_range') THEN
    ALTER TABLE tasks ADD CONSTRAINT chk_tasks_progress_range CHECK (progress >= 0 AND progress <= 100);
  END IF;

  -- Project Progress must be between 0% and 100%
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_projects_progress_range') THEN
    ALTER TABLE projects ADD CONSTRAINT chk_projects_progress_range CHECK (progress >= 0 AND progress <= 100);
  END IF;

  -- Document file size cannot be negative
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_documents_size_positive') THEN
    ALTER TABLE documents ADD CONSTRAINT chk_documents_size_positive CHECK (size >= 0);
  END IF;

  -- Due date cannot precede start date (when both are populated)
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_tasks_date_coherence') THEN
    ALTER TABLE tasks ADD CONSTRAINT chk_tasks_date_coherence CHECK (due_date >= start_date OR start_date IS NULL OR due_date IS NULL);
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 6. AUTOMATIC PROJECT HEALTH & WEIGHTED PROGRESS RECALCULATION TRIGGER
-- Keeps project overall completion percentage mathematically synchronized in real-time
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION fn_recalculate_project_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_proj_id TEXT;
  v_total_weight NUMERIC := 0;
  v_weighted_progress NUMERIC := 0;
  v_final_pct INTEGER := 0;
BEGIN
  v_proj_id := COALESCE(NEW.project_id, OLD.project_id);
  IF v_proj_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  SELECT 
    COALESCE(SUM(weight), 0),
    COALESCE(SUM(weight * (progress::NUMERIC / 100.0)), 0)
  INTO v_total_weight, v_weighted_progress
  FROM tasks
  WHERE project_id = v_proj_id
    AND deleted_at IS NULL;

  IF v_total_weight > 0 THEN
    v_final_pct := ROUND((v_weighted_progress / v_total_weight) * 100);
  ELSE
    v_final_pct := 0;
  END IF;

  UPDATE projects 
  SET progress = v_final_pct,
      updated_at = NOW()
  WHERE id = v_proj_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_recalculate_project_progress ON tasks;
CREATE TRIGGER trg_recalculate_project_progress
AFTER INSERT OR UPDATE OF progress, weight, deleted_at OR DELETE ON tasks
FOR EACH ROW
EXECUTE FUNCTION fn_recalculate_project_progress();

-- ------------------------------------------------------------------------------
-- 7. NIGHTLY TRASH PURGE CRON (OPTIONAL SELF-CLEANING AT 3:00 AM)
-- Requires pg_cron extension enabled in Supabase Database Extensions
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    -- Unschedule existing job if previously registered to avoid duplicates
    PERFORM cron.unschedule('darc-nightly-trash-purge') 
    WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'darc-nightly-trash-purge');

    -- Schedule daily cleanup at 03:00 AM UTC
    PERFORM cron.schedule(
      'darc-nightly-trash-purge',
      '0 3 * * *',
      $cron$
        DELETE FROM documents WHERE deleted_at < NOW() - INTERVAL '30 days';
        DELETE FROM tasks WHERE deleted_at < NOW() - INTERVAL '30 days';
        DELETE FROM projects WHERE deleted_at < NOW() - INTERVAL '30 days';
      $cron$
    );
  END IF;
END $$;

COMMIT;
