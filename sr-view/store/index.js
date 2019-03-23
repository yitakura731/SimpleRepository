import Vue from 'vue';
import Vuex from 'vuex';
import pdfjsLib from 'pdfjs-dist';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
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
      async setSpace({ commit, dispatch }, args) {
        commit('selectedSpace', args.space);
        await dispatch('fetchDocument', {
          spaceId: args.space.id
        });
      },

      async fetchSpace({ commit, dispatch }, args) {
        let url = `spaces`;
        if (args != null && args.query != null) {
          url += `?q=${encodeURIComponent(args.query)}`;
        }
        const response = await this.$axios.$get(url);
        commit('spaces', response);
        if (response.length > 0) {
          commit('selectedSpace', response[0]);
          await dispatch('fetchDocument', {
            spaceId: response[0].id
          });
        } else {
          commit('documents', null);
          commit('selectedDocument', null);
        }
      },

      async fetchDocument({ commit, dispatch, state }, arg) {
        let url = null;
        if (arg.query != null) {
          url = `documents?spaceId=${arg.spaceId}&sq=${arg.query}`;
        } else {
          url = `documents?spaceId=${arg.spaceId}`;
        }
        const response = await this.$axios.$get(url);
        if (response.length > 0) {
          const documents = [];
          response.forEach(doc => {
            const target = documents.find(item => {
              return item.tagId === doc.tagId;
            });
            if (target == null) {
              documents.push({
                tagId: doc.tagId,
                docs: [
                  {
                    docId: doc.docId,
                    docName: doc.docName
                  }
                ]
              });
            } else {
              target.docs.push({
                docId: doc.docId,
                docName: doc.docName
              });
            }
          });
          commit('documents', documents);
          commit('selectedDocument', documents[0].docs[0]);
        } else {
          commit('documents', null);
          commit('selectedDocument', null);
        }
      },

      async fetchTag({ commit }, args) {
        const response = await this.$axios.$get('tags');
        commit('tags', response);
      },

      async postTag({ dispatch }, args) {
        await this.$axios.$post('tags', args.data);
        await dispatch('fetchTag');
      },

      async postSpace({ dispatch }, args) {
        await this.$axios.$post('spaces', args.data);
        await dispatch('fetchSpace');
      },

      async postDocument({ dispatch }, args) {
        await this.$axios.$post('documents', args.data);
        await dispatch('fetchDocument', { spaceId: args.data.get('spaceId') });
      },

      fetchContent({ dispatch }, args) {
        const loadingTask = pdfjsLib.getDocument(
          `${process.env.baseUrl}/documents/${args.contentId}/contents`
        );
        return loadingTask.promise;
      }
    }
  });
};
export default createStore;