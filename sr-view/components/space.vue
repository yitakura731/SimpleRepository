<template>
  <b-modal
    id="select-space-modal"
    header-bg-variant="light"
    :title="$t('selectSpaceDialog')"
    ok-variant="secondary"
    ok-only
  >
    <b-card no-header no-body class="border-0 list-space-parent overflow-auto">
      <div
        v-if="hasSpaces"
        class="d-flex justify-content-start flex-wrap align-content-start p-1"
      >
        <space-list-item
          v-for="space in spaces"
          :key="space.id"
          :space="space"
          @click="click(space)"
        />
      </div>
      <div
        v-if="!hasSpaces"
        class="d-flex justify-content-center align-items-center"
      >
        <img src="~/static/no-file.png" width="200" height="200" />
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
.list-space-parent {
  background-color: gainsboro;
}
</style>
