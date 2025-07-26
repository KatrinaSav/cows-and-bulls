import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// Explicitly import the plugin
import tsPlugin from '@typescript-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**', '*.js', '*.mjs', '*.cjs']
  },
  // Base JS config
  {
    files: ['**/*.js'],
    ...eslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // TypeScript config
  {
    files: ['**/*.ts'],
    // Register the plugin
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: {
        ...globals.node
      },

    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.strict.rules,

      // Your custom rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      "@stylistic/member-delimiter-style": [
          "error",
          {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            },
            "singleline": {
              "delimiter": "semi",
              "requireLast": false
            }
          }
        ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@stylistic/semi': 'error',
      'no-console': 'error',
      'quotes': ['error', 'single'],
      'indent': ['error', 2, {
        SwitchCase: 1,
        FunctionDeclaration: { parameters: 'first' },
        FunctionExpression: { parameters: 'first' },
        CallExpression: { arguments: 'first' }
      }],
      'function-paren-newline': ['error', 'consistent'],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'no-trailing-spaces': ['error', {
        skipBlankLines: false,
        ignoreComments: false
      }]
    }

  }
];