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
    <show-space-dialog ref="ShowSpaceDialog" />
  </div>
</template>

<script>
import ShowSpaceDialog from './show-space-dialog.vue';
export default {
  components: {
    showSpaceDialog: ShowSpaceDialog
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
