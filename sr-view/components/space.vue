<template>
  <b-card no-header no-body class="h-100 py-1 border-0">
    <b-input-group class="p-0 m-0">
      <b-form-input v-model="input" type="text" class="p-0 m-0" />
      <b-button type="button" class="mx-0" @click="search()">
        <font-awesome-icon icon="search" />
      </b-button>
      <b-button type="button" class="ml-1" @click="post()">
        <font-awesome-icon icon="folder" />
      </b-button>
    </b-input-group>
    <div class="border listItemParent mt-1 h-100">
      <div v-show="hasSpaces">
        <space-list-item
          v-for="space in spaces"
          :key="space.id"
          class="mx-2 my-1"
          :space="space"
          @click="click(space)"
        />
      </div>
      <div v-show="!hasSpaces" class="imgParent w-100 h-100">
        <img
          src="~/static/no-file.png"
          class="mx-auto"
          width="200"
          height="200"
        />
      </div>
    </div>
    <post-space-dialog ref="PostSpaceDialog" />
  </b-card>
</template>

<script>
import PostSpaceDialog from './post-space-dialog';
import SpaceListItem from './list-space-item';

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
      return this.$store.state.repository.spaces;
    },
    hasSpaces() {
      let retVal = false;
      if (this.spaces != null && this.spaces.length > 0) {
        retVal = true;
      }
      return retVal;
    }
  },
  methods: {
    post() {
      this.$refs.PostSpaceDialog.start();
    },
    search() {
      this.$store
        .dispatch('repository/fetchSpace', { query: this.input })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
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
