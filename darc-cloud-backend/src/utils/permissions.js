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
  manage_company: ['manage_company'],
  manage_roles: ['manage_roles', 'manage_role']
};

export async function hasPermission(supabase, userId, baseRoleId, permission, projectId = null) {
  // Admin has full system permissions instantly (0ms, 0 DB queries)
  if (baseRoleId === 'admin') return true;

  let activeRoleId = baseRoleId;
  
  if (projectId) {
    const { data: member } = await supabase
      .from('project_members')
      .select('role_id')
      .eq('project_id', projectId)
      .eq('user_id', userId)
      .single();
      
    if (member && member.role_id) {
      activeRoleId = member.role_id;
    } else {
      return false;
    }
  }

  const role = await getCachedRole(supabase, activeRoleId);
  if (!role || !role.permissions) return false;
  if (role.permissions.includes('*')) return true;
  
  const validPerms = PERMISSION_ALIASES[permission] || [permission];
  return validPerms.some(p => role.permissions.includes(p));
}

export async function isProjectVisible(supabase, userId, baseRoleId, projectId) {
  if (baseRoleId === 'admin' || baseRoleId === 'account_permissions_manager') return true;
  
  const role = await getCachedRole(supabase, baseRoleId);
  if (role?.id === 'portfolio_manager' || role?.permissions?.includes('view_all_projects')) return true;
  
  // Check membership
  const { data: member } = await supabase
    .from('project_members')
    .select('role_id')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .single();
    
  return !!member;
}
