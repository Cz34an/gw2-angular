// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  {
    ignores: ['src/app/ui/**', 'src/app/core/api/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.spec.json',
        ],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'static-field',
            'decorated-field',
            'instance-field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'PropertyDefinition[readonly!=true][value.type="CallExpression"][value.callee.name=/^(inject|signal|computed|effect)$/]',
          message:
            "Angular Best Practices: Properties initialized with inject(), signal(), computed(), or effect() must have the 'readonly' modifier.",
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-readonly': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
  eslintPluginPrettierRecommended,
]);
