<template>
  <div>
    <b-nav-item @click="showSpaceDialog()">
      <b-img
        :src="'data:image/png;base64,' + selectedSpace.image"
        width="36"
        height="30"
        class="py-1 px-2 space-icon rounded-sm"
      />
      <small class="text-white pb-1">
        {{ selectedSpace.name }}
      </small>
    </b-nav-item>
    <space ref="ShowSpaceDialog" />
  </div>
</template>

<script>
import Space from './space.vue';
export default {
  components: {
    space: Space
  },
  computed: {
    selectedSpace() {
      let retVal = this.$store.state.repository.selectedSpace;
      if (retVal == null) {
        retVal = {};
        retVal.image = '';
        retVal.name = '';
      }
      return retVal;
    }
  },
  methods: {
    showSpaceDialog() {
      this.$refs.ShowSpaceDialog.start();
    }
  }
};
</script>

<style scoped>
.space-icon {
  background-color: lightsteelblue;
}
</style>
