// Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

// Vue
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// i18n
import i18next from 'i18next';
import languageDetecotr from 'i18next-browser-languagedetector';
import xhr from 'i18next-xhr-backend';

// My Root Component

// font
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFolder,
  faFile,
  faTag,
  faSearch,
  faPlus,
  faMinus,
  faCaretLeft,
  faCaretRight,
  faChevronRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import store from './store';

library.add(
  faFolder,
  faFile,
  faTag,
  faSearch,
  faPlus,
  faMinus,
  faCaretLeft,
  faCaretRight,
  faChevronRight,
  faChevronDown
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.component('app', App);
i18next
  .use(xhr)
  .use(languageDetecotr)
  .init(
    {
      lng: 'ja',
      fallbackLng: 'ja',
      initImmediate: false,
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    err => {
      if (err) console.log('something went wrong loading', err);

      /* eslint-disable no-new */
      new Vue({ el: '#app', store });
    }
  );
