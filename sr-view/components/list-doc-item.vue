<template>
  <div>
    <div v-if="document.dispType === 'real'">
      <div :class="docItem" class="border-0 mt-1" @click="click()">
        <b-img
          :src="'data:image/jpeg;base64, ' + document.thumbnail"
          width="108"
          height="108"
        />
        <div class="d-flex w-100 m-0">
          <p class="ml-1 my-0 mr-0">
            {{ getDocName() }}
          </p>
          <p v-show="document.tagId != null" class="ml-auto my-0 mr-1">
            <font-awesome-icon icon="tag" :style="tagStyle" class="tag" />
          </p>
        </div>
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
      if (window.matchMedia('screen and (max-width: 768px)').matches) {
        this.$nuxt.$emit('showContent');
      }
    }
  }
};
</script>

<style scoped>
.dummy-item {
  background-color: rgba(0, 0, 0, 0);
  margin: 0.3rem 0rem;
  width: 108px;
  height: 108px;
}
.doc-item {
  background-color: white;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  font-size: 0.7rem;
}
.doc-item:hover {
  background-color: blanchedalmond;
}
.selected-doc-item {
  background-color: navajowhite;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  font-size: 0.7rem;
}
.tag {
  --tagColor: black;
  color: var(--tagColor);
}
</style>
