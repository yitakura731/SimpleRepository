<template>
  <div :class="docClass" class="border-0 py-1 m-2" @click="click()">
    <b-img
      :src="'data:image/jpeg;base64, ' + document.thumbnail"
      class="px-1"
    />
    <p class="m-0 text-center">
      {{ getDocName() }}
    </p>
    <p class="m-0 ml-2">
      <font-awesome-icon icon="tag" :style="style" class="tagColor" />
    </p>
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
          typeof obj.tagId === 'string' &&
          typeof obj.mimetype === 'string' &&
          typeof obj.thumbnail === 'string'
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
    },
    style() {
      const tag = this.getTag(this.document.tagId);
      return { '--tagColor': tag.color };
    }
  },
  methods: {
    getDocName() {
      if (this.document.docName.length > 8) {
        return `${this.document.docName.substr(0, 8)}'...`;
      } else {
        return this.document.docName;
      }
    },
    getTag(tagId) {
      const retVal = this.$store.state.repository.tags.find(tag => {
        return tag.id === tagId;
      });
      return retVal;
    },
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
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
}
.docClass:hover {
  background-color: blanchedalmond;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
}
.selectedDocClass {
  background-color: navajowhite;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
}
.documentColor {
  --tagColor: gray;
  color: var(--tagColor);
}
.tagColor {
  --tagColor: black;
  color: var(--tagColor);
}
</style>
