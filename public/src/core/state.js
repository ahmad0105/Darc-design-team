export const state = {
  lang: window.localStorage.getItem('darc-locale') || 'ar',
  theme: window.localStorage.getItem('darc-theme') || 'light',
  view: 'dashboard',
  activeProjectId: null,
  projectTab: 'overview',
  settingsSection: 'company',
  templateCategory: 'all',
  searches: { projects: '', tasks: '', templates: '', documents: '' },
  taskFilter: 'all',
  taskProjectFilter: 'all',
  docTaskFilter: 'all',
  docProjectFilter: 'all',
  sidebarOpen: false,
  data: null
};
