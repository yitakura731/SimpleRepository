<template>
  <div :class="docClass">
    <!-- 文書名 -->
    <div class="ml-5 py-2" @click="click()">
      <h6 class="my-0">
        <font-awesome-icon icon="file"/>
        {{document.docName}}
      </h6>
    </div>
    <hr class="m-0">
  </div>
</template>

<script>
import i18next from 'i18next';
import { DialogEvent } from "./event-bus";

export default {
  props : [
    'document'
  ],
  computed: {
    docClass() {
      let retVal = null;
      const current = this.$store.getters.selectedDocument;
      if (current != null && current.docId === this.document.docId) {
        retVal = 'selectedDocClass';
      } else {
        retVal = 'docClass';
      }
      return retVal;
    }
  },
  methods: {
    click() {
      this.$store.dispatch('setDocument', {
        document: this.document,
        errorCallback: error => {
          DialogEvent.$emit('showError', error);
        }
      });
    }
  }
};
</script>

<style scoped>
.docClass {
  background-color: white;
  transition: 0.5s;
}
.docClass:hover {
  background-color: blanchedalmond;
}
.selectedDocClass {
  background-color: gold;
}
.documentColor {
  --tagColor: gray;
  color: var(--tagColor);
}
</style>