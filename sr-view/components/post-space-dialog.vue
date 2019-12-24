<template>
  <b-modal
    ref="postSpaceDialog"
    :title="$t('postSpaceDialogTitle')"
    header-bg-variant="light"
    header-class="py-2 justify-content-center"
    hide-header-close
    hide-footer
  >
    <b-form-group>
      <label class="mb-1">
        {{ $t('labelName') }}
        <b-badge pill variant="info">
          {{ $t('required') }}
        </b-badge>
      </label>
      <b-form-input v-model="spaceName" type="text" :state="spaceNameState" />
    </b-form-group>

    <b-form-group>
      <label class="mb-1">
        {{ $t('labelImage') }}
      </label>
      <b-form-file
        accept="image/png"
        placeholder="Choose a file..."
        @change="getSelectedFile"
      />
    </b-form-group>

    <hr />
    <b-button class="w-100" variant="outline-secondary" @click="post">
      {{ $t('labelRegist') }}
    </b-button>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      spaceName: '',
      spaceImage: null
    };
  },
  computed: {
    spaceNameState() {
      return this.spaceName.length > 0;
    }
  },
  methods: {
    start() {
      this.spaceName = '';
      this.spaceImage = null;
      this.$refs.postSpaceDialog.show();
    },
    getSelectedFile: function(e) {
      e.preventDefault();
      this.spaceImage = e.target.files[0];
    },
    post() {
      const fData = new FormData();
      fData.append('name', this.spaceName);
      fData.append('spaceImage', this.spaceImage);
      this.$store
        .dispatch('repository/postSpace', { data: fData })
        .then(() => {
          this.$refs.postSpaceDialog.hide();
          this.$nuxt.$emit('showSuccess', this.$t('successPostSpace'));
        })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
        });
    }
  }
};
</script>

<style scoped></style>
