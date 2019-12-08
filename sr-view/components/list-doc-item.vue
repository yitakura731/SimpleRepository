<template>
  <div>
    <div v-if="document.dispType === 'real'">
      <div :class="docItem" class="border-0 py-1 my-1" @click="click()">
        <b-img
          :src="'data:image/jpeg;base64, ' + document.thumbnail"
          class="px-1"
        />
        <p class="m-0 text-center">
          {{ getDocName() }}
        </p>
        <p class="m-0 ml-2">
          <font-awesome-icon icon="tag" :style="tagStyle" class="tag" />
        </p>
      </div>
    </div>
    <div v-if="document.dispType === 'dummy'">
      <div class="dummy-item" />
    </div>
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
          typeof obj.thumbnail === 'string' &&
          typeof obj.dispType === 'string'
        );
      }
    }
  },
  computed: {
    docItem() {
      let retVal = null;
      const current = this.$store.state.repository.selectedDocument;
      if (current != null && current.docId === this.document.docId) {
        retVal = 'selected-doc-item';
      } else {
        retVal = 'doc-item';
      }
      return retVal;
    },
    tagStyle() {
      const tag = this.getTag(this.document.tagId);
      if (tag != null) {
        return { '--tagColor': tag.color };
      } else {
        return {};
      }
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
    click() {
      this.$store.commit('repository/selectedDocument', this.document);
    }
  }
};
</script>

<style scoped>
.dummy-item {
  background-color: rgba(0, 0, 0, 0);
  margin: 0.3rem 0rem;
  width: 108px;
  height: 156px;
}
.doc-item {
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}
.doc-item:hover {
  background-color: blanchedalmond;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}
.selected-doc-item {
  background-color: navajowhite;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
}
.tag {
  --tagColor: black;
  color: var(--tagColor);
}
</style>
