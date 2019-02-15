<template>
  <b-modal
    ref="errorDialog"
    header-bg-variant="warning"
    footer-bg-variant="light"
    ok-variant="secondary"
    hide-header-close
    ok-only
    :title="title"
  >
    <h5 class="my-3">{{message}}</h5>
    <h6 class="my-3">{{stack}}</h6>
  </b-modal>
</template>

<script>
import { DialogEvent } from "./event-bus";

export default {
  data() {
    return {
      title: 'Error',
      message: '',
      stack: ''
    };
  },
  mounted() {
    DialogEvent.$on("showError", (error) => {
      this.message = error.message;
      this.stack = error.stack;
      this.$refs.errorDialog.show();
    });
  }
};
</script>

<style>
</style>