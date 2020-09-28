module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['standard', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': 'always-multiline',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
