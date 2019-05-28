<template>
  <div class="h-100">
    <div class="p-1 h-100">
      <div v-if="content != null" class="h-100">
        <div v-if="content.mimetype === 'application/pdf'" class="h-100">
          <pdf-viewer :content="content" />
        </div>
        <div v-else class="h-100">
          <image-viewer :content="content" />
        </div>
      </div>
      <div v-else class="h-100 img-parent">
        <img src="~/static/no-file.png" class="mx-auto" />
      </div>
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
.contents-number {
  font-size: 25px;
  text-align: center;
  border: thin solid gray;
  width: 60px;
  border-radius: 5px;
}
.contents-label {
  font-size: 24px;
}
.canvas-parent {
  overflow: scroll;
}
.img-parent {
  display: flex;
  align-items: center;
  background-color: lightgrey;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
