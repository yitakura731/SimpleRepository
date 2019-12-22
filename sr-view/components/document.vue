<template>
  <div class="h-100 py-1">
    <div ref="documentArea" class="list-doc-area h-100 overflow-auto">
      <div
        v-if="hasDocuments"
        class="d-flex justify-content-around flex-wrap align-content-start h-100"
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
  </div>
</template>

<script>
import ListDocItem from './list-doc-item.vue';

export default {
  components: {
    'list-doc-item': ListDocItem
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
    }
  }
};
</script>

<style scoped>
.list-doc-area {
  background-color: gainsboro;
}
</style>
