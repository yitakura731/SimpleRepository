<template>
  <div>
    <b-nav-item-dropdown no-caret>
      <template v-slot:button-content>
        <div class="text-white">
          <font-awesome-icon icon="cloud-upload-alt" />
        </div>
      </template>
      <b-dropdown-item @click="postSpace()">
        <font-awesome-icon icon="folder-plus" />
        {{ $t('postSpaceDialogTitle') }}
      </b-dropdown-item>
      <hr class="my-1" />
      <b-dropdown-item @click="postTag()">
        <font-awesome-icon icon="tag" />
        {{ $t('postTagDialogTitle') }}
      </b-dropdown-item>
      <hr class="my-1" />
      <b-dropdown-item @click="postDocument()">
        <font-awesome-icon icon="file-medical" />
        {{ $t('postDocDialogTitle') }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
    <post-space-dialog ref="PostSpaceDialog" />
    <post-doc-dialog ref="PostDocDialog" />
    <post-tag-dialog ref="PostTagDialog" />
  </div>
</template>

<script>
import PostSpaceDialog from './post-space-dialog';
import PostDocDialog from './post-doc-dialog.vue';
import PostTagDialog from './post-tag-dialog.vue';

export default {
  components: {
    'post-doc-dialog': PostDocDialog,
    'post-tag-dialog': PostTagDialog,
    'post-space-dialog': PostSpaceDialog
  },
  methods: {
    postDocument() {
      this.$refs.PostDocDialog.start();
    },
    postTag() {
      this.$refs.PostTagDialog.start();
    },
    postSpace() {
      this.$refs.PostSpaceDialog.start();
    }
  }
};
</script>
