import _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, req, isClient }) => {
  let locale = 'ja';
  if (isClient) {
    const navigator = _.get(window, 'navigator', {});
    locale = (
      _.head(navigator.languages) ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage
    ).substr(0, 2);
  } else if (req) {
    locale = req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substr(0, 2);
  }
  app.i18n = new VueI18n({
    locale: locale || 'ja',
    fallbackLocale: 'ja',
    messages: {
      ja: require('~/locales/ja.json')
    }
  });
};
