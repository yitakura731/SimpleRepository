<template>
  <b-modal
    ref="errorDialog"
    header-bg-variant="warning"
    ok-variant="secondary"
    footer-class="border-0 m-0 pt-0"
    header-class="py-2 justify-content-center"
  >
    <template v-slot:modal-header="{}">
      <span class="d-flex align-items-center">
        <h5 class="m-0">
          <font-awesome-icon icon="exclamation-circle" />
          {{ $t('errorDialog') }}
        </h5>
      </span>
    </template>

    <h5 class="text-center m-0">
      {{ message }}
    </h5>

    <h6 class="my-3">
      <div class="stack-trace-area">
        {{ stack }}
      </div>
    </h6>

    <template v-slot:modal-footer="{ ok }" class="w-100">
      <b-button class="w-100" variant="outline-secondary" @click="ok()">
        {{ $t('close') }}
      </b-button>
    </template>
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
