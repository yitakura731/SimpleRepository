<template>
  <div :class="docClass">
    <div class="ml-5 py-2" @click="click()">
      <h6 class="my-0">
        <font-awesome-icon icon="file" />
        {{ document.docName }}
      </h6>
    </div>
    <hr class="m-0" />
  </div>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true,
      validator(obj) {
        return typeof obj.docId === 'string' && typeof obj.docName === 'string';
      }
    }
  },
  computed: {
    docClass() {
      let retVal = null;
      const current = this.$store.state.repository.selectedDocument;
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
      this.$store.commit('repository/selectedDocument', this.document);
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
