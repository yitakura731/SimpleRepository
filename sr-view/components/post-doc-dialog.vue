<template>
  <div>
    <b-modal
      ref="postDocDialog"
      header-bg-variant="light"
      hide-footer
      :title="$t('postDocDialogTitle')"
      hide-header-close
    >
      <b-container fluid>
        <b-row class="mb-1">
          <b-col class="mt-2" cols="3">
            {{ $t('labelSpace') }}
          </b-col>
          <b-col>
            <p class="mt-2">
              {{ docSpaceName }}
            </p>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col class="mt-2" cols="3">
            {{ $t('labelTag') }}
          </b-col>
          <b-col>
            <b-form-select
              v-model="docTag"
              :options="getTags()"
              :state="tagState"
            />
            <div v-show="!tagState">
              <p class="text-danger">
                {{ $t('tagRequired') }}
              </p>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col class="mt-2" cols="3">
            {{ $t('labelName') }}
          </b-col>
          <b-col>
            <b-form-input v-model="docName" type="text" :state="nameState" />
            <div v-show="!nameState">
              <p class="text-danger">
                {{ $t('nameRequired') }}
              </p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2" cols="3">
            {{ $t('labelFile') }}
          </b-col>
          <b-col>
            <b-form-file
              placeholder="Choose a file..."
              :state="fileState"
              @change="getSelectedFile"
            />
            <div v-show="!fileState">
              <p class="text-danger">
                {{ $t('fileRequired') }}
              </p>
            </div>
            <div v-show="!extState">
              <p class="text-danger">
                {{ $t('notPDForJPEG') }}
              </p>
            </div>
          </b-col>
        </b-row>
        <hr />
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
      docName: '',
      docFile: null,
      docExt: null,
      docTag: null
    };
  },
  computed: {
    docSpaceName() {
      let retVal = null;
      if (this.$store.state.repository.selectedSpace != null) {
        retVal = this.$store.state.repository.selectedSpace.name;
      } else {
        retVal = '';
      }
      return retVal;
    },
    nameState() {
      return this.docName.length > 0;
    },
    tagState() {
      return this.docTag != null;
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
  mounted() {
    this.$store.dispatch('repository/fetchTag').catch(error => {
      this.$root.$refs.ErrorDialog.show(error);
    });
  },
  methods: {
    start() {
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
      fData.append('tagId', this.docTag);
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
