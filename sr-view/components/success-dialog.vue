<template>
  <b-modal
    ref="successDialog"
    header-bg-variant="success"
    ok-variant="secondary"
    footer-class="border-0 m-0 pt-0"
    header-class="py-2 justify-content-center"
  >
    <template v-slot:modal-header="{}">
      <span class="d-flex align-items-center">
        <h5 class="m-0">
          <font-awesome-icon icon="check-circle" class="mr-2" />
          {{ $t('successDialog') }}
        </h5>
      </span>
    </template>

    <h5 class="text-center m-0">
      {{ message }}
    </h5>

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
      title: 'Success',
      message: ''
    };
  },
  mounted() {
    this.$nuxt.$on('showSuccess', msg => {
      this.message = msg;
      this.$refs.successDialog.show();
    });
  }
};
</script>

<style></style>
