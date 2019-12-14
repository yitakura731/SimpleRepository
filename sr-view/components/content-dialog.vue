<template>
  <b-modal
    id="content-dialog"
    dialog-class="m-0 h-100 w-100"
    content-class="p-0 m-0 h-100"
    body-class="p-0 m-0"
    hide-header
    hide-footer
  >
    <div v-if="content != null" class="h-100 w-100">
      <div v-if="content.mimetype === 'application/pdf'" class="h-100">
        <pdf-viewer :content="content" />
      </div>
      <div v-else class="h-100">
        <image-viewer :content="content" />
      </div>
    </div>
    <div class="fixed-bottom d-flex justify-content-end m-2">
      <b-button pill size="lg" @click="close()">
        <font-awesome-icon icon="times" />
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import PDFViewer from './pdf-viewer';
import ImageViewer from './image-viewer';

export default {
  components: {
    'pdf-viewer': PDFViewer,
    'image-viewer': ImageViewer
  },
  computed: {
    content() {
      return this.$store.state.repository.selectedDocument;
    }
  },
  created() {
    this.$nuxt.$on('showContent', () => {
      this.$bvModal.show('content-dialog');
    });
  },
  methods: {
    close() {
      this.$bvModal.hide('content-dialog');
    }
  }
};
</script>

<style scoped></style>
