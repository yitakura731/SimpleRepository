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
    <h5 class="my-3">
      {{ message }}
    </h5>
    <h6 class="my-3">
      <div class="stack-trace-area">
        {{ stack }}
      </div>
    </h6>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      title: 'Error',
      message: '',
      stack: ''
    };
  },
  mounted() {
    this.$nuxt.$on('showError', error => {
      if (
        error != null &&
        error.response != null &&
        error.response.data != null
      ) {
        const err = error.response.data;
        this.message = err.message;
      } else {
        this.message = error.message;
      }
      this.stack = error.stack;
      this.$refs.errorDialog.show();
    });
  }
};
</script>

<style>
.stack-trace-area {
  border: solid 1px gray;
  overflow: scroll;
}
</style>
