<template>
  <div>
    <b-modal
      ref="postSpaceDialog"
      header-bg-variant="light"
      hide-footer
      :title="title"
      hide-header-close
    >
      <b-container fluid>
        <!-- 名前 -->
        <b-row class="mb-3">
          <b-col class="mt-2" cols="2">{{spaceNameTitle}}</b-col>
          <b-col>
            <b-form-input
              type="text"
              :state="spaceNameState"
              v-model="spaceName"
            />
          </b-col>
        </b-row>
        <!-- 画像ファイル -->
        <b-row>
          <b-col class="mt-2" cols="2">{{spaceImageTitle}}</b-col>
          <b-col>
            <b-form-file
              accept="image/png"
              @change="getSelectedFile"
              placeholder="Choose a file..."
            ></b-form-file>
          </b-col>
        </b-row>
        <hr>
        <!-- 登録ボタン -->
        <div class="mt-3 w-100">
          <b-button class="w-100" variant="Secondary" @click="post">{{postBtnTitle}}</b-button>
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
      spaceName: '',
      spaceImage: null,
      title: '',
      postBtnTitle: i18next.t('labelRegist'),
      title: i18next.t('postSpaceDialogTitle'),
      spaceNameTitle: i18next.t('labelName'),
      spaceImageTitle: i18next.t('labelImage')
    };
  },
  computed: {
    spaceNameState() {
      return this.spaceName.length > 0 ? true : false;
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
      let fData = new FormData();
      fData.append('name', this.spaceName);
      fData.append('spaceImage', this.spaceImage);
      this.$store.dispatch('postSpace', {
        data : fData,
        successCallback : (data) => {
          this.$refs.postSpaceDialog.hide();
          DialogEvent.$emit(
            'showSuccess',　i18next.t('successPostSpace'));
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