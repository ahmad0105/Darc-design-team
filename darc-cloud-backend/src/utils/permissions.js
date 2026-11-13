let _rolesCache = null;
let _rolesCacheTime = 0;

export function invalidateRolesCache() {
  _rolesCache = null;
  _rolesCacheTime = 0;
}

async function getCachedRole(supabase, roleId) {
  const now = Date.now();
  if (!_rolesCache || now - _rolesCacheTime > 60000) {
    const { data } = await supabase.from('roles').select('id, permissions');
    if (data) {
      _rolesCache = new Map(data.map(r => [r.id, r]));
      _rolesCacheTime = now;
    }
  }
  return _rolesCache?.get(roleId) || null;
}

export const PERMISSION_ALIASES = {
  create_projects: ['create_project', 'create_projects'],
  create_project: ['create_project', 'create_projects'],
  edit_projects: ['edit_project', 'edit_projects'],
  edit_project: ['edit_project', 'edit_projects'],
  delete_projects: ['delete_project', 'delete_projects'],
  delete_project: ['delete_project', 'delete_projects'],
  create_tasks: ['manage_tasks', 'create_tasks', 'create_task'],
  edit_tasks: ['manage_tasks', 'edit_tasks', 'edit_task'],
  delete_tasks: ['manage_tasks', 'delete_tasks', 'delete_task'],
  manage_tasks: ['manage_tasks', 'create_tasks', 'edit_tasks', 'delete_tasks', 'create_task', 'edit_task'],
  manage_templates: ['manage_templates', 'manage_template'],
  manage_company: ['manage_company', 'manage_settings'],
  manage_settings: ['manage_settings', 'manage_company'],
  manage_roles: ['manage_roles', 'manage_role'],
  manage_role: ['manage_roles', 'manage_role'],
  manage_users: ['manage_users', 'manage_existing_account_permissions'],
  manage_existing_account_permissions: ['manage_existing_account_permissions', 'manage_users'],
  manage_trash: ['manage_trash'],
  view_audit_logs: ['view_audit_logs'],
  view_user_activity: ['view_user_activity', 'manage_users']
};

export async function hasPermission(supabase, userId, baseRoleId, permission, projectId = null) {
  // Admin & system owner have full permissions instantly (0ms, 0 DB queries)
  if (baseRoleId === 'admin' || baseRoleId === 'owner' || baseRoleId === 'superadmin' || userId === 'usr_ahmad') return true;

  // Check base role first
  const baseRole = await getCachedRole(supabase, baseRoleId);
  if (baseRole && baseRole.permissions) {
    if (baseRole.permissions.includes('*')) return true;
    const validPerms = PERMISSION_ALIASES[permission] || [permission];
    // If base role already grants the permission globally
    if (validPerms.some(p => baseRole.permissions.includes(p))) {
      if (!projectId) return true;
      if (baseRoleId === 'portfolio_manager' || baseRole.permissions.includes('manage_projects') || baseRole.permissions.includes('edit_projects')) {
        return true;
      }
    }
  }

  let activeRoleId = baseRoleId;
  
  if (projectId) {
    // 1. Check if user is the project manager or creator in projects table
    const { data: proj } = await supabase
      .from('projects')
      .select('manager_id, created_by')
      .eq('id', projectId)
      .maybeSingle();

    if (proj && (proj.manager_id === userId || proj.created_by === userId)) {
      activeRoleId = 'project_manager';
    } else {
      // 2. Check project_members table
      const { data: member } = await supabase
        .from('project_members')
        .select('role_id')
        .eq('project_id', projectId)
        .eq('user_id', userId)
        .maybeSingle();
        
      if (member && member.role_id) {
        activeRoleId = member.role_id;
      } else {
        // If not a project member, fall back to checking if base role grants permission
        if (baseRole && baseRole.permissions) {
          const validPerms = PERMISSION_ALIASES[permission] || [permission];
          return validPerms.some(p => baseRole.permissions.includes(p));
        }
        return false;
      }
    }
  }

  const role = (activeRoleId === baseRoleId && baseRole) ? baseRole : await getCachedRole(supabase, activeRoleId);
  if (!role || !role.permissions) return false;
  if (role.permissions.includes('*')) return true;
  
  const validPerms = PERMISSION_ALIASES[permission] || [permission];
  return validPerms.some(p => role.permissions.includes(p));
}

export async function isProjectVisible(supabase, userId, baseRoleId, projectId) {
  if (baseRoleId === 'admin' || baseRoleId === 'owner' || baseRoleId === 'superadmin' || userId === 'usr_ahmad' || baseRoleId === 'account_permissions_manager') return true;
  
  const role = await getCachedRole(supabase, baseRoleId);
  if (role?.id === 'portfolio_manager' || role?.permissions?.includes('*') || role?.permissions?.includes('view_all_projects')) return true;
  
  // Check if project manager/creator
  const { data: proj } = await supabase
    .from('projects')
    .select('manager_id, created_by')
    .eq('id', projectId)
    .maybeSingle();

  if (proj && (proj.manager_id === userId || proj.created_by === userId)) return true;

  // Check membership
  const { data: member } = await supabase
    .from('project_members')
    .select('role_id')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .maybeSingle();
    
  return !!member;
}
