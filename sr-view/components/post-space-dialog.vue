<template>
  <div>
    <b-modal
      ref="postSpaceDialog"
      header-bg-variant="light"
      hide-footer
      :title="$t('postSpaceDialogTitle')"
      hide-header-close
    >
      <b-container fluid>
        <b-row class="mb-3">
          <b-col class="mt-2" cols="2">
            {{ $t('labelName') }}
          </b-col>
          <b-col>
            <b-form-input
              v-model="spaceName"
              type="text"
              :state="spaceNameState"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2" cols="2">
            {{ $t('labelImage') }}
          </b-col>
          <b-col>
            <b-form-file
              accept="image/png"
              placeholder="Choose a file..."
              @change="getSelectedFile"
            />
          </b-col>
        </b-row>
        <hr>
        <div class="mt-3 w-100">
          <b-button class="w-100" variant="outline-secondary" @click="post">
            {{ $t('labelRegist') }}
          </b-button>
        </div>
      </b-container>
    </b-modal>
  </div>
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
        .dispatch('postSpace', { data: fData })
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

<style scoped>
</style>
