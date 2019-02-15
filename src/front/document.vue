<template>
  <b-card no-header no-body class="h-100 py-1 border-0">
    <!-- 入力エリア -->
    <b-input-group class="m-0">
      <!-- 検索フォーム -->
      <b-form-input type="text" class="p-0 m-0" v-model="input"/>
      <!-- 検索ボタン -->
      <b-button @click="search()" type="button" class="mx-0">
        <font-awesome-icon icon="search"/>
      </b-button>
      <!-- タグ登録ボタン -->
      <b-button @click="postTag()" type="button" class="ml-1">
        <font-awesome-icon icon="tag"/>
      </b-button>
      <!-- 文書登録ボタン -->
      <b-button @click="postDocument()" type="button" class="ml-1">
        <font-awesome-icon icon="file"/>
      </b-button>
    </b-input-group>

    <!-- 一覧エリア -->
    <div class="border list-item-parent mt-1 h-100">
      <div v-show="hasDocuments">
        <div v-for="(tag, index) in documents" :key="tag.tagId">
          <list-tag-item :tag="tag" :index="index" :key="tag.tagId"/>
        </div>
      </div>
      <div v-show="!hasDocuments" class="img-parent w-100 h-100">
        <img src="/images/no-file.png" class="mx-auto" width="200" height="200">
      </div>
    </div>

    <!-- 文書登録ダイアログ -->
    <post-doc-dialog ref="PostDocDialog"/>
    <!-- タグ登録ダイアログ -->
    <post-tag-dialog ref="PostTagDialog"/>
  </b-card>
</template>

<script>
import PostDocDialog from './post-doc-dialog.vue';
import PostTagDialog from './post-tag-dialog.vue';
import ListTagItem from './list-tag-item.vue';
import { DialogEvent } from './event-bus';

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
      return this.$store.getters.documents;
    },
    tags() {
      return this.$store.getters.tags;
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
    serach() {
      this.$store.dispatch('fetchDocument', {
        query: this.input,
        errorCallback: error => {
          DialogEvent.$emit('showError', error);
        }
      });
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