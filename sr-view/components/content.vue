<template>
  <div class="h-100">
    <b-card no-body no-header class="h-100 py-1 border-0">
      <b-form inline>
        <b-button type="button" @click="setScale(10)">
          <font-awesome-icon icon="plus" />
        </b-button>
        <b-button type="button" class="ml-1" @click="setScale(-10)">
          <font-awesome-icon icon="minus" />
        </b-button>
        <div class="contents-number ml-1">
          {{ scale }}
        </div>
        <div class="ml-1 contents-label">
          %
        </div>

        <b-button type="button" class="ml-5" @click="setPage(-1)">
          <font-awesome-icon icon="caret-left" />
        </b-button>
        <b-button type="button" class="ml-1" @click="setPage(1)">
          <font-awesome-icon icon="caret-right" />
        </b-button>
        <div class="contents-number ml-1">
          {{ page }}
        </div>
        <div class="ml-1 contents-label">
          /
        </div>
        <div class="contents-number ml-1">
          {{ numPages }}
        </div>
      </b-form>

      <div ref="contentsArea" class="border mt-1 h-100">
        <div
          v-show="hasContent"
          ref="canvasParent"
          class="canvas-parent"
          :style="styles()"
        >
          <canvas ref="contentsCanvas" />
        </div>
        <div v-show="!hasContent" class="h-100 img-parent">
          <img src="~/static/no-file.png" class="mx-auto" />
        </div>
      </div>
    </b-card>
    <transition name="fade">
      <loading-spinner v-show="loading" />
    </transition>
  </div>
</template>

<script>
import LoadingSpinner from './loading-spinner';

export default {
  components: {
    'loading-spinner': LoadingSpinner
  },
  data() {
    return {
      scale: 100,
      page: 0,
      numPages: 0,
      showContent: false,
      loading: false
    };
  },
  computed: {
    contentId() {
      const document = this.$store.state.repository.selectedDocument;
      if (document != null) {
        return document.docId;
      } else {
        return null;
      }
    },
    hasContent() {
      let retVal = false;
      if (this.contentId != null) {
        retVal = true;
      }
      return retVal;
    }
  },
  watch: {
    contentId(newVal, oldVal) {
      if (newVal !== null) {
        this.scale = 100;
        this.page = 1;
        this.renderPDF();
      } else if (this.showContent) {
        const canvas = this.$refs.contentsCanvas;
        if (canvas != null) {
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.scale = 100;
          this.page = 0;
          this.numPages = 0;
          this.showContent = false;
        }
      }
    }
  },
  mounted() {
    if (this.contentId != null) {
      this.scale = 100;
      this.page = 1;
      this.renderPDF();
    }
  },
  methods: {
    setScale(input) {
      this.scale += input;
      this.renderPDF();
    },
    setPage(input) {
      if (this.page + input > 0 && this.page + input <= this.numPages) {
        this.page += input;
        this.renderPDF();
      }
    },
    renderPDF() {
      const parent = this.$refs.canvasParent;
      const canvas = this.$refs.contentsCanvas;
      const context = canvas.getContext('2d');
      let numPages = 0;
      this.loading = true;
      this.$store
        .dispatch('repository/fetchContent', {
          contentId: this.contentId
        })
        .then(pdf => {
          numPages = pdf.numPages;
          return pdf.getPage(this.page);
        })
        .then(page => {
          const pWidth = parent.clientWidth;
          const orgViewport = page.getViewport(1);
          const x1 = pWidth / orgViewport.width;
          const viewport = page.getViewport((x1 * this.scale) / 100);
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          return page.render({
            canvasContext: context,
            viewport: viewport
          });
        })
        .then(() => {
          this.numPages = numPages;
          this.showContent = true;
          this.loading = false;
        })
        .catch(error => {
          this.$nuxt.$emit('showError', error);
          this.loading = false;
        });
    },
    styles() {
      const contentsArea = this.$refs.contentsArea;
      let retVal = null;
      if (contentsArea != null) {
        retVal = { height: contentsArea.clientHeight + 'px' };
      } else {
        retVal = { height: 150 + 'px' };
      }
      return retVal;
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
