<template>
  <b-modal
    ref="ShowSpaceDialog"
    header-bg-variant="light"
    :title="$t('selectSpaceDialog')"
    ok-variant="secondary"
    hide-header-close
    footer-class="border-0 m-0 pt-0"
    header-class="py-1 d-flex justify-content-center"
  >
    <b-card
      ref="spaceArea"
      no-header
      no-body
      class="border-0 list-space-parent overflow-auto"
    >
      <div
        class="d-flex justify-content-around flex-wrap align-content-start p-1"
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

    <template v-slot:modal-footer="{ ok }" class="w-100">
      <b-button class="w-100" variant="outline-secondary" @click="ok()">
        {{ $t('choice') }}
      </b-button>
    </template>
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
      let retVal = [];
      const spaceList = this.$store.state.repository.spaces;
      if (spaceList == null || spaceList.length === 0) {
        retVal = null;
      } else {
        spaceList.forEach((value, each) => {
          retVal.push(Object.assign(value, { dispType: 'real' }));
        });
        if (spaceList.length % 2 === 1) {
          retVal.push({
            id: `dummy_0`,
            name: 'dummy',
            dispType: 'dummy'
          });
        }
      }
      return retVal;
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
    start() {
      this.$refs.ShowSpaceDialog.show();
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
.list-space-parent {
  background-color: gainsboro;
}
</style>
