// Rule severity values are: off, warn, error

module.exports = {
  parser: "babel-eslint",
  extends: ["semistandard", "standard-jsx"],
  globals: {
    IntersectionObserver: "writable",
    Image: "writable",
    $: "writable",
    ScrollTrigger: "writable",
    ScrollToPlugin: "writable",
    WP_vars: "readonly",
  },
  rules: {
    indent: [
      "warn",
      4,
      {
        ignoredNodes: ["TemplateLiteral"],
      },
    ],
    "template-curly-spacing": "off",
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "no-unused-vars": ["error", { varsIgnorePattern: "^export" }],
    camelcase: "error",
    "no-plusplus": "off",
    "comma-dangle": "off",
    curly: "error",
    "multiline-comment-style": "off",
    "key-spacing": "off",
    "no-multi-spaces": "off",
  },
};
