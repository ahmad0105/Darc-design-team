function getCookieVal(key) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function resolveInitialLang() {
  if (typeof window === 'undefined') return 'ar';
  try {
    let saved = getCookieVal('darc_lang') || window.localStorage.getItem('darc-locale');
    if (!saved) {
      const prefs = getCookieVal('darc_prefs');
      if (prefs) {
        try { saved = JSON.parse(prefs).lang; } catch (e) {}
      }
    }
    if (saved === 'ar' || saved === 'en') return saved;
    const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return navLang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  } catch (e) {
    return 'ar';
  }
}

function resolveInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    let saved = getCookieVal('darc_theme') || window.localStorage.getItem('darc-theme');
    if (!saved) {
      const prefs = getCookieVal('darc_prefs');
      if (prefs) {
        try { saved = JSON.parse(prefs).theme; } catch (e) {}
      }
    }
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {}
  return 'light';
}

function resolveInitialRoute() {
  const defaultRoute = { view: 'dashboard', activeProjectId: null, projectTab: 'overview', settingsSection: 'profile' };
  if (typeof window === 'undefined') return defaultRoute;
  try {
    const rawHash = window.location.hash.replace(/^#/, '');
    if (rawHash && !['login', 'forgot'].includes(rawHash)) {
      const [viewPart, queryPart] = rawHash.split('?');
      const validViews = ['dashboard', 'projects', 'tasks', 'documents', 'templates', 'team', 'reports', 'settings', 'project-detail'];
      if (validViews.includes(viewPart)) {
        let activeProjectId = null;
        let projectTab = 'overview';
        let settingsSection = 'profile';
        if (queryPart) {
          const q = new URLSearchParams(queryPart);
          if (q.get('id')) activeProjectId = q.get('id');
          if (q.get('tab')) projectTab = q.get('tab');
          if (q.get('section')) settingsSection = q.get('section');
        }
        return { view: viewPart, activeProjectId, projectTab, settingsSection };
      }
    }
    const saved = sessionStorage.getItem('darc_last_route');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.view) {
        return {
          view: parsed.view,
          activeProjectId: parsed.activeProjectId || null,
          projectTab: parsed.projectTab || 'overview',
          settingsSection: parsed.settingsSection || 'profile'
        };
      }
    }
  } catch (e) {}
  return defaultRoute;
}

const initialRoute = resolveInitialRoute();

export const state = {
  lang: resolveInitialLang(),
  theme: resolveInitialTheme(),
  view: initialRoute.view,
  activeProjectId: initialRoute.activeProjectId,
  projectTab: initialRoute.projectTab,
  settingsSection: initialRoute.settingsSection || 'profile',
  templateCategory: 'all',
  searches: { projects: '', tasks: '', templates: '', documents: '' },
  taskFilter: 'all',
  taskProjectFilter: 'all',
  taskPriorityFilter: 'all',
  docTaskFilter: 'all',
  docProjectFilter: 'all',
  sidebarOpen: false,
  isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  data: null
};
