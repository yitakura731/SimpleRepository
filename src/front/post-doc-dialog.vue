<template>
  <div>
    <b-modal
      ref="postDocDialog"
      header-bg-variant="light"
      hide-footer
      :title="title"
      hide-header-close
    >
      <b-container fluid>
        <!-- スペース -->
        <b-row class="mb-1">
          <b-col class="mt-2" cols="3">{{spaceTitle}}</b-col>
          <b-col>
            <p class="mt-2">{{docSpaceName}}</p>
          </b-col>
        </b-row>
        <!-- クラス -->
        <b-row class="mb-3">
          <b-col class="mt-2" cols="3">{{tagTitle}}</b-col>
          <b-col>
            <b-form-select
              v-model="selectedTagId"
              :options="getTags()"
            />
          </b-col>
        </b-row>
        <!-- 名前 -->
        <b-row class="mb-3">
          <b-col class="mt-2" cols="3">{{docNameTitle}}</b-col>
          <b-col>
            <b-form-input 
              type="text" 
              :state="docNameState" 
              v-model="docName"/>
          </b-col>
        </b-row>
        <!-- 文書ファイル -->
        <b-row>
          <b-col class="mt-2" cols="3">{{docFileTitle}}</b-col>
          <b-col>
            <b-form-file
              @change="getSelectedFile"
              placeholder="Choose a file..."
            ></b-form-file>
          </b-col>
        </b-row>
        <hr>
        <!-- 登録ボタン -->
        <div class="mt-3 w-100">
          <b-button class="w-100" variant="outline-secondary" @click="post">{{postBtnTitle}}</b-button>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import i18next from 'i18next';
import { DialogEvent } from "./event-bus";

export default {
  data() {
    return {
      docName: '',
      docFile: null,
      selectedTagId: null,
      title: i18next.t('postDocDialogTitle'),
      postBtnTitle: i18next.t('labelRegist'),
      spaceTitle: i18next.t('labelSpace'),
      docNameTitle: i18next.t('labelName'),
      docFileTitle: i18next.t('labelFile'),
      tagTitle: i18next.t('labelTag')
    };
  },
  mounted() {
    this.$store.dispatch('fetchTag', {
      errorCallback: error => {
        this.$root.$refs.ErrorDialog.show(error);
      }
    });
  },
  computed: {
    docSpaceName() {
      let retVal = null;
      if (this.$store.getters.selectedSpace != null) {
        retVal = this.$store.getters.selectedSpace.spaceName;
      } else {
        retVal = '';
      }
      return retVal;
    },
    docNameState() {
      return this.docName.length > 0 ? true : false;
    }
  },
  methods: {
    start() {
      this.$refs.postDocDialog.show();
    },
    getTags() {
      let retVal = [];
      if (this.$store.getters.tags != null) {
        this.$store.getters.tags.forEach(val => {
          retVal.push ({
            text : val.name,
            value : val._id
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
    },
    post() {
      let fData = new FormData();
      fData.append('spaceId', this.$store.getters.selectedSpace._id);
      fData.append('docName', this.docName);
      fData.append('tagId', this.selectedTagId);
      fData.append('docFile', this.docFile);
      this.$store.dispatch('postDocument', {
        data: fData,
        successCallback : (data) => {
          this.$refs.postDocDialog.hide();
          DialogEvent.$emit(
            'showSuccess', i18next.t('successPostDocument'));
        },
        errorCallback : (error) => {
          DialogEvent.$emit('showError', error);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
