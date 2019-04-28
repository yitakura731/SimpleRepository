<template>
  <b-card no-header no-body class="h-100 py-1 border-0">
    <b-input-group class="m-0">
      <b-form-input v-model="input" type="text" class="p-0 m-0" />
      <b-button type="button" class="mx-0" @click="search()">
        <font-awesome-icon icon="search" />
      </b-button>
      <b-button type="button" class="ml-1" @click="postTag()">
        <font-awesome-icon icon="tag" />
      </b-button>
      <b-button type="button" class="ml-1" @click="postDocument()">
        <font-awesome-icon icon="file" />
      </b-button>
    </b-input-group>

    <div class="border list-item-parent mt-1 h-100">
      <div v-show="hasDocuments">
        <div v-for="(docGroup, index) in documents" :key="docGroup.tagId">
          <list-tag-item
            :key="docGroup.tagId"
            :tag="getTag(docGroup.tagId)"
            :docs="docGroup.docs"
            :index="index"
          />
        </div>
      </div>
      <div v-show="!hasDocuments" class="img-parent w-100 h-100">
        <img
          src="~/static/no-file.png"
          class="mx-auto"
          width="200"
          height="200"
        />
      </div>
    </div>

    <post-doc-dialog ref="PostDocDialog" />
    <post-tag-dialog ref="PostTagDialog" />
  </b-card>
</template>

<script>
import PostDocDialog from './post-doc-dialog.vue';
import PostTagDialog from './post-tag-dialog.vue';
import ListTagItem from './list-tag-item.vue';

export default {
  components: {
    'post-doc-dialog': PostDocDialog,
    'post-tag-dialog': PostTagDialog,
    'list-tag-item': ListTagItem
  },
  data() {
    return {
      input: null
    };
  },
  computed: {
    documents() {
      return this.$store.state.repository.documents;
    },
    hasDocuments() {
      let retVal = false;
      if (this.documents != null && this.documents.length > 0) {
        retVal = true;
      }
      return retVal;
    }
  },
  methods: {
    postDocument() {
      this.$refs.PostDocDialog.start();
    },
    postTag() {
      this.$refs.PostTagDialog.start();
    },
    getTag(tagId) {
      const retVal = this.$store.state.repository.tags.find(tag => {
        return tag.id === tagId;
      });
      return retVal;
    },
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
.img-parent {
  display: flex;
  align-items: center;
  background-color: lightgrey;
}
.list-item-parent {
  overflow: scroll;
}
</style>
