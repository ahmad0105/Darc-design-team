import globals from 'globals';

export default [
  {
    files: ['public/src/**/*.js', 'public/app.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        state: 'writable',
        api: 'readonly',
        showToast: 'readonly',
        closeModal: 'readonly',
        renderView: 'readonly',
        renderApp: 'readonly',
        can: 'readonly',
        isAdmin: 'readonly',
        choose: 'readonly',
        t: 'readonly',
        esc: 'readonly',
        icon: 'readonly',
        avatar: 'readonly'
      }
    },
    rules: {
      'no-undef': 'error'
    }
  }
];
