<template>
    <b-card no-body no-header class="h-100 py-1 border-0">
      <b-form inline>
        <b-button @click="setScale(10)" type="button">
          <font-awesome-icon icon="plus"/>
        </b-button>
        <b-button @click="setScale(-10)" type="button" class="ml-1">
          <font-awesome-icon icon="minus"/>
        </b-button>
        <div class="contents-number ml-1">{{scale}}</div>
        <div class="ml-1 contents-label">%</div>

        <b-button @click="setPage(-1)" type="button" class="ml-5">
          <font-awesome-icon icon="caret-left"/>
        </b-button>
        <b-button @click="setPage(1)" type="button" class="ml-1">
          <font-awesome-icon icon="caret-right"/>
        </b-button>
        <div class="contents-number ml-1">{{page}}</div>
        <div class="ml-1 contents-label">/</div>
        <div class="contents-number ml-1">{{numPages}}</div>
      </b-form>

      <div ref="canvasParent" class="canvas-parent border mt-1 h-100">
        <div v-show="hasContent">
          <canvas ref="contentsCanvas" :contentId="contentId"/>
        </div>
        <div v-show="!hasContent" class="w-100 h-100 img-parent">
          <img src="/images/no-file.png" class="mx-auto">
        </div>
      </div>
    </b-card>
</template>

<script>
import Facade from './facade';
import { DialogEvent } from './event-bus';

export default {
  data() {
    return {
      scale: 100,
      page: 0,
      numPages: 0,
      showContent: false
    };
  },
  computed: {
    contentId() {
      let retVal = null;
      const canvas = this.$refs.contentsCanvas;
      const pdf = this.$store.getters.selectedDocument;
      if (canvas != null) {
        if (pdf != null) {
          retVal = pdf.docId;
          this.scale = 100;
          this.page = 1;
          this.renderPDF();
        } else {
          if (this.showContent) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.scale = 100;
            this.page = 0;
            this.numPages = 0;
            this.showContent = false;
          }
        }
      }
      return retVal;
    },
    hasContent() {
      let retVal = false;
      if (this.contentId != null) {
        retVal = true;
      }
      return retVal;
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
      const pdf = this.$store.getters.selectedDocument;
      let numPages = 0;
      Facade.getContent(pdf.docId)
        .then(pdf => {
          numPages = pdf.numPages;
          return pdf.getPage(this.page);
        })
        .then(page => {
          const pWidth = parent.clientWidth;
          const pHeight = parent.clientHeight;
          const orgViewport = page.getViewport(1);
          const x1 = pWidth / orgViewport.width;
          const y1 = pHeight / orgViewport.height;
          const viewport = page.getViewport((x1 * this.scale) / 100);
          canvas.width = pWidth;
          canvas.height = viewport.height;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          return page.render(renderContext);
        })
        .then(() => {
          this.numPages = numPages;
          this.showContent = true;
        })
        .catch(error => {
          DialogEvent.$emit('showError', error);
        });
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
</style>