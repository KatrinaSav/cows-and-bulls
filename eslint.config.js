import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// Explicitly import the plugin
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
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
      '@typescript-eslint': tsPlugin
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
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@/semi': 'error',
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