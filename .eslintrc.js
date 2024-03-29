module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true
  },
  // add your custom rules here
  'rules': {
    'no-param-reassign': 0,

    'import/first': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'max-len': 0, // [1, { "ignoreStrings": true }],
    // added for klab team
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-expressions': [1, { "allowTernary": true }],
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'object-curly-newline': ['error', { 'ImportDeclaration': 'never', "ObjectExpression": { 'multiline': true, 'minProperties': 5, consistent: true }}],
  }
};
