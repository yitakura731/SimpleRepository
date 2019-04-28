module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    "plugin:vue/recommended",
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "linebreak-style": ["error", "windows"],
    "semi": ["error", "always"],
    "vue/html-self-closing": ["error", {
        "html": {
          "void": "always",
        }
    }]
  }
}
