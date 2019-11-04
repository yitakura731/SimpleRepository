import Cookies from 'js-cookie';

export const state = () => ({
  username: null,
  strategy: null
});

export const mutations = {
  username(state, input) {
    state.username = input;
  },
  strategy(state, input) {
    state.strategy = input;
  }
};

export const getters = {
  username: state => {
    return state.username;
  },
  strategy: state => {
    return state.strategy;
  }
};

export const actions = {
  async localLogin({ commit, dispatch }, args) {
    const response = await this.$axios.$post('/api/auth/login/local', args, {
      withCredentials: false
    });
    if (response.accessToken != null) {
      Cookies.set('sr.auth.token', response.accessToken);
      this.$router.push('/home');
    }
  },

  me({ commit, dispatch }, args) {
    return this.$axios.$get('/api/auth/me', args);
  },

  async logout({ commit, dispatch }, args) {
    try {
      await this.$axios.$post('/api/auth/logout', args);
    } catch {
    } finally {
      Cookies.remove('sr.auth.token');
      commit('username', null);
      commit('strategy', null);
      this.$router.push('/');
    }
  }
};
