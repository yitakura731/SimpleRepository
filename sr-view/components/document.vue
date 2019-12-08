<template>
  <div class="h-100 pb-1">
    <b-card no-header no-body class="h-100 border-0">
      <form class="form-inline w-100 py-1">
        <div class="border rounded d-flex w-50">
          <img
            :src="'data:image/png;base64,' + selectedSpace.image"
            class="ml-2"
            width="30"
            height="30"
          />
          <span class="ml-2">
            {{ selectedSpace.name }}
          </span>
          <b-button v-b-modal.select-space-modal size="sm" class="ml-auto">
            <font-awesome-icon icon="exchange-alt" />
          </b-button>
        </div>

        <b-input-group class="w-50 pl-1 ml-auto">
          <b-form-input v-model="input" size="sm" type="text" class="p-0 m-0" />
          <b-button type="button" size="sm" @click="search()">
            <font-awesome-icon icon="search" />
          </b-button>
        </b-input-group>
      </form>

      <div ref="documentArea" class="list-doc-parent mt-0 h-100 overflow-auto">
        <div
          v-if="hasDocuments"
          class="d-flex justify-content-around flex-wrap align-content-start h-100
          "
        >
          <div v-for="(doc, index) in documents" :key="doc.docId">
            <list-doc-item :document="doc" :index="index" />
          </div>
        </div>
        <div
          v-if="!hasDocuments"
          class="d-flex justify-content-center align-items-center h-100"
        >
          <img src="~/static/no-file.png" width="200" height="200" />
        </div>
      </div>
    </b-card>
    <space />
  </div>
</template>

<script>
import ListDocItem from './list-doc-item.vue';
import Space from './space.vue';

export default {
  components: {
    space: Space,
    'list-doc-item': ListDocItem
  },
  data() {
    return {
      input: null
    };
  },
  computed: {
    documents() {
      let retVal = [];
      const docList = this.$store.state.repository.documents;
      if (docList == null || docList.length === 0) {
        retVal = null;
      } else {
        docList.forEach((value, each) => {
          retVal.push(Object.assign(value, { dispType: 'real' }));
        });
        const documentArea = this.$refs.documentArea;
        if (documentArea != null) {
          const rowCount = Math.floor(documentArea.offsetWidth / 108);
          const bottomCount = docList.length % rowCount;
          if (bottomCount > 0) {
            for (let idx = 0; idx < rowCount - bottomCount; idx++) {
              retVal.push({
                docId: `dummy_${idx}`,
                docName: 'dummy',
                tagId: 'dummy',
                mimetype: 'dummy',
                thumbnail: 'dummy',
                dispType: 'dummy'
              });
            }
          }
        }
      }
      return retVal;
    },
    hasDocuments() {
      return this.documents != null;
    },
    selectedSpace() {
      let retVal = this.$store.state.repository.selectedSpace;
      if (retVal == null) {
        retVal = {};
        retVal.image = '';
        retVal.name = '';
      }
      return retVal;
    }
  },
  methods: {
    search() {
      const space = this.$store.state.repository.selectedSpace;
      if (space != null) {
        this.$store
          .dispatch('repository/fetchDocument', {
            spaceId: space.id,
            query: this.input
          })
          .catch(error => {
            this.$nuxt.$emit('showError', error);
          });
      }
    }
  }
};
</script>

<style scoped>
.list-doc-parent {
  background-color: gainsboro;
}
</style>
