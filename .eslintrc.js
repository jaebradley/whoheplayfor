module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2020,
    ecmaFeatures: {
      jsx: true
    },
    sourceType:  'module'
  },
  settings:  {
    'import/resolver': {
      webpack: {
        config: 'configuration/webpack/base.js'
      }
    },
    react:  {
      version:  'detect'
    },
  },
}
