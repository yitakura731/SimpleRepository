const pkg = require('./package');
require('dotenv').config({ path: './app.env' });

const repositoryURL = `${process.env.REPOSITORY_URL}`;

module.exports = {
  mode: 'spa',

  router: {
    base: `/${process.env.APP_NAME}/`
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-i18n.js',
    '~/plugins/axios.js',
    '~/plugins/bootstrap-vue.js',
    '~/plugins/pdf.js'
  ],

  /*
   ** fontawesome
   */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/dotenv', { filename: './app.env' }],
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    prefix: `/${process.env.APP_NAME}`,
    proxy: true
  },

  proxy: {
    '/SimpleRepository/api': {
      target: repositoryURL,
      secure: false
    }
  },

  env: {
    APP_NAME: process.env.APP_NAME
  },

  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'eval-source-map';
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: ['eslint-loader'],
          exclude: /(node_modules)/
        });
      }
    }
  }
};
