import Cookies from 'js-cookie';

export default function({ store, redirect, route, error }) {
  const jwt = Cookies.get('sr.auth.token');
  if (jwt != null) {
    store
      .dispatch('auth/me')
      .then(user => {
        store.commit('auth/strategy', user.strategy);
        store.commit('auth/username', user.name);
        if (route.fullPath === '/') {
          redirect('/home');
        }
      })
      .catch(e => {
        error(e);
      });
  } else {
    store.commit('auth/strategy', null);
    store.commit('auth/username', null);
    if (route.fullPath === '/home') {
      redirect('/');
    }
  }
}
