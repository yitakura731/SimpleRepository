<template>
  <div>
    <b-modal
      ref="postTagDialog"
      header-bg-variant="light"
      hide-footer
      :title="title"
      hide-header-close
    >
      <b-container fluid>
        <!-- 名前 -->
        <b-row class="mb-3">
          <b-col class="mt-2" cols="2">{{nameTitle}}</b-col>
          <b-col>
            <b-form-input 
              type="text" 
              :state="nameState" 
              v-model="name"/>
          </b-col>
        </b-row>
        <!-- 色 -->
        <b-row class="mb-1">
          <b-col class="mt-2" cols="2">{{colorTitle}}</b-col>
          <b-col>
            <compact-picker v-model="color" class="w-100"/>
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
import { Compact } from 'vue-color';
import { DialogEvent } from "./event-bus";

export default {
  components : {
    'compact-picker' : Compact
  },
  data() {
    return {
      name: '',
      color: { hex : '#194d33' },
      title: i18next.t('postTagDialogTitle'),
      postBtnTitle: i18next.t('labelRegist'),
      nameTitle: i18next.t('labelName'),
      colorTitle: i18next.t('labelColor')
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
    nameState() {
      return this.name.length > 0 ? true : false;
    }
  },
  methods: {
    start() {
      this.$refs.postTagDialog.show();
    },
    post() {
      const postData = {
        name : this.name,
        color : this.color.hex,
      };
      this.$store.dispatch('postTag', {
        data: postData,
        successCallback : (data) => {
          this.$refs.postTagDialog.hide();
          DialogEvent.$emit(
            'showSuccess', i18next.t('successPostTag'));
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
