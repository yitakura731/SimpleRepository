<template>
  <div>
    <b-modal
      ref="postTagDialog"
      header-bg-variant="light"
      hide-footer
      :title="$t('postTagDialogTitle')"
      hide-header-close
    >
      <b-container fluid>
        <b-row class="mb-3">
          <b-col class="mt-2" cols="2">
            {{ $t('labelName') }}
          </b-col>
          <b-col>
            <b-form-input v-model="name" type="text" :state="nameState" />
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col class="mt-2" cols="2">
            {{ $t('labelColor') }}
          </b-col>
          <b-col>
            <compact-picker v-model="color" class="w-100" />
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
import { Compact } from 'vue-color';

export default {
  components: {
    'compact-picker': Compact
  },
  data() {
    return {
      name: '',
      color: { hex: '#194d33' }
    };
  },
  computed: {
    nameState() {
      return this.name.length > 0;
    }
  },
  methods: {
    start() {
      this.$refs.postTagDialog.show();
    },
    post() {
      const postData = {
        name: this.name,
        color: this.color.hex
      };
      this.$store
        .dispatch(
          'repository/postTag',
          { data: postData },
          {
            withCredentials: true
          }
        )
        .then(() => {
          this.$refs.postTagDialog.hide();
          this.$nuxt.$emit('showSuccess', this.$t('successPostTag'));
        })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
        });
    }
  }
};
</script>

<style scoped></style>
