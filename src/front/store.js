import Vue from 'vue';
import Vuex from 'vuex';
import Facade from './facade';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    spaces: null,
    documents: null,
    tags: null,
    selectedSpace: null,
    selectedDocument: null
  },
  mutations: {
    spaces(state, input) {
      state.spaces = input;
    },
    documents(state, input) {
      state.documents = input;
    },
    tags(state, input) {
      state.tags = input;
    },
    selectedSpace(state, input) {
      state.selectedSpace = input;
    },
    selectedDocument(state, input) {
      state.selectedDocument = input;
    }
  },
  getters: {
    spaces: state => {
      return state.spaces;
    },
    selectedSpace: state => {
      return state.selectedSpace;
    },
    documents: state => {
      return state.documents;
    },
    tags: state => {
      return state.tags;
    },
    selectedDocument: state => {
      return state.selectedDocument;
    }
  },
  actions: {
    setSpace({ commit, dispatch }, args) {
      commit('selectedSpace', args.space);
      dispatch('fetchDocument', {
        query: args.space._id,
        errorCallback: args.errorCallback
      });
    },
    setDocument({ commit, dispatch }, args) {
      commit('selectedDocument', args.document);
    },
    fetchSpace({ commit, state, dispatch }, args) {
      Facade.getSpaces(args.query)
        .then(response => {
          commit('spaces', response.data);
          if (response.data.length > 0) {
            state.selectedSpace = response.data[0];
            dispatch('fetchDocument', {
              query: response.data[0]._id,
              errorCallback: args.errorCallback
            });
          } else {
            commit('documents', null);
            commit('selectedDocument', null);
          }
        })
        .catch(error => {
          args.errorCallback(error);
        });
    },
    fetchDocument({ commit, dispatch }, args) {
      Facade.getDocuments(args.query)
        .then(response => {
          const documents = response.data;
          commit('documents', documents);
          if (documents.length > 0) {
            commit('selectedDocument', documents[0].docs[0]);
          } else {
            commit('selectedDocument', null);
          }
        })
        .catch(error => {
          args.errorCallback(error);
        });
    },
    fetchTag({ commit }, args) {
      Facade.getTags()
        .then(response => {
          commit('tags', response.data);
        })
        .catch(error => {
          args.errorCallback(error);
        });
    },
    postTag({ dispatch }, args) {
      Facade.postTag(args.data)
        .then(response => {
          dispatch('fetchTag', {
            errorCallback: args.errorCallback
          });
          args.successCallback(response.data);
        })
        .catch(error => {
          args.errorCallback(error);
        });
    },
    postSpace({ dispatch }, args) {
      Facade.postSpace(args.data)
        .then(response => {
          dispatch('fetchSpace', {
            errorCallback: args.errorCallback
          });
          args.successCallback(response.data);
        })
        .catch(error => {
          args.errorCallback(error);
        });
    },
    postDocument({ dispatch }, args) {
      Facade.postDocument(args.data)
        .then(response => {
          dispatch('fetchDocument', {
            query: args.data.get('spaceId'),
            errorCallback: args.errorCallback
          });
          args.successCallback(response.data);
        })
        .catch(error => {
          args.errorCallback(error);
        });
    }
  }
});
export default store;
