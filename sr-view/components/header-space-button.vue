<template>
  <div v-if="selectedSpace.image !== ''">
    <b-nav-item @click="showSpaceDialog()">
      <b-img
        :src="'data:image/png;base64,' + selectedSpace.image"
        width="38"
        height="32"
        class="space-icon rounded-sm p-1"
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
  border: 0px;
}
</style>
