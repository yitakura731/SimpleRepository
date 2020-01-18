import Cookies from 'js-cookie';

export default function({ store, redirect, route, error }) {
  const jwt = Cookies.get('sr.auth.token');
  if (jwt != null) {
    store
      .dispatch('auth/me')
      .then(user => {
        store.commit('auth/strategy', user.strategy);
        store.commit('auth/username', user.name);
        return store.dispatch('repository/fetchTag');
      })
      .then(() => {
        return store.dispatch('repository/fetchSpace');
      })
      .then(() => {
        if (route.fullPath === '/') {
          redirect('/home');
        }
      })
      .catch(e => {
        Cookies.remove('sr.auth.token');
        store.commit('repository/selectedDocument', null);
        store.commit('repository/selectedSpace', null);
        store.commit('repository/spaces', null);
        store.commit('repository/tags', null);
        store.commit('repository/documents', null);
        store.commit('auth/strategy', null);
        store.commit('auth/username', null);
        redirect('/');
      });
  } else {
    store.commit('repository/selectedDocument', null);
    store.commit('repository/selectedSpace', null);
    store.commit('repository/spaces', null);
    store.commit('repository/tags', null);
    store.commit('repository/documents', null);
    store.commit('auth/strategy', null);
    store.commit('auth/username', null);
    if (route.fullPath === '/home' || route.fullPath === '/home/') {
      redirect('/');
    }
  }
}
