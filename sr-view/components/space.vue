<template>
  <b-modal
    id="select-space-modal"
    header-bg-variant="light"
    :title="$t('selectSpaceDialog')"
    ok-variant="secondary"
    ok-only
  >
    <b-card no-header no-body class="h-100 py-1 border-0">
      <div class="border list-item-parent mt-0 h-100">
        <div v-show="hasSpaces">
          <space-list-item
            v-for="space in spaces"
            :key="space.id"
            class="mx-2 my-1"
            :space="space"
            @click="click(space)"
          />
        </div>
        <div v-show="!hasSpaces" class="img-parent w-100 h-100">
          <img
            src="~/static/no-file.png"
            class="mx-auto"
            width="200"
            height="200"
          />
        </div>
      </div>
    </b-card>
  </b-modal>
</template>

<script>
import SpaceListItem from './list-space-item';

export default {
  components: {
    'space-list-item': SpaceListItem
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
.img-parent {
  display: flex;
  align-items: center;
  background-color: lightgrey;
}
.list-item-parent {
  overflow-y: scroll;
}
</style>
