<template>
  <b-card no-header no-body class="h-100 py-1 border-0">
    <!-- 入力エリア -->
    <b-input-group class="p-0 m-0">
      <!-- 検索フォーム -->
      <b-form-input type="text" class="p-0 m-0" v-model="input"/>
      <!-- 検索ボタン -->
      <b-button @click="search()" type="button" class="mx-0">
        <font-awesome-icon icon="search"/>
      </b-button>
      <!-- 登録ボタン -->
      <b-button @click="post()" type="button" class="ml-1">
        <font-awesome-icon icon="folder"/>
      </b-button>
    </b-input-group>

    <!-- 一覧エリア -->
    <div class="border listItemParent mt-1 h-100">
      <div v-show="hasSpaces">
        <space-list-item
          class="mx-2 my-1"
          v-for="space in spaces"
          @click="click(space)"
          :key="space._id"
          :space="space"
        />
      </div>
      <div v-show="!hasSpaces" class="imgParent w-100 h-100">
        <img src="/images/no-file.png" class="mx-auto" width="200" height="200">
      </div>
    </div>

    <!-- 登録ダイアログ -->
    <post-space-dialog ref="PostSpaceDialog"/>
  </b-card>
</template>

<script>
import PostSpaceDialog from './post-space-dialog';
import SpaceListItem from './list-space-item';
import { DialogEvent } from './event-bus';

export default {
  components: {
    'space-list-item': SpaceListItem,
    'post-space-dialog': PostSpaceDialog
  },
  data() {
    return {
      input: null
    };
  },
  computed: {
    spaces() {
      return this.$store.getters.spaces;
    },
    hasSpaces() {
      let retVal = false;
      if (this.spaces != null && this.spaces.length > 0) {
        retVal = true;
      }
      return retVal;
    }
  },
  mounted() {
    this.$store.dispatch('fetchSpace', {
      errorCallback: error => {
        DialogEvent.$emit('showError', error);
      }
    });
  },
  methods: {
    post() {
      this.$refs.PostSpaceDialog.start();
    },
    search() {
      this.$store.dispatch('fetchSpace', {
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
.imgParent {
  display: flex;
  align-items: center;
  background-color: lightgrey;
}
.listItemParent {
  overflow: scroll;
}
</style>