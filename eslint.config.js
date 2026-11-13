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
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'valid-typeof': 'error'
    }
  },
  {
    files: ['darc-cloud-backend/src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        crypto: 'readonly',
        Buffer: 'readonly',
        caches: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        Headers: 'readonly',
        fetch: 'readonly'
      }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'valid-typeof': 'error'
    }
  }
];
