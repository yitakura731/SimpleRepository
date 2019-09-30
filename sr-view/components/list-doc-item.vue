<template>
  <div :class="docClass">
    <div class="ml-5 py-1" @click="click()">
      <p class="my-0">
        <font-awesome-icon :icon="getIcon()" />
        {{ document.docName }}
      </p>
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
        return (
          typeof obj.docId === 'string' &&
          typeof obj.docName === 'string' &&
          typeof obj.mimetype === 'string'
        );
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
    getIcon() {
      if (this.document.mimetype === 'application/pdf') {
        return 'file-pdf';
      } else if (this.document.mimetype === 'image/jpeg') {
        return 'image';
      } else {
        return 'file';
      }
    },
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
