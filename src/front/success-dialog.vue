<template>
  <b-modal
    ref="successDialog"
    header-bg-variant="success"
    footer-bg-variant="light"
    ok-variant="secondary"
    hide-header-close
    ok-only
    :title="title"
  >
    <h5 class="my-3">{{message}}</h5>
  </b-modal>
</template>

<script>
import { DialogEvent } from "./event-bus";

export default {
  data() {
    return {
      title: 'Success',
      message: ''
    };
  },
  mounted() {
    DialogEvent.$on("showSuccess", (msg) => {
      this.message = msg;
      this.$refs.successDialog.show();
    });
  }
};
</script>

<style>
</style>