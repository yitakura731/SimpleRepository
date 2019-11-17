<template>
  <div :class="docClass">
    <div class="ml-3 py-2" @click="click()">
      <p class="my-0">
        <font-awesome-icon :icon="getIcon()" />
        {{ document.docName }}
        <font-awesome-icon icon="tag" :style="style" class="tagColor ml-2" />
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
          typeof obj.tagId === 'string' &&
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
    },
    style() {
      const tag = this.getTag(this.document.tagId);
      return { '--tagColor': tag.color };
    }
  },
  methods: {
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
.tagColor {
  --tagColor: black;
  color: var(--tagColor);
}

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
