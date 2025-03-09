import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'no-inner-declarations': 0,
      'no-console': 'warn',
      'no-debugger': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'prefer-const': [
        'off',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'no-var': [
        'off',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'no-use-before-define': [
        'off',
        {
          functions: false,
          classes: false,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          doubleQuote: false,
          semi: false,
          trailingComma: 'none',
          code: 400,
          printWidth: 400,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
]
