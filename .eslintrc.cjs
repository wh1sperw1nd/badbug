/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  "rules": {
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": "error",
    "array-element-newline": ["error", "consistent"],
    "arrow-body-style": "error",
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": "error",
    "block-scoped-var": "error",
    "block-spacing": "error",
    "brace-style": ["error", "stroustrup"],
    "comma-dangle": "error",
    "comma-spacing": "error",
    "comma-style": "error",
    "computed-property-spacing": "error",
    "default-param-last": "error",
    "eol-last": ["error", "always"],
    "func-name-matching": "error",
    "function-call-argument-newline": ["error", "consistent"],
    "function-paren-newline": ["error", "consistent"],
    "implicit-arrow-linebreak": "error",
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "key-spacing": ["error", {
      "afterColon": false
    }],
    "keyword-spacing": "error",
    "linebreak-style": ["error", "unix"],
    "max-depth": ["error", 3],
    "max-len": ["error", {
      "code": 120,
      "ignoreRegExpLiterals": true,
      "ignoreUrls": true
    }],
    "max-lines": ["error", {
      "max": 250,
      "skipBlankLines": true,
      "skipComments": true
    }],
    "max-statements-per-line": "error",
    "no-confusing-arrow": "error",
    "no-console": "off",
    "no-constructor-return": "error",
    "no-duplicate-imports": "error",
    "no-eval": "error",
    "no-extra-semi": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-redeclare": 0,
    "no-restricted-globals": ["error", "name", "event"],
    "no-sequences": "error",
    "no-trailing-spaces": "error",
    "no-unused-vars": ["error", {
      "args": "after-used",
      "ignoreRestSiblings": true,
      "vars": "all"
    }],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": ["error", {
      "allowAllPropertiesOnSameLine":true
    }],
    "operator-linebreak": ["error", "before"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "quotes": ["error", "single", {
      "avoidEscape": true
    }],
    "rest-spread-spacing": "error",
    "semi": "error",
    "one-var":["error", "never"],
    "semi-spacing": "error",
    "space-in-parens": "error",
    "space-unary-ops": "error",
    "template-curly-spacing": "error",
    "no-unneeded-ternary": [
      "error",
      {
        "defaultAssignment": false
      }
    ]
  }
}
