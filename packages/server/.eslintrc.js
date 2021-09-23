module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_$',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        trailingComma: 'all',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'auto',
      },
    ],
  },
}
