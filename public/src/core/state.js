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

export const state = {
  lang: resolveInitialLang(),
  theme: resolveInitialTheme(),
  view: 'dashboard',
  activeProjectId: null,
  projectTab: 'overview',
  settingsSection: 'company',
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
