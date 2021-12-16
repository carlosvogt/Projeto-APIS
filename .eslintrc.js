module.exports = {
  parser: '@babel/eslint-parser',
  globals: {
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true,
  },
  env: {
    es2021: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-native', 'import', 'module-resolver'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],

    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'linebreak-style': 0,
    'react/forbid-prop-types': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'sonarjs/no-duplicate-string': ['off'],
    'react/jsx-max-depth': ['error', { max: 4 }],
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'module-resolver/use-alias': [
      'error',
      {
        ignoreDepth: 2,
        allowDepthMoreOrLessThanEquality: true,
        extensions: ['.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.config.js', '**/scripts/*'],
      },
    ],
    'react/jsx-no-bind': [
      0,
      {
        ignoreDOMComponents: true,
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: true,
      },
    ],
    'react/jsx-closing-bracket-location': [1],
  },
  ignorePatterns: ['**/generated/**', 'node_modules/**'],
  overrides: [
    {
      files: ['./jest/**/*', '**/*.test.{js,jsx}', '**/*/testing.{js,jsx}'],
      env: {
        jest: true,
      },
      rules: {
        'react/prop-types': ['off'],
        'import/no-extraneous-dependencies': ['off'],
      },
    },
  ],
};
