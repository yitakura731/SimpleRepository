<template>
  <div class="h-100 py-1">
    <div v-if="content != null" class="h-100">
      <div v-if="content.mimetype === 'application/pdf'" class="h-100">
        <pdf-viewer :content="content" />
      </div>
      <div v-else class="h-100">
        <image-viewer :content="content" />
      </div>
    </div>
    <div
      v-else
      class="h-100 img-parent d-flex justify-content-center align-items-center"
    >
      <img src="~/static/no-file.png" />
    </div>
  </div>
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
  }
};
</script>

<style scoped>
.img-parent {
  background-color: gainsboro;
}
</style>
