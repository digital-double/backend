module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 12,
    },
    plugins: ['prefer-arrow'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'arrow-body-style': ['off'],
      'one-var': ['off'],
    },
    globals: {
      web3: 'readonly',
      artifacts: 'readonly',
      contract: 'readonly',
      before: 'readonly',
      beforeEach: 'readonly',
      it: 'readonly',
      assert: 'readonly',
      StatusError: 'readonly',
    },
  };