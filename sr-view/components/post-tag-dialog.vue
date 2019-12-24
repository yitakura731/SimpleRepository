<template>
  <b-modal
    ref="postTagDialog"
    :title="$t('postTagDialogTitle')"
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
      <b-form-input v-model="name" type="text" :state="nameState" />
    </b-form-group>
    <b-form-group>
      <label class="mb-1">
        {{ $t('labelColor') }}
      </label>
      <compact-picker v-model="color" class="w-100" />
    </b-form-group>
    <hr />
    <b-button class="w-100" variant="outline-secondary" @click="post">
      {{ $t('labelRegist') }}
    </b-button>
  </b-modal>
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
      this.name = '';
      this.color = { hex: '#194d33' };
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
