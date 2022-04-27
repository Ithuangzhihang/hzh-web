module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier', // Make sure this is always the last element in the array.
  ],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': [
      // 命名规范 -
      '^(([A-Z]|[a-z])[a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: '首字母可大写的横线命名',
      },
    ],
    'keyframes-name-pattern': [
      // 命名规范 -
      '^(([A-Z]|[a-z])[a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: '首字母可大写的横线命名',
      },
    ],
    'block-no-empty': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
