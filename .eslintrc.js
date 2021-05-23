module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'warn',
    'prefer-rest-params': 'off',
    'no-undef': 'warn',
    'func-names': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-return-assign': 'off',
    'no-useless-catch': 'off',
  },
};
