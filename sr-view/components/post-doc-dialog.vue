<template>
  <b-modal
    ref="postDocDialog"
    hide-footer
    header-bg-variant="light"
    header-class="py-2 justify-content-center"
  >
    <template v-slot:modal-header="{}">
      <span class="d-flex align-items-center">
        <h5 class="m-0">
          {{ $t('postDocDialogTitle') }}
        </h5>
        <b-img
          :src="'data:image/png;base64,' + selectedSpace.image"
          width="28"
          height="28"
          class="pl-1 ml-3 mr-1"
        />
        {{ selectedSpace.name }}
      </span>
    </template>
    <b-form-group>
      <label class="mb-1">
        {{ $t('labelFile') }}
        <b-badge pill variant="info">
          {{ $t('required') }}
        </b-badge>
      </label>
      <b-form-file
        placeholder="Choose a file..."
        :state="fileState"
        @change="getSelectedFile"
      />
      <div v-show="!fileState" class="text-danger">
        <small>{{ $t('fileRequired') }}</small>
      </div>
      <div v-show="!extState" class="text-danger">
        <small>{{ $t('notPDForJPEG') }}</small>
      </div>
    </b-form-group>
    <b-form-group>
      <label class="mb-1">
        {{ $t('labelName') }}
        <b-badge pill variant="info">
          {{ $t('required') }}
        </b-badge>
      </label>
      <b-form-input v-model="docName" type="text" :state="nameState" />
      <div v-show="!nameState" class="text-danger">
        <small>{{ $t('nameRequired') }}</small>
      </div>
    </b-form-group>
    <b-form-group>
      <label class="mb-1">
        {{ $t('labelTag') }}
      </label>
      <b-form-select v-model="docTag" :options="getTags()" />
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
      docName: '',
      docFile: null,
      docExt: null,
      docTag: null
    };
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
    },
    nameState() {
      return this.docName.length > 0;
    },
    fileState() {
      return this.docFile != null;
    },
    extState() {
      if (this.docExt == null) {
        return true;
      }
      if (
        this.docExt === 'pdf' ||
        this.docExt === 'jpg' ||
        this.docExt === 'jpeg'
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    start() {
      this.docName = '';
      this.docFile = null;
      this.docExt = null;
      this.docTag = null;
      this.$refs.postDocDialog.show();
    },
    getTags() {
      const retVal = [];
      if (this.$store.state.repository.tags != null) {
        this.$store.state.repository.tags.forEach(val => {
          retVal.push({
            text: val.name,
            value: val.id
          });
        });
      }
      return retVal;
    },
    getSelectedFile: function(e) {
      e.preventDefault();
      this.docFile = e.target.files[0];
      const fullName = e.target.files[0].name;
      this.docName = fullName.substring(0, fullName.lastIndexOf('.'));
      this.docExt = fullName.substring(
        fullName.lastIndexOf('.') + 1,
        fullName.length
      );
    },
    post() {
      const fData = new FormData();
      fData.append('spaceId', this.$store.state.repository.selectedSpace.id);
      fData.append('docName', this.docName);
      if (this.docTag != null) {
        fData.append('tagId', this.docTag);
      }
      fData.append('docFile', this.docFile);
      this.$store
        .dispatch('repository/postDocument', { data: fData })
        .then(() => {
          this.$refs.postDocDialog.hide();
          this.$nuxt.$emit('showSuccess', this.$t('successPostDocument'));
        })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
        });
    }
  }
};
</script>

<style scoped></style>
